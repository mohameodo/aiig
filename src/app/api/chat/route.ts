import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  const selectedModel = model === 'gemini' ? google('models/gemini-1.5-flash-latest') : openai('gpt-3.5-turbo');

  const result = await streamText({
    model: selectedModel,
    messages,
  });

  return result.toAIStreamResponse();
}