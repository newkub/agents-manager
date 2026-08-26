import { createEffect, createSignal, For, onMount, Show } from 'solid-js';
import { providerStore } from '../stores/providers';
import type { Session } from '../types';

type View = 'list' | 'new' | 'detail';

export function SessionTab() {
  const [view, setView] = createSignal<View>('list');
  const [sessions, setSessions] = createSignal<Session[]>([]);
  const [selectedId, setSelectedId] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal('');

  const provider = providerStore.activeProvider;
  const activeConfig = providerStore.activeConfig;

  const selectedSession = () => sessions().find((s) => s.id === selectedId());

  const load = async () => {
    const p = provider();
    if (!p) {
      setSessions([]);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const list = await p.listSessions();
      setSessions(list);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  onMount(load);
  createEffect(() => {
    provider();
    void load();
  });

  const onCreate = async (prompt: string) => {
    const p = provider();
    if (!p) return;
    setLoading(true);
    setError('');
    try {
      const s = await p.createSession(prompt);
      setSessions((prev) => [s, ...prev]);
      setSelectedId(s.id);
      setView('detail');
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  const onSend = async (content: string) => {
    const p = provider();
    const s = selectedSession();
    if (!p || !s) return;
    setLoading(true);
    setError('');
    try {
      await p.sendMessage(s.id, content);
      await load();
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  const onArchive = async () => {
    const p = provider();
    const s = selectedSession();
    if (!p || !s) return;
    setLoading(true);
    setError('');
    try {
      await p.archiveSession(s.id);
      await load();
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    const p = provider();
    const s = selectedSession();
    if (!p || !s) return;
    setLoading(true);
    setError('');
    try {
      await p.deleteSession(s.id);
      await load();
      setView('list');
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="mobile-tab-content">
      <Show when={view() === 'list'}>
        <div class="mobile-header">
          <div>
            <h2 class="mobile-title">Sessions</h2>
            <Show when={activeConfig()}>
              <span class="mobile-meta">{activeConfig()?.name}</span>
            </Show>
          </div>
          <button
            type="button"
            class="mobile-icon-btn"
            onClick={() => setView('new')}
            aria-label="New session"
          >
            +
          </button>
        </div>

        <Show when={!activeConfig()?.enabled}>
          <div class="mobile-banner info">Provider is disabled. Enable it in Settings.</div>
        </Show>
        <Show when={error()}>
          <div class="mobile-banner error">{error()}</div>
        </Show>
        <Show when={loading()}>
          <div class="mobile-loading">Loading...</div>
        </Show>

        <ul class="mobile-list">
          <For each={sessions()}>
            {(s) => (
              <li
                class="mobile-list-item"
                onClick={() => {
                  setSelectedId(s.id);
                  setView('detail');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedId(s.id);
                    setView('detail');
                  }
                }}
              >
                <div class="mobile-row">
                  <span class={`mobile-status-dot status-${s.status}`} />
                  <span class="mobile-item-title">{s.title || s.prompt.slice(0, 30)}</span>
                </div>
                <span class="mobile-meta">
                  {s.status} · {s.updatedAt}
                </span>
              </li>
            )}
          </For>
        </ul>
      </Show>

      <Show when={view() === 'new'}>
        <div class="mobile-header">
          <button type="button" class="mobile-back-btn" onClick={() => setView('list')}>
            &lt; Back
          </button>
          <h2 class="mobile-title">New Session</h2>
        </div>
        <NewSessionForm onCreate={onCreate} loading={loading()} />
      </Show>

      <Show when={view() === 'detail'}>
        <SessionDetail
          session={selectedSession()}
          onBack={() => setView('list')}
          onSend={onSend}
          onArchive={onArchive}
          onDelete={onDelete}
          loading={loading()}
        />
      </Show>
    </div>
  );
}

function NewSessionForm(props: { onCreate: (prompt: string) => void; loading: boolean }) {
  const [prompt, setPrompt] = createSignal('');
  return (
    <form
      class="mobile-form"
      onSubmit={(e) => {
        e.preventDefault();
        props.onCreate(prompt());
      }}
    >
      <label class="mobile-label">
        Prompt
        <textarea
          class="mobile-textarea"
          value={prompt()}
          onInput={(e) => setPrompt(e.currentTarget.value)}
          rows={4}
          placeholder="What should the agent do?"
        />
      </label>
      <button type="submit" class="mobile-btn" disabled={!prompt() || props.loading}>
        Create Session
      </button>
    </form>
  );
}

function SessionDetail(props: {
  session?: Session;
  onBack: () => void;
  onSend: (c: string) => void;
  onArchive: () => void;
  onDelete: () => void;
  loading: boolean;
}) {
  const [reply, setReply] = createSignal('');
  return (
    <div class="mobile-tab-content">
      <div class="mobile-header">
        <button type="button" class="mobile-back-btn" onClick={props.onBack}>
          &lt; Back
        </button>
        <h2 class="mobile-title">{props.session?.title || 'Session'}</h2>
      </div>
      <div class="mobile-detail-actions">
        <button type="button" class="mobile-btn" onClick={props.onArchive} disabled={props.loading}>
          Archive
        </button>
        <button
          type="button"
          class="mobile-btn danger"
          onClick={props.onDelete}
          disabled={props.loading}
        >
          Delete
        </button>
      </div>
      <Show when={props.session} fallback={<div class="mobile-empty">Session not found</div>}>
        {(session) => (
          <ul class="mobile-chat">
            <For each={session().messages}>
              {(m) => (
                <li class={`mobile-msg ${m.role === 'user' ? 'user' : 'assistant'}`}>
                  <span class="mobile-msg-badge">{m.role}</span>
                  {m.content}
                </li>
              )}
            </For>
          </ul>
        )}
      </Show>
      <form
        class="mobile-input-bar"
        onSubmit={(e) => {
          e.preventDefault();
          props.onSend(reply());
          setReply('');
        }}
      >
        <input
          class="mobile-input"
          value={reply()}
          onInput={(e) => setReply(e.currentTarget.value)}
          placeholder="Type a message..."
        />
        <button type="submit" class="mobile-btn" disabled={!reply() || props.loading}>
          Send
        </button>
      </form>
    </div>
  );
}
