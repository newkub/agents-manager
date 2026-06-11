import { createSignal } from 'solid-js';

export default function PromptsPage() {
  return (
    <div class="p-6">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-text-primary mb-2">📝 Prompts</h1>
        <p class="text-text-secondary">Browse and manage prompt templates</p>
      </div>

      <div class="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search prompts..."
          class="flex-1 px-4 py-2 bg-bg-primary border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary"
        />
        <button
          type="button"
          class="ml-4 px-4 py-2 bg-primary text-bg-primary rounded-lg text-sm font-medium"
        >
          + Add Prompt
        </button>
      </div>

      <div class="bg-bg-secondary border border-border rounded-lg p-6">
        <div class="text-center py-12 text-text-secondary">
          <div class="text-4xl mb-4">📝</div>
          <p class="text-sm mb-4">No prompt templates yet. Create your first template.</p>
          <button
            type="button"
            class="px-4 py-2 bg-primary text-bg-primary rounded-md text-sm font-medium"
          >
            Create Prompt
          </button>
        </div>
      </div>
    </div>
  );
}
