import { createSignal } from 'solid-js';
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import { open, save } from '@tauri-apps/plugin-dialog';

export function useFileSystem() {
  const [currentFile, setCurrentFile] = createSignal<{ path: string; content: string; } | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const openFile = async () => {
    try {
      setLoading(true);
      setError(null);
      const selected = await open({
        multiple: false,
        directory: false,
      });
      if (selected) {
        const content = await readTextFile(selected as string);
        setCurrentFile({ path: selected as string, content });
      }
    } catch (err) {
      setError(`Failed to open file: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const saveFile = async (content: string) => {
    try {
      setLoading(true);
      setError(null);
      const file = currentFile();
      if (file) {
        await writeTextFile(file.path, content);
        setCurrentFile({ ...file, content });
      } else {
        const savePath = await save({
          defaultPath: 'untitled.md',
          filters: [
            {
              name: 'Markdown',
              extensions: ['md'],
            },
            {
              name: 'Text',
              extensions: ['txt'],
            },
          ],
        });
        if (savePath) {
          await writeTextFile(savePath as string, content);
          setCurrentFile({ path: savePath as string, content });
        }
      }
    } catch (err) {
      setError(`Failed to save file: ${err}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    currentFile,
    loading,
    error,
    openFile,
    saveFile,
  };
}
