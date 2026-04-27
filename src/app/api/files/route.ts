import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { put } from '@vercel/blob';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'all';
    const sortField = searchParams.get('sortField') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Validate sort fields to prevent SQL injection
    const validSortFields = ['downloads', 'name', 'createdAt'];
    const validSortOrders = ['asc', 'desc'];
    const safeSortField = validSortFields.includes(sortField) ? sortField : 'createdAt';
    const safeSortOrder = validSortOrders.includes(sortOrder) ? sortOrder : 'desc';

    let query = `SELECT * FROM "files"`;
    const conditions: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (search) {
      conditions.push(`("name" ILIKE $${paramIndex} OR "description" ILIKE $${paramIndex} OR "tags"::text ILIKE $${paramIndex} OR "fileName" ILIKE $${paramIndex})`);
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (category !== 'all') {
      conditions.push(`"category" = $${paramIndex}`);
      params.push(category);
      paramIndex++;
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ` ORDER BY "${safeSortField}" ${safeSortOrder === 'desc' ? 'DESC' : 'ASC'}`;
    query += ` LIMIT 100`;

    const { rows } = await sql.query(query, params);
    return NextResponse.json({ files: rows });
  } catch (error) {
    console.error('Files fetch error:', error);
    return NextResponse.json({ files: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const tagsStr = formData.get('tags') as string;
    const author = formData.get('author') as string;

    if (!file || !name) {
      return NextResponse.json({ error: 'Arquivo e nome são obrigatórios' }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(`nerdvault/${Date.now()}-${file.name}`, file, {
      access: 'public',
    });

    const tags = JSON.parse(tagsStr || '[]');

    const { rows } = await sql`
      INSERT INTO "files" ("name", "description", "category", "tags", "fileName", "fileUrl", "fileSize", "fileType", "downloads", "author")
      VALUES (${name}, ${description || ''}, ${category}, ${tags}, ${file.name}, ${blob.url}, ${file.size}, ${file.type}, 0, ${author || 'Anônimo'})
      RETURNING *
    `;

    return NextResponse.json({ success: true, file: rows[0] });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    await sql`
      UPDATE "files" SET "downloads" = "downloads" + 1 WHERE "id" = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Download increment error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    // Get file URL to delete from blob
    const { rows } = await sql`SELECT "fileUrl" FROM "files" WHERE "id" = ${id}`;

    if (rows.length > 0) {
      // Delete from blob
      try {
        const { del } = await import('@vercel/blob');
        await del(rows[0].fileUrl);
      } catch {
        // Blob deletion might fail, continue with DB deletion
      }

      await sql`DELETE FROM "files" WHERE "id" = ${id}`;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('File delete error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
