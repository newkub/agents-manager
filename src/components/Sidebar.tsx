import { createSignal, For, Show } from 'solid-js';
import { useFileTree } from '../composables/useFileTree';
import { useTheme } from '../composables/useTheme';
import { useTabs } from '../composables/useTabs';
import SkillsBrowser from './SkillsBrowser';

interface SidebarProps {
  navigate: (path: string) => void;
  currentPath: () => string;
}

export default function Sidebar(props: SidebarProps) {
  const { fileTree, selectedFile, loading, toggleNode, selectFile } = useFileTree();
  const { theme, toggleTheme } = useTheme();
  const { addTab } = useTabs();
  const [searchQuery, setSearchQuery] = createSignal('');

  const currentPath = () => props.currentPath();

  const handleCreateFromTemplate = (template: string) => {
    const fileName = `skill-${Date.now()}.md`;
    addTab({
      name: fileName,
      path: fileName,
      content: template,
    });
  };

  const filteredTree = () => {
    const query = searchQuery().toLowerCase();
    if (!query) return fileTree();

    const filterNodes = (nodes: any[]): any[] => {
      return nodes
        .map((node) => {
          if (node.type === 'directory') {
            const filteredChildren = filterNodes(node.children || []);
            if (filteredChildren.length > 0 || node.name.toLowerCase().includes(query)) {
              return { ...node, children: filteredChildren, expanded: true };
            }
            return null;
          }
          return node.name.toLowerCase().includes(query) ? node : null;
        })
        .filter(Boolean);
    };

    return filterNodes(fileTree());
  };

  const renderNode = (node: any, level: number = 0) => {
    const isSelected = selectedFile() === node.path;
    const paddingLeft = `${level * 12 + 12}px`;

    return (
      <div>
        <button
          type="button"
          classList={{
            'bg-bg-tertiary text-primary': isSelected,
            'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary': !isSelected,
          }}
          class="flex items-center gap-2 px-3 py-1.5 rounded transition-colors w-full text-left"
          style={{ 'padding-left': paddingLeft }}
          onClick={() => {
            if (node.type === 'directory') {
              toggleNode(node);
            } else {
              selectFile(node.path);
            }
          }}
        >
          <Show when={node.type === 'directory'}>
            <span class={`i-lucide-chevron-${node.expanded ? 'down' : 'right'} text-xs`} />
          </Show>
          <Show when={node.type === 'file'}>
            <span class="i-lucide-file text-xs" />
          </Show>
          <span class="text-sm truncate">{node.name}</span>
        </button>
        <Show when={node.type === 'directory' && node.expanded && node.children}>
          <For each={node.children}>{(child) => renderNode(child, level + 1)}</For>
        </Show>
      </div>
    );
  };

  const navItems = () => [
    { path: '/', label: 'Files', icon: 'i-lucide-folder' },
    { path: '/skills', label: 'Skills', icon: 'i-lucide-bolt' },
    { path: '/workflows', label: 'Workflows', icon: 'i-lucide-git-branch' },
    { path: '/settings', label: 'Settings', icon: 'i-lucide-settings' },
  ];

  const aiRegistryItems = () => [
    { path: '/ai-registry', label: 'Home', icon: 'i-lucide-home' },
    { path: '/ai-registry/agents', label: 'Agents', icon: 'i-lucide-bot' },
    { path: '/ai-registry/models', label: 'Models', icon: 'i-lucide-cpu' },
    { path: '/ai-registry/datasets', label: 'Datasets', icon: 'i-lucide-database' },
    { path: '/ai-registry/prompts', label: 'Prompts', icon: 'i-lucide-message-square' },
    { path: '/ai-registry/compare', label: 'Compare', icon: 'i-lucide-scale' },
  ];

  const isAIRegistryPath = () => currentPath().startsWith('/ai-registry');

  return (
    <aside class="w-64 bg-bg-secondary border-r border-border flex flex-col">
      <div class="p-4 border-b border-border">
        <h1 class="text-xl font-bold text-text-primary mb-4">Agent Manager</h1>
        
        <div class="space-y-2">
          <button
            type="button"
            classList={{
              'bg-primary text-bg-primary': isAIRegistryPath(),
              'bg-bg-tertiary text-text-secondary': !isAIRegistryPath(),
            }}
            class="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            onClick={() => props.navigate('/ai-registry')}
          >
            <span class="i-lucide-robot" />
            <span>AI Registry</span>
          </button>

          <div class="space-y-1">
            <For each={navItems()}>
              {(item) => (
                <button
                  type="button"
                  classList={{
                    'bg-primary text-bg-primary': currentPath() === item.path,
                    'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary': currentPath() !== item.path,
                  }}
                  class="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors"
                  onClick={() => props.navigate(item.path)}
                >
                  <span class={item.icon} />
                  <span>{item.label}</span>
                </button>
              )}
            </For>
          </div>
        </div>

        <Show when={currentPath() === '/'}>
          <div class="mt-4">
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery()}
              onInput={(e) => setSearchQuery(e.currentTarget.value)}
              class="w-full px-3 py-1.5 bg-bg-primary border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary"
            />
          </div>
        </Show>
      </div>

      <nav class="flex-1 overflow-y-auto">
        <Show when={currentPath() === '/'}>
          <div class="p-4">
            <Show when={loading()}>
              <div class="text-sm text-text-secondary">Loading files...</div>
            </Show>
            <Show when={!loading()}>
              <For each={filteredTree()}>{(node) => renderNode(node)}</For>
            </Show>
          </div>
        </Show>
        <Show when={isAIRegistryPath()}>
          <div class="p-4 space-y-1">
            <For each={aiRegistryItems()}>
              {(item) => (
                <button
                  type="button"
                  classList={{
                    'bg-primary text-bg-primary': currentPath() === item.path,
                    'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary': currentPath() !== item.path,
                  }}
                  class="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors"
                  onClick={() => props.navigate(item.path)}
                >
                  <span class={item.icon} />
                  <span>{item.label}</span>
                </button>
              )}
            </For>
          </div>
        </Show>
      </nav>

      <div class="p-4 border-t border-border">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span class="text-sm font-bold">U</span>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-text-primary">User</p>
            <p class="text-xs text-text-secondary">Connected</p>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          class="w-full flex items-center justify-center gap-2 px-3 py-2 bg-bg-tertiary rounded-md text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <span class={theme() === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'} />
          <span>{theme() === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>
    </aside>
  );
}
