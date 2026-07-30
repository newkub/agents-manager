# agents-manager

> 🚀 CLI, Web, and Desktop app for managing AI agent skills, workflows, and MCP servers

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
![Bun](https://img.shields.io/badge/bun-%23000000.svg?style=flat&logo=bun&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%233178C6.svg?style=flat&logo=typescript&logoColor=white)
![Solid](https://img.shields.io/badge/solid-%232C4F7C.svg?style=flat&logo=solid&logoColor=white)

A monorepo for visualizing and managing AI agent skills, workflows, and MCP servers with real-time markdown preview, syntax highlighting, and cross-platform support.

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
   Install all dependencies for the monorepo.
   ```bash
   bun install
   ```

2. **Run the CLI**
   Launch the CLI to visualize workflows from the default directory.
   ```bash
   bun --filter @agents-manager/cli dev workflows
   ```

3. **Run the Web App**
   Start the web app development server.
   ```bash
   bun --filter @agents-manager/web dev
   ```

4. **Run the Desktop App**
   Start the Tauri desktop application.
   ```bash
   bun --filter @agents-manager/desktop dev
   ```

## Features

| Icon | Feature | Description | Benefit | Usage |
| :---: |---------|-------------|---------|-------|
| ![skills](https://api.iconify.design/mdi:file-document.svg?color=%231976d2&width=20) | Skills Visualization | Parse and display skill markdown files | Quick overview of skills | `agents-manager skills` |
| ![workflows](https://api.iconify.design/mdi:sitemap.svg?color=%237b1fa2&width=20) | Workflows Visualization | Parse and display workflow markdown files | Understand workflow patterns | `agents-manager workflows` |
| ![mcp](https://api.iconify.design/mdi:server.svg?color=%2300796b&width=20) | MCP Servers Visualization | Parse and display MCP server files and tools | See available MCP tools | `agents-manager mcp` |
| ![search](https://api.iconify.design/mdi:magnify.svg?color=%23ffa000&width=20) | Search & Filter | Filter resources by name, description, and tags | Find resources quickly | Type in the search box |
| ![markdown](https://api.iconify.design/mdi:book-open-variant.svg?color=%23303f9f&width=20) | Markdown Preview | Rendered markdown with Shiki syntax highlighting | Read formatted content safely | Click any item |
| ![web](https://api.iconify.design/mdi:web.svg?color=%230097a7&width=20) | Web UI | Interactive browser interface | Modern web experience | `bun --filter @agents-manager/web dev` |
| ![cli](https://api.iconify.design/mdi:console.svg?color=%23c2185b&width=20) | CLI Interface | Command-line tool with built-in server | Scriptable and fast | `agents-manager <command>` |
| ![desktop](https://api.iconify.design/mdi:monitor.svg?color=%23388e3c&width=20) | Desktop App | Native desktop app via Tauri | Standalone application | `bun --filter @agents-manager/desktop dev` |

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

# Show version
agents-manager version
```

### Usage via Web

Open the web app in a browser and use the sidebar to switch between **Skills**, **Workflows**, and **MCP**. Click any item to view its rendered markdown content. Use the search box to filter by name or description.

```bash
bun --filter @agents-manager/web dev
```

### Usage via Desktop

Open the desktop app and use the same sidebar navigation. The desktop app wraps the web UI in a Tauri shell.

```bash
bun --filter @agents-manager/desktop dev
```

## Project

<details><summary>Goal</summary>

| Icon | Goal | Status | Description |
| :---: |------|--------|-------------|
| ![visualize](https://api.iconify.design/mdi:target.svg?color=%231976d2&width=20) | Visualize resources | ✓ Goal | Display skills, workflows, and MCP servers in a unified UI |
| ![parse](https://api.iconify.design/mdi:folder.svg?color=%23ffa000&width=20) | Parse markdown | ✓ Goal | Extract metadata and content from markdown files with frontmatter |
| ![search](https://api.iconify.design/mdi:magnify.svg?color=%2300796b&width=20) | Search & filter | ✓ Goal | Enable quick search across all resources |
| ![cross](https://api.iconify.design/mdi:web.svg?color=%23303f9f&width=20) | Cross-platform | ✓ Goal | Support CLI, web, and desktop interfaces |
| ![sync](https://api.iconify.design/mdi:package-variant.svg?color=%237b1fa2&width=20) | Shared core | ✓ Goal | Shared types and parsers across all apps |

</details>

<details><summary>Scope</summary>

| Icon | Scope | Status | Description |
| :---: |-------|--------|-------------|
| ![skills](https://api.iconify.design/mdi:file-document.svg?color=%231976d2&width=20) | Skills management | ✓ In Scope | Parse and display skill markdown files |
| ![workflows](https://api.iconify.design/mdi:sitemap.svg?color=%237b1fa2&width=20) | Workflows management | ✓ In Scope | Parse and display workflow markdown files |
| ![mcp](https://api.iconify.design/mdi:server.svg?color=%2300796b&width=20) | MCP servers management | ✓ In Scope | Parse and display MCP server markdown files |
| ![web](https://api.iconify.design/mdi:web.svg?color=%23303f9f&width=20) | Web visualization | ✓ In Scope | Interactive web UI with markdown preview |
| ![cli](https://api.iconify.design/mdi:console.svg?color=%230097a7&width=20) | CLI interface | ✓ In Scope | Command-line tool to launch visualization |
| ![desktop](https://api.iconify.design/mdi:monitor.svg?color=%23388e3c&width=20) | Desktop app | ✓ In Scope | Native desktop app via Tauri |
| ![edit](https://api.iconify.design/mdi:pencil-off.svg?color=%23d32f2f&width=20) | Content editing | ✗ Out of Scope | Read-only visualization, no editing |

</details>

<details><summary>When To Use</summary>

| Icon | Use Case | Description |
| :---: |----------|-------------|
| ![explore](https://api.iconify.design/mdi:compass.svg?color=%231976d2&width=20) | Explore skills | Browse all available AI agent skills in one place |
| ![review](https://api.iconify.design/mdi:eye.svg?color=%237b1fa2&width=20) | Review workflows | Check workflow steps and rules quickly |
| ![tools](https://api.iconify.design/mdi:toolbox.svg?color=%2300796b&width=20) | Discover MCP tools | List tools exposed by MCP servers |

</details>

<details><summary>Key Concepts</summary>

| Icon | Concept | Description |
| :---: |---------|-------------|
| ![parser](https://api.iconify.design/mdi:code-json.svg?color=%231976d2&width=20) | Parser | Reads markdown files and extracts frontmatter and body |
| ![visualization](https://api.iconify.design/mdi:chart-bar.svg?color=%237b1fa2&width=20) | Visualization | Renders parsed items in a searchable, browsable UI |
| ![workspace](https://api.iconify.design/mdi:package-variant.svg?color=%2300796b&width=20) | Workspace | A monorepo package for CLI, web, desktop, or shared code |

</details>

<details><summary>Core Principles</summary>

| Icon | Principle | Description |
| :---: |-----------|-------------|
| ![real](https://api.iconify.design/mdi:file-check.svg?color=%23388e3c&width=20) | File-based | Data comes directly from markdown files on disk |
| ![safe](https://api.iconify.design/mdi:shield-check.svg?color=%2300796b&width=20) | Safe rendering | Markdown is sanitized with DOMPurify before rendering |
| ![fast](https://api.iconify.design/mdi:rocket-launch.svg?color=%23ffa000&width=20) | Fast feedback | Hot reload and fast build via Bun and Vite |

</details>

<details><summary>Best Practices</summary>

| Icon | Practice | Description |
| :---: |----------|-------------|
| ![lint](https://api.iconify.design/mdi:broom.svg?color=%23c2185b&width=20) | Lint & format | Run `bun run lint` and `bun run format` before committing |
| ![typecheck](https://api.iconify.design/mdi:code-tags-check.svg?color=%230097a7&width=20) | Type check | Run `bun run typecheck` across the monorepo |
| ![test](https://api.iconify.design/mdi:test-tube.svg?color=%23388e3c&width=20) | Test | Run `bun run test` before pushing changes |

</details>

## API References

<details><summary>CLI Commands</summary>

| Command | Description | Example |
|---------|-------------|---------|
| `skills` | Visualize skills markdown files | `agents-manager skills --dir=./skills` |
| `workflows` | Visualize workflow markdown files | `agents-manager workflows` |
| `mcp` | Visualize MCP server markdown files | `agents-manager mcp --port=8080` |
| `help` | Show usage help | `agents-manager help` |
| `version` | Show version | `agents-manager version` |

</details>

<details><summary>Shared Types</summary>

| Type | Description |
|------|-------------|
| `SkillItem` | Skill metadata and content |
| `WorkflowItem` | Workflow metadata and content |
| `McpServerItem` | MCP server metadata, content, and tools |
| `VisualizationData` | A collection of parsed items with type and total count |

</details>

## Development

<details><summary>Tech Stack</summary>

| Layer | Technology | Version | Description |
|-------|------------|---------|-------------|
| Runtime | Bun | 1.3.13 | JavaScript runtime and package manager |
| Language | TypeScript | 6.0.3 | Type-safe JavaScript |
| Monorepo | Turborepo | 2.10.3 | Task orchestration and caching |
| Web Framework | SolidJS | 1.9.13 | Reactive UI library |
| Styling | UnoCSS | 66.7.0 | Atomic CSS engine |
| Syntax Highlight | Shiki | 4.2.0 | Code syntax highlighting |
| Desktop | Tauri | 2.11.0 | Rust-based desktop shell |
| Lint | Biome | 2.5.2 | Fast linter and formatter |

</details>

<details><summary>Architecture</summary>

```text
agents-manager/
├── apps/
│   ├── cli/          # CLI entry point and server
│   ├── web/          # SolidJS + Vite web app
│   └── desktop/      # Tauri wrapper around web app
├── packages/
│   └── shared/       # Types and markdown parsers
├── package.json      # Workspace root and scripts
└── turbo.json        # Turborepo task graph
```

</details>

<details><summary>Scripts</summary>

```json
{
  "dev": "turbo dev",
  "build": "turbo build",
  "typecheck": "turbo typecheck",
  "lint": "biome check .",
  "format": "biome check --write .",
  "test": "turbo test",
  "verify": "bun run lint && bun run typecheck && bun run test",
  "ci": "bun run verify && bun run build",
  "clean": "turbo clean && bunx rimraf node_modules"
}
```

</details>

## License

MIT
