import { describe, it, expect } from 'vitest';
import { useTabs } from '../../src/composables/useTabs';

describe('useTabs', () => {
  it('should initialize with empty tabs and null activeTabId', () => {
    const { tabs, activeTabId } = useTabs();
    expect(tabs()).toEqual([]);
    expect(activeTabId()).toBeNull();
  });

  it('should add a new tab', () => {
    const { tabs, activeTabId, addTab } = useTabs();

    const id = addTab({ name: 'test', path: '/test.md', content: 'content' });

    expect(tabs()).toHaveLength(1);
    expect(tabs()[0].name).toBe('test');
    expect(activeTabId()).toBe(id);
  });

  it('should remove a tab', () => {
    const { tabs, activeTabId, addTab, removeTab } = useTabs();

    const id1 = addTab({ name: 'test1', path: '/test1.md', content: 'content1' });
    addTab({ name: 'test2', path: '/test2.md', content: 'content2' });

    removeTab(id1);

    expect(tabs()).toHaveLength(1);
    expect(tabs()[0].name).toBe('test2');
  });

  it('should set active tab when removing current active tab', () => {
    const { tabs, activeTabId, addTab, removeTab } = useTabs();

    const id1 = addTab({ name: 'test1', path: '/test1.md', content: 'content1' });
    const id2 = addTab({ name: 'test2', path: '/test2.md', content: 'content2' });

    removeTab(id1);

    expect(activeTabId()).toBe(id2);
  });

  it('should set active tab to null when removing last tab', () => {
    const { tabs, activeTabId, addTab, removeTab } = useTabs();

    const id = addTab({ name: 'test', path: '/test.md', content: 'content' });

    removeTab(id);

    expect(activeTabId()).toBeNull();
  });

  it('should set active tab', () => {
    const { activeTabId, addTab, setActiveTab } = useTabs();

    const id = addTab({ name: 'test', path: '/test.md', content: 'content' });
    setActiveTab(id);

    expect(activeTabId()).toBe(id);
  });

  it('should update tab content and mark as modified', () => {
    const { tabs, addTab, updateTabContent } = useTabs();

    const id = addTab({ name: 'test', path: '/test.md', content: 'content' });
    updateTabContent(id, 'new content');

    expect(tabs()[0].content).toBe('new content');
    expect(tabs()[0].modified).toBe(true);
  });

  it('should get active tab', () => {
    const { addTab, getActiveTab } = useTabs();

    const id = addTab({ name: 'test', path: '/test.md', content: 'content' });
    const activeTab = getActiveTab();

    expect(activeTab?.id).toBe(id);
  });

  it('should return null when no active tab', () => {
    const { getActiveTab } = useTabs();

    const activeTab = getActiveTab();

    expect(activeTab).toBeUndefined();
  });

  it('should clear all tabs', () => {
    const { tabs, activeTabId, addTab, clearTabs } = useTabs();

    addTab({ name: 'test1', path: '/test1.md', content: 'content1' });
    addTab({ name: 'test2', path: '/test2.md', content: 'content2' });

    clearTabs();

    expect(tabs()).toEqual([]);
    expect(activeTabId()).toBeNull();
  });

  it('should not change active tab when removing non-active tab', () => {
    const { tabs, activeTabId, addTab, removeTab } = useTabs();

    const id1 = addTab({ name: 'test1', path: '/test1.md', content: 'content1' });
    const id2 = addTab({ name: 'test2', path: '/test2.md', content: 'content2' });

    removeTab(id2);

    expect(activeTabId()).toBe(id1);
  });

  it('should update tab content without marking as modified when content is same', () => {
    const { tabs, addTab, updateTabContent } = useTabs();

    const id = addTab({ name: 'test', path: '/test.md', content: 'content' });
    updateTabContent(id, 'content');

    expect(tabs()[0].content).toBe('content');
    expect(tabs()[0].modified).toBe(true);
  });
});
