import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFileSystem } from '../../src/composables/useFileSystem';

// Mock Tauri APIs
vi.mock('@tauri-apps/plugin-dialog', () => ({
  open: vi.fn(),
  save: vi.fn(),
}));

vi.mock('@tauri-apps/plugin-fs', () => ({
  readTextFile: vi.fn(),
  writeTextFile: vi.fn(),
}));

describe('useFileSystem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with null currentFile, false loading, and null error', () => {
    const { currentFile, loading, error } = useFileSystem();
    expect(currentFile()).toBeNull();
    expect(loading()).toBe(false);
    expect(error()).toBeNull();
  });

  it('should open file successfully', async () => {
    const { openFile } = useFileSystem();
    const { open } = await import('@tauri-apps/plugin-dialog');
    const { readTextFile } = await import('@tauri-apps/plugin-fs');

    vi.mocked(open).mockResolvedValue('/test/file.md');
    vi.mocked(readTextFile).mockResolvedValue('test content');

    await openFile();

    expect(open).toHaveBeenCalled();
    expect(readTextFile).toHaveBeenCalledWith('/test/file.md');
  });

  it('should set error when open file fails', async () => {
    const { openFile, error } = useFileSystem();
    const { open } = await import('@tauri-apps/plugin-dialog');
    const { readTextFile } = await import('@tauri-apps/plugin-fs');

    vi.mocked(open).mockResolvedValue('/test/file.md');
    vi.mocked(readTextFile).mockRejectedValue(new Error('Read failed'));

    await openFile();

    expect(error()).toContain('Failed to open file');
  });

  it('should not set currentFile when open returns null', async () => {
    const { openFile, currentFile } = useFileSystem();
    const { open } = await import('@tauri-apps/plugin-dialog');

    vi.mocked(open).mockResolvedValue(null);

    await openFile();

    expect(currentFile()).toBeNull();
  });

  it('should save existing file successfully', async () => {
    const { openFile, saveFile } = useFileSystem();
    const { open } = await import('@tauri-apps/plugin-dialog');
    const { readTextFile, writeTextFile } = await import('@tauri-apps/plugin-fs');

    vi.mocked(open).mockResolvedValue('/test/file.md');
    vi.mocked(readTextFile).mockResolvedValue('old content');
    vi.mocked(writeTextFile).mockResolvedValue(undefined);

    await openFile();
    await saveFile('new content');

    expect(writeTextFile).toHaveBeenCalledWith('/test/file.md', 'new content');
  });

  it('should save new file with save dialog', async () => {
    const { saveFile } = useFileSystem();
    const { save } = await import('@tauri-apps/plugin-dialog');
    const { writeTextFile } = await import('@tauri-apps/plugin-fs');

    vi.mocked(save).mockResolvedValue('/test/new.md');
    vi.mocked(writeTextFile).mockResolvedValue(undefined);

    await saveFile('new content');

    expect(save).toHaveBeenCalled();
    expect(writeTextFile).toHaveBeenCalledWith('/test/new.md', 'new content');
  });

  it('should set error when save file fails', async () => {
    const { saveFile, error } = useFileSystem();
    const { writeTextFile } = await import('@tauri-apps/plugin-fs');

    vi.mocked(writeTextFile).mockRejectedValue(new Error('Write failed'));

    await expect(saveFile('content')).rejects.toThrow();
    expect(error()).toContain('Failed to save file');
  });

  it('should set loading state during operations', async () => {
    const { openFile, loading } = useFileSystem();
    const { open } = await import('@tauri-apps/plugin-dialog');
    const { readTextFile } = await import('@tauri-apps/plugin-fs');

    vi.mocked(open).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve('/test/file.md'), 10))
    );
    vi.mocked(readTextFile).mockResolvedValue('content');

    const openPromise = openFile();
    expect(loading()).toBe(true);
    await openPromise;
    expect(loading()).toBe(false);
  });
});
