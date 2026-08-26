# agents-manager

> Web and Desktop app for managing AI agent skills, workflows, and MCP servers

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
![Bun](https://img.shields.io/badge/bun-%23000000.svg?style=flat&logo=bun&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%233178C6.svg?style=flat&logo=typescript&logoColor=white)
![Solid](https://img.shields.io/badge/solid-%232C4F7C.svg?style=flat&logo=solid&logoColor=white)

A single-project application for visualizing and managing AI agent skills, workflows, and MCP servers with a SolidJS + Vite frontend, an Elysia + oRPC backend, and a Tauri desktop shell.

```text
┌─────────────────────────────────────────────────────────┐
│  Agents Manager — Skills / Workflows / MCP              │
├──────────────┬──────────────────────────────────────────┤
│  Sidebar     │  Content Viewer                          │
│  [skills]    │  ┌────────────────────────────────────┐  │
│  [workflows] │  │ # workflow-name                    │  │
│  [mcp]       │  │ > description                      │  │
│              │  │ ## Goal                            │  │
└──────────────┴──────────────────────────────────────────┘
```

## Get Started

1. **Install Dependencies**

   ```bash
   bun install
   ```

2. **Start the backend**

   The Elysia server provides the oRPC API on `http://localhost:3000`.

   ```bash
   bun run server
   ```

3. **Start the web app**

   In another terminal:

   ```bash
   bun run dev
   ```

4. **Run the Desktop App**

   ```bash
   bun run tauri:dev
   ```

## Features

| Feature | Description |
| ------- | ----------- |
| Skills Visualization | Parse and display skill markdown files |
| Workflows Visualization | Parse and display workflow markdown files |
| MCP Servers Visualization | Parse and display MCP server files and tools |
| Search & Filter | Filter resources by name, description, and tags |
| Markdown Preview | Rendered markdown with Shiki syntax highlighting |
| Type-Safe API | oRPC + Zod procedures served by Elysia |
| Desktop App | Native desktop app via Tauri |

## Usage

### Web

Open the web app in a browser and use the sidebar to switch between **Skills**, **Workflows**, and **MCP**. Click any item to view its rendered markdown content. Use the search box to filter by name or description.

### Desktop

Open the Tauri desktop app and use the same sidebar navigation.

## Development

### Tech Stack

| Layer | Technology | Version | Description |
| ----- | ---------- | ------- | ----------- |
| Runtime | Bun | 1.3.13 | JavaScript runtime and package manager |
| Language | TypeScript | 5.8.2 | Type-safe JavaScript |
| Web Framework | SolidJS | 1.9.13 | Reactive UI library |
| Router | TanStack Router (Solid) | 1.170.30 | Type-safe routing |
| Styling | UnoCSS | 66.7.0 | Atomic CSS engine |
| Syntax Highlight | Shiki | 4.2.0 | Code syntax highlighting |
| Backend | Elysia | 1.4.29 | Bun-first web framework |
| API | oRPC | 1.14.1 | Type-safe RPC procedures |
| Desktop | Tauri | 2.11.0 | Rust-based desktop shell |
| Lint | Biome | 2.5.2 | Fast linter and formatter |

### Architecture

```text
agents-manager/
├── src/                # SolidJS + TypeScript application
│   ├── api/            # oRPC router
│   ├── components/     # UI components
│   ├── lib/            # Types and markdown parsers
│   ├── routes/         # TanStack Router routes
│   ├── server/         # Elysia backend
│   ├── stores/         # Solid state stores
│   └── utils/          # Shiki, data, oRPC client
├── src-tauri/          # Tauri Rust backend
├── index.html          # Vite entry
├── package.json        # Single project manifest
├── vite.config.ts      # Vite configuration
├── uno.config.ts       # UnoCSS configuration
└── tsconfig.json       # TypeScript configuration
```

### Scripts

```json
{
  "dev": "vite --port 5173 --host",
  "build": "vite build",
  "server": "bun --hot src/server/index.ts",
  "typecheck": "tsc --noEmit",
  "lint": "biome check .",
  "format": "biome check --write .",
  "test": "vitest run",
  "verify": "bun run lint && bun run typecheck && bun run test",
  "tauri:dev": "tauri dev",
  "tauri:build": "tauri build"
}
```

### Validation

Before committing, run:

```bash
bun run verify
```

This runs `lint`, `typecheck`, and `test`.

## License

MIT
