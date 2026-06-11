import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useAutoSave } from '../../src/composables/useAutoSave';

describe('useAutoSave', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with resetTimer and save functions', () => {
    const onSave = vi.fn();
    const { resetTimer, save } = useAutoSave({ onSave });

    expect(resetTimer).toBeDefined();
    expect(save).toBeDefined();
  });

  it('should call save when timer expires', async () => {
    const onSave = vi.fn();
    const { resetTimer } = useAutoSave({ interval: 1000, onSave });

    resetTimer();
    vi.advanceTimersByTime(1000);

    await vi.runAllTimersAsync();
    expect(onSave).toHaveBeenCalled();
  });

  it('should not call save when disabled', async () => {
    const onSave = vi.fn();
    const { resetTimer } = useAutoSave({ interval: 1000, onSave, enabled: false });

    resetTimer();
    vi.advanceTimersByTime(1000);

    await vi.runAllTimersAsync();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('should clear previous timer when resetTimer is called', async () => {
    const onSave = vi.fn();
    const { resetTimer } = useAutoSave({ interval: 1000, onSave });

    resetTimer();
    vi.advanceTimersByTime(500);
    resetTimer();
    vi.advanceTimersByTime(500);

    await vi.runAllTimersAsync();
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('should call save immediately when save is called', async () => {
    const onSave = vi.fn();
    const { save } = useAutoSave({ onSave });

    await save();

    expect(onSave).toHaveBeenCalled();
  });

  it('should use default interval of 30000ms', async () => {
    const onSave = vi.fn();
    const { resetTimer } = useAutoSave({ onSave });

    resetTimer();
    vi.advanceTimersByTime(29999);

    await vi.runAllTimersAsync();
    expect(onSave).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1);
    await vi.runAllTimersAsync();
    expect(onSave).toHaveBeenCalledTimes(1);
  });
});
