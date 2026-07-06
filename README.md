# Agent Manager

> 🚀 CLI, Web, and Desktop app for managing AI agent skills, workflows, and MCP servers
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

A monorepo application for visualizing and managing AI agent skills, workflows, and MCP servers with real-time markdown preview and syntax highlighting.

## Project

<details><summary>Goal</summary>

| Icon | Goal | Status | Description |
|------|------|--------|-------------|
| ![target](https://api.iconify.design/mdi:target.svg) | Visualize agent resources | ✓ Goal | Display skills, workflows, and MCP servers in an interactive web UI |
| ![folder](https://api.iconify.design/mdi:folder.svg) | Parse markdown files | ✓ Goal | Extract metadata and content from markdown files with frontmatter |
| ![search](https://api.iconify.design/mdi:magnify.svg) | Search and filter | ✓ Goal | Enable quick search across all resources |
| ![web](https://api.iconify.design/mdi:web.svg) | Cross-platform | ✓ Goal | Support CLI, web, and desktop interfaces |
| ![package](https://api.iconify.design/mdi:package-variant.svg) | Monorepo structure | ✓ Goal | Shared types and parsers across all apps |
| ![refresh](https://api.iconify.design/mdi:refresh.svg) | Real-time updates | ✓ Goal | Hot module replacement during development |
| ![highlight](https://api.iconify.design/mdi:code-braces.svg) | Syntax highlighting | ✓ Goal | Code blocks highlighted with Shiki |
| ![lock](https://api.iconify.design/mdi:lock.svg) | Authentication | ✗ Not Goal | No user authentication required |
| ![database](https://api.iconify.design/mdi:database-off.svg) | Database | ✗ Not Goal | File-based data only, no database |

</details>

<details><summary>Scope</summary>

| Icon | Scope | Status | Description |
|------|-------|--------|-------------|
| ![file](https://api.iconify.design/mdi:file-document.svg) | Skills management | ✓ In Scope | Parse and display skill markdown files |
| ![workflow](https://api.iconify.design/mdi:sitemap.svg) | Workflows management | ✓ In Scope | Parse and display workflow markdown files |
| ![server](https://api.iconify.design/mdi:server.svg) | MCP servers management | ✓ In Scope | Parse and display MCP server markdown files |
| ![search](https://api.iconify.design/mdi:magnify.svg) | Search functionality | ✓ In Scope | Filter resources by name and description |
| ![web](https://api.iconify.design/mdi:web.svg) | Web visualization | ✓ In Scope | Interactive web UI with markdown preview |
| ![cli](https://api.iconify.design/mdi:console.svg) | CLI interface | ✓ In Scope | Command-line tool to launch visualization |
| ![desktop](https://api.iconify.design/mdi:monitor.svg) | Desktop app | ✓ In Scope | Native desktop app via Tauri |
| ![edit](https://api.iconify.design/mdi:pencil-off.svg) | Content editing | ✗ Out of Scope | Read-only visualization, no editing |
| ![robot](https://api.iconify.design/mdi:robot-off.svg) | AI integration | ✗ Out of Scope | No AI features, just visualization |
| ![chart](https://api.iconify.design/mdi:chart-off.svg) | Analytics | ✗ Out of Scope | No usage tracking or analytics |

</details>

<details><summary>Key Concepts</summary>

| Icon | Concept | Description |
|------|---------|-------------|
| ![package](https://api.iconify.design/mdi:package-variant.svg) | Monorepo | Turborepo-managed workspace with shared packages |
| ![file](https://api.iconify.design/mdi:file-document.svg) | Frontmatter | YAML metadata in markdown files for resource properties |
| ![wrench](https://api.iconify.design/mdi:wrench.svg) | Type Safety | TypeScript with Zod validation for runtime checks |
| ![palette](https://api.iconify.design/mdi:palette.svg) | UnoCSS | Utility-first CSS framework for styling |
| ![shiki](https://api.iconify.design/mdi:language-html.svg) | Shiki | Syntax highlighter for code blocks |
| ![broom](https://api.iconify.design/mdi:broom.svg) | DOMPurify | HTML sanitizer for markdown rendering |
| ![hook](https://api.iconify.design/mdi:hook.svg) | Git Hooks | Lefthook for pre-commit and pre-push checks |
| ![ast](https://api.iconify.design/mdi:file-tree.svg) | AST-based Linting | ast-grep for structural code analysis |

</details>

<details><summary>Core Principles</summary>

| Icon | Principle | Description |
|------|-----------|-------------|
| ![target](https://api.iconify.design/mdi:target.svg) | Type Safety | Use TypeScript strict mode, avoid `any` types |
| ![broom](https://api.iconify.design/mdi:broom.svg) | Code Quality | Biome linting and formatting for consistency |
| ![refresh](https://api.iconify.design/mdi:refresh.svg) | Hot Reload | Fast development with HMR in all apps |
| ![package](https://api.iconify.design/mdi:package-variant.svg) | Shared Code | Common types and parsers in shared package |
| ![flask](https://api.iconify.design/mdi:flask.svg) | Testing | Vitest for unit tests, placeholder tests for MVP |
| ![lock](https://api.iconify.design/mdi:lock.svg) | Security | Sanitize all HTML content with DOMPurify |
| ![doc](https://api.iconify.design/mdi:file-document-edit.svg) | Documentation | Comprehensive README and inline comments |
| ![rocket](https://api.iconify.design/mdi:rocket.svg) | Performance | Fast builds with Vite and Turborepo caching |

</details>

<details><summary>When To Use</summary>

| Icon | Use Case | Description |
|------|----------|-------------|
| ![search](https://api.iconify.design/mdi:magnify.svg) | Browse resources | When you need to find and view skills/workflows/MCP servers |
| ![folder](https://api.iconify.design/mdi:folder-open.svg) | Custom directories | When scanning non-standard directory paths |
| ![web](https://api.iconify.design/mdi:web.svg) | Web preview | When you want a browser-based visualization |
| ![cli](https://api.iconify.design/mdi:console.svg) | CLI workflow | When you prefer command-line interface |
| ![desktop](https://api.iconify.design/mdi:monitor.svg) | Desktop app | When you want a native desktop experience |
| ![book](https://api.iconify.design/mdi:book-open-variant.svg) | Documentation | When learning about available agent resources |

</details>

<details><summary>Best Practices</summary>

| Icon | Practice | Description |
|------|----------|-------------|
| ![doc](https://api.iconify.design/mdi:file-document-edit.svg) | Frontmatter | Always include title and description in markdown files |
| ![tag](https://api.iconify.design/mdi:tag.svg) | Tags | Use tags for better categorization and search |
| ![palette](https://api.iconify.design/mdi:palette.svg) | Consistent styling | Follow UnoCSS utility classes patterns |
| ![wrench](https://api.iconify.design/mdi:wrench.svg) | Type safety | Use Zod schemas for all data validation |
| ![flask](https://api.iconify.design/mdi:flask.svg) | Test coverage | Write tests for parsers and utilities |
| ![package](https://api.iconify.design/mdi:package-variant.svg) | Shared code | Put common logic in shared package |
| ![refresh](https://api.iconify.design/mdi:refresh.svg) | Git hooks | Never bypass Lefthook hooks |

</details>

## Features

| Icon | Feature | Description | Benefit | Usage |
|------|---------|-------------|---------|-------|
| ![file](https://api.iconify.design/mdi:file-document.svg) | Skills Visualization | Display all skills with metadata | Quick overview of available skills | `agents-manager skills` |
| ![workflow](https://api.iconify.design/mdi:sitemap.svg) | Workflows Visualization | Display all workflows with metadata | Understand workflow patterns | `agents-manager workflows` |
| ![server](https://api.iconify.design/mdi:server.svg) | MCP Servers Visualization | Display MCP servers with tools | See available MCP tools | `agents-manager mcp` |
| ![search](https://api.iconify.design/mdi:magnify.svg) | Search & Filter | Search by name and description | Find resources quickly | Type in search box |
| ![book](https://api.iconify.design/mdi:book-open-variant.svg) | Markdown Preview | Rendered markdown with syntax highlighting | Read formatted content | Click any item |
| ![palette](https://api.iconify.design/mdi:palette.svg) | Syntax Highlighting | Code blocks highlighted with Shiki | Better code readability | Auto-applied |
| ![tag](https://api.iconify.design/mdi:tag.svg) | Tag Filtering | Filter resources by tags | Narrow down by category | Click tags |
| ![folder](https://api.iconify.design/mdi:folder-open.svg) | Custom Directories | Scan any directory path | Work with non-standard locations | `--dir=<path>` |
| ![web](https://api.iconify.design/mdi:web.svg) | Web UI | Interactive browser interface | Modern web experience | `bun --filter @agents-manager/web dev` |
| ![cli](https://api.iconify.design/mdi:console.svg) | CLI Interface | Command-line tool | Scriptable and fast | `agents-manager <command>` |
| ![desktop](https://api.iconify.design/mdi:monitor.svg) | Desktop App | Native desktop experience | Standalone application | `bun --filter @agents-manager/desktop dev` |
| ![refresh](https://api.iconify.design/mdi:refresh.svg) | Hot Reload | Instant updates during development | Faster iteration | Auto-enabled in dev |
| ![broom](https://api.iconify.design/mdi:broom.svg) | HTML Sanitization | DOMPurify for security | Safe markdown rendering | Auto-applied |

## Quick Start

1. **Install Dependencies** — `terminal`
   Install all dependencies for the monorepo
   ```bash
   bun install
   ```

2. **Run CLI with Default Directory** — `terminal`
   Launch CLI to visualize workflows from windsurf global directory
   ```bash
   bun --filter @agents-manager/cli dev workflows --open
   ```

3. **Run CLI with Custom Directory** — `terminal`
   Scan a specific directory for resources
   ```bash
   bun --filter @agents-manager/cli dev skills --base-dir "C:\path\to\skills" --open
   ```

4. **Run Web Dev Server** — `terminal`
   Start web app development server
   ```bash
   bun --filter @agents-manager/web dev
   ```

5. **Run Desktop App** — `terminal`
   Start Tauri desktop application
   ```bash
   bun --filter @agents-manager/desktop dev
   ```

```ansi
┌─────────────────────────────────────┐
│  Agents Manager - WORKFLOWS        │
│                                     │
│  Server running at http://localhost:4321
│  Items found: 45                   │
│  Press Ctrl+C to stop               │
│                                     │
│  Scanning directory...              │
│  Found 45 workflow files            │
│  Opening browser...                 │
└─────────────────────────────────────┘
```

## Usage

### CLI Commands

```bash
# Visualize skills
agents-manager skills

# Visualize workflows
agents-manager workflows

# Visualize MCP servers
agents-manager mcp

# Show help
agents-manager help

# Show version
agents-manager version
```

### CLI Options

```bash
# Specify custom directory
agents-manager skills --dir="C:\path\to\skills"

# Change server port
agents-manager workflows --port=3000

# Don't auto-open browser
agents-manager mcp --no-open
```

### Web App Usage

```bash
# Start development server
bun --filter @agents-manager/web dev

# Build for production
bun --filter @agents-manager/web build

# Preview production build
bun --filter @agents-manager/web preview
```

### Desktop App Usage

```bash
# Start desktop app
bun --filter @agents-manager/desktop dev

# Build desktop app
bun --filter @agents-manager/desktop build
```

```ansi
$ agents-manager workflows --dir="C:\Users\user\.codeium\windsurf\global_workflows"

  Agents Manager - WORKFLOWS
  Server running at http://localhost:4321
  Items found: 45
  Press Ctrl+C to stop

  Scanning C:\Users\user\.codeium\windsurf\global_workflows
  Found 45 workflow files
  Opening browser...

  [Browser opens at http://localhost:4321]
  [Sidebar shows 45 workflows]
  [Click any workflow to view details]
```

## API References

<details><summary>CLI API</summary>

### Commands

| Command | Description | Options |
|---------|-------------|---------|
| `skills` | Visualize skills | `--dir`, `--port`, `--no-open` |
| `workflows` | Visualize workflows | `--dir`, `--port`, `--no-open` |
| `mcp` | Visualize MCP servers | `--dir`, `--port`, `--no-open` |
| `help` | Show help message | - |
| `version` | Show version info | - |

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--dir` | string | Auto-detect | Base directory to scan |
| `--port` | number | 4321 | Web server port |
| `--no-open` | flag | false | Don't auto-open browser |

</details>

<details><summary>Shared Package API</summary>

### Types

```typescript
import type { SkillItem, WorkflowItem, McpServerItem, VisualizationData } from '@agents-manager/shared';
```

### Parsers

```typescript
import { parseSkills, parseWorkflows, parseMcpServers, collectVisualizationData } from '@agents-manager/shared';

// Parse skills from directory
const skills = await parseSkills('/path/to/skills');

// Collect visualization data
const data = await collectVisualizationData('workflows', '/path/to/base');
```

</details>

<details><summary>Web App API</summary>

### Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start Vite dev server |
| `build` | Build for production |
| `preview` | Preview production build |
| `typecheck` | Run TypeScript checks |
| `lint` | Run Biome linting |
| `test` | Run Vitest tests |

</details>

<details><summary>Desktop App API</summary>

### Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start Tauri dev server |
| `build` | Build desktop app |
| `typecheck` | Run TypeScript checks |
| `lint` | Run Biome linting |
| `test` | Run Bun tests |

</details>

## Development

<details><summary>Tech Stack</summary>

| Layer | Technology | Version | Description |
|-------|-----------|---------|-------------|
| Runtime | Bun | 1.3.13+ | JavaScript runtime and package manager |
| Build | Turborepo | 2.10.3 | Monorepo build system |
| Linting | Biome | 2.5.2 | Linter and formatter |
| Git Hooks | Lefthook | 2.1.9 | Git hooks automation |
| Type Checking | TypeScript | 6.0.3 | Type system |
| Type Compiler | tsgo | latest | Fast TypeScript compiler |
| Web Framework | SolidJS | 1.9.13 | Reactive UI library |
| Build Tool | Vite | 8.0.16 | Build tool and dev server |
| Styling | UnoCSS | 66.7.0 | Utility-first CSS |
| Icons | Lucide | 1.2.111 | Icon library |
| Syntax Highlighting | Shiki | 4.2.0 | Code highlighter |
| Markdown | Marked | 18.0.5 | Markdown parser |
| Sanitization | DOMPurify | 3.4.9 | HTML sanitizer |
| Desktop | Tauri | 2.11.0 | Desktop app framework |
| Testing | Vitest | 4.1.8 | Unit test runner |
| Testing Library | @solidjs/testing-library | 0.8.10 | Component testing |
| Validation | Zod | 4.4.3 | Schema validation |

</details>

<details><summary>How It Works</summary>

```ansi
┌─────────────────────────────────────────────────────────────┐
│                     Agent Manager Flow                        │
└─────────────────────────────────────────────────────────────┘

  📂 Directory Scan
  │
  ├─→ 📄 Parse Markdown Files
  │   ├─ Extract frontmatter (title, description, tags)
  │   ├─ Parse body content
  │   └─ Validate with Zod schemas
  │
  ├─→ 📦 Collect Visualization Data
  │   ├─ Group by type (skills/workflows/mcp)
  │   ├─ Index for search
  │   └─ Prepare for API
  │
  ├─→ 🌐 Start Web Server
  │   ├─ Serve static files from dist
  │   ├─ API endpoint: /api/data
  │   └─ Inject data into HTML
  │
  ├─→ 🎨 Render Web UI
  │   ├─ Sidebar: List items with search
  │   ├─ Header: Type navigation
  │   └─ ContentViewer: Markdown preview
  │
  └─→ 🪟 Desktop App (Tauri)
      ├─ Wrap web app
      └─ Native window management

  🔄 Hot Module Replacement
  │
  └─→ Instant updates on file changes
```

</details>

<details><summary>Architecture</summary>

```
agents-manager/
├── apps/
│   ├── cli/                 # CLI application
│   │   ├── src/
│   │   │   ├── cli.ts      # Main entry point
│   │   │   ├── services/
│   │   │   │   ├── data.ts # Directory scanning & data collection
│   │   │   │   └── server.ts # Web server with static file serving
│   │   │   └── utils/
│   │   │       └── args.ts # CLI argument parsing
│   │   └── package.json
│   ├── web/                 # Web application
│   │   ├── src/
│   │   │   ├── components/  # SolidJS components
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── ContentViewer.tsx
│   │   │   ├── stores/
│   │   │   │   └── visualization.ts
│   │   │   ├── utils/
│   │   │   │   ├── data.ts
│   │   │   │   └── shiki.ts
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── uno.config.ts
│   │   └── package.json
│   └── desktop/             # Desktop application
│       ├── src/
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── src-tauri/       # Tauri Rust backend
│       ├── vite.config.ts
│       └── package.json
├── packages/
│   └── shared/              # Shared package
│       ├── src/
│       │   ├── types/       # TypeScript types
│       │   │   └── index.ts
│       │   ├── parsers/     # Markdown parsers
│       │   │   └── index.ts
│       │   └── index.ts
│       └── package.json
├── biome.jsonc              # Biome configuration
├── turbo.json               # Turborepo configuration
├── lefthook.yml             # Git hooks configuration
├── tsconfig.json            # Root TypeScript config
└── package.json             # Root package.json
```

</details>

<details><summary>Scripts</summary>

```json
{
  "prepare": "bunx lefthook install",
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

<details><summary>Workflows</summary>

- `/run-dev` - Run development server and fix errors
- `/ship` - Ship code end-to-end with testing
- `/commit-and-push` - Commit and push to remote
- `/update-readme` - Update README.md with project info

</details>

<details><summary>Skills</summary>

- `bun` - Bun runtime and package manager
- `turborepo` - Monorepo build system
- `biome` - Linting and formatting
- `typescript` - Type system
- `solidjs` - Reactive UI library
- `vite` - Build tool
- `unocss` - Utility-first CSS
- `tauri` - Desktop app framework

</details>

## License

MIT
