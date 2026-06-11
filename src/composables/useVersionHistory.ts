import { createSignal } from 'solid-js';

interface Version {
  id: string;
  timestamp: string;
  content: string;
  description: string;
}

export function useVersionHistory(maxVersions = 10) {
  const [versions, setVersions] = createSignal<Version[]>([]);
  const [currentIndex, setCurrentIndex] = createSignal(-1);

  const addVersion = (content: string, description = 'Manual save') => {
    const newVersion: Version = {
      id: `${Date.now()}`,
      timestamp: new Date().toISOString(),
      content,
      description,
    };

    setVersions((prev) => {
      const updated = [newVersion, ...prev];
      if (updated.length > maxVersions) {
        return updated.slice(0, maxVersions);
      }
      return updated;
    });
    setCurrentIndex(0);
  };

  const restoreVersion = (id: string) => {
    const index = versions().findIndex((v) => v.id === id);
    if (index !== -1) {
      setCurrentIndex(index);
      return versions()[index].content;
    }
    return null;
  };

  const getCurrentVersion = () => {
    if (currentIndex() >= 0 && currentIndex() < versions().length) {
      return versions()[currentIndex()];
    }
    return null;
  };

  const canUndo = () => currentIndex() < versions().length - 1;
  const canRedo = () => currentIndex() > 0;

  const undo = () => {
    if (canUndo()) {
      setCurrentIndex((prev) => prev + 1);
      return versions()[currentIndex()]?.content;
    }
    return null;
  };

  const redo = () => {
    if (canRedo()) {
      setCurrentIndex((prev) => prev - 1);
      return versions()[currentIndex()]?.content;
    }
    return null;
  };

  return {
    versions,
    currentIndex,
    addVersion,
    restoreVersion,
    getCurrentVersion,
    canUndo,
    canRedo,
    undo,
    redo,
  };
}
