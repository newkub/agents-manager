import { createSignal, For, Show } from 'solid-js';
import { getTemplate, getTemplateNames } from '../utils/skillTemplates';

interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
}

interface SkillsBrowserProps {
  type: 'skills' | 'workflows';
  onCreateFromTemplate?: (template: string) => void;
}

const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'File Operations',
    description: 'Handle file system operations',
    category: 'utility',
    tags: ['files', 'system'],
  },
  {
    id: '2',
    name: 'API Integration',
    description: 'Integrate with external APIs',
    category: 'network',
    tags: ['api', 'http'],
  },
  {
    id: '3',
    name: 'Data Processing',
    description: 'Process and transform data',
    category: 'data',
    tags: ['transform', 'parsing'],
  },
];

export default function SkillsBrowser(props: SkillsBrowserProps) {
  const [searchQuery, setSearchQuery] = createSignal('');
  const [selectedCategory, setSelectedCategory] = createSignal<string>('all');
  const [selectedTag, setSelectedTag] = createSignal<string>('all');
  const [showTemplates, setShowTemplates] = createSignal(false);

  const categories = () => {
    const cats = new Set(mockSkills.map((s) => s.category));
    return ['all', ...Array.from(cats)];
  };

  const tags = () => {
    const allTags = mockSkills.flatMap((s) => s.tags);
    const uniqueTags = new Set(allTags);
    return ['all', ...Array.from(uniqueTags)];
  };

  const filteredSkills = () => {
    return mockSkills.filter((skill) => {
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery().toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery().toLowerCase());
      const matchesCategory = selectedCategory() === 'all' || skill.category === selectedCategory();
      const matchesTag = selectedTag() === 'all' || skill.tags.includes(selectedTag());

      return matchesSearch && matchesCategory && matchesTag;
    });
  };

  return (
    <div class="flex flex-col h-full">
      <div class="p-4 border-b border-border space-y-3">
        <div class="flex gap-2">
          <input
            type="text"
            placeholder={`Search ${props.type}...`}
            value={searchQuery()}
            onInput={(e) => setSearchQuery(e.currentTarget.value)}
            class="flex-1 px-3 py-2 bg-bg-primary border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary"
          />
          <Show when={props.onCreateFromTemplate}>
            <button
              type="button"
              onClick={() => setShowTemplates(!showTemplates())}
              class="px-3 py-2 bg-primary text-bg-primary rounded-md text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              New from Template
            </button>
          </Show>
        </div>
        <Show when={showTemplates()}>
          <div class="space-y-2">
            <p class="text-xs text-text-secondary">Select a template:</p>
            <div class="grid grid-cols-2 gap-2">
              <For each={getTemplateNames()}>
                {(templateName) => {
                  const template = getTemplate(templateName);
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        if (props.onCreateFromTemplate) {
                          props.onCreateFromTemplate(template.template);
                        }
                        setShowTemplates(false);
                      }}
                      class="p-2 bg-bg-tertiary rounded text-left hover:bg-bg-tertiary/80 transition-colors"
                    >
                      <p class="text-xs font-medium text-text-primary">{template?.name}</p>
                      <p class="text-xs text-text-secondary truncate">{template?.description}</p>
                    </button>
                  );
                }}
              </For>
            </div>
          </div>
        </Show>
        <div class="flex gap-2">
          <select
            value={selectedCategory()}
            onChange={(e) => setSelectedCategory(e.currentTarget.value)}
            class="flex-1 px-3 py-2 bg-bg-primary border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary"
          >
            <For each={categories()}>
              {(cat) => <option value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>}
            </For>
          </select>
          <select
            value={selectedTag()}
            onChange={(e) => setSelectedTag(e.currentTarget.value)}
            class="flex-1 px-3 py-2 bg-bg-primary border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary"
          >
            <For each={tags()}>
              {(tag) => <option value={tag}>{tag === 'all' ? 'All Tags' : tag}</option>}
            </For>
          </select>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-4">
        <div class="space-y-2">
          <For each={filteredSkills()}>
            {(skill) => (
              <div class="p-3 bg-bg-tertiary rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                <h3 class="text-sm font-medium text-text-primary">{skill.name}</h3>
                <p class="text-xs text-text-secondary mt-1">{skill.description}</p>
                <div class="flex items-center gap-2 mt-2">
                  <span class="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded">
                    {skill.category}
                  </span>
                  <For each={skill.tags}>
                    {(tag) => (
                      <span class="text-xs px-2 py-0.5 bg-bg-secondary text-text-secondary rounded">
                        {tag}
                      </span>
                    )}
                  </For>
                </div>
              </div>
            )}
          </For>
        </div>
        <Show when={filteredSkills().length === 0}>
          <div class="text-center text-text-secondary text-sm py-8">
            No {props.type} found matching your filters
          </div>
        </Show>
      </div>
    </div>
  );
}
