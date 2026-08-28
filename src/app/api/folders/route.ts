import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/folders — list user's folders (tree structure)
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const dbId = (session.user as Record<string, unknown>).dbId as string | undefined;
    if (!dbId) return NextResponse.json({ error: "User not in DB" }, { status: 401 });

    const folders = await prisma.folder.findMany({
      where: { userId: dbId },
      include: {
        _count: { select: { chats: true, children: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(folders);
  } catch (err) {
    console.error("GET /api/folders error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// POST /api/folders — create a new folder
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const dbId = (session.user as Record<string, unknown>).dbId as string | undefined;
    if (!dbId) return NextResponse.json({ error: "User not in DB" }, { status: 401 });

    const { name, parentId } = await req.json();
    if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

    const folder = await prisma.folder.create({
      data: {
        name,
        userId: dbId,
        parentId: parentId || null,
      },
    });

    return NextResponse.json(folder);
  } catch (err) {
    console.error("POST /api/folders error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
