import type { Item, ItemType } from '@agents-manager/shared';
import { createMemo, createSignal, Show } from 'solid-js';
import { ContentViewer } from './components/ContentViewer';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { createVisualizationState } from './stores/visualization';

export function App() {
  const [currentType, setCurrentType] = createSignal<ItemType>(
    (typeof window !== 'undefined' && window.__DATA__?.type) || 'skills'
  );

  const state = createVisualizationState(currentType());

  const selectedItemData = createMemo<Item | null>(() => {
    const d = state.data();
    const idx = state.selectedItem();
    if (!d || idx === null || idx >= d.items.length) return null;
    return d.items[idx];
  });

  const handleTypeChange = (type: ItemType) => {
    setCurrentType(type);
    state.setSelectedItem(null);
  };

  return (
    <div class="h-screen flex flex-col bg-bg-primary text-text-primary">
      <Header data={state.data()} currentType={currentType()} onTypeChange={handleTypeChange} />
      <div class="flex flex-1 overflow-hidden">
        <Sidebar
          data={state.data()}
          searchQuery={state.searchQuery()}
          onSearch={state.setSearchQuery}
          onSelect={state.setSelectedItem}
          selected={state.selectedItem()}
        />
        <Show
          when={selectedItemData()}
          fallback={
            <div class="flex-1 flex items-center justify-center text-text-secondary">
              <Show when={!state.loading()} fallback={<div>Loading...</div>}>
                <div class="text-center">
                  <span class="i-lucide-mouse-pointer-click text-4xl block mb-2" />
                  <p>Select an item from the sidebar</p>
                </div>
              </Show>
            </div>
          }
        >
          {(item) => {
            const it = item();
            return (
              <ContentViewer
                content={it.content}
                name={it.name}
                description={it.description}
                filePath={it.filePath}
                tags={'tags' in it ? it.tags : undefined}
                tools={'tools' in it ? it.tools : undefined}
              />
            );
          }}
        </Show>
      </div>
    </div>
  );
}
