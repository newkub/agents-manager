import type { Message, Session } from '../types';
import type { Provider, ProviderConfig } from './types';

const BASE = 'https://api.devin.ai/v3';

const sampleSessions: Session[] = [
  {
    id: 'demo-1',
    title: 'Fix login bug',
    prompt: 'Fix the login bug in the auth module',
    status: 'idle',
    updatedAt: '2m ago',
    messages: [],
  },
  {
    id: 'demo-2',
    title: 'Create mobile app',
    prompt: 'Create an iOS/Android app with Capacitor',
    status: 'running',
    updatedAt: 'now',
    messages: [
      { role: 'user', content: 'Create a mobile app with Devin tabs' },
      { role: 'devin', content: 'OK, I will start the project.' },
    ],
  },
  {
    id: 'demo-3',
    title: 'Refactor auth',
    prompt: 'Refactor the auth module',
    status: 'error',
    updatedAt: '1h ago',
    messages: [],
  },
];

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

function mapDevinSession(s: Session): Session {
  return { ...s, messages: s.messages ?? [], updatedAt: s.updatedAt ?? 'just now' };
}

export function createDevinProvider(config: ProviderConfig): Provider {
  let sessions = [...sampleSessions];

  return {
    config,
    getName: () => config.name,
    listSessions: async () => {
      if (!config.token) return sessions;
      const res = await fetch(`${BASE}/organizations/${config.orgId}/sessions`, {
        headers: authHeaders(config.token),
      });
      if (!res.ok) throw new Error(`listSessions failed: ${res.status}`);
      const data = (await res.json()) as { sessions?: Session[] };
      sessions = (data.sessions ?? []).map(mapDevinSession);
      return sessions;
    },
    createSession: async (prompt: string) => {
      if (!config.token) {
        const s: Session = {
          id: `demo-${Date.now()}`,
          title: prompt.slice(0, 30),
          prompt,
          status: 'idle',
          updatedAt: 'just now',
          messages: [],
        };
        sessions = [s, ...sessions];
        return s;
      }
      const res = await fetch(`${BASE}/organizations/${config.orgId}/sessions`, {
        method: 'POST',
        headers: authHeaders(config.token),
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error(`createSession failed: ${res.status}`);
      const data = (await res.json()) as Session;
      const s = mapDevinSession(data);
      sessions = [s, ...sessions];
      return s;
    },
    sendMessage: async (sessionId: string, content: string) => {
      const userMsg: Message = { role: 'user', content };
      const devinMsg: Message = { role: 'devin', content: 'Received. I will update you soon.' };
      if (!config.token) {
        sessions = sessions.map((s) =>
          s.id === sessionId ? { ...s, messages: [...s.messages, userMsg, devinMsg] } : s
        );
        return;
      }
      const res = await fetch(
        `${BASE}/organizations/${config.orgId}/sessions/${sessionId}/messages`,
        {
          method: 'POST',
          headers: authHeaders(config.token),
          body: JSON.stringify({ message: content }),
        }
      );
      if (!res.ok) throw new Error(`sendMessage failed: ${res.status}`);
    },
    archiveSession: async (sessionId: string) => {
      if (!config.token) {
        sessions = sessions.map((s) =>
          s.id === sessionId ? { ...s, status: 'archived' as const } : s
        );
        return;
      }
      const res = await fetch(
        `${BASE}/organizations/${config.orgId}/sessions/${sessionId}/archive`,
        {
          method: 'POST',
          headers: authHeaders(config.token),
        }
      );
      if (!res.ok) throw new Error(`archiveSession failed: ${res.status}`);
    },
    deleteSession: async (sessionId: string) => {
      if (!config.token) {
        sessions = sessions.filter((s) => s.id !== sessionId);
        return;
      }
      const res = await fetch(`${BASE}/organizations/${config.orgId}/sessions/${sessionId}`, {
        method: 'DELETE',
        headers: authHeaders(config.token),
      });
      if (!res.ok) throw new Error(`deleteSession failed: ${res.status}`);
    },
  };
}
