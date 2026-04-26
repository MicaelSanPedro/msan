import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

const GEMINI_API_KEY = 'AIzaSyAitr2wJ_OdQVjqSj6ztGS6iuqdwh1oRXI';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

interface ChatMessage {
  role: string;
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { characterId, message, history = [] } = body;

    if (!characterId || !message) {
      return NextResponse.json({ error: 'characterId e message são obrigatórios' }, { status: 400 });
    }

    // Buscar personagem
    const { rows: [character] } = await sql`
      SELECT * FROM "characters" WHERE "id" = ${characterId}
    `;

    if (!character) {
      return NextResponse.json({ error: 'Personagem não encontrado' }, { status: 404 });
    }

    // Salvar mensagem do usuário
    await sql`
      INSERT INTO "messages" ("characterId", "role", "content", "createdAt")
      VALUES (${characterId}, 'user', ${message}, NOW())
    `;

    // Montar contexto para Gemini
    const systemPrompt = `${character.personality}

Regras importantes:
- Sempre responda em português brasileiro
- Mantenha-se no personagem O TEMPO TODO
- Nunca quebre o personagem ou diga que é uma IA
- Seja natural e conversacional
- Use emoji quando for apropriado ao personagem`;

    // Montar histórico de mensagens no formato do Gemini
    const contents: any[] = [];

    // Adicionar system instruction via primeira mensagem do model
    contents.push({
      role: 'user',
      parts: [{ text: `[Instrução do sistema: ${systemPrompt}]\n\n${character.greeting}` }]
    });
    contents.push({
      role: 'model',
      parts: [{ text: character.greeting }]
    });

    // Adicionar histórico anterior
    for (const msg of history as ChatMessage[]) {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    }

    // Adicionar mensagem atual
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Chamar Gemini API
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Gemini API error:', err);
      return NextResponse.json({ error: 'Erro na API de IA' }, { status: 500 });
    }

    const data = await response.json();
    const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Desculpe, não consegui processar sua mensagem.';

    // Salvar resposta da IA
    await sql`
      INSERT INTO "messages" ("characterId", "role", "content", "createdAt")
      VALUES (${characterId}, 'assistant', ${aiMessage}, NOW())
    `;

    // Incrementar contador de chats
    await sql`
      UPDATE "characters" SET "chats" = "chats" + 1, "updatedAt" = NOW() WHERE "id" = ${characterId}
    `;

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Erro no chat' }, { status: 500 });
  }
}
