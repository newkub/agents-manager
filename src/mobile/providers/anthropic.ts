import type { Message, Session } from '../types';
import type { Provider, ProviderConfig } from './types';

const BASE = 'https://api.anthropic.com/v1';

function toApiMessages(messages: Message[]): { role: 'user' | 'assistant'; content: string }[] {
  return messages.map((m) => ({
    role: m.role === 'user' ? 'user' : 'assistant',
    content: m.content,
  }));
}

export function createAnthropicProvider(config: ProviderConfig): Provider {
  let sessions: Session[] = [];

  return {
    config,
    getName: () => config.name,
    listSessions: async () => sessions,
    createSession: async (prompt: string) => {
      const s: Session = {
        id: `claude-${Date.now()}`,
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
          content: 'This is a mock response. Add a Claude API key in Settings.',
        });
        return;
      }

      const res = await fetch(`${BASE}/messages`, {
        method: 'POST',
        headers: {
          'x-api-key': config.token,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: config.model ?? 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          messages: toApiMessages(session.messages),
        }),
      });
      if (!res.ok) throw new Error(`Claude API error: ${res.status}`);
      const data = (await res.json()) as {
        content: Array<{ type: string; text?: string }>;
        role: string;
      };
      const text = data.content.find((c) => c.type === 'text')?.text ?? '...';
      session.messages.push({ role: 'assistant', content: text });
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
