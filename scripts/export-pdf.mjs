import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { runNpmScript } from './shared/run-npm-script.mjs';
import { startStaticServer } from './shared/static-site.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const outputPath = path.join(distDir, 'portfolio-linked.pdf');
const host = '127.0.0.1';
const port = Number(process.env.PDF_PORT || 4175);
const publicOrigin = process.env.PDF_PUBLIC_ORIGIN?.replace(/\/+$/, '');

async function main() {
  runNpmScript({ cwd: rootDir, script: 'build' });

  if (!existsSync(path.join(distDir, 'index.html'))) {
    throw new Error('dist/index.html not found after build.');
  }

  await mkdir(distDir, { recursive: true });

  const server = await startStaticServer({
    rootDir: distDir,
    host,
    port,
  });

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(`${server.origin}/`, { waitUntil: 'networkidle' });
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
    await server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
