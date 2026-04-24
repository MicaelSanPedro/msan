import { NextRequest, NextResponse } from 'next/server';
import { put, del, head } from '@vercel/blob';
import { sql } from '@vercel/postgres';

function getCategoryFromMime(mimeType: string): string {
  if (mimeType.startsWith('image/')) return 'imagens';
  if (mimeType.startsWith('video/')) return 'videos';
  if (mimeType.startsWith('audio/')) return 'audios';
  if (mimeType.includes('pdf')) return 'documentos';
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z') || mimeType.includes('tar') || mimeType.includes('gz')) return 'compactados';
  if (mimeType.includes('word') || mimeType.includes('document') || mimeType.includes('text')) return 'documentos';
  if (mimeType.includes('sheet') || mimeType.includes('excel') || mimeType.includes('csv')) return 'planilhas';
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'apresentacoes';
  if (mimeType.includes('javascript') || mimeType.includes('json') || mimeType.includes('xml') || mimeType.includes('html') || mimeType.includes('css')) return 'codigo';
  return 'outros';
}

// GET - Listar arquivos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const sort = searchParams.get('sort') || 'recent';

    let whereClause = '';
    const conditions: string[] = [];

    if (search) {
      conditions.push(`("originalName" ILIKE '%${search.replace(/'/g, "''")}%' OR "name" ILIKE '%${search.replace(/'/g, "''")}%')`);
    }

    if (category && category !== 'todos') {
      conditions.push(`"category" = '${category.replace(/'/g, "''")}'`);
    }

    if (conditions.length > 0) {
      whereClause = 'WHERE ' + conditions.join(' AND ');
    }

    let orderClause = '"createdAt" DESC';
    if (sort === 'name') orderClause = '"originalName" ASC';
    if (sort === 'size') orderClause = '"size" DESC';
    if (sort === 'downloads') orderClause = '"downloads" DESC';

    const { rows: files } = await sql.query(
      `SELECT * FROM "file_entries" ${whereClause} ORDER BY ${orderClause}`
    );

    const { rows: statsRows } = await sql`
      SELECT
        COUNT(*) as "totalFiles",
        COALESCE(SUM("downloads"), 0) as "totalDownloads",
        COALESCE(SUM("size"), 0) as "totalSize"
      FROM "file_entries"
    `;

    const stats = {
      totalFiles: Number(statsRows[0]?.totalFiles || 0),
      totalDownloads: Number(statsRows[0]?.totalDownloads || 0),
      totalSize: Number(statsRows[0]?.totalSize || 0),
    };

    return NextResponse.json({ files, stats });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json({ error: 'Erro ao listar arquivos' }, { status: 500 });
  }
}

// POST - Upload de arquivo
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    // Gerar nome único para o blob
    const ext = file.name.split('.').pop() || '';
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    // Upload para Vercel Blob
    const blob = await put(uniqueName, file, {
      access: 'public',
    });

    // Determinar categoria
    const category = getCategoryFromMime(file.type);

    // Salvar no banco
    const { rows: [fileEntry] } = await sql`
      INSERT INTO "file_entries" ("name", "originalName", "size", "type", "category", "blobUrl", "downloads", "createdAt", "updatedAt")
      VALUES (${uniqueName}, ${file.name}, ${file.size}, ${file.type || 'application/octet-stream'}, ${category}, ${blob.url}, 0, NOW(), NOW())
      RETURNING *
    `;

    return NextResponse.json({ file: fileEntry }, { status: 201 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Erro ao fazer upload do arquivo' }, { status: 500 });
  }
}

// DELETE - Deletar arquivo
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID não informado' }, { status: 400 });
    }

    const { rows: [fileEntry] } = await sql`
      SELECT * FROM "file_entries" WHERE "id" = ${id}
    `;

    if (!fileEntry) {
      return NextResponse.json({ error: 'Arquivo não encontrado' }, { status: 404 });
    }

    // Deletar do Vercel Blob
    try {
      await del(fileEntry.blobUrl);
    } catch {
      // Blob pode já ter sido deletado
    }

    // Deletar do banco
    await sql`
      DELETE FROM "file_entries" WHERE "id" = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Erro ao deletar arquivo' }, { status: 500 });
  }
}
