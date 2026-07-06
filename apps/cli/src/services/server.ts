import type { ItemType, VisualizationData } from '@agents-manager/shared';

const HTML_TEMPLATE = (data: VisualizationData) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Agents Manager - ${data.type}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <script type="module" src="/src/main.tsx"></script>
  <script>window.__DATA__ = ${JSON.stringify(data)};</script>
</head>
<body>
  <div id="root"></div>
</body>
</html>`;

export function createServer(data: VisualizationData, port: number): ReturnType<typeof Bun.serve> {
  const server = Bun.serve({
    port,
    async fetch(req) {
      const url = new URL(req.url);

      if (url.pathname === '/' || url.pathname === '/index.html') {
        return new Response(HTML_TEMPLATE(data), {
          headers: { 'Content-Type': 'text/html' },
        });
      }

      if (url.pathname === '/api/data') {
        return Response.json(data);
      }

      if (url.pathname === '/api/type') {
        return Response.json({ type: data.type, total: data.total });
      }

      return new Response('Not found', { status: 404 });
    },
  });

  return server;
}

export function openBrowser(url: string): void {
  const platform = process.platform;
  let cmd: string[];

  if (platform === 'win32') {
    cmd = ['cmd', '/c', 'start', url];
  } else if (platform === 'darwin') {
    cmd = ['open', url];
  } else {
    cmd = ['xdg-open', url];
  }

  Bun.spawn(cmd);
}

export async function startVisualizationServer(
  type: ItemType,
  data: VisualizationData,
  port: number,
  open: boolean
): Promise<string> {
  const server = createServer(data, port);
  const url = `http://localhost:${server.port}`;

  console.log(`\n  Agents Manager - ${type.toUpperCase()}`);
  console.log(`  Server running at ${url}`);
  console.log(`  Items found: ${data.total}`);
  console.log(`  Press Ctrl+C to stop\n`);

  if (open) {
    openBrowser(url);
  }

  return url;
}
