import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Files table for NerdVault
    await sql`
      CREATE TABLE IF NOT EXISTS "files" (
        "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" TEXT NOT NULL,
        "description" TEXT NOT NULL DEFAULT '',
        "category" TEXT NOT NULL DEFAULT 'scripts',
        "tags" TEXT[] NOT NULL DEFAULT '{}',
        "fileName" TEXT NOT NULL,
        "fileUrl" TEXT NOT NULL,
        "fileSize" INTEGER NOT NULL DEFAULT 0,
        "fileType" TEXT NOT NULL DEFAULT '',
        "downloads" INTEGER NOT NULL DEFAULT 0,
        "author" TEXT NOT NULL DEFAULT 'Anônimo',
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS "idx_files_category" ON "files" ("category")
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS "idx_files_downloads" ON "files" ("downloads" DESC)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS "idx_files_createdAt" ON "files" ("createdAt" DESC)
    `;

    // Keep leaderboard table for backwards compat
    await sql`
      CREATE TABLE IF NOT EXISTS "leaderboard" (
        "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" TEXT NOT NULL,
        "score" INTEGER NOT NULL DEFAULT 0,
        "streak" INTEGER NOT NULL DEFAULT 0,
        "level" INTEGER NOT NULL DEFAULT 0,
        "questionsAnswered" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    return NextResponse.json({
      success: true,
      message: 'Tables created: files, leaderboard',
      tables: ['files', 'leaderboard'],
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
