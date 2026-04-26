import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET - Listar personagens
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';

    const conditions: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (search) {
      conditions.push(`("name" ILIKE $${paramIndex} OR "description" ILIKE $${paramIndex})`);
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (category && category !== 'todos') {
      conditions.push(`"category" = $${paramIndex}`);
      params.push(category);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

    const { rows: characters } = await sql.query(
      `SELECT * FROM "characters" ${whereClause} ORDER BY "chats" DESC, "createdAt" DESC`,
      params
    );

    return NextResponse.json({ characters });
  } catch (error) {
    console.error('Error listing characters:', error);
    return NextResponse.json({ error: 'Erro ao listar personagens' }, { status: 500 });
  }
}

// POST - Criar personagem
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, personality, greeting, avatar, category } = body;

    if (!name || !personality) {
      return NextResponse.json({ error: 'Nome e personalidade são obrigatórios' }, { status: 400 });
    }

    const { rows: [character] } = await sql`
      INSERT INTO "characters" ("name", "description", "personality", "greeting", "avatar", "category", "isPublic", "chats", "createdAt", "updatedAt")
      VALUES (${name}, ${description || ''}, ${personality}, ${greeting || 'Olá! Como posso te ajudar?'}, ${avatar || '🤖'}, ${category || 'custom'}, true, 0, NOW(), NOW())
      RETURNING *
    `;

    return NextResponse.json({ character }, { status: 201 });
  } catch (error) {
    console.error('Error creating character:', error);
    return NextResponse.json({ error: 'Erro ao criar personagem' }, { status: 500 });
  }
}
