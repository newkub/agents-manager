import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import type { ItemType, VisualizationData } from '@agents-manager/shared';
import { collectVisualizationData, directoryExists } from '@agents-manager/shared';

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
    process.exit(1);
  }

  for (const dir of DEFAULT_DIRS) {
    if (await directoryExists(dir)) return dir;
  }

  return process.cwd();
}

export async function getDataForType(type: ItemType, baseDir: string): Promise<VisualizationData> {
  const windsurfDir = join(homedir(), '.codeium', 'windsurf');

  let searchDir = baseDir;
  if (type === 'skills') {
    const skillsDir = join(windsurfDir, 'skills');
    searchDir = (await directoryExists(skillsDir)) ? windsurfDir : baseDir;
  } else if (type === 'workflows') {
    const workflowsDir = join(windsurfDir, 'global_workflows');
    searchDir = (await directoryExists(workflowsDir)) ? windsurfDir : baseDir;
  } else if (type === 'mcp') {
    searchDir = baseDir;
  }

  return collectVisualizationData(type, searchDir);
}
