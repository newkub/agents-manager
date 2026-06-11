# Agent Manager

> 🚀 A desktop application for managing AI agents, skills, workflows, and MCP servers

Agent Manager is a powerful desktop application designed to streamline the development and management of AI agents. Built with modern web technologies, it provides a comprehensive suite of tools for creating agent skills, managing Model Context Protocol (MCP) servers, defining workflows, and configuring agent behaviors—all in a native desktop environment.

![Solid.js](https://img.shields.io/badge/Solid.js-1.9.13-blue)
![Tauri](https://img.shields.io/badge/Tauri-2.11.0-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

| Icon | Feature | Description | Benefit | Usage |
|------|----------|-------------|---------|-------|
| <span class="i-lucide-file-edit"></span> | Skill Editor | Write and edit agent skills with markdown format and live preview | Develop skills faster with real-time syntax highlighting and rendering feedback | Open the Skills section and use the built-in editor with markdown support |
| <span class="i-lucide-eye"></span> | Live Preview | Render markdown with syntax highlighting and table of contents | See exactly how skills will appear to agents with proper code formatting | Toggle the Preview button in the editor toolbar to view rendered output |
| <span class="i-lucide-hard-drive"></span> | Native File System | Open, edit, and save skill files directly from the desktop | Work with local files seamlessly without leaving the application | Use Open/Save buttons in the toolbar to manage skill files |
| <span class="i-lucide-bot"></span> | Agent Management | Configure and manage multiple AI agents with connection settings | Build specialized agents for different tasks with custom API configurations | Navigate to Configuration → Agent Config to set up agents |
| <span class="i-lucide-server"></span> | MCP Integration | Manage Model Context Protocol server connections | Extend agent capabilities with external tools and services | Configure MCP servers in the dedicated MCP Servers section |
| <span class="i-lucide-layout"></span> | Responsive Layout | Split-pane editor with adjustable preview and agent panels | Customize workspace layout for optimal productivity | Toggle Preview and Agents buttons to show/hide panels |
| <span class="i-lucide-shield-check"></span> | Content Sanitization | Secure markdown rendering with DOMPurify | Prevent XSS attacks when rendering user-generated content | Automatic sanitization in preview panel |

## Quick Start

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Run development server**
   ```bash
   bun run dev
   ```

3. **Build desktop application**
   ```bash
   bun run build
   ```

4. **Run desktop app in development mode**
   ```bash
   bun run tauri:dev
   ```

## Usage

### Skill Editor

The Skill Editor provides a markdown-based environment for creating and editing agent skills with real-time preview.

**Opening a Skill File**

1. Click the "Open" button in the toolbar
2. Select a markdown file from your local system
3. The file content loads into the editor

**Creating a New Skill**

1. Start with the default skill template in the editor
2. Write your skill in markdown format with frontmatter metadata:
   ```markdown
   ---
   title: My Skill
   description: A useful skill for agents
   category: utility
   tags: ['helper', 'automation']
   ---

   # My Skill

   This is a sample skill for the agent manager.

   ## Usage

   ```typescript
   const result = await executeSkill({ input: 'test' })
   ```

   ## Features

   - Feature 1
   - Feature 2
   - Feature 3
   ```

3. Toggle "Preview" to see the rendered output with syntax highlighting
4. Click "Save" to persist your changes to a local file

**Preview Features**

- **Syntax Highlighting**: Code blocks are highlighted using Shiki with GitHub Dark theme
- **Table of Contents**: Automatically generated from headings for easy navigation
- **Safe Rendering**: All content is sanitized with DOMPurify for security

### Agent Configuration

Configure AI agents with custom API keys and connection settings.

**Managing Agents**

1. Click the "Agents" button in the toolbar to open the Agent Panel
2. Select an agent from the list (Claude Code, GitHub Copilot, OpenCode, Codex)
3. Configure agent settings:
   - **API Key**: Enter your authentication key
   - **Base URL**: Set the API endpoint URL
4. Click "Test Connection" to verify your configuration

**Agent Status**

- **Connected**: Agent is properly configured and ready to use
- **Disconnected**: Agent configuration exists but connection failed
- **Not Configured**: Agent has not been set up yet

### Navigation

Use the sidebar to navigate between different sections:

- **Skills**: Main editor for skill development
- **Workflows**: Define and manage agent workflows
- **MCP Servers**: Configure Model Context Protocol connections
- **Prompts**: Manage prompt templates
- **Agent Config**: Configure agent settings
- **Settings**: Application preferences

## Key Concepts

<details>
<summary>Core Concepts</summary>

- **Agent Management**: Create, configure, and manage AI agents with custom skills and workflows
- **Skill Development**: Write and test agent skills using markdown with live preview
- **MCP Integration**: Manage Model Context Protocol servers for extended capabilities
- **Workflow Automation**: Define and execute complex agent workflows
- **File System**: Native file access for managing skill files and configurations

</details>

<details>
<summary>Architecture</summary>

- **Solid.js**: Reactive UI framework for performant desktop applications
- **Tauri**: Rust-based desktop framework for native system access
- **UnoCSS**: Atomic CSS framework for rapid styling
- **Monaco Editor**: Code editor component for skill development
- **Shiki**: Syntax highlighting for code blocks in markdown preview

</details>

## Development

<details>
<summary>Environment Setup</summary>

1. **Prerequisites**
   - Bun 1.3.14 or later
   - Node.js (for some dependencies)
   - Rust toolchain (for Tauri build)

2. **Install Dependencies**
   ```bash
   bun install
   ```

3. **Verify Installation**
   ```bash
   bun run verify
   ```

</details>

<details>
<summary>Local Development</summary>

1. **Start Development Server**
   ```bash
   bun run dev
   ```
   This opens the Tauri development window with hot reload enabled.

2. **Run Type Checking**
   ```bash
   bun run typecheck
   ```

3. **Run Linter**
   ```bash
   bun run lint
   ```

4. **Auto-fix Linting Issues**
   ```bash
   bun run lint:fix
   ```

</details>

<details>
<summary>Testing</summary>

Currently, the project does not have automated tests. Manual testing is performed by:

1. Running the application in development mode
2. Testing file operations (open/save)
3. Verifying markdown preview rendering
4. Testing agent configuration panel

</details>

<details>
<summary>Building</summary>

1. **Build for Production**
   ```bash
   bun run build
   ```

2. **Preview Production Build**
   ```bash
   bun run preview
   ```

3. **Build Desktop Application**
   ```bash
   bun run tauri:build
   ```
   This creates platform-specific installers in `src-tauri/target/release/bundle/`.

</details>

<details>
<summary>Deployment</summary>

The application is distributed as a desktop installer:

- **Windows**: `.exe` installer
- **macOS**: `.dmg` disk image
- **Linux**: `.AppImage` or `.deb` package

Build artifacts are generated in the `src-tauri/target/release/bundle/` directory.

</details>

<details>
<summary>Debugging</summary>

1. **Enable Tauri DevTools**
   The development mode includes browser DevTools for debugging.

2. **Console Logging**
   Use `console.log()` for debugging in the frontend code.

3. **Rust Debugging**
   For Rust backend issues, use standard Rust debugging tools.

</details>

<details>
<summary>Contributing</summary>

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `bun run verify` to ensure quality
5. Submit a pull request

</details>

## Best Practices

[!TIP]
- Use TypeScript for type safety across the application
- Follow Solid.js reactivity patterns for state management
- Utilize Tauri plugins for native file system operations
- Keep skill files in markdown format for portability
- Test skills in preview mode before deployment
- Run `bun run verify` before committing changes
- Use Biome for consistent code formatting

## Reference

<details>
<summary>Scripts</summary>

| Script | Description |
|--------|-------------|
| `bun run dev` | Start Tauri development server |
| `bun run build` | Build desktop application for production |
| `bun run preview` | Preview production build |
| `bun run tauri` | Run Tauri CLI commands |
| `bun run tauri:dev` | Run desktop app in development mode |
| `bun run tauri:build` | Build desktop application |
| `bun run typecheck` | Run TypeScript type checking |
| `bun run lint` | Run Biome linter |
| `bun run lint:fix` | Auto-fix linting issues |
| `bun run format` | Format code with Biome |
| `bun run verify` | Run typecheck and lint |
| `bun run prepare` | Update dependencies with taze |

</details>

<details>
<summary>Configuration</summary>

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build configuration with Solid.js plugin and path aliases |
| `tsconfig.json` | TypeScript compiler options with path mapping |
| `uno.config.ts` | UnoCSS atomic CSS configuration with custom theme colors |
| `biome.jsonc` | Biome linting and formatting rules |
| `postcss.config.js` | PostCSS configuration for CSS processing |
| `tauri.conf.json` | Tauri application configuration and plugin settings |

</details>

<details>
<summary>Tech Stack</summary>

- **Runtime**: Bun 1.3.14
- **Framework**: Solid.js 1.9.13
- **Desktop**: Tauri 2.11.0
- **Language**: TypeScript 6.0.3
- **Styling**: UnoCSS 66.7.0
- **Editor**: Monaco Editor 4.7.0
- **Markdown**: Marked 18.0.5, Shiki 4.2.0
- **Linting**: Biome 2.4.16
- **Validation**: Zod 4.4.3
- **Security**: DOMPurify 3.4.9

</details>

## Information

[!NOTE]
The application uses Tauri plugins for file system and dialog operations, configured in `tauri.conf.json` with appropriate scopes for user directories.

[!IMPORTANT]
File system access is scoped to user home directories (Documents, Desktop, Downloads) for security. Ensure your skill files are located in these directories.

[!WARNING]
API keys and sensitive configuration should be stored securely. The current implementation stores them in memory only and does not persist to disk.

[!CAUTION]
When editing skills, always save your work before closing the application. Unsaved changes will be lost.

## License

This project is licensed under the <a href="https://choosealicense.com/licenses/mit/" target="_blank" rel="noopener noreferrer">MIT License</a>.

- ✓ Commercial use, Distribution, Modification, Private use
- ⓘ License and copyright notice
- ✕ Liability, Warranty
