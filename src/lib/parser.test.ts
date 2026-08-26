import { describe, expect, it } from 'vitest';
import { extractDescription, extractTags, extractToolsFromMcp, parseFrontmatter } from './parser';

describe('parser', () => {
  describe('parseFrontmatter', () => {
    it('parses frontmatter and body from markdown', () => {
      const content = `---
title: Test Skill
description: A test skill
category: testing
---

# Test Skill

Body content here.`;
      const result = parseFrontmatter(content);
      expect(result.frontmatter.title).toBe('Test Skill');
      expect(result.frontmatter.description).toBe('A test skill');
      expect(result.frontmatter.category).toBe('testing');
      expect(result.body).toContain('# Test Skill');
    });

    it('returns empty frontmatter when no frontmatter present', () => {
      const content = `# Just a heading\n\nBody`;
      const result = parseFrontmatter(content);
      expect(result.frontmatter).toEqual({});
      expect(result.body).toBe(content);
    });

    it('returns empty values for empty frontmatter fields', () => {
      const content = `---\ntitle:\n---\n\nBody`;
      const result = parseFrontmatter(content);
      expect(result.frontmatter.title).toBe('');
    });
  });

  describe('extractDescription', () => {
    it('uses description from frontmatter', () => {
      const content = `---\ndescription: From frontmatter\n---\n# Title`;
      expect(extractDescription(content)).toBe('From frontmatter');
    });

    it('falls back to first heading', () => {
      const content = `# Fallback Title\n\nBody`;
      expect(extractDescription(content)).toBe('Fallback Title');
    });
  });

  describe('extractTags', () => {
    it('extracts comma-separated tags', () => {
      const content = `---\ntags: a, b, c\n---\n`;
      expect(extractTags(content)).toEqual(['a', 'b', 'c']);
    });

    it('handles bracketed tags', () => {
      const content = `---\ntags: [a, b]\n---\n`;
      expect(extractTags(content)).toEqual(['a', 'b']);
    });
  });

  describe('extractToolsFromMcp', () => {
    it('extracts tool names from headings', () => {
      const content = `## Tool: search\n## Tool query\n### Tool: update`;
      const tools = extractToolsFromMcp(content);
      expect(tools).toContain('search');
      expect(tools).toContain('query');
      expect(tools).toContain('update');
    });
  });
});
