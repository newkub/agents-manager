import { createSignal, For, Show } from 'solid-js';
import { useFileTree } from '../composables/useFileTree';
import { useTheme } from '../composables/useTheme';
import { useTabs } from '../composables/useTabs';
import { useNavigate, useLocation } from '@solidjs/router';
import SkillsBrowser from './SkillsBrowser';

export default function Sidebar() {
  const { fileTree, selectedFile, loading, toggleNode, selectFile } = useFileTree();
  const { theme, toggleTheme } = useTheme();
  const { addTab } = useTabs();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = createSignal('');

  const currentPath = () => location.pathname;

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

  return (
    <aside class="w-64 bg-bg-secondary border-r border-border flex flex-col">
      <div class="p-4 border-b border-border">
        <h1 class="text-xl font-bold text-text-primary mb-3">Agent Manager</h1>
        <div class="flex gap-1 mb-3">
          <button
            type="button"
            classList={{
              'bg-primary text-bg-primary': currentPath() === '/ai-registry',
              'bg-bg-tertiary text-text-secondary': currentPath() !== '/ai-registry',
            }}
            class="flex-1 px-2 py-1 rounded text-xs font-medium transition-colors"
            onClick={() => navigate('/ai-registry')}
          >
            🤖 AI Registry
          </button>
        </div>
        <div class="flex gap-1 mb-3">
          <button
            type="button"
            classList={{
              'bg-primary text-bg-primary': currentPath() === '/',
              'bg-bg-tertiary text-text-secondary': currentPath() !== '/',
            }}
            class="flex-1 px-2 py-1 rounded text-xs font-medium transition-colors"
            onClick={() => navigate('/')}
          >
            Files
          </button>
          <button
            type="button"
            classList={{
              'bg-primary text-bg-primary': currentPath() === '/skills',
              'bg-bg-tertiary text-text-secondary': currentPath() !== '/skills',
            }}
            class="flex-1 px-2 py-1 rounded text-xs font-medium transition-colors"
            onClick={() => navigate('/skills')}
          >
            Skills
          </button>
          <button
            type="button"
            classList={{
              'bg-primary text-bg-primary': currentPath() === '/workflows',
              'bg-bg-tertiary text-text-secondary': currentPath() !== '/workflows',
            }}
            class="flex-1 px-2 py-1 rounded text-xs font-medium transition-colors"
            onClick={() => navigate('/workflows')}
          >
            Workflows
          </button>
        </div>
        <Show when={currentPath() === '/'}>
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery()}
            onInput={(e) => setSearchQuery(e.currentTarget.value)}
            class="w-full px-3 py-1.5 bg-bg-primary border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary"
          />
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
        <Show when={currentPath() === '/skills'}>
          <SkillsBrowser type="skills" onCreateFromTemplate={handleCreateFromTemplate} />
        </Show>
        <Show when={currentPath() === '/workflows'}>
          <SkillsBrowser type="workflows" onCreateFromTemplate={handleCreateFromTemplate} />
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
