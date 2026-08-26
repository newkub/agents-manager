import type { Message, Session } from '../types';
import type { Provider, ProviderConfig } from './types';

const BASE = 'https://api.openai.com/v1';

function toApiMessages(
  messages: Message[]
): { role: 'user' | 'assistant' | 'system'; content: string }[] {
  return messages.map((m) => ({
    role: m.role === 'user' ? 'user' : 'assistant',
    content: m.content,
  }));
}

export function createOpenAIProvider(config: ProviderConfig): Provider {
  const baseUrl = config.baseUrl ?? BASE;
  let sessions: Session[] = [];

  return {
    config,
    getName: () => config.name,
    listSessions: async () => sessions,
    createSession: async (prompt: string) => {
      const s: Session = {
        id: `openai-${Date.now()}`,
        title: prompt.slice(0, 30),
        prompt,
        status: 'running',
        updatedAt: 'just now',
        messages: [{ role: 'user', content: prompt }],
      };
      sessions = [s, ...sessions];
      return s;
    },
    sendMessage: async (sessionId: string, content: string) => {
      const session = sessions.find((s) => s.id === sessionId);
      if (!session) throw new Error('Session not found');

      session.messages.push({ role: 'user', content });
      if (!config.token) {
        session.messages.push({
          role: 'assistant',
          content: 'This is a mock response. Add an OpenAI API key in Settings.',
        });
        return;
      }

      const res = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: config.model ?? 'gpt-4o',
          messages: toApiMessages(session.messages),
        }),
      });
      if (!res.ok) throw new Error(`OpenAI API error: ${res.status}`);
      const data = (await res.json()) as {
        choices: Array<{ message: { role: string; content: string } }>;
      };
      const reply = data.choices?.[0]?.message?.content ?? '...';
      session.messages.push({ role: 'assistant', content: reply });
    },
    archiveSession: async (sessionId: string) => {
      sessions = sessions.map((s) =>
        s.id === sessionId ? { ...s, status: 'archived' as const } : s
      );
    },
    deleteSession: async (sessionId: string) => {
      sessions = sessions.filter((s) => s.id !== sessionId);
    },
  };
}
