import { NextRequest, NextResponse } from "next/server";

// GET /api/test-gist?token=xxx — tests GitHub Gist API access
export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");
    if (!token) {
      return NextResponse.json({ error: "Pass ?token=YOUR_GITHUB_TOKEN" }, { status: 400 });
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    };

    // 1. Check who the token belongs to
    const userRes = await fetch("https://api.github.com/user", { headers });
    const user = userRes.ok ? await userRes.json() : { error: "Failed to fetch user" };

    // 2. Check token scopes (from response headers)
    const scopes = userRes.headers.get("x-oauth-scopes") || "unknown";

    // 3. Try to list gists
    const gistRes = await fetch("https://api.github.com/gists?per_page=1", { headers });
    const gistOk = gistRes.ok;
    let gistError = null;
    if (!gistOk) {
      gistError = await gistRes.text();
    }

    // 4. Try to CREATE a test gist
    const createRes = await fetch("https://api.github.com/gists", {
      method: "POST",
      headers,
      body: JSON.stringify({
        description: "[NimChat] Test — delete me",
        public: false,
        files: { "test.json": { content: '{"test":true}' } },
      }),
    });

    let createdGist = null;
    let createError = null;
    if (createRes.ok) {
      createdGist = await createRes.json();
      // Clean up - delete the test gist
      await fetch(`https://api.github.com/gists/${createdGist.id}`, {
        method: "DELETE",
        headers,
      });
    } else {
      createError = await createRes.text();
    }

    return NextResponse.json({
      user: userRes.ok ? { login: user.login, id: user.id } : { error: user },
      scopes,
      canListGists: gistOk,
      listGistError: gistError,
      canCreateGist: !!createdGist,
      createdGistId: createdGist?.id || null,
      createGistError: createError,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
