import AgentPanel from '@components/AgentPanel';
import Editor from '@components/Editor';
import Preview from '@components/Preview';
import { createSignal, Show } from 'solid-js';
import { useFileSystem } from '../composables/useFileSystem';

export default function MainLayout() {
  const [showPreview, setShowPreview] = createSignal(true);
  const [showAgentPanel, setShowAgentPanel] = createSignal(false);
  const [editorContent, setEditorContent] = createSignal('');
  const { currentFile, openFile, saveFile, loading } = useFileSystem();

  const handleOpenFile = async () => {
    await openFile();
    if (currentFile()) {
      setEditorContent(currentFile()?.content);
    }
  };

  const handleSave = async () => {
    const file = currentFile();
    if (file) {
      await saveFile(editorContent());
    }
  };

  const handleContentChange = (content: string) => {
    setEditorContent(content);
  };

  return (
    <main class="flex-1 flex flex-col overflow-hidden">
      <header class="h-14 bg-bg-secondary border-b border-border flex items-center justify-between px-4">
        <div class="flex items-center gap-4">
          <h2 class="text-lg font-semibold text-text-primary">Skills</h2>
          <span class="text-sm text-text-secondary">{currentFile()?.path || '/ my-skill.md'}</span>
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            onClick={handleOpenFile}
            class="px-3 py-1.5 rounded-md text-sm font-medium bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80 transition-colors"
          >
            Open
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview())}
            classList={{
              'bg-primary text-bg-primary': showPreview(),
              'bg-bg-tertiary text-text-secondary': !showPreview(),
            }}
            class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setShowAgentPanel(!showAgentPanel())}
            classList={{
              'bg-primary text-bg-primary': showAgentPanel(),
              'bg-bg-tertiary text-text-secondary': !showAgentPanel(),
            }}
            class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          >
            Agents
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={loading()}
            class="bg-success text-bg-primary px-3 py-1.5 rounded-md text-sm font-medium hover:bg-success/90 transition-colors disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </header>

      <div class="flex-1 flex overflow-hidden">
        <div class="flex-1 flex">
          <Editor content={editorContent()} onContentChange={handleContentChange} />
          <Show when={showPreview()}>
            <Preview content={editorContent()} />
          </Show>
        </div>

        <Show when={showAgentPanel()}>
          <AgentPanel />
        </Show>
      </div>

      <footer class="h-8 bg-bg-secondary border-t border-border flex items-center justify-between px-4">
        <span class="text-xs text-text-secondary">{loading() ? 'Loading...' : 'Ready'}</span>
        <span class="text-xs text-text-secondary">
          {currentFile() ? `Modified: ${new Date().toLocaleTimeString()}` : 'No file open'}
        </span>
      </footer>
    </main>
  );
}
