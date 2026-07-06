# AGENTS.md

## Project

- Project Type: `monorepo`
- Package Manager: `Bun`
- Runtime: `Bun`
- Language: `TypeScript`
- Linting: `Biome`
- Monorepo: `Turborepo`
- Git Hooks: `Lefthook`

## Workspaces

- `apps/cli`: CLI tool (Bun CLI) for visualizing skills, workflows, and MCP servers
- `apps/web`: Web visualization app (SolidJS + Vite + UnoCSS + Shiki)
- `apps/desktop`: Desktop app (Tauri + SolidJS + Vite + UnoCSS + Shiki)
- `packages/shared`: Shared types and parsers

## Architecture

- CLI starts a local web server and opens browser to visualize data
- Web app reads data from `window.__DATA__` or fetches from `/api/data`
- Desktop app wraps web app with Tauri
- Shared package provides types and file parsing utilities

## Commands

- `bun run dev` - Start all dev servers
- `bun run build` - Build all packages
- `bun run typecheck` - Type check all packages
- `bun run lint` - Lint all files
- `bun run test` - Run all tests
- `bun run verify` - Lint + typecheck + test
