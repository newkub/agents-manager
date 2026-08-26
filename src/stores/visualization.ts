import { createSignal, onMount } from 'solid-js';
import type { ItemType, VisualizationData } from '~/lib/types';
import { fetchData } from '~/utils/data';

export function createVisualizationState(initialType: ItemType) {
  const [data, setData] = createSignal<VisualizationData | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);
  const [selectedItem, setSelectedItem] = createSignal<number | null>(null);
  const [searchQuery, setSearchQuery] = createSignal('');

  onMount(async () => {
    try {
      const result = await fetchData(initialType);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  });

  return {
    data,
    loading,
    error,
    selectedItem,
    searchQuery,
    setData,
    setSelectedItem,
    setSearchQuery,
  };
}
