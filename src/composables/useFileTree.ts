import { createSignal, onMount } from 'solid-js';
import { readDir, BaseDirectory } from '@tauri-apps/plugin-fs';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
  expanded?: boolean;
}

export function useFileTree() {
  const [fileTree, setFileTree] = createSignal<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(false);

  const buildFileTree = async (path: string): Promise<FileNode[]> => {
    try {
      const entries = await readDir(path, { dir: BaseDirectory.Home });
      const nodes: FileNode[] = [];

      for (const entry of entries) {
        const node: FileNode = {
          name: entry.name,
          path: entry.path,
          type: entry.children ? 'directory' : 'file',
        };

        if (entry.children) {
          node.children = await buildFileTree(entry.path);
        }

        nodes.push(node);
      }

      return nodes.sort((a, b) => {
        if (a.type === b.type) {
          return a.name.localeCompare(b.name);
        }
        return a.type === 'directory' ? -1 : 1;
      });
    } catch (error) {
      console.error('Error reading directory:', error);
      return [];
    }
  };

  const loadFileTree = async () => {
    setLoading(true);
    try {
      const tree = await buildFileTree('.');
      setFileTree(tree);
    } catch (error) {
      console.error('Error loading file tree:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleNode = (node: FileNode) => {
    if (node.type === 'directory') {
      node.expanded = !node.expanded;
      setFileTree([...fileTree()]);
    }
  };

  const selectFile = (path: string) => {
    setSelectedFile(path);
  };

  onMount(() => {
    loadFileTree();
  });

  return {
    fileTree,
    selectedFile,
    loading,
    toggleNode,
    selectFile,
    loadFileTree,
  };
}
