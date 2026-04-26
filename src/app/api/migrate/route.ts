import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "file_entries" (
        "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" TEXT NOT NULL,
        "originalName" TEXT NOT NULL,
        "size" INTEGER NOT NULL,
        "type" TEXT NOT NULL,
        "category" TEXT NOT NULL DEFAULT 'outros',
        "blobUrl" TEXT NOT NULL,
        "downloads" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS "idx_file_entries_category" ON "file_entries" ("category")
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS "idx_file_entries_createdAt" ON "file_entries" ("createdAt" DESC)
    `;

    return NextResponse.json({ success: true, message: 'Tabela criada com sucesso' });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ error: 'Erro na migração' }, { status: 500 });
  }
}
