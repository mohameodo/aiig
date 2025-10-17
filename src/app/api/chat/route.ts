import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { auth } from '@/app/api/auth/[...nextauth]/route';
import { Pool } from 'pg';

export const runtime = 'edge';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: Request) {
  const { messages, model } = await req.json();
  const session = await auth();

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const selectedModel = model === 'gemini' ? google('models/gemini-1.5-flash-latest') : openai('gpt-3.5-turbo');

  const result = await streamText({
    model: selectedModel,
    messages,
    onFinish: async ({ completion }) => {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        const { rows } = await client.query(
          'INSERT INTO chats (user_id, title) VALUES ($1, $2) RETURNING id',
          [session.user.id, messages[0].content.substring(0, 100)]
        );
        const chatId = rows[0].id;
        for (const message of messages) {
          await client.query(
            'INSERT INTO messages (chat_id, role, content) VALUES ($1, $2, $3)',
            [chatId, message.role, message.content]
          );
        }
        await client.query(
          'INSERT INTO messages (chat_id, role, content) VALUES ($1, $2, $3)',
          [chatId, 'assistant', completion]
        );
        await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
      } finally {
        client.release();
      }
    },
  });

  return result.toAIStreamResponse();
}