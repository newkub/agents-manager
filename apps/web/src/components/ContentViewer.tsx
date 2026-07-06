import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { createEffect, createMemo, createSignal, Show } from 'solid-js';
import { highlightCode } from '../utils/shiki';

interface ContentViewerProps {
  content: string;
  name: string;
  description: string;
  filePath: string;
  tags?: string[];
  tools?: string[];
}

export function ContentViewer(props: ContentViewerProps) {
  const [rendered, setRendered] = createSignal('');
  const [activeTab, setActiveTab] = createSignal<'preview' | 'source'>('preview');

  const html = createMemo(() => {
    const raw = marked.parse(props.content, { async: false }) as string;
    return DOMPurify.sanitize(raw);
  });

  createEffect(() => {
    if (activeTab() === 'preview') {
      setRendered(html());
    }
  });

  const sourceHtml = createMemo(() => {
    const result = `<pre><code>${escapeHtml(props.content)}</code></pre>`;
    highlightCode(props.content, 'markdown')
      .then((highlighted) => setRendered(highlighted))
      .catch(() => setRendered(result));
    return result;
  });

  return (
    <div class="flex-1 h-full overflow-hidden flex flex-col bg-bg-primary">
      <div class="p-4 border-b border-border">
        <h1 class="text-xl font-bold text-text-primary">{props.name}</h1>
        <p class="text-sm text-text-secondary mt-1">{props.description}</p>
        <div class="flex items-center gap-2 mt-2">
          <code class="text-xs text-text-secondary bg-bg-tertiary px-2 py-1 rounded">
            {props.filePath}
          </code>
          <Show when={props.tags && props.tags.length > 0}>
            <div class="flex gap-1">
              {props.tags?.map((tag) => (
                <span class="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded">{tag}</span>
              ))}
            </div>
          </Show>
          <Show when={props.tools && props.tools.length > 0}>
            <div class="flex gap-1">
              {props.tools?.map((tool) => (
                <span class="text-xs px-2 py-0.5 bg-success/20 text-success rounded">{tool}</span>
              ))}
            </div>
          </Show>
        </div>
      </div>
      <div class="flex border-b border-border">
        <button
          type="button"
          class={`px-4 py-2 text-sm font-medium ${
            activeTab() === 'preview'
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-secondary hover:text-text-primary'
          }`}
          onClick={() => {
            setActiveTab('preview');
            setRendered(html());
          }}
        >
          Preview
        </button>
        <button
          type="button"
          class={`px-4 py-2 text-sm font-medium ${
            activeTab() === 'source'
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-secondary hover:text-text-primary'
          }`}
          onClick={() => {
            setActiveTab('source');
            sourceHtml();
          }}
        >
          Source
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-6">
        <Show
          when={activeTab() === 'preview'}
          fallback={
            <div class="font-mono text-sm">
              <div innerHTML={rendered()} />
            </div>
          }
        >
          <div
            class="prose prose-invert max-w-none text-text-primary markdown-content"
            innerHTML={rendered()}
          />
        </Show>
      </div>
    </div>
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
