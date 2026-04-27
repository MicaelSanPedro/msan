import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT id, name, score, streak, level, "questionsAnswered", "createdAt"
      FROM "leaderboard"
      ORDER BY score DESC, streak DESC
      LIMIT 50
    `;
    return NextResponse.json({ entries: rows });
  } catch (error) {
    console.error('Leaderboard fetch error:', error);
    return NextResponse.json({ entries: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, score, streak, level, questionsAnswered } = body;

    if (!name || typeof score !== 'number') {
      return NextResponse.json({ error: 'Name and score required' }, { status: 400 });
    }

    await sql`
      INSERT INTO "leaderboard" (name, score, streak, level, "questionsAnswered")
      VALUES (${name}, ${score}, ${streak}, ${level}, ${questionsAnswered})
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Leaderboard save error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
