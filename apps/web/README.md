# @agents-manager/web

> 🌐 Web app for visualizing AI agent skills, workflows, and MCP servers

![Solid](https://img.shields.io/badge/solid-%232C4F7C.svg?style=flat&logo=solid&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)
![UnoCSS](https://img.shields.io/badge/unocss-%23333.svg?style=flat&logo=unocss&logoColor=white)

The web package provides an interactive browser interface for browsing and viewing markdown resources with search and syntax highlighting.

## Get Started

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Run dev server**
   ```bash
   bun run dev
   ```

3. **Build for production**
   ```bash
   bun run build
   ```

4. **Preview production build**
   ```bash
   bun run preview
   ```

## Features

| Icon | Feature | Description | Benefit | Usage |
| :---: |---------|-------------|---------|-------|
| ![sidebar](https://api.iconify.design/mdi:view-sidebar.svg?color=%231976d2&width=20) | Sidebar Navigation | Switch between skills, workflows, and MCP | Quick context switching | Click tabs |
| ![search](https://api.iconify.design/mdi:magnify.svg?color=%23ffa000&width=20) | Search & Filter | Filter resources by name or description | Find items fast | Type in the search box |
| ![preview](https://api.iconify.design/mdi:book-open-variant.svg?color=%23303f9f&width=20) | Markdown Preview | Rendered markdown with Shiki | Read formatted content | Click an item |
| ![highlight](https://api.iconify.design/mdi:code-braces.svg?color=%23c2185b&width=20) | Syntax Highlighting | Code blocks highlighted | Better code readability | Auto-applied |
| ![safe](https://api.iconify.design/mdi:shield-check.svg?color=%2300796b&width=20) | HTML Sanitization | DOMPurify removes unsafe HTML | Safe rendering | Auto-applied |

## Usage

### Usage via Web

Open the web app in a browser and use the sidebar to switch between **Skills**, **Workflows**, and **MCP**. Click any item to view its rendered markdown content. Use the search box to filter by name or description.

```bash
bun run dev
```

## Development

<details><summary>Tech Stack</summary>

| Layer | Technology | Description |
|-------|------------|-------------|
| Framework | SolidJS | Reactive UI library |
| Build Tool | Vite | Fast build and dev server |
| Styling | UnoCSS | Atomic CSS engine |
| Markdown | Marked + DOMPurify | Markdown rendering and sanitization |
| Highlight | Shiki | Syntax highlighting |

</details>

<details><summary>Scripts</summary>

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "typecheck": "tsgo --noEmit",
  "lint": "biome check .",
  "test": "vitest run",
  "clean": "bunx rimraf dist dist-ssr .turbo"
}
```

</details>

<details><summary>Architecture</summary>

```text
apps/web/src/
├── App.tsx                 # Root app component
├── main.tsx                # Entry point
├── components/
│   ├── Header.tsx          # App header and type switcher
│   ├── Sidebar.tsx         # Searchable item list
│   └── ContentViewer.tsx   # Markdown content renderer
├── stores/
│   └── visualization.ts    # Reactive state management
└── utils/
    ├── data.ts             # Data loading utilities
    └── shiki.ts            # Shiki highlighter setup
```

</details>
