# @agents-manager/cli

> 🖥️ CLI tool for visualizing AI agent skills, workflows, and MCP servers

![Bun](https://img.shields.io/badge/bun-%23000000.svg?style=flat&logo=bun&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%233178C6.svg?style=flat&logo=typescript&logoColor=white)

The CLI package starts a local web server, parses markdown resources, and opens a browser for interactive visualization.

## Get Started

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Run in dev mode**
   ```bash
   bun run dev
   ```

3. **Build for production**
   ```bash
   bun run build
   ```

## Features

| Icon | Feature | Description | Benefit | Usage |
| :---: |---------|-------------|---------|-------|
| ![cli](https://api.iconify.design/mdi:console.svg?color=%230097a7&width=20) | CLI Commands | `skills`, `workflows`, `mcp`, `help`, `version` | Scriptable access | `agents-manager <command>` |
| ![server](https://api.iconify.design/mdi:server.svg?color=%2300796b&width=20) | Built-in Server | Serves the web UI and data API | No separate server needed | Auto-started on run |
| ![browser](https://api.iconify.design/mdi:web.svg?color=%231976d2&width=20) | Auto Open | Opens the browser automatically | Faster workflow | Default unless `--no-open` |
| ![dir](https://api.iconify.design/mdi:folder-open.svg?color=%23ffa000&width=20) | Custom Directories | Scan any directory with markdown files | Flexible usage | `--dir=<path>` |

## Usage

### Usage via CLI

```bash
# Visualize skills
agents-manager skills

# Visualize workflows
agents-manager workflows

# Visualize MCP servers
agents-manager mcp

# Custom directory and port
agents-manager skills --dir="C:\path\to\skills" --port=8080

# Show help
agents-manager help
```

### Usage via SDK

```typescript
import { collectVisualizationData, startVisualizationServer } from '@agents-manager/cli';

const data = await collectVisualizationData('skills', './my-skills');
await startVisualizationServer('skills', data, 4321, true);
```

## Development

<details><summary>Tech Stack</summary>

| Layer | Technology | Description |
|-------|------------|-------------|
| Runtime | Bun | JavaScript runtime and package manager |
| Language | TypeScript | Type-safe code |
| Server | Bun.serve | Built-in HTTP server |

</details>

<details><summary>Scripts</summary>

```json
{
  "dev": "bun run src/cli.ts",
  "build": "bun build src/cli.ts --outdir dist --target bun",
  "typecheck": "tsgo --noEmit",
  "lint": "biome check .",
  "test": "bun test",
  "clean": "bunx rimraf dist .turbo"
}
```

</details>

<details><summary>Architecture</summary>

```text
apps/cli/
├── src/
│   ├── cli.ts          # CLI entry point
│   ├── index.ts        # Public exports
│   ├── services/
│   │   ├── data.ts     # Resolve base dir and collect data
│   │   └── server.ts   # Bun server and API routes
│   └── utils/
│       └── args.ts     # CLI argument parsing
```

</details>
