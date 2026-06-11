import { createSignal } from 'solid-js';

export default function ModelDetail() {
  const [activeTab, setActiveTab] = createSignal('overview');

  return (
    <div class="p-6">
      <div class="mb-6">
        <div class="flex items-center gap-4 mb-2">
          <div class="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
            <span class="text-3xl">🧠</span>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-text-primary">Llama-3.1-8B-FineTuned</h1>
            <p class="text-text-secondary">v2.3 • Updated 2 hours ago</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div class="flex gap-1 mb-6 border-b border-border">
        <button
          type="button"
          classList={{
            'border-b-2 border-primary text-primary': activeTab() === 'overview',
            'text-text-secondary hover:text-text-primary': activeTab() !== 'overview',
          }}
          class="px-4 py-2 text-sm font-medium transition-colors"
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          type="button"
          classList={{
            'border-b-2 border-primary text-primary': activeTab() === 'versions',
            'text-text-secondary hover:text-text-primary': activeTab() !== 'versions',
          }}
          class="px-4 py-2 text-sm font-medium transition-colors"
          onClick={() => setActiveTab('versions')}
        >
          Versions
        </button>
        <button
          type="button"
          classList={{
            'border-b-2 border-primary text-primary': activeTab() === 'metrics',
            'text-text-secondary hover:text-text-primary': activeTab() !== 'metrics',
          }}
          class="px-4 py-2 text-sm font-medium transition-colors"
          onClick={() => setActiveTab('metrics')}
        >
          Metrics
        </button>
        <button
          type="button"
          classList={{
            'border-b-2 border-primary text-primary': activeTab() === 'artifacts',
            'text-text-secondary hover:text-text-primary': activeTab() !== 'artifacts',
          }}
          class="px-4 py-2 text-sm font-medium transition-colors"
          onClick={() => setActiveTab('artifacts')}
        >
          Artifacts
        </button>
        <button
          type="button"
          classList={{
            'border-b-2 border-primary text-primary': activeTab() === 'deployments',
            'text-text-secondary hover:text-text-primary': activeTab() !== 'deployments',
          }}
          class="px-4 py-2 text-sm font-medium transition-colors"
          onClick={() => setActiveTab('deployments')}
        >
          Deployments
        </button>
      </div>

      {/* Overview Tab */}
      <div class="bg-bg-secondary border border-border rounded-lg p-6">
        <h2 class="text-lg font-semibold text-text-primary mb-4">Model Information</h2>

        <div class="grid grid-cols-2 gap-6">
          <div class="space-y-3">
            <div>
              <p class="text-sm text-text-secondary">Base Model</p>
              <p class="text-text-primary font-medium">Llama-3.1-8B</p>
            </div>
            <div>
              <p class="text-sm text-text-secondary">Parameters</p>
              <p class="text-text-primary font-medium">8 Billion</p>
            </div>
            <div>
              <p class="text-sm text-text-secondary">Model Size</p>
              <p class="text-text-primary font-medium">8.2 GB</p>
            </div>
            <div>
              <p class="text-sm text-text-secondary">Framework</p>
              <p class="text-text-primary font-medium">PyTorch</p>
            </div>
          </div>

          <div class="space-y-3">
            <div>
              <p class="text-sm text-text-secondary">Accuracy</p>
              <p class="text-text-primary font-medium">94.2%</p>
            </div>
            <div>
              <p class="text-sm text-text-secondary">Loss</p>
              <p class="text-text-primary font-medium">0.023</p>
            </div>
            <div>
              <p class="text-sm text-text-secondary">Training Time</p>
              <p class="text-text-primary font-medium">48 hours</p>
            </div>
            <div>
              <p class="text-sm text-text-secondary">GPU Memory</p>
              <p class="text-text-primary font-medium">16 GB</p>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-border">
          <h3 class="text-md font-semibold text-text-primary mb-3">Tags</h3>
          <div class="flex gap-2">
            <span class="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">#nlp</span>
            <span class="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">#chat</span>
            <span class="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">#thai</span>
            <span class="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
              #fine-tuned
            </span>
          </div>
        </div>

        <div class="mt-6 flex gap-3">
          <button
            type="button"
            class="px-4 py-2 bg-primary text-bg-primary rounded-md text-sm font-medium"
          >
            🚀 Deploy
          </button>
          <button
            type="button"
            class="px-4 py-2 bg-bg-tertiary rounded-md text-sm text-text-secondary hover:text-text-primary"
          >
            ⬇️ Download
          </button>
          <button
            type="button"
            class="px-4 py-2 bg-bg-tertiary rounded-md text-sm text-text-secondary hover:text-text-primary"
          >
            📊 Compare
          </button>
        </div>
      </div>
    </div>
  );
}
