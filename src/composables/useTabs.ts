import { createSignal } from 'solid-js';

interface Tab {
  id: string;
  name: string;
  path: string;
  content: string;
  modified?: boolean;
}

export function useTabs() {
  const [tabs, setTabs] = createSignal<Tab[]>([]);
  const [activeTabId, setActiveTabId] = createSignal<string | null>(null);

  const addTab = (tab: Omit<Tab, 'id'>) => {
    const id = `${tab.path}-${Date.now()}`;
    const newTab: Tab = { ...tab, id };
    setTabs([...tabs(), newTab]);
    setActiveTabId(id);
    return id;
  };

  const removeTab = (id: string) => {
    const newTabs = tabs().filter((tab) => tab.id !== id);
    setTabs(newTabs);

    if (activeTabId() === id) {
      setActiveTabId(newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null);
    }
  };

  const setActiveTab = (id: string) => {
    setActiveTabId(id);
  };

  const updateTabContent = (id: string, content: string) => {
    setTabs(tabs().map((tab) => (tab.id === id ? { ...tab, content, modified: true } : tab)));
  };

  const getActiveTab = () => {
    return tabs().find((tab) => tab.id === activeTabId());
  };

  const clearTabs = () => {
    setTabs([]);
    setActiveTabId(null);
  };

  return {
    tabs,
    activeTabId,
    addTab,
    removeTab,
    setActiveTab,
    updateTabContent,
    getActiveTab,
    clearTabs,
  };
}
