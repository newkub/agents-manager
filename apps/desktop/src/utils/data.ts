import type { ItemType, VisualizationData } from '@agents-manager/shared';

declare global {
  interface Window {
    __DATA__?: VisualizationData;
  }
}

export function getDataFromWindow(): VisualizationData | null {
  if (typeof window !== 'undefined' && window.__DATA__) {
    return window.__DATA__;
  }
  return null;
}

export async function fetchData(type: ItemType): Promise<VisualizationData> {
  const windowData = getDataFromWindow();
  if (windowData && windowData.type === type) return windowData;

  const res = await fetch('/api/data');
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export const TYPE_LABELS: Record<ItemType, string> = {
  skills: 'Skills',
  workflows: 'Workflows',
  mcp: 'MCP Servers',
};

export const TYPE_ICONS: Record<ItemType, string> = {
  skills: 'i-lucide-file-code',
  workflows: 'i-lucide-workflow',
  mcp: 'i-lucide-server',
};
