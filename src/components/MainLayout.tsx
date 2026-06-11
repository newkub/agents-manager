import AgentPanel from '@components/AgentPanel';
import Editor from '@components/Editor';
import Preview from '@components/Preview';
import TabBar from '@components/TabBar';
import CommandPalette, { useCommandPalette } from '@components/CommandPalette';
import SettingsModal, { useSettingsModal } from '@components/SettingsModal';
import Sidebar from '@components/Sidebar';
import { createSignal, Show, children } from 'solid-js';
import { useNavigate, useLocation } from '@solidjs/router';
import { useFileSystem } from '../composables/useFileSystem';
import { useResizablePanel } from '../composables/useResizablePanel';
import { useKeyboardShortcuts } from '../composables/useKeyboardShortcuts';
import { useTabs } from '../composables/useTabs';
import { useAutoSave } from '../composables/useAutoSave';
import { useVersionHistory } from '../composables/useVersionHistory';
import { exportSkill, importSkill } from '../utils/exportImport';

export default function MainLayout(props: any) {
  const resolved = children(() => props.children);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPreview, setShowPreview] = createSignal(true);
  const [showAgentPanel, setShowAgentPanel] = createSignal(false);
  const { currentFile, openFile, saveFile, loading } = useFileSystem();
  const { tabs, activeTabId, addTab, removeTab, setActiveTab, updateTabContent, getActiveTab } =
    useTabs();
  const {
    isOpen: isCommandPaletteOpen,
    open: openCommandPalette,
    close: closeCommandPalette,
  } = useCommandPalette();
  const { isOpen: isSettingsOpen, open: openSettings, close: closeSettings } = useSettingsModal();
  const { addVersion, undo, redo, canUndo, canRedo } = useVersionHistory();

  const editorPanel = useResizablePanel({ defaultSize: 50, minSize: 20, maxSize: 80 });
  const previewPanel = useResizablePanel({ defaultSize: 50, minSize: 20, maxSize: 80 });
  const agentPanel = useResizablePanel({ defaultSize: 30, minSize: 20, maxSize: 50 });

  const commands = () => [
    {
      id: 'open-file',
      label: 'Open File',
      shortcut: 'Ctrl+O',
      icon: 'lucide-folder-open',
      action: handleOpenFile,
    },
    {
      id: 'save',
      label: 'Save File',
      shortcut: 'Ctrl+S',
      icon: 'lucide-save',
      action: handleSave,
    },
    {
      id: 'toggle-preview',
      label: 'Toggle Preview',
      shortcut: 'Ctrl+P',
      icon: 'lucide-eye',
      action: () => setShowPreview(!showPreview()),
    },
    {
      id: 'toggle-agents',
      label: 'Toggle Agent Panel',
      shortcut: 'Ctrl+A',
      icon: 'lucide-bot',
      action: () => setShowAgentPanel(!showAgentPanel()),
    },
    {
      id: 'settings',
      label: 'Settings',
      shortcut: 'Ctrl+,',
      icon: 'lucide-settings',
      action: openSettings,
    },
  ];

  useKeyboardShortcuts([
    {
      key: 's',
      ctrlKey: true,
      handler: () => handleSave(),
      description: 'Save file',
    },
    {
      key: 'p',
      ctrlKey: true,
      handler: () => setShowPreview(!showPreview()),
      description: 'Toggle preview',
    },
    {
      key: 'a',
      ctrlKey: true,
      handler: () => setShowAgentPanel(!showAgentPanel()),
      description: 'Toggle agent panel',
    },
    {
      key: 'k',
      ctrlKey: true,
      handler: () => openCommandPalette(),
      description: 'Open command palette',
    },
  ]);

  const handleOpenFile = async () => {
    await openFile();
    if (currentFile()) {
      const file = currentFile()!;
      const existingTab = tabs().find((t: { path: string }) => t.path === file.path);
      const fileName = file.path.split('/').pop() || file.path;

      if (existingTab) {
        setActiveTab(existingTab.id);
      } else {
        addTab({
          name: fileName,
          path: file.path,
          content: file.content || '',
        });
      }
    }
  };

  const handleSave = async () => {
    const activeTab = getActiveTab();
    if (activeTab) {
      await saveFile(activeTab.content);
      updateTabContent(activeTab.id, activeTab.content);
    }
  };

  useAutoSave({
    interval: 30000,
    onSave: handleSave,
    enabled: true,
  });

  const handleContentChange = (content: string) => {
    const activeTab = getActiveTab();
    if (activeTab) {
      updateTabContent(activeTab.id, content);
      addVersion(content, 'Content change');
    }
  };

  const handleUndo = () => {
    const content = undo();
    if (content) {
      const activeTab = getActiveTab();
      if (activeTab) {
        updateTabContent(activeTab.id, content);
      }
    }
  };

  const handleRedo = () => {
    const content = redo();
    if (content) {
      const activeTab = getActiveTab();
      if (activeTab) {
        updateTabContent(activeTab.id, content);
      }
    }
  };

  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  const handleTabClose = (id: string) => {
    removeTab(id);
  };

  const handleExport = async () => {
    const activeTab = getActiveTab();
    if (activeTab) {
      const success = await exportSkill(activeTab.content, `${activeTab.name}.md`);
      if (success) {
        console.log('Export successful');
      }
    }
  };

  const handleImport = async () => {
    const content = await importSkill();
    if (content) {
      const fileName = `imported-${Date.now()}.md`;
      addTab({
        name: fileName,
        path: fileName,
        content,
      });
    }
  };

  return (
    <div class="flex flex-1 overflow-hidden">
      <Sidebar navigate={navigate} currentPath={() => location.pathname} />
      <main class="flex-1 flex flex-col overflow-hidden">
        <header class="h-14 bg-bg-secondary border-b border-border flex items-center justify-between px-4">
          <div class="flex items-center gap-4">
            <h2 class="text-lg font-semibold text-text-primary">Skills</h2>
            <span class="text-sm text-text-secondary">{currentFile()?.path || '/ my-skill.md'}</span>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUndo}
              disabled={!canUndo()}
              class="px-3 py-1.5 rounded-md text-sm font-medium bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80 transition-colors disabled:opacity-50"
            >
              <span class="i-lucide-undo" />
            </button>
            <button
              type="button"
              onClick={handleRedo}
              disabled={!canRedo()}
              class="px-3 py-1.5 rounded-md text-sm font-medium bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80 transition-colors disabled:opacity-50"
            >
              <span class="i-lucide-redo" />
            </button>
            <button
              type="button"
              onClick={handleOpenFile}
              class="px-3 py-1.5 rounded-md text-sm font-medium bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80 transition-colors"
            >
              Open
            </button>
            <button
              type="button"
              onClick={handleImport}
              class="px-3 py-1.5 rounded-md text-sm font-medium bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80 transition-colors"
            >
              Import
            </button>
            <button
              type="button"
              onClick={handleExport}
              class="px-3 py-1.5 rounded-md text-sm font-medium bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80 transition-colors"
            >
              Export
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
            <button
              type="button"
              onClick={openSettings}
              class="px-3 py-1.5 rounded-md text-sm font-medium bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80 transition-colors"
            >
              <span class="i-lucide-settings" />
            </button>
          </div>
        </header>

        <TabBar
          tabs={tabs()}
          activeTabId={activeTabId()}
          onTabClick={handleTabClick}
          onTabClose={handleTabClose}
        />

        <div class="flex-1 flex overflow-hidden" ref={editorPanel.setContainerRef}>
          <Show when={resolved()}>
            <div class="flex-1 overflow-auto">{resolved()}</div>
          </Show>

          <Show when={!resolved()}>
            <div class="flex" style={{ width: `${editorPanel.size()}%` }}>
              <Editor content={getActiveTab()?.content || ''} onContentChange={handleContentChange} />
              <Show when={showPreview()}>
                <div
                  class="w-1 bg-border cursor-col-resize hover:bg-primary transition-colors"
                  onMouseDown={editorPanel.handleMouseDown}
                />
                <div class="flex" style={{ width: `${100 - editorPanel.size()}%` }}>
                  <Preview content={getActiveTab()?.content || ''} />
                </div>
              </Show>
            </div>

            <Show when={showAgentPanel()}>
              <div
                class="w-1 bg-border cursor-col-resize hover:bg-primary transition-colors"
                onMouseDown={agentPanel.handleMouseDown}
              />
              <div style={{ width: `${agentPanel.size()}%` }}>
                <AgentPanel />
              </div>
            </Show>
          </Show>
        </div>

        <CommandPalette
          commands={commands()}
          isOpen={isCommandPaletteOpen()}
          onClose={closeCommandPalette}
        />

        <SettingsModal isOpen={isSettingsOpen()} onClose={closeSettings} />

        <footer class="h-8 bg-bg-secondary border-t border-border flex items-center justify-between px-4">
          <span class="text-xs text-text-secondary">{loading() ? 'Loading...' : 'Ready'}</span>
          <span class="text-xs text-text-secondary">
            {currentFile() ? `Modified: ${new Date().toLocaleTimeString()}` : 'No file open'}
          </span>
        </footer>
      </main>
    </div>
  );
}
