import { spawnSync } from 'node:child_process';
import { createServer } from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const outputPath = path.join(distDir, 'portfolio-linked.pdf');
const host = '127.0.0.1';
const port = Number(process.env.PDF_PORT || 4175);
const publicOrigin = process.env.PDF_PUBLIC_ORIGIN?.replace(/\/+$/, '');

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

function runBuild() {
  const npmExecPath = process.env.npm_execpath;
  const command = npmExecPath ? process.execPath : process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const args = npmExecPath ? [npmExecPath, 'run', 'build'] : ['run', 'build'];
  const result = spawnSync(command, args, {
    cwd: rootDir,
    stdio: 'inherit',
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error('Build failed. Cannot export PDF.');
  }
}

async function handler(req, res) {
  try {
    const rawPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
    const relativePath = rawPath === '/' ? 'index.html' : rawPath.replace(/^\/+/, '');
    const targetPath = path.resolve(distDir, relativePath);

    if (!targetPath.startsWith(distDir)) {
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

async function main() {
  runBuild();

  if (!existsSync(path.join(distDir, 'index.html'))) {
    throw new Error('dist/index.html not found after build.');
  }

  await mkdir(distDir, { recursive: true });

  const server = createServer((req, res) => {
    void handler(req, res);
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, resolve);
  });

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(`http://${host}:${port}/`, { waitUntil: 'networkidle' });
    await page.evaluate(async (origin) => {
      if (origin) {
        for (const link of document.querySelectorAll('a[href]')) {
          const rawHref = link.getAttribute('href');
          if (!rawHref) {
            continue;
          }
          if (rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) {
            continue;
          }
          const resolved = new URL(rawHref, window.location.href);
          if (resolved.origin === window.location.origin) {
            link.href = `${origin}${resolved.pathname}${resolved.search}${resolved.hash}`;
          }
        }
      }

      for (const detail of document.querySelectorAll('details')) {
        detail.open = true;
      }
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
    }, publicOrigin);

    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
    });

    console.log(`PDF exported: ${outputPath}`);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
