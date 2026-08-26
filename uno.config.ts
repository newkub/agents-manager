import { icons as lucideIcons } from '@iconify-json/lucide';
import {
  defineConfig,
  presetIcons,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

function lucideLoader(name: string) {
  const icon = lucideIcons.icons[name];
  if (!icon) return;
  const { body, width = 24, height = 24 } = icon;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="1em" height="1em">${body}</svg>`;
}

export default defineConfig({
  content: {
    filesystem: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  },
  presets: [
    presetWind4(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: { lucide: lucideLoader },
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#58a6ff',
        hover: '#79c0ff',
      },
      bg: {
        primary: '#0d1117',
        secondary: '#161b22',
        tertiary: '#21262d',
      },
      border: '#30363d',
      text: {
        primary: '#e6edf3',
        secondary: '#8b949e',
      },
      success: '#3fb950',
      warning: '#d29922',
      error: '#f85149',
    },
  },
});
