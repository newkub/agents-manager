import { createMemo, For, Show } from 'solid-js';
import type { VisualizationData } from '~/lib/types';
import { TYPE_ICONS, TYPE_LABELS } from '~/utils/data';

interface SidebarProps {
  data: VisualizationData | null;
  searchQuery: string;
  onSearch: (q: string) => void;
  onSelect: (idx: number) => void;
  selected: number | null;
}

export function Sidebar(props: SidebarProps) {
  const filtered = createMemo(() => {
    if (!props.data) return [];
    const q = props.searchQuery.toLowerCase();
    if (!q) return props.data.items.map((item, i) => ({ item, idx: i }));
    return props.data.items
      .map((item, i) => ({ item, idx: i }))
      .filter(({ item }) => {
        const name = item.name?.toLowerCase() ?? '';
        const desc = item.description?.toLowerCase() ?? '';
        return name.includes(q) || desc.includes(q);
      });
  });

  return (
    <aside class="w-80 h-full bg-bg-secondary border-r border-border flex flex-col">
      <div class="p-4 border-b border-border">
        <div class="flex items-center gap-2 mb-3">
          <span class={TYPE_ICONS[props.data?.type ?? 'skills']} />
          <h2 class="text-lg font-semibold text-text-primary">
            {props.data ? TYPE_LABELS[props.data.type] : 'Loading...'}
          </h2>
          <Show when={props.data}>
            <span class="ml-auto text-sm text-text-secondary bg-bg-tertiary px-2 py-0.5 rounded">
              {props.data?.total}
            </span>
          </Show>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={props.searchQuery}
          onInput={(e) => props.onSearch(e.currentTarget.value)}
          class="w-full px-3 py-2 bg-bg-tertiary border border-border rounded text-text-primary placeholder-text-secondary text-sm focus:outline-none focus:border-primary"
        />
      </div>
      <div class="flex-1 overflow-y-auto">
        <For each={filtered()}>
          {({ item, idx }) => (
            <button
              type="button"
              class={`w-full text-left px-4 py-3 border-b border-border hover:bg-bg-tertiary transition-colors ${
                props.selected === idx ? 'bg-bg-tertiary border-l-2 border-l-primary' : ''
              }`}
              onClick={() => props.onSelect(idx)}
            >
              <div class="font-medium text-sm text-text-primary">{item.name}</div>
              <div class="text-xs text-text-secondary mt-1 line-clamp-2">{item.description}</div>
            </button>
          )}
        </For>
        <Show when={filtered().length === 0}>
          <div class="p-4 text-center text-text-secondary text-sm">No items found</div>
        </Show>
      </div>
    </aside>
  );
}
