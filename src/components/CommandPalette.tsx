import { createSignal, For, onCleanup, onMount, Show } from 'solid-js';

interface Command {
  id: string;
  label: string;
  shortcut?: string;
  icon?: string;
  action: () => void;
}

interface CommandPaletteProps {
  commands: Command[];
  isOpen: boolean;
  onClose: () => void;
}

export function useCommandPalette() {
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

export default function CommandPalette(props: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = createSignal('');
  const [selectedIndex, setSelectedIndex] = createSignal(0);

  const filteredCommands = () => {
    const query = searchQuery().toLowerCase();
    if (!query) return props.commands;

    return props.commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(query) || cmd.shortcut?.toLowerCase().includes(query)
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const commands = filteredCommands();

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % commands.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + commands.length) % commands.length);
        break;
      case 'Enter':
        e.preventDefault();
        const selected = commands[selectedIndex()];
        if (selected) {
          selected.action();
          props.onClose();
        }
        break;
      case 'Escape':
        props.onClose();
        break;
    }
  };

  onMount(() => {
    if (props.isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
      document.addEventListener('keydown', handleKeyDown);
    }
  });

  onCleanup(() => {
    document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <Show when={props.isOpen}>
      <div
        class="fixed inset-0 bg-black/50 flex items-start justify-center pt-24 z-50"
        onClick={props.onClose}
      >
        <div
          class="w-full max-w-xl bg-bg-secondary border border-border rounded-lg shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div class="p-4 border-b border-border">
            <input
              type="text"
              placeholder="Type a command or search..."
              value={searchQuery()}
              onInput={(e) => setSearchQuery(e.currentTarget.value)}
              class="w-full px-3 py-2 bg-bg-primary border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary"
              autoFocus
            />
          </div>
          <div class="max-h-96 overflow-y-auto p-2">
            <For each={filteredCommands()}>
              {(command, index) => (
                <button
                  type="button"
                  classList={{
                    'bg-bg-tertiary': index() === selectedIndex(),
                  }}
                  class="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left hover:bg-bg-tertiary transition-colors"
                  onClick={() => {
                    command.action();
                    props.onClose();
                  }}
                >
                  <Show when={command.icon}>
                    <span class={`i-${command.icon} text-text-secondary`} />
                  </Show>
                  <span class="flex-1 text-sm text-text-primary">{command.label}</span>
                  <Show when={command.shortcut}>
                    <span class="text-xs text-text-secondary px-2 py-1 bg-bg-primary rounded">
                      {command.shortcut}
                    </span>
                  </Show>
                </button>
              )}
            </For>
            <Show when={filteredCommands().length === 0}>
              <div class="text-center text-text-secondary text-sm py-8">No commands found</div>
            </Show>
          </div>
          <div class="p-2 border-t border-border flex items-center justify-between text-xs text-text-secondary">
            <span>
              <span class="px-1 py-0.5 bg-bg-primary rounded">↑↓</span> Navigate
            </span>
            <span>
              <span class="px-1 py-0.5 bg-bg-primary rounded">Enter</span> Select
            </span>
            <span>
              <span class="px-1 py-0.5 bg-bg-primary rounded">Esc</span> Close
            </span>
          </div>
        </div>
      </div>
    </Show>
  );
}
