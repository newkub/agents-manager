import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useKeyboardShortcuts } from '../../src/composables/useKeyboardShortcuts';

describe('useKeyboardShortcuts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return shortcuts', () => {
    const shortcuts = [{ key: 's', ctrlKey: true, handler: vi.fn() }];
    const result = useKeyboardShortcuts(shortcuts);

    expect(result.shortcuts).toEqual(shortcuts);
  });

  it('should match key without modifiers', () => {
    const handler = vi.fn();
    const shortcuts = [{ key: 'a', handler }];
    useKeyboardShortcuts(shortcuts);

    const event = new KeyboardEvent('keydown', { key: 'a' });
    document.dispatchEvent(event);

    expect(handler).toHaveBeenCalled();
  });

  it('should match key with ctrl modifier', () => {
    const handler = vi.fn();
    const shortcuts = [{ key: 's', ctrlKey: true, handler }];
    useKeyboardShortcuts(shortcuts);

    const event = new KeyboardEvent('keydown', { key: 's', ctrlKey: true });
    document.dispatchEvent(event);

    expect(handler).toHaveBeenCalled();
  });

  it('should not match key without required ctrl modifier', () => {
    const handler = vi.fn();
    const shortcuts = [{ key: 's', ctrlKey: true, handler }];
    useKeyboardShortcuts(shortcuts);

    const event = new KeyboardEvent('keydown', { key: 's', ctrlKey: false });
    document.dispatchEvent(event);

    expect(handler).not.toHaveBeenCalled();
  });

  it('should match key with shift modifier', () => {
    const handler = vi.fn();
    const shortcuts = [{ key: 'a', shiftKey: true, handler }];
    useKeyboardShortcuts(shortcuts);

    const event = new KeyboardEvent('keydown', { key: 'a', shiftKey: true });
    document.dispatchEvent(event);

    expect(handler).toHaveBeenCalled();
  });

  it('should match key with alt modifier', () => {
    const handler = vi.fn();
    const shortcuts = [{ key: 'a', altKey: true, handler }];
    useKeyboardShortcuts(shortcuts);

    const event = new KeyboardEvent('keydown', { key: 'a', altKey: true });
    document.dispatchEvent(event);

    expect(handler).toHaveBeenCalled();
  });

  it('should prevent default when shortcut matches', () => {
    const handler = vi.fn();
    const shortcuts = [{ key: 's', ctrlKey: true, handler }];
    useKeyboardShortcuts(shortcuts);

    const event = new KeyboardEvent('keydown', { key: 's', ctrlKey: true });
    vi.spyOn(event, 'preventDefault');
    document.dispatchEvent(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should be case insensitive for key matching', () => {
    const handler = vi.fn();
    const shortcuts = [{ key: 'A', handler }];
    useKeyboardShortcuts(shortcuts);

    const event = new KeyboardEvent('keydown', { key: 'a' });
    document.dispatchEvent(event);

    expect(handler).toHaveBeenCalled();
  });
});
