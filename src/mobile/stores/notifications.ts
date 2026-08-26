import { createRoot, createSignal } from 'solid-js';
import type { Notification } from '../types';

const INITIAL: Notification[] = [
  {
    id: '1',
    title: 'Session finished',
    description: 'Create mobile app completed successfully',
    read: false,
    time: '2m ago',
  },
  {
    id: '2',
    title: 'New skill available',
    description: 'report-uxui-all-routes was added',
    read: false,
    time: '1h ago',
  },
  {
    id: '3',
    title: 'MCP connection warning',
    description: 'Custom MCP returned 401',
    read: true,
    time: '3h ago',
  },
];

function createNotificationsStore() {
  const [items, setItems] = createSignal<Notification[]>(INITIAL);

  const unreadCount = () => items().filter((n) => !n.read).length;

  const markRead = (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAll = () => {
    setItems([]);
  };

  return { items, unreadCount, markRead, clearAll };
}

export const notificationsStore = createRoot(createNotificationsStore);

export class Notifications {
  items = notificationsStore.items;
  unreadCount = notificationsStore.unreadCount;
}
