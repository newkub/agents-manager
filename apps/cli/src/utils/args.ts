export interface CliArgs {
  command: 'skills' | 'workflows' | 'mcp' | 'help' | 'version';
  baseDir?: string;
  port?: number;
  open: boolean;
}

export function parseArgs(args: string[]): CliArgs {
  const result: CliArgs = {
    command: 'help',
    open: true,
  };

  const filtered = args.filter((a) => !a.startsWith('--'));
  const flags = args.filter((a) => a.startsWith('--'));

  if (filtered.length > 0) {
    const cmd = filtered[0];
    if (
      cmd === 'skills' ||
      cmd === 'workflows' ||
      cmd === 'mcp' ||
      cmd === 'help' ||
      cmd === 'version'
    ) {
      result.command = cmd;
    }
  }

  for (const flag of flags) {
    if (flag === '--no-open') result.open = false;
    if (flag.startsWith('--port=')) {
      const port = Number.parseInt(flag.slice(7), 10);
      if (!Number.isNaN(port)) result.port = port;
    }
    if (flag.startsWith('--dir=')) {
      result.baseDir = flag.slice(6);
    }
  }

  return result;
}

export function showHelp(): void {
  console.log(`
agents-manager - Manage AI agent skills, workflows, and MCP servers

USAGE:
  agents-manager <command> [options]

COMMANDS:
  skills      Visualize skills in web browser
  workflows   Visualize workflows in web browser
  mcp         Visualize MCP servers in web browser
  help        Show this help message
  version     Show version information

OPTIONS:
  --dir=<path>     Base directory containing skills/workflows/mcp folders
  --port=<number>  Port for the web server (default: 4321)
  --no-open        Don't automatically open browser

EXAMPLES:
  agents-manager skills
  agents-manager workflows --dir=./my-project
  agents-manager mcp --port=8080 --no-open
`);
}

export function showVersion(): void {
  console.log('agents-manager v0.1.0');
}
