import { createSignal, onCleanup, onMount } from 'solid-js';

interface UseResizablePanelOptions {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  direction?: 'horizontal' | 'vertical';
  onResize?: (size: number) => void;
}

export function useResizablePanel(options: UseResizablePanelOptions = {}) {
  const {
    defaultSize = 50,
    minSize = 20,
    maxSize = 80,
    direction = 'horizontal',
    onResize,
  } = options;

  const [size, setSize] = createSignal(defaultSize);
  const [isResizing, setIsResizing] = createSignal(false);

  let containerRef: HTMLDivElement | undefined;
  let startPos = 0;
  let startSize = 0;

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startPos = direction === 'horizontal' ? e.clientX : e.clientY;
    startSize = size();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing()) return;

    const currentPos = direction === 'horizontal' ? e.clientX : e.clientY;
    const delta = currentPos - startPos;
    const containerSize = containerRef
      ? direction === 'horizontal'
        ? containerRef.offsetWidth
        : containerRef.offsetHeight
      : 1000;

    const newPercent = startSize + (delta / containerSize) * 100;
    const clampedSize = Math.max(minSize, Math.min(maxSize, newPercent));

    setSize(clampedSize);
    onResize?.(clampedSize);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  onCleanup(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  });

  return {
    size,
    isResizing,
    handleMouseDown,
    setContainerRef: (ref: HTMLDivElement) => {
      containerRef = ref;
    },
  };
}
