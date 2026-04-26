import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Leaderboard table
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

    await sql`
      CREATE INDEX IF NOT EXISTS "idx_leaderboard_score" ON "leaderboard" ("score" DESC)
    `;

    // Keep old tables for backwards compat
    await sql`
      CREATE TABLE IF NOT EXISTS "characters" (
        "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" TEXT NOT NULL,
        "description" TEXT NOT NULL DEFAULT '',
        "personality" TEXT NOT NULL DEFAULT '',
        "greeting" TEXT NOT NULL DEFAULT 'Olá!',
        "avatar" TEXT NOT NULL DEFAULT '🤖',
        "category" TEXT NOT NULL DEFAULT 'custom',
        "isPublic" BOOLEAN NOT NULL DEFAULT true,
        "chats" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    return NextResponse.json({
      success: true,
      message: 'Tables created: leaderboard, characters',
      tables: ['leaderboard', 'characters'],
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
