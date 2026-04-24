import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

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

    const where: any = {};

    if (search) {
      where.OR = [
        { originalName: { contains: search } },
        { name: { contains: search } },
      ];
    }

    if (category && category !== 'todos') {
      where.category = category;
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'name') orderBy = { originalName: 'asc' };
    if (sort === 'size') orderBy = { size: 'desc' };
    if (sort === 'downloads') orderBy = { downloads: 'desc' };

    const files = await db.fileEntry.findMany({
      where,
      orderBy,
    });

    const stats = {
      totalFiles: await db.fileEntry.count(),
      totalDownloads: (await db.fileEntry.aggregate({ _sum: { downloads: true } }))._sum.downloads || 0,
      totalSize: (await db.fileEntry.aggregate({ _sum: { size: true } }))._sum.size || 0,
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

    // Garantir que o diretório de upload existe
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    // Gerar nome único para o arquivo
    const ext = path.extname(file.name);
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    const filePath = path.join(UPLOAD_DIR, uniqueName);

    // Salvar arquivo no disco
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Determinar categoria
    const category = getCategoryFromMime(file.type);

    // Salvar no banco
    const fileEntry = await db.fileEntry.create({
      data: {
        name: uniqueName,
        originalName: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        category,
        path: filePath,
      },
    });

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

    const fileEntry = await db.fileEntry.findUnique({ where: { id } });
    if (!fileEntry) {
      return NextResponse.json({ error: 'Arquivo não encontrado' }, { status: 404 });
    }

    // Deletar arquivo do disco
    const { unlink } = await import('fs/promises');
    try {
      await unlink(fileEntry.path);
    } catch {
      // Arquivo pode já ter sido deletado
    }

    // Deletar do banco
    await db.fileEntry.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Erro ao deletar arquivo' }, { status: 500 });
  }
}
