import type { HighlighterCore } from 'shiki/core';

let highlighterPromise: Promise<HighlighterCore> | null = null;

export async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] = await Promise.all([
        import('shiki/core'),
        import('shiki/engine/javascript'),
      ]);
      const [typescript, tsx, bash, json, markdown, yaml, rust, githubDark] = await Promise.all([
        import('@shikijs/langs/typescript').then((m) => m.default),
        import('@shikijs/langs/tsx').then((m) => m.default),
        import('@shikijs/langs/bash').then((m) => m.default),
        import('@shikijs/langs/json').then((m) => m.default),
        import('@shikijs/langs/markdown').then((m) => m.default),
        import('@shikijs/langs/yaml').then((m) => m.default),
        import('@shikijs/langs/rust').then((m) => m.default),
        import('@shikijs/themes/github-dark').then((m) => m.default),
      ]);
      return createHighlighterCore({
        themes: [githubDark],
        langs: [typescript, tsx, bash, json, markdown, yaml, rust],
        engine: createJavaScriptRegexEngine(),
      });
    })();
  }
  return highlighterPromise;
}

export async function highlightCode(code: string, lang: string): Promise<string> {
  const hl = await getHighlighter();
  return hl.codeToHtml(code, { lang, theme: 'github-dark' });
}
