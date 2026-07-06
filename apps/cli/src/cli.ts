import { getDataForType, resolveBaseDir } from './services/data';
import { startVisualizationServer } from './services/server';
import { parseArgs, showHelp, showVersion } from './utils/args';

const DEFAULT_PORT = 4321;

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  if (args.command === 'help') {
    showHelp();
    return;
  }

  if (args.command === 'version') {
    showVersion();
    return;
  }

  const baseDir = await resolveBaseDir(args.baseDir);
  const port = args.port ?? DEFAULT_PORT;
  const data = await getDataForType(args.command, baseDir);

  await startVisualizationServer(args.command, data, port, args.open);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
