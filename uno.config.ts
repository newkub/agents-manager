import { defineConfig, presetIcons, presetWind } from 'unocss';

export default defineConfig({
  presets: [
    presetWind(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
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
