import { createSignal, For, Show } from 'solid-js';
import { getCategoryItems, updateCategoryItem } from '../data/config';
import type { CustomizeCategory, CustomizeItem } from '../types';

type View = 'home' | 'list' | 'detail';

const CATEGORIES: { id: CustomizeCategory; icon: string; label: string }[] = [
  { id: 'mcp', icon: 'i-lucide-server', label: 'MCP Servers' },
  { id: 'skills', icon: 'i-lucide-file-code', label: 'Skills' },
  { id: 'subagents', icon: 'i-lucide-bot', label: 'Subagents' },
  { id: 'hooks', icon: 'i-lucide-anchor', label: 'Hooks' },
];

export function CustomizeTab() {
  const [view, setView] = createSignal<View>('home');
  const [category, setCategory] = createSignal<CustomizeCategory | null>(null);
  const [selected, setSelected] = createSignal<CustomizeItem | null>(null);

  const items = () => {
    const c = category();
    return c ? getCategoryItems(c) : [];
  };

  const openCategory = (c: CustomizeCategory) => {
    setCategory(c);
    setView('list');
  };

  const openItem = (item: CustomizeItem) => {
    setSelected(item);
    setView('detail');
  };

  const toggleSelected = () => {
    const item = selected();
    if (!item) return;
    const c = category();
    if (!c) return;
    updateCategoryItem(c, item.id, !item.enabled);
    setSelected({ ...item, enabled: !item.enabled });
  };

  return (
    <div class="mobile-tab-content">
      <Show when={view() === 'home'}>
        <h2 class="mobile-title">Customize</h2>
        <p class="mobile-hint">Configure your agent setup</p>
        <div class="mobile-grid">
          <For each={CATEGORIES}>
            {(c) => (
              <button type="button" class="mobile-card" onClick={() => openCategory(c.id)}>
                <span class={`mobile-tab-icon ${c.icon}`} />
                <span class="mobile-card-label">{c.label}</span>
              </button>
            )}
          </For>
        </div>
      </Show>

      <Show when={view() === 'list'}>
        <div class="mobile-header">
          <button type="button" class="mobile-back-btn" onClick={() => setView('home')}>
            &lt; Back
          </button>
          <h2 class="mobile-title">{category()}</h2>
        </div>
        <ul class="mobile-list">
          <For each={items()}>
            {(item) => (
              <li
                class="mobile-list-item"
                onClick={() => openItem(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openItem(item);
                  }
                }}
              >
                <div class="mobile-row">
                  <span class="mobile-item-title">{item.name}</span>
                  <Show when={item.enabled}>
                    <span class="mobile-badge on">on</span>
                  </Show>
                </div>
                <span class="mobile-meta">{item.description}</span>
              </li>
            )}
          </For>
        </ul>
      </Show>

      <Show when={view() === 'detail'}>
        <div class="mobile-header">
          <button type="button" class="mobile-back-btn" onClick={() => setView('list')}>
            &lt; Back
          </button>
          <h2 class="mobile-title">{selected()?.name}</h2>
        </div>
        <Show when={selected()} fallback={<div class="mobile-empty">No item selected</div>}>
          {(item) => (
            <div class="mobile-detail">
              <p>
                <strong>ID:</strong> {item().id}
              </p>
              <p>
                <strong>Description:</strong> {item().description}
              </p>
              <Show when={item().source}>
                <p>
                  <strong>Source:</strong> {item().source}
                </p>
              </Show>
              <p>
                <strong>Status:</strong> {item().enabled ? 'Enabled' : 'Disabled'}
              </p>
              <button type="button" class="mobile-btn" onClick={toggleSelected}>
                {item().enabled ? 'Disable' : 'Enable'}
              </button>
            </div>
          )}
        </Show>
      </Show>
    </div>
  );
}
