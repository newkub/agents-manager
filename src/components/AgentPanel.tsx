import { createSignal, For, Show } from 'solid-js';
import { useAgentStatus } from '../composables/useAgentStatus';

interface Agent {
  name: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'not_configured';
}

const agents: Agent[] = [
  { name: 'Claude Code', icon: 'lucide-bot', status: 'connected' },
  { name: 'GitHub Copilot', icon: 'lucide-github', status: 'connected' },
  { name: 'OpenCode', icon: 'lucide-code', status: 'disconnected' },
  { name: 'Codex', icon: 'lucide-zap', status: 'not_configured' },
];

export default function AgentPanel() {
  const [selectedAgent, setSelectedAgent] = createSignal<string | null>(null);
  const { agents: agentStatuses } = useAgentStatus();

  return (
    <aside class="w-80 bg-bg-secondary border-l border-border flex flex-col">
      <div class="h-10 bg-bg-tertiary border-b border-border flex items-center px-4">
        <span class="text-sm font-medium text-text-primary">Agents</span>
      </div>

      <div class="flex-1 overflow-y-auto p-4">
        <div class="mb-4">
          <h3 class="text-xs font-semibold text-text-secondary mb-2 uppercase">Real-time Status</h3>
          <div class="space-y-2">
            <For each={agentStatuses()}>
              {(agent) => (
                <div class="p-2 bg-bg-tertiary rounded-lg flex items-center gap-2">
                  <div
                    classList={{
                      'bg-success': agent.status === 'completed',
                      'bg-warning': agent.status === 'running',
                      'bg-error': agent.status === 'error',
                      'bg-text-secondary': agent.status === 'idle',
                    }}
                    class="w-2 h-2 rounded-full"
                  />
                  <div class="flex-1">
                    <p class="text-xs font-medium text-text-primary">{agent.name}</p>
                    <p class="text-xs text-text-secondary capitalize">{agent.status}</p>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>

        <div class="border-t border-border pt-4">
          <h3 class="text-xs font-semibold text-text-secondary mb-2 uppercase">Connected Agents</h3>
          <div class="space-y-2">
            <For each={agents}>
              {(agent) => (
                <button
                  type="button"
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedAgent(agent.name)}
                  classList={{
                    'bg-bg-tertiary border-primary': selectedAgent() === agent.name,
                    'border-border': selectedAgent() !== agent.name,
                  }}
                  class="p-3 rounded-lg border cursor-pointer hover:bg-bg-tertiary transition-colors"
                  onClick={() => setSelectedAgent(agent.name)}
                >
                  <div class="flex items-center gap-3">
                    <span class={`i-${agent.icon} text-lg text-text-primary`} />
                    <div class="flex-1">
                      <p class="text-sm font-medium text-text-primary">{agent.name}</p>
                      <p
                        classList={{
                          'text-success': agent.status === 'connected',
                          'text-warning': agent.status === 'disconnected',
                          'text-error': agent.status === 'not_configured',
                        }}
                        class="text-xs capitalize"
                      >
                        {agent.status.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                </button>
              )}
            </For>
          </div>
        </div>

        <Show when={selectedAgent()}>
          <div class="mt-6 p-4 bg-bg-tertiary rounded-lg">
            <h3 class="text-sm font-semibold text-text-primary mb-3">{selectedAgent()} Settings</h3>
            <div class="space-y-3">
              <div>
                <label for="api-key" class="block text-xs text-text-secondary mb-1">
                  API Key
                </label>
                <input
                  id="api-key"
                  type="password"
                  class="w-full px-3 py-2 bg-bg-primary border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label for="base-url" class="block text-xs text-text-secondary mb-1">
                  Base URL
                </label>
                <input
                  id="base-url"
                  type="text"
                  class="w-full px-3 py-2 bg-bg-primary border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary"
                  placeholder="https://api.example.com"
                />
              </div>
              <button
                type="button"
                class="w-full bg-primary text-bg-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-hover transition-colors"
              >
                Test Connection
              </button>
            </div>
          </div>
        </Show>
      </div>
    </aside>
  );
}
