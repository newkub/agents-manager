# Agent Manager

> CLI, Web, and Desktop app for managing AI agent skills, workflows, and MCP servers

## Features

- **CLI** - Visualize skills, workflows, and MCP servers in web browser
- **Web** - Interactive web UI with markdown preview and syntax highlighting
- **Desktop** - Native desktop app with Tauri

## Quick Start

```bash
# Install dependencies
bun install

# Run CLI
bun --filter @agents-manager/cli dev -- skills

# Run web dev server
bun --filter @agents-manager/web dev

# Run desktop app
bun --filter @agents-manager/desktop dev
```

## CLI Usage

```bash
agents-manager skills       # Visualize skills in browser
agents-manager workflows    # Visualize workflows in browser
agents-manager mcp          # Visualize MCP servers in browser
agents-manager help         # Show help
agents-manager version      # Show version
```

Options:
- `--dir=<path>` - Base directory to scan
- `--port=<number>` - Web server port (default: 4321)
- `--no-open` - Don't auto-open browser

## Tech Stack

- **Runtime**: Bun
- **Framework**: SolidJS
- **Desktop**: Tauri
- **Styling**: UnoCSS
- **Syntax Highlighting**: Shiki
- **Markdown**: Marked + DOMPurify
- **Build**: Vite
- **Monorepo**: Turborepo
- **Linting**: Biome
- **Git Hooks**: Lefthook

## License

MIT
