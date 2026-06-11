import { createSignal } from 'solid-js';

export default function AgentsPage() {
  return (
    <div class="p-6">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-text-primary mb-2">🤖 Agents</h1>
        <p class="text-text-secondary">Browse and manage your AI agents</p>
      </div>

      <div class="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search agents..."
          class="flex-1 px-4 py-2 bg-bg-primary border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary"
        />
        <button
          type="button"
          class="ml-4 px-4 py-2 bg-primary text-bg-primary rounded-lg text-sm font-medium"
        >
          + Add Agent
        </button>
      </div>

      <div class="bg-bg-secondary border border-border rounded-lg p-6">
        <div class="text-center py-12 text-text-secondary">
          <div class="text-4xl mb-4">🤖</div>
          <p class="text-sm mb-4">No agents yet. Create your first agent to get started.</p>
          <button
            type="button"
            class="px-4 py-2 bg-primary text-bg-primary rounded-md text-sm font-medium"
          >
            Create Agent
          </button>
        </div>
      </div>
    </div>
  );
}
