import { createSignal, Show } from 'solid-js';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function useSettingsModal() {
  const [isOpen, setIsOpen] = createSignal(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen());

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}

export default function SettingsModal(props: SettingsModalProps) {
  const [autoSave, setAutoSave] = createSignal(true);
  const [autoSaveInterval, setAutoSaveInterval] = createSignal(30);
  const [showLineNumbers, setShowLineNumbers] = createSignal(true);
  const [fontSize, setFontSize] = createSignal(14);

  const handleSave = () => {
    localStorage.setItem(
      'settings',
      JSON.stringify({
        autoSave: autoSave(),
        autoSaveInterval: autoSaveInterval(),
        showLineNumbers: showLineNumbers(),
        fontSize: fontSize(),
      })
    );
    props.onClose();
  };

  return (
    <Show when={props.isOpen}>
      <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={props.onClose}
      >
        <div
          class="w-full max-w-lg bg-bg-secondary border border-border rounded-lg shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div class="p-4 border-b border-border flex items-center justify-between">
            <h2 class="text-lg font-semibold text-text-primary">Settings</h2>
            <button
              type="button"
              onClick={props.onClose}
              class="text-text-secondary hover:text-text-primary transition-colors"
            >
              <span class="i-lucide-x text-lg" />
            </button>
          </div>

          <div class="p-6 space-y-6">
            <div class="space-y-2">
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoSave()}
                  onChange={(e) => setAutoSave(e.currentTarget.checked)}
                  class="w-4 h-4 rounded border-border"
                />
                <span class="text-sm text-text-primary">Enable Auto-save</span>
              </label>
              <div class="flex items-center gap-3 pl-7">
                <label class="text-sm text-text-secondary">Interval (seconds):</label>
                <input
                  type="number"
                  value={autoSaveInterval()}
                  onChange={(e) => setAutoSaveInterval(Number(e.currentTarget.value))}
                  min="10"
                  max="300"
                  class="w-20 px-2 py-1 bg-bg-primary border border-border rounded text-sm text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showLineNumbers()}
                  onChange={(e) => setShowLineNumbers(e.currentTarget.checked)}
                  class="w-4 h-4 rounded border-border"
                />
                <span class="text-sm text-text-primary">Show Line Numbers</span>
              </label>
            </div>

            <div class="space-y-2">
              <label class="text-sm text-text-secondary block">Font Size (px):</label>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize()}
                onChange={(e) => setFontSize(Number(e.currentTarget.value))}
                class="w-full"
              />
              <span class="text-sm text-text-primary">{fontSize()}px</span>
            </div>
          </div>

          <div class="p-4 border-t border-border flex justify-end gap-2">
            <button
              type="button"
              onClick={props.onClose}
              class="px-4 py-2 rounded-md text-sm font-medium bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              class="px-4 py-2 rounded-md text-sm font-medium bg-primary text-bg-primary hover:bg-primary-hover transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}
