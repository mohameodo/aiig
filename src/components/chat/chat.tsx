'use client';

import { useChat } from '@ai-sdk/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';

export function Chat() {
  const { data: session, status } = useSession();
  const [model, setModel] = useState('openai');
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      model,
    },
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="mb-4">You must be logged in to use the chat.</p>
        <Button onClick={() => signIn('google')}>Login with Google</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex items-start gap-4 ${
                m.role === 'user' ? 'justify-end' : ''
              }`}
            >
              {m.role !== 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 text-sm ${
                  m.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p>{m.content}</p>
              </div>
              {m.role === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session?.user?.image ?? '/placeholder-user.jpg'} />
                  <AvatarFallback>{session?.user?.name?.[0] ?? 'U'}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t bg-background px-4 py-3">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Select onValueChange={setModel} defaultValue={model}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="gemini">Gemini</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}