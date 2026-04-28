import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';

const basePath = process.env.BASE_PATH ?? './';
const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(projectRoot, 'content', 'posts');
const virtualPostsModuleId = 'virtual:portfolio-posts';
const resolvedVirtualPostsModuleId = `\0${virtualPostsModuleId}`;

function toTitleCase(slug: string) {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
}

function trimBlankLines(lines: string[]) {
  const nextLines = [...lines];

  while (nextLines.length > 0 && nextLines[0].trim() === '') {
    nextLines.shift();
  }

  while (nextLines.length > 0 && nextLines[nextLines.length - 1].trim() === '') {
    nextLines.pop();
  }

  return nextLines;
}

function getGitLastModified(filePath: string) {
  const relativeFilePath = path.relative(projectRoot, filePath).replace(/\\/g, '/');

  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cI', '--', relativeFilePath], {
      cwd: projectRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();

    return output || null;
  } catch {
    return null;
  }
}

function getPostBodyAndTitle(filePath: string) {
  const slug = path.basename(filePath, '.md');
  const rawContent = readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  const lines = rawContent.split('\n');
  const titleLineIndex = lines.findIndex((line) => /^#\s+/.test(line));
  const title = titleLineIndex >= 0 ? lines[titleLineIndex].replace(/^#\s+/, '').trim() : toTitleCase(slug);
  const bodyLines = titleLineIndex >= 0 ? lines.filter((_, index) => index !== titleLineIndex) : lines;

  return {
    title,
    body: trimBlankLines(bodyLines).join('\n'),
  };
}

function collectPosts() {
  if (!existsSync(postsDir)) {
    return [];
  }

  return readdirSync(postsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => {
      const filePath = path.join(postsDir, entry.name);
      const { title, body } = getPostBodyAndTitle(filePath);
      const lastModified = getGitLastModified(filePath) ?? statSync(filePath).mtime.toISOString();

      return {
        slug: path.basename(entry.name, '.md'),
        title,
        body,
        lastModified,
        sourcePath: path.relative(projectRoot, filePath).replace(/\\/g, '/'),
      };
    })
    .sort((left, right) => right.lastModified.localeCompare(left.lastModified));
}

function portfolioPostsPlugin(): Plugin {
  return {
    name: 'portfolio-posts',
    resolveId(id) {
      if (id === virtualPostsModuleId) {
        return resolvedVirtualPostsModuleId;
      }

      return null;
    },
    load(id) {
      if (id === resolvedVirtualPostsModuleId) {
        return `export const posts = ${JSON.stringify(collectPosts(), null, 2)};\n`;
      }

      return null;
    },
    configureServer(server) {
      const normalizedPostsDir = postsDir.replace(/\\/g, '/');

      if (existsSync(postsDir)) {
        server.watcher.add(`${normalizedPostsDir}/**/*.md`);
      }

      server.watcher.on('all', (_, filePath) => {
        const normalizedFilePath = filePath.replace(/\\/g, '/');

        if (!normalizedFilePath.startsWith(`${normalizedPostsDir}/`) || !normalizedFilePath.endsWith('.md')) {
          return;
        }

        const module = server.moduleGraph.getModuleById(resolvedVirtualPostsModuleId);
        if (module) {
          server.moduleGraph.invalidateModule(module);
        }
        server.ws.send({ type: 'full-reload' });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), portfolioPostsPlugin()],
  base: basePath,
});
