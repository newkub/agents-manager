import { createSignal, Show, For } from 'solid-js';
import { useFileTree } from '../composables/useFileTree';
import { useTabs } from '../composables/useTabs';

export default function FilesPage() {
  const { fileTree, selectedFile, loading, toggleNode, selectFile } = useFileTree();
  const { addTab } = useTabs();
  const [searchQuery, setSearchQuery] = createSignal('');

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
              addTab({
                name: node.name,
                path: node.path,
                content: '',
              });
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
    <div class="p-6">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-text-primary mb-2">Files</h1>
        <p class="text-text-secondary">Browse and manage your skill files</p>
      </div>

      <div class="mb-4">
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery()}
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          class="w-full px-4 py-2 bg-bg-primary border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary"
        />
      </div>

      <div class="bg-bg-secondary border border-border rounded-lg p-4">
        <Show when={loading()}>
          <div class="text-sm text-text-secondary">Loading files...</div>
        </Show>
        <Show when={!loading()}>
          <Show when={filteredTree().length === 0}>
            <div class="text-sm text-text-secondary">No files found</div>
          </Show>
          <Show when={filteredTree().length > 0}>
            <For each={filteredTree()}>{(node) => renderNode(node)}</For>
          </Show>
        </Show>
      </div>
    </div>
  );
}
