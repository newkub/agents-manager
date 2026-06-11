import { For, Show } from 'solid-js';

interface Tab {
  id: string;
  name: string;
  path: string;
  modified?: boolean;
}

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string | null;
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
}

export default function TabBar(props: TabBarProps) {
  return (
    <div class="h-10 bg-bg-tertiary border-b border-border flex items-center overflow-x-auto">
      <For each={props.tabs}>
        {(tab) => (
          <div
            classList={{
              'bg-bg-primary border-primary': props.activeTabId === tab.id,
              'bg-bg-secondary border-border': props.activeTabId !== tab.id,
            }}
            class="flex items-center gap-2 px-3 py-1.5 border-r border-border cursor-pointer hover:bg-bg-primary transition-colors group min-w-max"
            onClick={() => props.onTabClick(tab.id)}
          >
            <Show when={tab.modified}>
              <span class="w-2 h-2 rounded-full bg-warning" />
            </Show>
            <span class="text-sm text-text-primary truncate max-w-32">{tab.name}</span>
            <button
              type="button"
              class="opacity-0 group-hover:opacity-100 text-text-secondary hover:text-error transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                props.onTabClose(tab.id);
              }}
            >
              <span class="i-lucide-x text-xs" />
            </button>
          </div>
        )}
      </For>
    </div>
  );
}
