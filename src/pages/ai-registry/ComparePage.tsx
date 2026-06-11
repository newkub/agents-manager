import { createSignal } from 'solid-js';

export default function ComparePage() {
  return (
    <div class="p-6">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-text-primary mb-2">⚖️ Compare Models</h1>
        <p class="text-text-secondary">Compare performance metrics across models</p>
      </div>

      <div class="bg-bg-secondary border border-border rounded-lg p-6">
        <div class="flex items-center gap-4 mb-6">
          <div class="flex-1">
            <label class="block text-sm font-medium text-text-primary mb-2">Model 1</label>
            <select class="w-full px-3 py-2 bg-bg-primary border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary">
              <option>Select model...</option>
              <option>Llama-3.1-8B v2.3</option>
              <option>Mistral-7B v1.5</option>
            </select>
          </div>
          <div class="text-2xl text-text-secondary">vs</div>
          <div class="flex-1">
            <label class="block text-sm font-medium text-text-primary mb-2">Model 2</label>
            <select class="w-full px-3 py-2 bg-bg-primary border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary">
              <option>Select model...</option>
              <option>Llama-3.1-8B v2.3</option>
              <option>Mistral-7B v1.5</option>
            </select>
          </div>
        </div>

        <div class="text-center py-12 text-text-secondary">
          <div class="text-4xl mb-4">⚖️</div>
          <p class="text-sm">Select 2 or more models to compare their performance metrics.</p>
        </div>
      </div>
    </div>
  );
}
