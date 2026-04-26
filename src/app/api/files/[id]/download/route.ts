import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { rows: [fileEntry] } = await sql`
      SELECT * FROM "file_entries" WHERE "id" = ${id}
    `;

    if (!fileEntry) {
      return NextResponse.json({ error: 'Arquivo não encontrado' }, { status: 404 });
    }

    // Incrementar contador de downloads
    await sql`
      UPDATE "file_entries" SET "downloads" = "downloads" + 1, "updatedAt" = NOW()
      WHERE "id" = ${id}
    `;

    // Redirecionar para a URL do Vercel Blob (download direto)
    return NextResponse.redirect(fileEntry.blobUrl);
  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json({ error: 'Erro ao baixar arquivo' }, { status: 500 });
  }
}
