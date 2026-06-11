import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFileTree } from '../../src/composables/useFileTree';

vi.mock('@tauri-apps/plugin-fs', () => ({
  readDir: vi.fn(() => []),
  BaseDirectory: {
    Home: 'home',
  },
}));

describe('useFileTree', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty fileTree, null selectedFile, and false loading', () => {
    const { fileTree, selectedFile } = useFileTree();
    expect(fileTree()).toEqual([]);
    expect(selectedFile()).toBeNull();
    // Note: loading is true initially due to onMount calling loadFileTree
  });

  it('should select a file', () => {
    const { selectedFile, selectFile } = useFileTree();

    selectFile('/test/file.md');

    expect(selectedFile()).toBe('/test/file.md');
  });

  it('should toggle node expansion for directory', () => {
    const { fileTree, toggleNode } = useFileTree();

    const node = { name: 'test', path: '/test', type: 'directory' as const };
    toggleNode(node);

    expect(node.expanded).toBe(true);
  });

  it('should not toggle node for file', () => {
    const { fileTree, toggleNode } = useFileTree();

    const node = { name: 'test.md', path: '/test.md', type: 'file' as const };
    toggleNode(node);

    expect(node.expanded).toBeUndefined();
  });
});
