import { createEffect, createSignal, For, onMount, Show } from 'solid-js';
import type { VisualizationData } from '~/lib/types';
import { fetchData } from '~/utils/data';
import { providerStore } from '../stores/providers';
import type { Session } from '../types';

export function HomeTab() {
  const [sessions, setSessions] = createSignal<Session[]>([]);
  const [skills, setSkills] = createSignal<VisualizationData | null>(null);
  const [subagents, setSubagents] = createSignal<VisualizationData | null>(null);
  const [loading, setLoading] = createSignal(false);

  const provider = providerStore.activeProvider;
  const activeConfig = providerStore.activeConfig;

  const load = async () => {
    setLoading(true);
    try {
      const [s, sk, sub] = await Promise.all([
        provider()
          ?.listSessions()
          .catch(() => [] as Session[]) ?? [],
        fetchData('skills').catch(() => null as VisualizationData | null),
        fetchData('workflows').catch(() => null as VisualizationData | null),
      ]);
      setSessions(s);
      setSkills(sk);
      setSubagents(sub);
    } finally {
      setLoading(false);
    }
  };

  onMount(load);
  createEffect(() => {
    provider();
    void load();
  });

  const recentSessions = () => sessions().slice(0, 3);
  const activeCount = () => sessions().filter((s) => s.status === 'running').length;

  return (
    <div class="mobile-tab-content">
      <h2 class="mobile-title">Welcome back</h2>

      <Show when={activeConfig()}>
        <div class="mobile-card">
          <div class="mobile-row justify-between">
            <span class="mobile-meta">Active provider</span>
            <span class="font-medium text-primary">{activeConfig()?.name}</span>
          </div>
          <Show when={!activeConfig()?.enabled}>
            <div class="mobile-banner info mt-2">Provider disabled. Enable in Settings.</div>
          </Show>
        </div>
      </Show>

      <div class="mobile-quick-grid">
        <QuickCard icon="i-lucide-zap" label={`${activeCount()} Active`} />
        <QuickCard icon="i-lucide-file-code" label={`${skills()?.total ?? 0} Skills`} />
        <QuickCard icon="i-lucide-bot" label={`${subagents()?.total ?? 0} Subagents`} />
        <QuickCard icon="i-lucide-bell" label="Notifications" />
      </div>

      <h3 class="mobile-section-title">Recent Sessions</h3>
      <Show when={!loading()} fallback={<div class="mobile-loading">Loading...</div>}>
        <ul class="mobile-list">
          <For each={recentSessions()}>
            {(s) => (
              <li class="mobile-list-item">
                <div class="mobile-row">
                  <span class={`mobile-status-dot status-${s.status}`} />
                  <span class="mobile-item-title">{s.title || s.prompt.slice(0, 30)}</span>
                </div>
                <span class="mobile-meta">
                  {s.status} · {s.updatedAt}
                </span>
              </li>
            )}
          </For>
        </ul>
      </Show>

      <h3 class="mobile-section-title">Quick Access</h3>
      <div class="mobile-quick-grid">
        <QuickCard icon="i-lucide-file-code" label="Skills" />
        <QuickCard icon="i-lucide-bot" label="Subagents" />
        <QuickCard icon="i-lucide-server" label="MCP Servers" />
        <QuickCard icon="i-lucide-sliders-horizontal" label="Customize" />
      </div>
    </div>
  );
}

function QuickCard(props: { icon: string; label: string }) {
  return (
    <div class="mobile-quick-card">
      <span class={`mobile-tab-icon ${props.icon}`} />
      <span class="mobile-quick-card-label">{props.label}</span>
    </div>
  );
}
