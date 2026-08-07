import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getFavorites, toggleFavorite } from "@/lib/favorites";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.accessToken) {
      return NextResponse.json({ favorites: [] });
    }
    const favorites = await getFavorites(session.user.accessToken);
    return NextResponse.json({ favorites });
  } catch (error) {
    console.error("[GET /api/favorites] Error:", error);
    return NextResponse.json({ favorites: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const slug = body?.slug;
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    const isFavorite = await toggleFavorite(session.user.accessToken, slug);
    return NextResponse.json({ isFavorite });
  } catch (error) {
    console.error("[POST /api/favorites] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
