import { createSignal, Show } from 'solid-js';

export default function AIRegistryHome() {
  const [activeTab, setActiveTab] = createSignal('models');

  return (
    <div class="p-6">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-text-primary mb-2">🤖 AI Registry</h1>
        <p class="text-text-secondary">Central hub for models, agents, prompts, and datasets</p>
      </div>

      {/* Tab Navigation */}
      <div class="flex gap-1 mb-6 border-b border-border">
        <button
          type="button"
          classList={{
            'border-b-2 border-primary text-primary': activeTab() === 'models',
            'text-text-secondary hover:text-text-primary': activeTab() !== 'models',
          }}
          class="px-4 py-2 text-sm font-medium transition-colors"
          onClick={() => setActiveTab('models')}
        >
          Models
        </button>
        <button
          type="button"
          classList={{
            'border-b-2 border-primary text-primary': activeTab() === 'agents',
            'text-text-secondary hover:text-text-primary': activeTab() !== 'agents',
          }}
          class="px-4 py-2 text-sm font-medium transition-colors"
          onClick={() => setActiveTab('agents')}
        >
          Agents
        </button>
        <button
          type="button"
          classList={{
            'border-b-2 border-primary text-primary': activeTab() === 'prompts',
            'text-text-secondary hover:text-text-primary': activeTab() !== 'prompts',
          }}
          class="px-4 py-2 text-sm font-medium transition-colors"
          onClick={() => setActiveTab('prompts')}
        >
          Prompts
        </button>
        <button
          type="button"
          classList={{
            'border-b-2 border-primary text-primary': activeTab() === 'datasets',
            'text-text-secondary hover:text-text-primary': activeTab() !== 'datasets',
          }}
          class="px-4 py-2 text-sm font-medium transition-colors"
          onClick={() => setActiveTab('datasets')}
        >
          Datasets
        </button>
        <button
          type="button"
          classList={{
            'border-b-2 border-primary text-primary': activeTab() === 'compare',
            'text-text-secondary hover:text-text-primary': activeTab() !== 'compare',
          }}
          class="px-4 py-2 text-sm font-medium transition-colors"
          onClick={() => setActiveTab('compare')}
        >
          Compare
        </button>
      </div>

      {/* Quick Stats */}
      <div class="grid grid-cols-4 gap-4 mb-6">
        <div class="bg-bg-secondary border border-border rounded-lg p-4">
          <div class="text-2xl font-bold text-text-primary">24</div>
          <div class="text-sm text-text-secondary">Total Models</div>
        </div>
        <div class="bg-bg-secondary border border-border rounded-lg p-4">
          <div class="text-2xl font-bold text-text-primary">12</div>
          <div class="text-sm text-text-secondary">Active Agents</div>
        </div>
        <div class="bg-bg-secondary border border-border rounded-lg p-4">
          <div class="text-2xl font-bold text-text-primary">8</div>
          <div class="text-sm text-text-secondary">Deployments</div>
        </div>
        <div class="bg-bg-secondary border border-border rounded-lg p-4">
          <div class="text-2xl font-bold text-text-primary">156GB</div>
          <div class="text-sm text-text-secondary">Storage Used</div>
        </div>
      </div>

      {/* Tab Content */}
      <Show when={activeTab() === 'models'}>
        <div class="bg-bg-secondary border border-border rounded-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-text-primary">Recent Models</h2>
            <button
              type="button"
              class="px-3 py-1.5 bg-primary text-bg-primary rounded-md text-sm font-medium"
            >
              + Add Model
            </button>
          </div>

          <div class="space-y-3">
            <div class="flex items-center justify-between p-4 bg-bg-primary border border-border rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <span class="text-lg">🧠</span>
                </div>
                <div>
                  <p class="font-medium text-text-primary">Llama-3.1-8B-FineTuned</p>
                  <p class="text-xs text-text-secondary">v2.3 • 8.2GB • Updated 2h ago</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-1 bg-success/20 text-success text-xs rounded">Ready</span>
                <button
                  type="button"
                  class="px-3 py-1.5 bg-bg-tertiary rounded-md text-sm text-text-secondary hover:text-text-primary"
                >
                  View
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-bg-primary border border-border rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <span class="text-lg">🖼️</span>
                </div>
                <div>
                  <p class="font-medium text-text-primary">ResNet-50-ImageNet</p>
                  <p class="text-xs text-text-secondary">v1.0 • 98MB • Updated 1d ago</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-1 bg-success/20 text-success text-xs rounded">Ready</span>
                <button
                  type="button"
                  class="px-3 py-1.5 bg-bg-tertiary rounded-md text-sm text-text-secondary hover:text-text-primary"
                >
                  View
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-bg-primary border border-border rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <span class="text-lg">🎵</span>
                </div>
                <div>
                  <p class="font-medium text-text-primary">Whisper-Small-Thai</p>
                  <p class="text-xs text-text-secondary">v1.2 • 244MB • Training 45%</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-1 bg-warning/20 text-warning text-xs rounded">Training</span>
                <button
                  type="button"
                  class="px-3 py-1.5 bg-bg-tertiary rounded-md text-sm text-text-secondary hover:text-text-primary"
                >
                  Monitor
                </button>
              </div>
            </div>
          </div>
        </div>
      </Show>

      <Show when={activeTab() === 'agents'}>
        <div class="bg-bg-secondary border border-border rounded-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-text-primary">Agents</h2>
            <button
              type="button"
              class="px-3 py-1.5 bg-primary text-bg-primary rounded-md text-sm font-medium"
            >
              + Add Agent
            </button>
          </div>

          <div class="text-center py-12 text-text-secondary">
            <div class="text-4xl mb-4">🤖</div>
            <p class="text-sm">No agents yet. Create your first agent to get started.</p>
          </div>
        </div>
      </Show>

      <Show when={activeTab() === 'prompts'}>
        <div class="bg-bg-secondary border border-border rounded-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-text-primary">Prompt Templates</h2>
            <button
              type="button"
              class="px-3 py-1.5 bg-primary text-bg-primary rounded-md text-sm font-medium"
            >
              + Add Prompt
            </button>
          </div>

          <div class="text-center py-12 text-text-secondary">
            <div class="text-4xl mb-4">📝</div>
            <p class="text-sm">No prompt templates yet. Create your first template.</p>
          </div>
        </div>
      </Show>

      <Show when={activeTab() === 'datasets'}>
        <div class="bg-bg-secondary border border-border rounded-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-text-primary">Datasets</h2>
            <button
              type="button"
              class="px-3 py-1.5 bg-primary text-bg-primary rounded-md text-sm font-medium"
            >
              + Add Dataset
            </button>
          </div>

          <div class="text-center py-12 text-text-secondary">
            <div class="text-4xl mb-4">📊</div>
            <p class="text-sm">No datasets yet. Upload your first dataset.</p>
          </div>
        </div>
      </Show>

      <Show when={activeTab() === 'compare'}>
        <div class="bg-bg-secondary border border-border rounded-lg p-6">
          <h2 class="text-lg font-semibold text-text-primary mb-4">Compare Models</h2>

          <div class="text-center py-12 text-text-secondary">
            <div class="text-4xl mb-4">⚖️</div>
            <p class="text-sm">Select 2 or more models to compare their performance.</p>
          </div>
        </div>
      </Show>
    </div>
  );
}
