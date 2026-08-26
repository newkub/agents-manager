import { createMemo, createRoot, createSignal } from 'solid-js';
import { createProvider } from '../providers';
import type { ProviderConfig } from '../providers/types';

const STORAGE_KEY = 'agents-manager.providers';

const DEFAULT_PROVIDERS: ProviderConfig[] = [
  {
    id: 'devin',
    name: 'Devin',
    type: 'devin',
    token: '',
    orgId: '',
    enabled: true,
  },
  {
    id: 'anthropic',
    name: 'Claude Code',
    type: 'anthropic',
    token: '',
    model: 'claude-3-5-sonnet-20241022',
    enabled: false,
  },
  {
    id: 'openai',
    name: 'Codex',
    type: 'openai',
    token: '',
    model: 'gpt-4o',
    enabled: false,
  },
  {
    id: 'custom',
    name: 'Custom',
    type: 'custom',
    token: '',
    baseUrl: '',
    model: '',
    enabled: false,
  },
];

function loadConfigs(): ProviderConfig[] {
  if (typeof window === 'undefined') return DEFAULT_PROVIDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ProviderConfig[];
      return parsed.length ? parsed : DEFAULT_PROVIDERS;
    }
  } catch {
    // ignore
  }
  return DEFAULT_PROVIDERS;
}

function saveConfigs(configs: ProviderConfig[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
  } catch {
    // ignore
  }
}

function createProviderStore() {
  const [configs, setConfigsRaw] = createSignal<ProviderConfig[]>(loadConfigs());
  const [activeId, setActiveId] = createSignal<string>('devin');

  const setConfigs = (next: ProviderConfig[] | ((prev: ProviderConfig[]) => ProviderConfig[])) => {
    const updated = typeof next === 'function' ? next(configs()) : next;
    setConfigsRaw(updated);
    saveConfigs(updated);
  };

  const activeConfig = createMemo(() => configs().find((c) => c.id === activeId()));
  const activeProvider = createMemo(() => {
    const c = activeConfig();
    if (!c) return null;
    return createProvider(c);
  });
  const enabledProviders = createMemo(() => configs().filter((c) => c.enabled));

  const hasAnyEnabled = createMemo(() => enabledProviders().length > 0);

  const setActive = (id: string) => {
    setActiveId(id);
  };

  const addProvider = (config: ProviderConfig) => {
    setConfigs((prev) => [...prev, config]);
    setActive(config.id);
  };

  const updateProvider = (id: string, patch: Partial<ProviderConfig>) => {
    setConfigs((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const removeProvider = (id: string) => {
    setConfigs((prev) => {
      const next = prev.filter((c) => c.id !== id);
      if (activeId() === id) {
        setActive(next[0]?.id ?? '');
      }
      return next;
    });
  };

  return {
    configs,
    activeId,
    activeConfig,
    activeProvider,
    enabledProviders,
    hasAnyEnabled,
    setActive,
    setConfigs,
    addProvider,
    updateProvider,
    removeProvider,
  };
}

export const providerStore = createRoot(createProviderStore);
