import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET - Buscar personagem por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { rows: [character] } = await sql`
      SELECT * FROM "characters" WHERE "id" = ${id}
    `;

    if (!character) {
      return NextResponse.json({ error: 'Personagem não encontrado' }, { status: 404 });
    }

    // Buscar mensagens do chat
    const { rows: messages } = await sql`
      SELECT * FROM "messages" WHERE "characterId" = ${id} ORDER BY "createdAt" ASC
    `;

    return NextResponse.json({ character, messages });
  } catch (error) {
    console.error('Error fetching character:', error);
    return NextResponse.json({ error: 'Erro ao buscar personagem' }, { status: 500 });
  }
}

// DELETE - Deletar personagem
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await sql`DELETE FROM "messages" WHERE "characterId" = ${id}`;
    await sql`DELETE FROM "characters" WHERE "id" = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting character:', error);
    return NextResponse.json({ error: 'Erro ao deletar personagem' }, { status: 500 });
  }
}
