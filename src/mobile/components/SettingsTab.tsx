import { createSignal, For, Show } from 'solid-js';
import type { ProviderConfig } from '../providers/types';
import { providerStore } from '../stores/providers';

type View = 'list' | 'edit';

export function SettingsTab() {
  const [view, setView] = createSignal<View>('list');
  const [editing, setEditing] = createSignal<ProviderConfig | null>(null);

  const addNew = () => {
    const id = `custom-${Date.now()}`;
    const cfg: ProviderConfig = {
      id,
      name: 'New Provider',
      type: 'custom',
      token: '',
      baseUrl: '',
      model: '',
      enabled: false,
    };
    providerStore.addProvider(cfg);
    setEditing(cfg);
    setView('edit');
  };

  const edit = (cfg: ProviderConfig) => {
    setEditing({ ...cfg });
    setView('edit');
  };

  const save = () => {
    const cfg = editing();
    if (!cfg) return;
    providerStore.updateProvider(cfg.id, cfg);
    setView('list');
  };

  const setActive = (id: string) => {
    providerStore.setActive(id);
  };

  const toggleEnabled = (cfg: ProviderConfig) => {
    providerStore.updateProvider(cfg.id, { enabled: !cfg.enabled });
  };

  const remove = (id: string) => {
    providerStore.removeProvider(id);
  };

  return (
    <div class="mobile-tab-content">
      <Show when={view() === 'list'}>
        <h2 class="mobile-title">Settings</h2>

        <h3 class="mobile-section-title">Providers</h3>
        <ul class="mobile-list">
          <For each={providerStore.configs()}>
            {(cfg) => (
              <li class="mobile-list-item">
                <div class="mobile-row justify-between">
                  <div>
                    <div class="mobile-item-title">
                      {cfg.name}{' '}
                      <Show when={providerStore.activeId() === cfg.id}>
                        <span class="mobile-badge on">active</span>
                      </Show>
                    </div>
                    <div class="mobile-meta">{cfg.type}</div>
                  </div>
                  <div class="mobile-row gap-2">
                    <button
                      type="button"
                      class="mobile-btn small"
                      onClick={() => setActive(cfg.id)}
                      disabled={providerStore.activeId() === cfg.id}
                    >
                      Set active
                    </button>
                    <button
                      type="button"
                      class="mobile-btn small"
                      onClick={() => toggleEnabled(cfg)}
                    >
                      {cfg.enabled ? 'Disable' : 'Enable'}
                    </button>
                    <button type="button" class="mobile-btn small" onClick={() => edit(cfg)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      class="mobile-btn small danger"
                      onClick={() => remove(cfg.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            )}
          </For>
        </ul>
        <button type="button" class="mobile-btn mt-3" onClick={addNew}>
          Add Provider
        </button>

        <h3 class="mobile-section-title mt-6">App</h3>
        <div class="mobile-card">
          <div class="mobile-row justify-between">
            <span>Version</span>
            <span class="mobile-meta">0.2.0</span>
          </div>
          <button
            type="button"
            class="mobile-btn mt-2"
            onClick={() => {
              if (typeof window !== 'undefined') localStorage.clear();
            }}
          >
            Clear local cache
          </button>
        </div>
      </Show>

      <Show
        when={view() === 'edit' ? editing() : null}
        fallback={<div class="mobile-empty">No provider selected</div>}
      >
        {(cfg) => (
          <>
            <div class="mobile-header">
              <button
                type="button"
                class="mobile-back-btn"
                onClick={() => {
                  setEditing(null);
                  setView('list');
                }}
              >
                &lt; Back
              </button>
              <h2 class="mobile-title">Edit Provider</h2>
            </div>
            <ProviderForm value={cfg()} onChange={setEditing} onSave={save} />
          </>
        )}
      </Show>
    </div>
  );
}

function ProviderForm(props: {
  value: ProviderConfig;
  onChange: (cfg: ProviderConfig) => void;
  onSave: () => void;
}) {
  const update = (patch: Partial<ProviderConfig>) => {
    props.onChange({ ...props.value, ...patch });
  };

  return (
    <form
      class="mobile-form"
      onSubmit={(e) => {
        e.preventDefault();
        props.onSave();
      }}
    >
      <label class="mobile-label">
        Name
        <input
          class="mobile-input"
          value={props.value.name}
          onInput={(e) => update({ name: e.currentTarget.value })}
        />
      </label>

      <label class="mobile-label">
        Type
        <select
          class="mobile-input"
          value={props.value.type}
          onChange={(e) => update({ type: e.currentTarget.value as ProviderConfig['type'] })}
        >
          <option value="devin">Devin</option>
          <option value="anthropic">Claude Code</option>
          <option value="openai">Codex</option>
          <option value="custom">Custom</option>
        </select>
      </label>

      <label class="mobile-label">
        API Token
        <input
          class="mobile-input"
          type="password"
          value={props.value.token}
          onInput={(e) => update({ token: e.currentTarget.value })}
        />
      </label>

      <Show when={props.value.type === 'devin'}>
        <label class="mobile-label">
          Org ID
          <input
            class="mobile-input"
            value={props.value.orgId ?? ''}
            onInput={(e) => update({ orgId: e.currentTarget.value })}
          />
        </label>
      </Show>

      <Show when={props.value.type === 'custom'}>
        <label class="mobile-label">
          Base URL
          <input
            class="mobile-input"
            value={props.value.baseUrl ?? ''}
            onInput={(e) => update({ baseUrl: e.currentTarget.value })}
          />
        </label>
      </Show>

      <Show when={props.value.type !== 'devin'}>
        <label class="mobile-label">
          Model
          <input
            class="mobile-input"
            value={props.value.model ?? ''}
            onInput={(e) => update({ model: e.currentTarget.value })}
          />
        </label>
      </Show>

      <label class="mobile-label flex items-center gap-2">
        <input
          type="checkbox"
          checked={props.value.enabled}
          onChange={(e) => update({ enabled: e.currentTarget.checked })}
        />
        Enabled
      </label>

      <button type="submit" class="mobile-btn">
        Save
      </button>
    </form>
  );
}
