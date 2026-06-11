import SkillsBrowser from '@components/SkillsBrowser';
import { createSignal } from 'solid-js';
import { useTabs } from '../composables/useTabs';

export default function WorkflowsPage() {
  const { addTab } = useTabs();

  const handleCreateFromTemplate = (template: string) => {
    const fileName = `workflow-${Date.now()}.md`;
    addTab({
      name: fileName,
      path: fileName,
      content: template,
    });
  };

  return (
    <div class="p-6">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-text-primary mb-2">Workflows</h1>
        <p class="text-text-secondary">Browse and create workflow templates</p>
      </div>

      <SkillsBrowser type="workflows" onCreateFromTemplate={handleCreateFromTemplate} />
    </div>
  );
}
