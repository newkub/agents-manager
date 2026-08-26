import { For, Show } from 'solid-js';
import type { ItemType, VisualizationData } from '~/lib/types';
import { TYPE_ICONS, TYPE_LABELS } from '~/utils/data';

interface HeaderProps {
  data: VisualizationData | null;
  currentType: ItemType;
  onTypeChange: (type: ItemType) => void;
}

const TYPES: ItemType[] = ['skills', 'workflows', 'mcp'];

export function Header(props: HeaderProps) {
  return (
    <header class="h-14 bg-bg-secondary border-b border-border flex items-center px-4 gap-4">
      <div class="flex items-center gap-2">
        <span class="i-lucide-bot text-xl text-primary" />
        <span class="font-bold text-text-primary">Agents Manager</span>
      </div>
      <nav class="flex items-center gap-1 ml-4">
        <For each={TYPES}>
          {(type) => (
            <button
              type="button"
              class={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded transition-colors ${
                props.currentType === type
                  ? 'bg-bg-tertiary text-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
              }`}
              onClick={() => props.onTypeChange(type)}
            >
              <span class={TYPE_ICONS[type]} />
              {TYPE_LABELS[type]}
              <Show when={props.data && props.data.type === type}>
                <span class="text-xs bg-primary/20 px-1.5 rounded">{props.data?.total}</span>
              </Show>
            </button>
          )}
        </For>
      </nav>
      <div class="ml-auto flex items-center gap-2">
        <a
          href="https://shiki.style"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs text-text-secondary hover:text-primary flex items-center gap-1"
        >
          <span class="i-lucide-palette" />
          Shiki
        </a>
      </div>
    </header>
  );
}
