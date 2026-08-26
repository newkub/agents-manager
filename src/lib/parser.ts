import type { Item, ItemType, McpServerItem, SkillItem, WorkflowItem } from './types';

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

export function extractDescription(content: string): string {
  const fm = parseFrontmatter(content);
  if (fm.frontmatter.description) return fm.frontmatter.description;
  const firstHeading = content.match(/^#\s+(.+)$/m);
  return firstHeading ? firstHeading[1] : 'No description';
}

export function extractTags(content: string): string[] {
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

export function extractToolsFromMcp(content: string): string[] {
  const tools: string[] = [];
  const toolMatches = content.matchAll(/(?:^|\n)(?:#{1,3})\s+(?:Tool\s*[:-]?\s*)?(.+)/gi);
  for (const match of toolMatches) {
    const name = match[1].trim();
    if (name && !name.startsWith('<!--')) tools.push(name);
  }
  return tools;
}

export function buildFileName(filePath: string): string {
  return (
    filePath
      .split(/[\\/]/)
      .pop()
      ?.replace(/\.mdx?$/, '') ?? 'unknown'
  );
}

export function createSkillItem(filePath: string, content: string): SkillItem {
  const fm = parseFrontmatter(content);
  const fileName = buildFileName(filePath);
  return {
    name: fm.frontmatter.title ?? fileName,
    description: fm.frontmatter.description ?? extractDescription(content),
    category: fm.frontmatter.category ?? 'general',
    tags: extractTags(content),
    filePath,
    content,
  };
}

export function createWorkflowItem(filePath: string, content: string): WorkflowItem {
  const fm = parseFrontmatter(content);
  const fileName = buildFileName(filePath);
  return {
    name: fm.frontmatter.title ?? fileName,
    description: fm.frontmatter.description ?? extractDescription(content),
    filePath,
    content,
  };
}

export function createMcpItem(filePath: string, content: string): McpServerItem {
  const fm = parseFrontmatter(content);
  const fileName = buildFileName(filePath);
  return {
    name: fm.frontmatter.title ?? fileName,
    description: fm.frontmatter.description ?? extractDescription(content),
    filePath,
    content,
    tools: extractToolsFromMcp(content),
  };
}

export function createItem(type: ItemType, filePath: string, content: string): Item {
  switch (type) {
    case 'skills':
      return createSkillItem(filePath, content);
    case 'workflows':
      return createWorkflowItem(filePath, content);
    case 'mcp':
      return createMcpItem(filePath, content);
  }
}
