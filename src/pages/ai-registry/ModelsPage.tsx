import { createSignal } from 'solid-js';

export default function ModelsPage() {
  const [searchQuery, setSearchQuery] = createSignal('');
  const [filterType, setFilterType] = createSignal('all');

  return (
    <div class="p-6">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-text-primary mb-2">🧠 Models</h1>
        <p class="text-text-secondary">Browse and manage your AI models</p>
      </div>

      {/* Search and Filter */}
      <div class="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search models..."
          value={searchQuery()}
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          class="flex-1 px-4 py-2 bg-bg-primary border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary"
        />
        <select
          value={filterType()}
          onInput={(e) => setFilterType(e.currentTarget.value)}
          class="px-4 py-2 bg-bg-primary border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary"
        >
          <option value="all">All Types</option>
          <option value="nlp">NLP</option>
          <option value="cv">Computer Vision</option>
          <option value="audio">Audio</option>
          <option value="multimodal">Multimodal</option>
        </select>
        <button
          type="button"
          class="px-4 py-2 bg-primary text-bg-primary rounded-lg text-sm font-medium"
        >
          + Add Model
        </button>
      </div>

      {/* Model Grid */}
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-bg-secondary border border-border rounded-lg p-4">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <span class="text-2xl">🧠</span>
              </div>
              <div>
                <h3 class="font-semibold text-text-primary">Llama-3.1-8B-FineTuned</h3>
                <p class="text-xs text-text-secondary">v2.3</p>
              </div>
            </div>
            <span class="px-2 py-1 bg-success/20 text-success text-xs rounded">Ready</span>
          </div>

          <div class="space-y-2 mb-4">
            <div class="flex justify-between text-xs">
              <span class="text-text-secondary">Size</span>
              <span class="text-text-primary">8.2GB</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-text-secondary">Parameters</span>
              <span class="text-text-primary">8B</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-text-secondary">Accuracy</span>
              <span class="text-text-primary">94.2%</span>
            </div>
          </div>

          <div class="flex gap-2">
            <button
              type="button"
              class="flex-1 px-3 py-1.5 bg-primary text-bg-primary rounded-md text-sm font-medium"
            >
              Deploy
            </button>
            <button
              type="button"
              class="px-3 py-1.5 bg-bg-tertiary rounded-md text-sm text-text-secondary hover:text-text-primary"
            >
              View
            </button>
          </div>
        </div>

        <div class="bg-bg-secondary border border-border rounded-lg p-4">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <span class="text-2xl">🖼️</span>
              </div>
              <div>
                <h3 class="font-semibold text-text-primary">ResNet-50-ImageNet</h3>
                <p class="text-xs text-text-secondary">v1.0</p>
              </div>
            </div>
            <span class="px-2 py-1 bg-success/20 text-success text-xs rounded">Ready</span>
          </div>

          <div class="space-y-2 mb-4">
            <div class="flex justify-between text-xs">
              <span class="text-text-secondary">Size</span>
              <span class="text-text-primary">98MB</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-text-secondary">Parameters</span>
              <span class="text-text-primary">25.6M</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-text-secondary">Accuracy</span>
              <span class="text-text-primary">76.1%</span>
            </div>
          </div>

          <div class="flex gap-2">
            <button
              type="button"
              class="flex-1 px-3 py-1.5 bg-primary text-bg-primary rounded-md text-sm font-medium"
            >
              Deploy
            </button>
            <button
              type="button"
              class="px-3 py-1.5 bg-bg-tertiary rounded-md text-sm text-text-secondary hover:text-text-primary"
            >
              View
            </button>
          </div>
        </div>

        <div class="bg-bg-secondary border border-border rounded-lg p-4">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <span class="text-2xl">🎵</span>
              </div>
              <div>
                <h3 class="font-semibold text-text-primary">Whisper-Small-Thai</h3>
                <p class="text-xs text-text-secondary">v1.2</p>
              </div>
            </div>
            <span class="px-2 py-1 bg-warning/20 text-warning text-xs rounded">Training</span>
          </div>

          <div class="space-y-2 mb-4">
            <div class="flex justify-between text-xs">
              <span class="text-text-secondary">Size</span>
              <span class="text-text-primary">244MB</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-text-secondary">Parameters</span>
              <span class="text-text-primary">244M</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-text-secondary">Progress</span>
              <span class="text-text-primary">45%</span>
            </div>
          </div>

          <div class="flex gap-2">
            <button
              type="button"
              class="flex-1 px-3 py-1.5 bg-bg-tertiary rounded-md text-sm text-text-secondary hover:text-text-primary"
            >
              Monitor
            </button>
            <button
              type="button"
              class="px-3 py-1.5 bg-bg-tertiary rounded-md text-sm text-text-secondary hover:text-text-primary"
            >
              Pause
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
