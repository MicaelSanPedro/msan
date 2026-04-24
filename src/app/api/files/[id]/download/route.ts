import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { readFile, stat } from 'fs/promises';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const fileEntry = await db.fileEntry.findUnique({ where: { id } });
    if (!fileEntry) {
      return NextResponse.json({ error: 'Arquivo não encontrado' }, { status: 404 });
    }

    // Verificar se o arquivo existe no disco
    let fileBuffer: Buffer;
    try {
      fileBuffer = await readFile(fileEntry.path);
    } catch {
      return NextResponse.json({ error: 'Arquivo físico não encontrado' }, { status: 404 });
    }

    // Incrementar contador de downloads
    await db.fileEntry.update({
      where: { id },
      data: { downloads: { increment: 1 } },
    });

    // Retornar o arquivo com headers de download
    const response = new NextResponse(fileBuffer);
    response.headers.set('Content-Type', fileEntry.type);
    response.headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(fileEntry.originalName)}"`);
    response.headers.set('Content-Length', fileEntry.size.toString());

    return response;
  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json({ error: 'Erro ao baixar arquivo' }, { status: 500 });
  }
}
