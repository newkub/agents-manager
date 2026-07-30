# @agents-manager/desktop

> 💻 Desktop app for visualizing AI agent skills, workflows, and MCP servers

![Tauri](https://img.shields.io/badge/tauri-%2324C8D8.svg?style=flat&logo=tauri&logoColor=white)
![Solid](https://img.shields.io/badge/solid-%232C4F7C.svg?style=flat&logo=solid&logoColor=white)

The desktop package wraps the web app in a Tauri shell, providing a native desktop experience on Windows, macOS, and Linux.

## Get Started

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Run dev mode**
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
| ![native](https://api.iconify.design/mdi:monitor.svg?color=%231976d2&width=20) | Native Desktop | Tauri-powered native window | Standalone app | `bun run dev` |
| ![shared](https://api.iconify.design/mdi:share-variant.svg?color=%237b1fa2&width=20) | Shared Web UI | Reuses the web app components | Consistent experience | Same as web |
| ![fs](https://api.iconify.design/mdi:folder-open.svg?color=%23ffa000&width=20) | File System Access | Read local directories via Tauri plugin | Access real files | Use built-in file dialogs |
| ![cross](https://api.iconify.design/mdi:laptop.svg?color=%2300796b&width=20) | Cross-Platform | Builds for Windows, macOS, Linux | Wide OS support | `tauri build` |

## Usage

### Usage via Desktop

Open the desktop app and use the same sidebar navigation as the web app. Switch between **Skills**, **Workflows**, and **MCP** and click any item to view its rendered content.

```bash
bun run dev
```

## Development

<details><summary>Tech Stack</summary>

| Layer | Technology | Description |
|-------|------------|-------------|
| Frontend | SolidJS + Vite | Same stack as web app |
| Desktop Shell | Tauri | Rust-based cross-platform desktop framework |
| FS Plugin | @tauri-apps/plugin-fs | File system access from the webview |

</details>

<details><summary>Scripts</summary>

```json
{
  "dev": "tauri dev",
  "build": "tauri build",
  "typecheck": "tsgo --noEmit",
  "lint": "biome check .",
  "test": "bun test",
  "clean": "bunx rimraf dist .turbo && cargo clean --manifest-path src-tauri/Cargo.toml"
}
```

</details>

<details><summary>Architecture</summary>

```text
apps/desktop/
├── src/
│   ├── App.tsx          # Reuses web app components
│   ├── main.tsx         # Entry point
│   └── ...              # Same component structure as web
└── src-tauri/
    ├── src/
    │   └── main.rs      # Tauri backend
    └── Cargo.toml       # Rust dependencies
```

</details>
