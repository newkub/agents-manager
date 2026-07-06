import { describe, expect, it } from 'bun:test';
import { parseFrontmatter } from '../index';

describe('parsers', () => {
  describe('parseFrontmatter', () => {
    it('should parse frontmatter from markdown', () => {
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

    it('should return empty frontmatter when no frontmatter present', () => {
      const content = '# Just a heading\n\nNo frontmatter here.';
      const result = parseFrontmatter(content);
      expect(result.frontmatter).toEqual({});
      expect(result.body).toBe(content);
    });

    it('should handle empty values', () => {
      const content = `---
title:
---\n\nBody`;
      const result = parseFrontmatter(content);
      expect(result.frontmatter.title).toBe('');
    });
  });
});
