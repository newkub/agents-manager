export type MobileTab =
  | 'home'
  | 'session'
  | 'skills'
  | 'subagents'
  | 'customize'
  | 'notifications'
  | 'settings';

export interface Message {
  role: 'user' | 'assistant' | 'devin';
  content: string;
}

export interface Session {
  id: string;
  title: string;
  prompt: string;
  status: 'idle' | 'running' | 'error' | 'archived';
  updatedAt: string;
  messages: Message[];
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
  time: string;
}

export interface CustomizeItem {
  id: string;
  name: string;
  description: string;
  enabled?: boolean;
  source?: string;
}

export type CustomizeCategory = 'mcp' | 'skills' | 'subagents' | 'hooks';
