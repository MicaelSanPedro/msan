import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Not logged in" });
    }
    const user = session.user as Record<string, unknown>;

    // Test gist access with the token
    const token = user.accessToken as string;
    let gistTest = null;
    if (token) {
      try {
        const res = await fetch("https://api.github.com/gists?per_page=1", {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github.v3+json" },
        });
        gistTest = { status: res.status, ok: res.ok };
      } catch (e) {
        gistTest = { error: String(e) };
      }
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      hasAccessToken: !!token,
      tokenPrefix: token?.slice(0, 10) + "...",
      gistTest,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) });
  }
}
