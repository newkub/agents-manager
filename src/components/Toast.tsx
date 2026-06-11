import { createSignal, For, onCleanup, onMount } from 'solid-js';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = createSignal<Toast[]>([]);

  const addToast = (message: string, type: Toast['type'] = 'info', duration = 3000) => {
    const id = `${Date.now()}-${Math.random()}`;
    const toast: Toast = { id, message, type, duration };
    setToasts([...toasts(), toast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  const removeToast = (id: string) => {
    setToasts(toasts().filter((t) => t.id !== id));
  };

  const success = (message: string, duration?: number) => addToast(message, 'success', duration);
  const error = (message: string, duration?: number) => addToast(message, 'error', duration);
  const warning = (message: string, duration?: number) => addToast(message, 'warning', duration);
  const info = (message: string, duration?: number) => addToast(message, 'info', duration);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'i-lucide-check-circle';
      case 'error':
        return 'i-lucide-x-circle';
      case 'warning':
        return 'i-lucide-alert-triangle';
      case 'info':
        return 'i-lucide-info';
      default:
        return 'i-lucide-info';
    }
  };

  const getColor = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-success';
      case 'error':
        return 'bg-error';
      case 'warning':
        return 'bg-warning';
      case 'info':
        return 'bg-primary';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div class="fixed bottom-4 right-4 z-50 space-y-2">
      <For each={toasts()}>
        {(toast) => (
          <div
            class={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${getColor(toast.type)} text-bg-primary min-w-72 animate-in slide-in-from-right duration-300`}
          >
            <span class={`${getIcon(toast.type)} text-lg`} />
            <span class="flex-1 text-sm font-medium">{toast.message}</span>
            <button
              type="button"
              class="hover:opacity-80 transition-opacity"
              onClick={() => removeToast(toast.id)}
            >
              <span class="i-lucide-x" />
            </button>
          </div>
        )}
      </For>
    </div>
  );
}
