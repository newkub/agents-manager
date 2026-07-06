import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ItemType, VisualizationData } from '@agents-manager/shared';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const HTML_TEMPLATE = (data: VisualizationData) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Agents Manager - ${data.type}</title>
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

      // API endpoints
      if (url.pathname === '/api/data') {
        return Response.json(data);
      }

      if (url.pathname === '/api/type') {
        return Response.json({ type: data.type, total: data.total });
      }

      // Serve static files from web app dist
      if (url.pathname === '/' || url.pathname === '/index.html') {
        // Try to serve from dist first, fallback to template
        try {
          const distPath = join(__dirname, '..', '..', '..', 'web', 'dist', 'index.html');
          const distFile = Bun.file(distPath);
          if (await distFile.exists()) {
            const content = await distFile.text();
            // Inject data into the HTML
            const htmlWithScript = content.replace(
              '</head>',
              `<script>window.__DATA__ = ${JSON.stringify(data)};</script></head>`
            );
            return new Response(htmlWithScript, {
              headers: { 'Content-Type': 'text/html' },
            });
          }
        } catch {
          // Fallback to template
        }
        return new Response(HTML_TEMPLATE(data), {
          headers: { 'Content-Type': 'text/html' },
        });
      }

      // Try to serve static assets from dist
      try {
        const distPath = join(__dirname, '..', '..', '..', 'web', 'dist', url.pathname);
        const distFile = Bun.file(distPath);
        if (await distFile.exists()) {
          const ext = url.pathname.split('.').pop();
          const contentType =
            ext === 'js'
              ? 'application/javascript'
              : ext === 'css'
                ? 'text/css'
                : ext === 'json'
                  ? 'application/json'
                  : 'application/octet-stream';
          return new Response(distFile, {
            headers: { 'Content-Type': contentType },
          });
        }
      } catch {
        // Continue to 404
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
