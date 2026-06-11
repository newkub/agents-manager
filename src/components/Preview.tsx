import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { createHighlighter } from 'shiki';
import { createSignal, onMount, createEffect } from 'solid-js';

interface PreviewProps {
  content?: string;
}

export default function Preview(props: PreviewProps) {
  const [html, setHtml] = createSignal('');
  const [toc, setToc] = createSignal<{ id: string; text: string; level: number }[]>([]);

  createEffect(async () => {
    const highlighter = await createHighlighter({
      themes: ['github-dark'],
      langs: ['typescript', 'javascript', 'python', 'bash', 'markdown'],
    });

    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    const markdown = props.content || `---
title: My Skill
description: A useful skill for agents
category: utility
tags: ['helper', 'automation']
---

# My Skill

This is a sample skill for the agent manager.

## Usage

\`\`\`typescript
const result = await executeSkill({ input: 'test' })
\`\`\`

## Features

- Feature 1
- Feature 2
- Feature 3

## Advanced Topics

### Subsection 1

Content here.

### Subsection 2

More content.
`;

    const headings: { id: string; text: string; level: number }[] = [];

    marked.use({
      renderer: {
        heading({ text, depth, raw }: { text: string; depth: number; raw: string }) {
          const id = raw.toLowerCase().replace(/[^\w]+/g, '-');
          headings.push({ id, text, level: depth });
          return `<h${depth} id="${id}" class="scroll-mt-4">${text}</h${depth}>`;
        },
        code({ text, lang }: { text: string; lang?: string }) {
          if (lang && highlighter.getLoadedLanguages().includes(lang)) {
            return highlighter.codeToHtml(text, {
              lang,
              theme: 'github-dark',
            });
          }
          return `<pre><code>${text}</code></pre>`;
        },
      },
    });

    const rendered = await marked.parse(markdown);
    setHtml(DOMPurify.sanitize(rendered));
    setToc(headings);
  });

  return (
    <div class="flex-1 flex flex-col overflow-hidden">
      <div class="h-10 bg-bg-tertiary border-b border-border flex items-center px-4">
        <span class="text-sm font-medium text-text-primary">Preview</span>
      </div>
      <div class="flex-1 flex overflow-hidden">
        <div class="flex-1 overflow-y-auto p-6">
          <div class="prose prose-invert max-w-none" innerHTML={html()} />
        </div>
        <div class="w-64 border-l border-border overflow-y-auto p-4">
          <h3 class="text-sm font-semibold text-text-primary mb-3">Table of Contents</h3>
          <ul class="space-y-2">
            {toc().map((item) => (
              <li
                classList={{
                  'ml-4': item.level > 1,
                  'ml-8': item.level > 2,
                }}
              >
                <a
                  href={`#${item.id}`}
                  class="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
