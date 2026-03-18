import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.pdf', 'application/pdf'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
]);

async function handleRequest(req, res, rootDir) {
  try {
    const rawPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
    const relativePath = rawPath === '/' ? 'index.html' : rawPath.replace(/^\/+/, '');
    const resolvedRoot = path.resolve(rootDir);
    const targetPath = path.resolve(resolvedRoot, relativePath);

    if (!targetPath.startsWith(resolvedRoot)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    let filePath = targetPath;
    let info;
    try {
      info = await stat(filePath);
    } catch {
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }

    if (info.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    res.statusCode = 200;
    res.setHeader('Content-Type', mimeTypes.get(ext) ?? 'application/octet-stream');
    createReadStream(filePath).pipe(res);
  } catch (error) {
    res.statusCode = 500;
    res.end('Internal Server Error');
    console.error(error);
  }
}

export async function startStaticServer({
  rootDir,
  host = '127.0.0.1',
  port,
}) {
  const server = createServer((req, res) => {
    void handleRequest(req, res, rootDir);
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, resolve);
  });

  return {
    origin: `http://${host}:${port}`,
    close: () =>
      new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(undefined);
        });
      }),
  };
}
