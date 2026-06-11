import { createEffect, onCleanup } from 'solid-js';

interface UseAutoSaveOptions {
  interval?: number;
  onSave: () => void | Promise<void>;
  enabled?: boolean;
}

export function useAutoSave(options: UseAutoSaveOptions) {
  const { interval = 30000, onSave, enabled = true } = options;
  let timeoutId: number | undefined;

  const save = async () => {
    if (enabled) {
      await onSave();
    }
  };

  const resetTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      save();
    }, interval);
  };

  onCleanup(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });

  return {
    resetTimer,
    save,
  };
}
