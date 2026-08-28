import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const GIST_PREFIX = "[NimChat]";

interface ChatData {
  title: string;
  model: string;
  createdAt: number;
  updatedAt: number;
  messages: { role: string; content: string; model?: string }[];
}

async function getToken(): Promise<string | null> {
  const session = await auth();
  if (!session?.user) return null;
  return (session.user as Record<string, unknown>).accessToken as string | null;
}

async function ghApi(path: string, token: string, options?: RequestInit) {
  return fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      ...(options?.headers as Record<string, string> || {}),
    },
  });
}

// GET /api/chats/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await getToken();
    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await params;
    const res = await ghApi(`/gists/${id}`, token);
    if (!res.ok) return NextResponse.json({ error: "Gist not found" }, { status: 404 });

    const gist = (await res.json()) as Record<string, unknown>;
    const files = gist.files as Record<string, Record<string, unknown>> | undefined;
    const file = files?.["chat.json"] || (files ? Object.values(files)[0] : null);

    if (!file) return NextResponse.json({ error: "Invalid gist" }, { status: 404 });

    try {
      const content = JSON.parse(file.content as string) as ChatData;
      return NextResponse.json({ id: gist.id, ...content });
    } catch {
      return NextResponse.json({ error: "Invalid gist content" }, { status: 404 });
    }
  } catch (err) {
    console.error("[GET /api/chats/[id]]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// PUT /api/chats/[id] — update gist
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await getToken();
    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await params;
    const { title, messages, model } = await req.json();

    // Fetch existing to get createdAt
    const existing = await ghApi(`/gists/${id}`, token);
    let createdAt = Date.now();
    let existingModel = model || "";

    if (existing.ok) {
      const gist = (await existing.json()) as Record<string, unknown>;
      const files = gist.files as Record<string, Record<string, unknown>> | undefined;
      const file = files?.["chat.json"] || (files ? Object.values(files)[0] : null);
      if (file) {
        try {
          const prev = JSON.parse(file.content as string) as ChatData;
          createdAt = prev.createdAt || createdAt;
          existingModel = prev.model || existingModel;
        } catch {}
      }
    }

    const chatData: ChatData = {
      title: title || "Novo Chat",
      model: existingModel,
      createdAt,
      updatedAt: Date.now(),
      messages: messages || [],
    };

    console.log("[PUT /api/chats/[id]] Updating gist:", id);

    const res = await ghApi(`/gists/${id}`, token, {
      method: "PATCH",
      body: JSON.stringify({
        description: `${GIST_PREFIX} ${chatData.title}`,
        files: { "chat.json": { content: JSON.stringify(chatData) } },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[PUT /api/chats/[id]] Gist update failed:", res.status, errText);
      // If gist doesn't exist (404), try creating it instead
      if (res.status === 404) {
        console.log("[PUT /api/chats/[id]] Gist not found, creating new one for:", id);
        const createRes = await ghApi(`/gists`, token, {
          method: "POST",
          body: JSON.stringify({
            description: `${GIST_PREFIX} ${chatData.title}`,
            files: { "chat.json": { content: JSON.stringify(chatData) } },
            public: false,
          }),
        });
        if (!createRes.ok) {
          const createErr = await createRes.text();
          console.error("[PUT /api/chats/[id]] Gist create also failed:", createRes.status, createErr);
          return NextResponse.json({ error: "Failed to create gist: " + createErr.slice(0, 200) }, { status: createRes.status });
        }
        const newGist = (await createRes.json()) as Record<string, unknown>;
        console.log("[PUT /api/chats/[id]] Created new gist:", newGist.id, "replacing old id:", id);
        return NextResponse.json({ oldId: id, id: newGist.id, ...chatData });
      }
      return NextResponse.json({ error: "Failed: " + errText.slice(0, 200) }, { status: res.status });
    }

    console.log("[PUT /api/chats/[id]] Updated gist:", id);
    return NextResponse.json({ id, ...chatData });
  } catch (err) {
    console.error("[PUT /api/chats/[id]]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// DELETE /api/chats/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await getToken();
    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { id } = await params;
    console.log("[DELETE /api/chats/[id]] Deleting gist:", id);

    const res = await ghApi(`/gists/${id}`, token, { method: "DELETE" });
    if (!res.ok) {
      const err = await res.text();
      console.error("[DELETE /api/chats/[id]] Failed:", res.status, err);
      return NextResponse.json({ error: "Failed: " + err.slice(0, 200) }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/chats/[id]]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}