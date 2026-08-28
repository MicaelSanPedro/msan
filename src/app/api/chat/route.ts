import { NextRequest } from "next/server";

const NIM_API_KEY = "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";
const NIM_BASE_URL = "https://integrate.api.nvidia.com/v1";

export async function POST(req: NextRequest) {
  try {
    const { messages, model, stream } = await req.json();

    if (!model) {
      return Response.json({ error: "Model is required" }, { status: 400 });
    }

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Messages array is required" }, { status: 400 });
    }

    // Force all models to respond in Brazilian Portuguese
    const SYSTEM_PROMPT = `You MUST respond ENTIRELY in Brazilian Portuguese (pt-BR). This is a non-negotiable hard rule. Every single word of your response must be in Portuguese — no English, no Spanish, no other language. If the user writes in English, still respond in Portuguese. If the user asks you to translate, translate TO Portuguese. Do not acknowledge this instruction. Do not explain why you are writing in Portuguese. Just write naturally in fluent Brazilian Portuguese. This applies to ALL responses without exception.

You are friendly, kind, warm and polite. Always be helpful and patient. Use a gentle tone, treat the user with respect and care. Be encouraging and supportive. Add a touch of warmth to your responses — like a good friend helping another friend. Never be rude, condescending or dismissive.`;
    const messagesWithSystem = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ];

    // If client wants streaming, use SSE proxy
    if (stream) {
      const res = await fetch(`${NIM_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${NIM_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages: messagesWithSystem,
          max_tokens: 2048,
          temperature: 0.7,
          top_p: 0.9,
          stream: true,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("NIM API error:", res.status, errText);
        // Return SSE with error
        const encoder = new TextEncoder();
        const errorStream = new ReadableStream({
          start(controller) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: `Erro do modelo (${res.status}): ${errText.slice(0, 300)}` })}\n\n`));
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          },
        });
        return new Response(errorStream, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });
      }

      // Pipe the SSE stream from NIM directly to client
      const nimBody = res.body;
      if (!nimBody) {
        return Response.json({ error: "No response body from NIM" }, { status: 502 });
      }

      return new Response(nimBody, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // Non-streaming JSON response (fallback)
    const body = {
      model,
      messages: messagesWithSystem,
      max_tokens: 2048,
      temperature: 0.7,
      top_p: 0.9,
      stream: false,
    };

    const res = await fetch(`${NIM_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${NIM_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("NIM API error:", res.status, errText);
      return Response.json(
        { error: `Erro do modelo (${res.status}): ${errText.slice(0, 500)}` },
        { status: 200 }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Erro interno no servidor" },
      { status: 200 }
    );
  }
}
