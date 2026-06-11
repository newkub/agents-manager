import Editor from '@monaco-editor/react';
import { createSignal } from 'solid-js';

interface CodeEditorProps {
  content?: string;
  onContentChange?: (content: string) => void;
}

export default function CodeEditor(props: CodeEditorProps) {
  const [code, setCode] = createSignal(props.content || `---
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
`);

  const handleChange = (value: string | undefined) => {
    const newContent = value || '';
    setCode(newContent);
    props.onContentChange?.(newContent);
  };

  return (
    <div class="flex-1 flex flex-col border-r border-border">
      <div class="h-10 bg-bg-tertiary border-b border-border flex items-center px-4">
        <span class="text-sm font-medium text-text-primary">Editor</span>
      </div>
      <div class="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="markdown"
          theme="vs-dark"
          value={code()}
          onChange={handleChange}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
}
