export interface SkillItem {
  name: string;
  description: string;
  category: string;
  tags: string[];
  filePath: string;
  content: string;
}

export interface WorkflowItem {
  name: string;
  description: string;
  filePath: string;
  content: string;
}

export interface McpServerItem {
  name: string;
  description: string;
  filePath: string;
  content: string;
  tools: string[];
}

export type ItemType = 'skills' | 'workflows' | 'mcp';

export type Item = SkillItem | WorkflowItem | McpServerItem;

export interface VisualizationData {
  type: ItemType;
  items: Item[];
  total: number;
}

export interface CliCommandResult {
  success: boolean;
  message: string;
  url?: string;
  data?: VisualizationData;
}
