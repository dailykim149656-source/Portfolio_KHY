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
    assertCondition(
      initialText?.includes('AI Application & Technical Solutions Engineer') ?? false,
      'Expected updated hero title text.',
    );
    assertCondition(initialText?.includes('Docsy') ?? false, 'Expected Docsy content to be present.');
    assertCondition(
      !initialText?.includes('Review-First AI Workflow Notes'),
      'Posts should render on the dedicated posts page, not the home page.',
    );
    assertCondition(!initialText?.includes('GPA'), 'GPA should not be visible.');
    assertCondition(!initialText?.includes('Download Resume'), 'Resume download CTA should not be visible.');
    assertCondition(!initialText?.includes('??'), 'Found unexpected mojibake marker "??".');

    await page.goto(appUrl(server.origin, '#/engagement'), { waitUntil: 'networkidle' });
    await assertVisibleHeading(page, '#engagement h2', 'Education & Training');
    assertCondition(
      (await page.locator('#engagement').textContent())?.includes('2025 - Feb 2026') ?? false,
      'Expected engagement dates to match the latest resume content.',
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
    await assertVisibleHeading(page, '.project-detail h3', 'Project Detail: Docsy - AI Document Workflow Agent');
    await page.getByRole('button', { name: 'Back to projects' }).click();
    await page.waitForURL(/#\/projects$/);

    await page.goto(appUrl(server.origin, '#/project/not-a-real-slug'), { waitUntil: 'networkidle' });
    assertCondition(
      (await page.locator('#projects').textContent())?.includes('Project not found') ?? false,
      'Expected not found state for an unknown project slug.',
    );

    await page.goto(appUrl(server.origin, '#/posts'), { waitUntil: 'networkidle' });
    await assertVisibleHeading(page, '#posts h2', 'Posts');
    assertCondition((await page.locator('#summary').count()) === 0, 'Expected posts to render as a dedicated page.');
    const postsText = await page.locator('#posts').textContent();
    assertCondition((await page.locator('#posts .post-card').count()) === 3, 'Expected three example posts.');
    assertCondition((await page.locator('#posts a', { hasText: 'Read post' }).count()) === 3, 'Expected post read links.');
    assertCondition(
      postsText?.includes('Review-First AI Workflow Notes') ?? false,
      'Expected review-first workflow example post.',
    );
    assertCondition(
      postsText?.includes('From Semiconductor Process Thinking to AI Systems') ?? false,
      'Expected semiconductor-to-AI example post.',
    );
    assertCondition(
      postsText?.includes('Deployment Readiness Checklist') ?? false,
      'Expected deployment readiness example post.',
    );
    assertCondition(/Last updated: \d{4}\.\d{2}\.\d{2}/.test(postsText ?? ''), 'Expected formatted post date.');
    assertCondition((await page.locator('#posts pre code').count()) === 0, 'Expected the index page to show previews only.');

    await page.locator('#posts a', { hasText: 'Read post' }).first().click();
    await page.waitForURL(/#\/posts\/ai-workflow-review$/);
    await page.locator('#posts .post-detail-card').waitFor();
    await page.locator('#posts', { hasText: 'The useful product is not only the answer' }).waitFor();
    await page.locator('#posts pre code').first().waitFor();
    await assertVisibleHeading(page, '#posts h2', 'Posts');
    assertCondition((await page.locator('#summary').count()) === 0, 'Expected post detail to stay on the posts page.');
    assertCondition(
      (await page.locator('#posts').textContent())?.includes('The useful product is not only the answer') ?? false,
      'Expected selected post body in the detail page.',
    );
    assertCondition((await page.locator('#posts pre code').count()) >= 1, 'Expected rendered fenced code block.');
    await page.getByRole('link', { name: 'Back to posts' }).click();
    await page.waitForURL(/#\/posts$/);
    await page.locator('#posts .post-detail-card').waitFor({ state: 'detached' });
    await page.locator('#posts .post-list-card').nth(2).waitFor();
    assertCondition((await page.locator('#posts .post-list-card').count()) === 3, 'Expected return to post index.');

    await page.goto(appUrl(server.origin, '#/posts/not-a-real-post'), { waitUntil: 'networkidle' });
    assertCondition(
      (await page.locator('#posts').textContent())?.includes('Post not found') ?? false,
      'Expected not found state for an unknown post slug.',
    );

    await page.getByRole('link', { name: 'Contact' }).click();
    await page.waitForURL(/#\/contact$/);
    await assertVisibleHeading(page, '#contact h2', 'Contact');

    const pdfDownloadLinks = await page.locator('a[href*=".pdf"]').count();
    assertCondition(pdfDownloadLinks === 0, 'Expected no public PDF download links.');

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
