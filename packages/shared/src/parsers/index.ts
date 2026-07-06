import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import type { ItemType, McpServerItem, SkillItem, VisualizationData, WorkflowItem } from '../types';

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

export function parseFrontmatter(content: string): {
  frontmatter: Record<string, string>;
  body: string;
} {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return { frontmatter: {}, body: content };

  const fmText = fmMatch[1];
  const body = fmMatch[2];
  const frontmatter: Record<string, string> = {};

  for (const line of fmText.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line
      .slice(colonIdx + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');
    if (key) frontmatter[key] = value;
  }

  return { frontmatter, body };
}

function extractDescription(content: string): string {
  const fm = parseFrontmatter(content);
  if (fm.frontmatter.description) return fm.frontmatter.description;
  const firstHeading = content.match(/^#\s+(.+)$/m);
  return firstHeading ? firstHeading[1] : 'No description';
}

function extractTags(content: string): string[] {
  const fm = parseFrontmatter(content);
  if (fm.frontmatter.tags) {
    return fm.frontmatter.tags
      .replace(/[[\]]/g, '')
      .split(',')
      .map((t) => t.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }
  return [];
}

function extractToolsFromMcp(content: string): string[] {
  const tools: string[] = [];
  const toolMatches = content.matchAll(/(?:^|\n)###?\s+(?:Tool\s+)?[:-]?\s*(.+)/g);
  for (const match of toolMatches) {
    const name = match[1].trim();
    if (name && !name.startsWith('<!--')) tools.push(name);
  }
  return tools;
}

export async function parseSkills(skillsDir: string): Promise<SkillItem[]> {
  const files = await findMarkdownFiles(skillsDir);
  const items: SkillItem[] = [];

  for (const filePath of files) {
    try {
      const content = await readFile(filePath, 'utf-8');
      const fm = parseFrontmatter(content);
      const fileName =
        filePath
          .split(/[\\/]/)
          .pop()
          ?.replace(/\.mdx?$/, '') ?? 'unknown';
      items.push({
        name: fm.frontmatter.title ?? fileName,
        description: fm.frontmatter.description ?? extractDescription(content),
        category: fm.frontmatter.category ?? 'general',
        tags: extractTags(content),
        filePath,
        content,
      });
    } catch {
      // Skip files that can't be read
    }
  }

  return items;
}

export async function parseWorkflows(workflowsDir: string): Promise<WorkflowItem[]> {
  const files = await findMarkdownFiles(workflowsDir);
  const items: WorkflowItem[] = [];

  for (const filePath of files) {
    try {
      const content = await readFile(filePath, 'utf-8');
      const fm = parseFrontmatter(content);
      const fileName =
        filePath
          .split(/[\\/]/)
          .pop()
          ?.replace(/\.mdx?$/, '') ?? 'unknown';
      items.push({
        name: fm.frontmatter.title ?? fileName,
        description: fm.frontmatter.description ?? extractDescription(content),
        filePath,
        content,
      });
    } catch {
      // Skip files that can't be read
    }
  }

  return items;
}

export async function parseMcpServers(mcpDir: string): Promise<McpServerItem[]> {
  const files = await findMarkdownFiles(mcpDir);
  const items: McpServerItem[] = [];

  for (const filePath of files) {
    try {
      const content = await readFile(filePath, 'utf-8');
      const fm = parseFrontmatter(content);
      const fileName =
        filePath
          .split(/[\\/]/)
          .pop()
          ?.replace(/\.mdx?$/, '') ?? 'unknown';
      items.push({
        name: fm.frontmatter.title ?? fileName,
        description: fm.frontmatter.description ?? extractDescription(content),
        filePath,
        content,
        tools: extractToolsFromMcp(content),
      });
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
  switch (type) {
    case 'skills': {
      const items = await parseSkills(join(baseDir, 'skills'));
      return { type, items, total: items.length };
    }
    case 'workflows': {
      const items = await parseWorkflows(join(baseDir, 'workflows'));
      return { type, items, total: items.length };
    }
    case 'mcp': {
      const items = await parseMcpServers(join(baseDir, 'mcp'));
      return { type, items, total: items.length };
    }
  }
}

export async function directoryExists(dir: string): Promise<boolean> {
  try {
    const s = await stat(dir);
    return s.isDirectory();
  } catch {
    return false;
  }
}
