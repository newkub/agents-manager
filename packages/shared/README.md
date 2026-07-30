# @agents-manager/shared

> 🧩 Shared types and markdown parsers for agents-manager

![TypeScript](https://img.shields.io/badge/typescript-%233178C6.svg?style=flat&logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/bun-%23000000.svg?style=flat&logo=bun&logoColor=white)

The shared package provides TypeScript types and utilities for parsing skill, workflow, and MCP server markdown files.

## Get Started

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Build the package**
   ```bash
   bun run build
   ```

3. **Run tests**
   ```bash
   bun run test
   ```

## Features

| Icon | Feature | Description | Benefit | Usage |
| :---: |---------|-------------|---------|-------|
| ![types](https://api.iconify.design/mdi:code-braces.svg?color=%231976d2&width=20) | Shared Types | Common interfaces for skills, workflows, MCP | Type safety across packages | Import from `@agents-manager/shared` |
| ![parser](https://api.iconify.design/mdi:file-document.svg?color=%23ffa000&width=20) | Markdown Parser | Extracts frontmatter and content | Reusable parsing logic | `parseSkills(dir)` |
| ![search](https://api.iconify.design/mdi:magnify.svg?color=%2300796b&width=20) | Recursive Scan | Walks directories recursively | Finds all markdown files | Auto in `collectVisualizationData` |
| ![tags](https://api.iconify.design/mdi:tag.svg?color=%23c2185b&width=20) | Tag Extraction | Parses tags from frontmatter | Categorize resources | Auto extracted |

## Usage

### Usage via SDK

```bash
bun add @agents-manager/shared
```

```typescript
import {
  collectVisualizationData,
  parseSkills,
  parseWorkflows,
  parseMcpServers,
} from '@agents-manager/shared';

// Collect all data for a type
const data = await collectVisualizationData('skills', './my-skills');

// Or parse manually
const skills = await parseSkills('./skills');
const workflows = await parseWorkflows('./workflows');
const mcp = await parseMcpServers('./mcp');
```

## Development

<details><summary>Tech Stack</summary>

| Layer | Technology | Description |
|-------|------------|-------------|
| Language | TypeScript | Type-safe code |
| Validation | Zod | Schema validation |
| Runtime | Bun | JavaScript runtime |

</details>

<details><summary>Scripts</summary>

```json
{
  "build": "bun build src/index.ts --outdir dist --target bun",
  "typecheck": "tsgo --noEmit",
  "lint": "biome check .",
  "test": "bun test",
  "clean": "bunx rimraf dist .turbo"
}
```

</details>

<details><summary>Architecture</summary>

```text
packages/shared/src/
├── index.ts        # Re-exports
├── types/
│   └── index.ts    # TypeScript interfaces
└── parsers/
    └── index.ts    # Markdown and frontmatter parsers
```

</details>
