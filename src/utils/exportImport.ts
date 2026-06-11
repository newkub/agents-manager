import { save, open } from '@tauri-apps/plugin-dialog';
import { writeTextFile, readTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';

export async function exportSkill(content: string, filename: string) {
  try {
    const filePath = await save({
      defaultPath: filename,
      filters: [
        {
          name: 'Markdown',
          extensions: ['md'],
        },
        {
          name: 'JSON',
          extensions: ['json'],
        },
      ],
    });

    if (filePath) {
      await writeTextFile(filePath, content);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Export failed:', error);
    return false;
  }
}

export async function importSkill() {
  try {
    const filePath = await open({
      multiple: false,
      filters: [
        {
          name: 'Supported Files',
          extensions: ['md', 'json'],
        },
      ],
    });

    if (filePath) {
      const content = await readTextFile(filePath);
      return content;
    }
    return null;
  } catch (error) {
    console.error('Import failed:', error);
    return null;
  }
}
