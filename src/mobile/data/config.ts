import type { CustomizeCategory, CustomizeItem } from '../types';

interface CustomizeData {
  mcp: CustomizeItem[];
  skills: CustomizeItem[];
  subagents: CustomizeItem[];
  hooks: CustomizeItem[];
}

const config: CustomizeData = {
  mcp: [
    {
      id: 'mcp7',
      name: 'GitHub MCP',
      description: 'Search code, issues, and repositories on GitHub',
      enabled: true,
      source: 'https://mcp.devin.ai/mcp',
    },
    {
      id: 'mcp3',
      name: 'DeepWiki MCP',
      description: 'Read documentation and ask questions about repositories',
      enabled: true,
      source: 'https://mcp.deepwiki.com/',
    },
    {
      id: 'mcp_local_filesystem',
      name: 'Local Filesystem MCP',
      description: 'Read and write files on the local machine',
      enabled: false,
      source: '.devin/mcp_config.local.json',
    },
  ],
  skills: [
    {
      id: 'follow-create-mobile-ios-android',
      name: 'follow-create-mobile-ios-android',
      description: 'สร้าง iOS/Android mobile app ด้วย Capacitor',
      enabled: true,
      source: '.devin/skills/follow-create-mobile-ios-android',
    },
    {
      id: 'deep-research',
      name: 'deep-research',
      description: 'ค้นหาข้อมูลลึกจาก multiple sources',
      enabled: true,
      source: '.devin/skills/deep-research',
    },
    {
      id: 'report-uxui-sketch',
      name: 'report-uxui-sketch',
      description: 'สร้างรายงาน UX/UI sketch ใน markdown',
      enabled: true,
      source: '.devin/skills/report-uxui-sketch',
    },
    {
      id: 'report-uxui-all-routes',
      name: 'report-uxui-all-routes',
      description: 'สร้างรายงาน routes ทั้งหมดของ app',
      enabled: true,
      source: '.devin/skills/report-uxui-all-routes',
    },
    {
      id: 'follow-write-devin-skills',
      name: 'follow-write-devin-skills',
      description: 'สร้างหรือปรับปรุง skill package',
      enabled: true,
      source: '.devin/skills/follow-write-devin-skills',
    },
  ],
  subagents: [
    {
      id: 'uxui-designer',
      name: 'roleplay-uxui-designer',
      description: 'รับบท UX/UI designer วิจารณ์ design quality',
      enabled: false,
      source: '.devin/agents/roleplay-uxui-designer',
    },
    {
      id: 'qa-tester',
      name: 'roleplay-qa-tester',
      description: 'รับบท QA engineer คิด edge cases',
      enabled: false,
      source: '.devin/agents/roleplay-qa-tester',
    },
    {
      id: 'product-manager',
      name: 'roleplay-product-manager',
      description: 'รับบท PM ตรวจ features ครบไหม',
      enabled: false,
      source: '.devin/agents/roleplay-product-manager',
    },
  ],
  hooks: [
    {
      id: 'user-prompt-submit',
      name: 'user-prompt-submit-hook',
      description: 'ทำงานก่อนส่ง prompt ไปยัง agent',
      enabled: true,
      source: '.devin/hooks.v1.json',
    },
    {
      id: 'tool-call-pre',
      name: 'tool-call-pre-hook',
      description: 'ตรวจสอบก่อนเรียก tool',
      enabled: false,
      source: '.devin/hooks.v1.json',
    },
  ],
};

export default config;

export function getCategoryItems(category: CustomizeCategory): CustomizeItem[] {
  return config[category];
}

export function updateCategoryItem(category: CustomizeCategory, id: string, enabled: boolean) {
  config[category] = config[category].map((item) => (item.id === id ? { ...item, enabled } : item));
}
