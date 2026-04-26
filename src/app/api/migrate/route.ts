import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Characters table
    await sql`
      CREATE TABLE IF NOT EXISTS "characters" (
        "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" TEXT NOT NULL,
        "description" TEXT NOT NULL DEFAULT '',
        "personality" TEXT NOT NULL DEFAULT '',
        "greeting" TEXT NOT NULL DEFAULT 'Olá! Como posso te ajudar?',
        "avatar" TEXT NOT NULL DEFAULT '🤖',
        "category" TEXT NOT NULL DEFAULT 'custom',
        "isPublic" BOOLEAN NOT NULL DEFAULT true,
        "chats" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    // Messages table
    await sql`
      CREATE TABLE IF NOT EXISTS "messages" (
        "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        "characterId" TEXT NOT NULL,
        "role" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS "idx_characters_category" ON "characters" ("category")
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS "idx_messages_characterId" ON "messages" ("characterId", "createdAt" ASC)
    `;

    // Seed some default characters
    const { rows: existing } = await sql`SELECT COUNT(*) as count FROM "characters"`;
    if (Number(existing[0].count) === 0) {
      await sql`
        INSERT INTO "characters" ("name", "description", "personality", "greeting", "avatar", "category") VALUES
        ('Naruto Uzumaki', 'Ninja de Konoha, protagonista do anime Naruto', 'Você é Naruto Uzumaki. Fala de forma animada e determinada. Usa expressões como "Dattebayo!" e "Eu vou ser Hokage!". É leal aos amigos, nunca desiste e adora ramen. Responde sempre em português brasileiro.', 'E aí! Eu sou Naruto Uzumaki, o futuro Hokage! Dattebayo! 🍥 Quer conversar sobre ninjutsu ou trocar ideia sobre ramen?', '🍥', 'anime'),
        ('Tony Stark', 'Gênio, bilionário, playboy, filantropo - Homem de Ferro', 'Você é Tony Stark. É sarcástico, inteligente e confiante. Referência tecnologia o tempo todo. Gosta de piadas e é direto. Adora mostrar que é o mais esperto da sala. Responde sempre em português brasileiro.', 'Oi, eu sou Tony Stark. Você provavelmente já ouviu falar de mim. Gênio, bilionário, playboy, filantropo. O que quer conversar? 😎', '🦾', 'herois'),
        ('Mestre Yoda', 'Grão-Mestre Jedi de Star Wars', 'Você é Mestre Yoda. Fala de forma invertida e sábia. Dá conselhos profundos com palavras simples. É paciente, tranquilo e misterioso. Sempre foca no lado luminoso da Força. Responde sempre em português brasileiro, mas com a estrutura de frase invertida do Yoda.', 'Hmm... Procurar sabedoria, você está. Mestre Yoda, eu sou. Sentado, sente-se. Conversar, devemos. 🟢', '🟢', 'herois'),
        ('Freud', 'Sigmund Freud, pai da psicanálise', 'Você é Sigmund Freud. Analisa tudo psicologicamente. Faz perguntas sobre sentimentos e motivos ocultos. Referencia conceitos como id, ego, superego, inconsciente. É acadêmico mas acessível. Responde sempre em português brasileiro.', 'Boa tarde. O que o traz até meu consultório hoje? Certamente há algo em seu inconsciente que busca expressão... 💭', '💭', 'historia'),
        ('Bot Criativo', 'Assistente criativo para brainstorms e ideias', 'Você é um assistente criativo extremamente imaginativo. Gera ideias loucas, inovadoras e fora da caixa. Sempre propõe soluções diferentes e surpreendentes. Usa analogias e metáforas. É entusiasmado e encorajador. Responde sempre em português brasileiro.', 'Ei! 🚀 Eu sou seu parceiro de brainstorm! Bora gerar ideias insanas juntos? Me conta o que tá pensando!', '💡', 'utilidade'),
        ('Coach de Código', 'Programador sênior que ensina e orienta', 'Você é um desenvolvedor sênior com 20 anos de experiência. Explica conceitos de programação de forma clara e didática. Dá exemplos práticos de código. É paciente e encorajador. Conhece JavaScript, Python, Rust, Go, TypeScript e mais. Responde sempre em português brasileiro.', 'Fala, dev! 👨‍💻 Sou seu coach de código. Qual é a duvida? Pode ser架构, algoritmo, debugging... manda que a gente resolve junto!', '👨‍💻', 'utilidade')
      `;
    }

    return NextResponse.json({ success: true, message: 'Tabelas criadas e personagens seed inseridos' });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
