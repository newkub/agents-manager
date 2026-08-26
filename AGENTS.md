# AGENTS.md

## Project

- Project Type: `single-root application`
- Package Manager: `Bun`
- Runtime: `Bun`
- Language: `TypeScript`
- Linting: `Biome`
- Git Hooks: `Lefthook`
- Router: `TanStack Router (Solid)`
- Backend: `Elysia` + `oRPC`
- Desktop: `Tauri`

## Structure

- `src/`: SolidJS application source (components, stores, utils, lib, routes, router)
- `src/lib/`: Shared types and markdown parsers
- `src/api/`: oRPC router definitions
- `src/server/`: Elysia HTTP server
- `src-tauri/`: Tauri Rust desktop backend
- `index.html`: Vite entry HTML
- `package.json`: Single project manifest (no workspaces)
- `vite.config.ts`, `uno.config.ts`, `tsconfig.json`: Build and type configuration

## Architecture

- `src/main.tsx` bootstraps a TanStack Router application.
- `src/routes/index.tsx` renders the `App` component.
- `src/stores/visualization.ts` fetches data on mount.
- `src/utils/orpc.ts` provides a type-safe oRPC client.
- `src/api/router.ts` exposes `visualization.getData` over oRPC.
- `src/server/index.ts` runs an Elysia server at `http://localhost:3000` and mounts the oRPC handler at `/rpc`.
- Vite dev server proxies `/rpc` to the Elysia server.
- `src-tauri/` wraps the web build in a Tauri desktop shell.

## Commands

- `bun run dev` — Start Vite dev server (port `5173`)
- `bun run build` — Build the web app to `dist/`
- `bun run server` — Start the Elysia backend with hot reload
- `bun run start` — Start the Elysia backend
- `bun run typecheck` — Type check with `tsc --noEmit`
- `bun run lint` — Lint and format check with Biome
- `bun run test` — Run tests with Vitest
- `bun run verify` — Lint + typecheck + test
- `bun run tauri:dev` — Start the Tauri desktop app in development
- `bun run tauri:build` — Build the Tauri desktop app
