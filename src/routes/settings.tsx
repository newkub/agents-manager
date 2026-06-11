import { createSignal } from 'solid-js';
import { useTheme } from '../composables/useTheme';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [apiKey, setApiKey] = createSignal('');
  const [autoSave, setAutoSave] = createSignal(true);
  const [fontSize, setFontSize] = createSignal(14);

  return (
    <div class="p-6 max-w-4xl">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-text-primary mb-2">Settings</h1>
        <p class="text-text-secondary">Configure your Agent Manager preferences</p>
      </div>

      <div class="space-y-6">
        {/* Appearance */}
        <div class="bg-bg-secondary border border-border rounded-lg p-6">
          <h2 class="text-lg font-semibold text-text-primary mb-4">Appearance</h2>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-text-primary">Theme</p>
                <p class="text-xs text-text-secondary">Choose your preferred color scheme</p>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                class="px-4 py-2 bg-bg-tertiary rounded-md text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {theme() === 'dark' ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-text-primary">Font Size</p>
                <p class="text-xs text-text-secondary">Adjust editor font size</p>
              </div>
              <select
                value={fontSize()}
                onInput={(e) => setFontSize(Number(e.currentTarget.value))}
                class="px-3 py-1.5 bg-bg-primary border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary"
              >
                <option value={12}>12px</option>
                <option value={14}>14px</option>
                <option value={16}>16px</option>
                <option value={18}>18px</option>
              </select>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div class="bg-bg-secondary border border-border rounded-lg p-6">
          <h2 class="text-lg font-semibold text-text-primary mb-4">Editor</h2>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-text-primary">Auto Save</p>
                <p class="text-xs text-text-secondary">Automatically save changes</p>
              </div>
              <button
                type="button"
                onClick={() => setAutoSave(!autoSave())}
                classList={{
                  'bg-success text-bg-primary': autoSave(),
                  'bg-bg-tertiary text-text-secondary': !autoSave(),
                }}
                class="px-4 py-2 rounded-md text-sm transition-colors"
              >
                {autoSave() ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* API */}
        <div class="bg-bg-secondary border border-border rounded-lg p-6">
          <h2 class="text-lg font-semibold text-text-primary mb-4">API Configuration</h2>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-text-primary mb-2">API Key</label>
              <input
                type="password"
                placeholder="Enter your API key"
                value={apiKey()}
                onInput={(e) => setApiKey(e.currentTarget.value)}
                class="w-full px-3 py-2 bg-bg-primary border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary"
              />
              <p class="text-xs text-text-secondary mt-1">Your API key is stored locally</p>
            </div>
          </div>
        </div>

        {/* About */}
        <div class="bg-bg-secondary border border-border rounded-lg p-6">
          <h2 class="text-lg font-semibold text-text-primary mb-4">About</h2>

          <div class="space-y-2 text-sm text-text-secondary">
            <p>
              <span class="font-medium text-text-primary">Version:</span> 1.0.0
            </p>
            <p>
              <span class="font-medium text-text-primary">Built with:</span> Solid.js, UnoCSS, Tauri
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
