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

// Get access token from server-side session
async function getToken(): Promise<string | null> {
  const session = await auth();
  if (!session?.user) return null;
  return (session.user as Record<string, unknown>).accessToken as string | null;
}

function parseGistChat(gist: Record<string, unknown>): Record<string, unknown> | null {
  const desc = (gist.description || "") as string;
  if (!desc.startsWith(GIST_PREFIX)) return null;

  const files = gist.files as Record<string, Record<string, unknown>> | undefined;
  if (!files) return null;

  const file = files["chat.json"] || Object.values(files)[0];
  if (!file) return null;

  try {
    const content = JSON.parse(file.content as string) as ChatData;
    return {
      id: gist.id,
      title: content.title || desc.replace(GIST_PREFIX + " ", ""),
      model: content.model || "",
      messages: content.messages || [],
      createdAt: content.createdAt || new Date(gist.created_at as string).getTime(),
      updatedAt: content.updatedAt || new Date(gist.updated_at as string).getTime(),
    };
  } catch {
    return null;
  }
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

// GET /api/chats — list all NimChat gists
export async function GET() {
  try {
    const token = await getToken();
    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    let page = 1;
    const allChats: Record<string, unknown>[] = [];

    while (true) {
      const res = await ghApi(`/gists?per_page=100&page=${page}`, token);
      if (!res.ok) {
        const errBody = await res.text();
        console.error("[GET /api/chats] GitHub API error:", res.status, errBody);
        return NextResponse.json({ error: errBody, githubStatus: res.status }, { status: res.status });
      }

      const gists = (await res.json()) as Record<string, unknown>[];
      if (gists.length === 0) break;

      for (const gist of gists) {
        const chat = parseGistChat(gist);
        if (chat) allChats.push(chat);
      }
      if (gists.length < 100) break;
      page++;
    }

    return NextResponse.json(allChats);
  } catch (err) {
    console.error("[GET /api/chats]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// POST /api/chats — create a new gist
export async function POST(req: NextRequest) {
  try {
    const token = await getToken();
    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { title, model, messages, createdAt } = await req.json();

    const now = Date.now();
    const chatData: ChatData = {
      title: title || "Novo Chat",
      model: model || "",
      createdAt: createdAt || now,
      updatedAt: now,
      messages: messages || [],
    };

    console.log("[POST /api/chats] Creating gist with title:", chatData.title);

    const res = await ghApi("/gists", token, {
      method: "POST",
      body: JSON.stringify({
        description: `${GIST_PREFIX} ${chatData.title}`,
        public: false,
        files: { "chat.json": { content: JSON.stringify(chatData) } },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[POST /api/chats] Failed:", res.status, err);
      return NextResponse.json({ error: "Failed: " + err.slice(0, 200) }, { status: res.status });
    }

    const gist = (await res.json()) as Record<string, unknown>;
    console.log("[POST /api/chats] Created gist:", gist.id);
    return NextResponse.json({ id: gist.id, ...chatData });
  } catch (err) {
    console.error("[POST /api/chats]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}