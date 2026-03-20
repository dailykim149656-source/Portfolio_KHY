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
const outputDir = path.join(rootDir, 'output', 'playwright');
const host = '127.0.0.1';
const port = Number(process.env.SMOKE_PORT || 4176);
const skipBuild = process.argv.includes('--skip-build');

function assertCondition(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function ensureBuildOutput() {
  if (!skipBuild) {
    runNpmScript({ cwd: rootDir, script: 'build' });
  }

  if (!existsSync(path.join(distDir, 'index.html'))) {
    throw new Error('dist/index.html not found. Run the build before smoke testing.');
  }
}

function appUrl(origin, hash = '') {
  return `${origin}/${hash}`;
}

async function assertVisibleHeading(page, selector, expectedText) {
  await page.waitForSelector(selector);
  const content = await page.locator(selector).textContent();
  assertCondition(content?.includes(expectedText), `Expected "${expectedText}" in ${selector}.`);
}

async function main() {
  await ensureBuildOutput();
  await mkdir(outputDir, { recursive: true });

  const server = await startStaticServer({
    rootDir: distDir,
    host,
    port,
  });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(appUrl(server.origin), { waitUntil: 'networkidle' });
    await assertVisibleHeading(page, '#summary h2', 'Summary');

    const initialText = await page.locator('body').textContent();
    assertCondition(initialText?.includes('Jan 2022 - 2024') ?? false, 'Expected cleaned experience period text.');
    assertCondition(
      initialText?.includes('Microsoft Certified: Azure AI Fundamentals (AI-900)') ?? false,
      'Expected cleaned certification text.',
    );
    assertCondition(initialText?.includes('AI/Backend Engineer') ?? false, 'Expected cleaned hero title text.');
    assertCondition(initialText?.includes('Docsy') ?? false, 'Expected Docsy content to be present.');
    assertCondition(!initialText?.includes('??'), 'Found unexpected mojibake marker "??".');

    await page.goto(appUrl(server.origin, '#/engagement'), { waitUntil: 'networkidle' });
    await assertVisibleHeading(page, '#engagement h2', 'Current Engagement');
    assertCondition(
      (await page.locator('#engagement').textContent())?.includes('2025 - February 2026') ?? false,
      'Expected engagement dates to match the resume.',
    );
    assertCondition(
      (await page.locator('#engagement').textContent())?.includes('Korean') ?? false,
      'Expected structured language metadata in engagement.',
    );

    await page.goto(appUrl(server.origin, '#/skills'), { waitUntil: 'networkidle' });
    await assertVisibleHeading(page, '#skills h2', 'Technical Skills');

    await page.goto(appUrl(server.origin, '#/projects'), { waitUntil: 'networkidle' });
    await assertVisibleHeading(page, '#projects h2', 'Selected Projects');

    const projectLinks = await page.locator('#projects .project-card a.btn-secondary').evaluateAll((links) =>
      links.map((link) => link.getAttribute('href')),
    );
    assertCondition(projectLinks[0] === '#/project/docsy', 'Expected Docsy to be the first project.');
    for (const slug of ['docsy', 'labit-lab', 'snap-q', 'honeypot', 'sram-noise']) {
      assertCondition(projectLinks.includes(`#/project/${slug}`), `Missing project route for slug "${slug}".`);
    }

    await page.goto(appUrl(server.origin, '#/project/docsy'), { waitUntil: 'networkidle' });
    await assertVisibleHeading(page, '.project-detail h3', 'Project Detail: Project A: DOCSY - AI Document Workflow Agent (Live Domain)');
    await page.getByRole('button', { name: 'Back to projects' }).click();
    await page.waitForURL(/#\/projects$/);

    await page.goto(appUrl(server.origin, '#/project/not-a-real-slug'), { waitUntil: 'networkidle' });
    assertCondition(
      (await page.locator('#projects').textContent())?.includes('Project not found') ?? false,
      'Expected not found state for an unknown project slug.',
    );

    const resumeHref = await page.locator('#contact a.btn-secondary').getAttribute('href');
    assertCondition(resumeHref?.endsWith('main_resume_kimhyoyeol.pdf') ?? false, 'Resume link is incorrect.');

    const linkedInHref = await page.locator('a[href*="linkedin.com/in/kimhyoyeol"]').first().getAttribute('href');
    const githubHref = await page.locator('a[href*="github.com/dailykim149656-source"]').first().getAttribute('href');
    assertCondition(linkedInHref === 'https://linkedin.com/in/kimhyoyeol', 'LinkedIn href is incorrect.');
    assertCondition(githubHref === 'https://github.com/dailykim149656-source', 'GitHub href is incorrect.');

    console.log('Smoke test passed.');
  } catch (error) {
    await page.screenshot({
      path: path.join(outputDir, 'smoke-failure.png'),
      fullPage: true,
    });
    throw error;
  } finally {
    await browser.close();
    await server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
