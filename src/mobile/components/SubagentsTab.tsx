import { createSignal, For, onMount, Show } from 'solid-js';
import type { VisualizationData } from '~/lib/types';
import { fetchData } from '~/utils/data';

export function SubagentsTab() {
  const [data, setData] = createSignal<VisualizationData | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal('');
  const [search, setSearch] = createSignal('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await fetchData('workflows');
      setData(result);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  onMount(load);

  const filtered = () => {
    const d = data();
    if (!d) return [];
    const q = search().toLowerCase();
    if (!q) return d.items;
    return d.items.filter(
      (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
    );
  };

  return (
    <div class="mobile-tab-content">
      <div class="mobile-header">
        <h2 class="mobile-title">Subagents</h2>
        <span class="mobile-meta">{data()?.total ?? 0}</span>
      </div>
      <input
        class="mobile-input"
        type="text"
        placeholder="Search subagents..."
        value={search()}
        onInput={(e) => setSearch(e.currentTarget.value)}
      />
      <Show when={error()}>
        <div class="mobile-banner error">{error()}</div>
      </Show>
      <Show when={loading()}>
        <div class="mobile-loading">Loading...</div>
      </Show>
      <ul class="mobile-list">
        <For each={filtered()}>
          {(item) => (
            <li class="mobile-list-item">
              <div class="mobile-item-title">{item.name}</div>
              <div class="mobile-meta line-clamp-2">{item.description}</div>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
