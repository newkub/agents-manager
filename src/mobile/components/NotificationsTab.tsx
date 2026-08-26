import { createSignal, For, Show } from 'solid-js';
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

export function NotificationsTab() {
  const [notifications, setNotifications] = createSignal<Notification[]>(INITIAL);

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unread = () => notifications().filter((n) => !n.read).length;

  return (
    <div class="mobile-tab-content">
      <div class="mobile-header">
        <h2 class="mobile-title">Notifications</h2>
        <Show when={unread() > 0}>
          <span class="mobile-badge on">{unread()}</span>
        </Show>
      </div>
      <button type="button" class="mobile-btn mb-3" onClick={clearAll}>
        Clear all
      </button>
      <ul class="mobile-list">
        <For each={notifications()}>
          {(n) => (
            <li
              class={`mobile-list-item ${n.read ? 'opacity-60' : ''}`}
              onClick={() => markRead(n.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  markRead(n.id);
                }
              }}
            >
              <div class="mobile-row justify-between">
                <span class="mobile-item-title">{n.title}</span>
                <span class="mobile-meta">{n.time}</span>
              </div>
              <span class="mobile-meta">{n.description}</span>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
