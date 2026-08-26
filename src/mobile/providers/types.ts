import type { Session } from '../types';

export interface ProviderConfig {
  id: string;
  name: string;
  type: 'devin' | 'anthropic' | 'openai' | 'custom';
  token: string;
  enabled: boolean;
  baseUrl?: string;
  orgId?: string;
  model?: string;
}

export interface Provider {
  readonly config: ProviderConfig;
  getName: () => string;
  listSessions: () => Promise<Session[]>;
  createSession: (prompt: string) => Promise<Session>;
  sendMessage: (sessionId: string, content: string) => Promise<void>;
  archiveSession: (sessionId: string) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
}
