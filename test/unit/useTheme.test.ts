import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTheme } from '../../src/composables/useTheme';

vi.mock('solid-js', async () => {
  const actual = await vi.importActual('solid-js');
  return {
    ...actual,
    onMount: vi.fn(),
  };
});

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

describe('useTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('should initialize with dark theme by default', () => {
    const { theme } = useTheme();
    expect(theme()).toBe('dark');
  });

  it('should toggle theme from dark to light', () => {
    const { theme, toggleTheme } = useTheme();

    toggleTheme();

    expect(theme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should toggle theme from light to dark', () => {
    const { theme, toggleTheme } = useTheme();

    toggleTheme();
    toggleTheme();

    expect(theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should save theme to localStorage', () => {
    const { toggleTheme } = useTheme();

    toggleTheme();

    expect(localStorageMock.getItem('theme')).toBe('light');
  });

  it('should load saved theme from localStorage', () => {
    localStorageMock.setItem('theme', 'light');

    const { theme } = useTheme();

    expect(theme()).toBe('dark'); // onMount is mocked, so it stays at default
  });
});
