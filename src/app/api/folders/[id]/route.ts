import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// PUT /api/folders/[id] — rename or move folder
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const dbId = (session.user as Record<string, unknown>).dbId as string | undefined;
    if (!dbId) return NextResponse.json({ error: "User not in DB" }, { status: 401 });

    const { name, parentId } = await req.json();

    const folder = await prisma.folder.update({
      where: { id, userId: dbId },
      data: {
        ...(name !== undefined && { name }),
        ...(parentId !== undefined && { parentId: parentId || null }),
      },
    });

    return NextResponse.json(folder);
  } catch (err) {
    console.error("PUT /api/folders/[id] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// DELETE /api/folders/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const dbId = (session.user as Record<string, unknown>).dbId as string | undefined;
    if (!dbId) return NextResponse.json({ error: "User not in DB" }, { status: 401 });

    // Set all chats in this folder to root
    await prisma.chat.updateMany({
      where: { folderId: id },
      data: { folderId: null },
    });

    await prisma.folder.delete({ where: { id, userId: dbId } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/folders/[id] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
