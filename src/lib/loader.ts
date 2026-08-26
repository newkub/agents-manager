import { readdir, readFile, stat } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { createItem } from './parser';
import type { Item, ItemType, VisualizationData } from './types';

async function findMarkdownFiles(dir: string): Promise<string[]> {
  const results: string[] = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
        results.push(...(await findMarkdownFiles(fullPath)));
      } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
        results.push(fullPath);
      }
    }
  } catch {
    // Directory doesn't exist or not accessible
  }
  return results;
}

export async function directoryExists(dir: string): Promise<boolean> {
  try {
    const s = await stat(dir);
    return s.isDirectory();
  } catch {
    return false;
  }
}

const DEFAULT_DIRS = [
  join(homedir(), '.codeium', 'windsurf'),
  join(homedir(), '.codeium', 'windsurf', 'global_workflows'),
  join(homedir(), '.codeium', 'windsurf', 'skills'),
];

export async function resolveBaseDir(explicit?: string): Promise<string> {
  if (explicit) {
    const abs = resolve(explicit);
    if (await directoryExists(abs)) return abs;
    console.error(`Directory not found: ${abs}`);
    throw new Error(`Directory not found: ${abs}`);
  }

  for (const dir of DEFAULT_DIRS) {
    if (await directoryExists(dir)) return dir;
  }

  return process.cwd();
}

async function parseItems(type: ItemType, dir: string): Promise<Item[]> {
  const files = await findMarkdownFiles(dir);
  const items: Item[] = [];

  for (const filePath of files) {
    try {
      const content = await readFile(filePath, 'utf-8');
      items.push(createItem(type, filePath, content));
    } catch {
      // Skip files that can't be read
    }
  }

  return items;
}

export async function collectVisualizationData(
  type: ItemType,
  baseDir: string
): Promise<VisualizationData> {
  const dirName = type === 'skills' ? 'skills' : type === 'workflows' ? 'workflows' : 'mcp';
  const items = await parseItems(type, join(baseDir, dirName));
  return { type, items, total: items.length };
}

export async function getDataForType(
  type: ItemType,
  explicitBaseDir?: string
): Promise<VisualizationData> {
  const windsurfDir = join(homedir(), '.codeium', 'windsurf');
  let searchDir = explicitBaseDir ?? (await resolveBaseDir());

  if (type === 'skills') {
    const skillsDir = join(windsurfDir, 'skills');
    searchDir = (await directoryExists(skillsDir)) ? windsurfDir : searchDir;
  } else if (type === 'workflows') {
    const workflowsDir = join(windsurfDir, 'global_workflows');
    searchDir = (await directoryExists(workflowsDir)) ? windsurfDir : searchDir;
  }

  return collectVisualizationData(type, searchDir);
}
