import { createSignal, For } from 'solid-js';

interface NavItem {
  label: string;
  route: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Content',
    items: [
      { label: 'Skills', route: '/skills' },
      { label: 'Workflows', route: '/workflows' },
      { label: 'MCP Servers', route: '/mcp' },
      { label: 'Prompts', route: '/prompts' },
    ],
  },
  {
    title: 'Configuration',
    items: [
      { label: 'Agent Config', route: '/config' },
      { label: 'Settings', route: '/settings' },
    ],
  },
];

export default function Sidebar() {
  const [activeRoute, setActiveRoute] = createSignal('/skills');

  return (
    <aside class="w-64 bg-bg-secondary border-r border-border flex flex-col">
      <div class="p-4 border-b border-border">
        <h1 class="text-xl font-bold text-text-primary">Agent Manager</h1>
      </div>

      <nav class="flex-1 overflow-y-auto p-4">
        <For each={navSections}>
          {(section) => (
            <div class="mb-6">
              <h2 class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                {section.title}
              </h2>
              <ul class="space-y-1">
                <For each={section.items}>
                  {(item) => (
                    <li>
                      <button
                        type="button"
                        classList={{
                          'bg-bg-tertiary text-primary': activeRoute() === item.route,
                          'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary':
                            activeRoute() !== item.route,
                        }}
                        class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left"
                        onClick={() => setActiveRoute(item.route)}
                      >
                        <span class="text-sm font-medium">{item.label}</span>
                      </button>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          )}
        </For>
      </nav>

      <div class="p-4 border-t border-border">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span class="text-sm font-bold">U</span>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-text-primary">User</p>
            <p class="text-xs text-text-secondary">Connected</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
