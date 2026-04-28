import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const srcDir = path.join(projectRoot, 'src');

function walkFiles(rootDir) {
  if (!existsSync(rootDir)) {
    return [];
  }

  return readdirSync(rootDir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      return walkFiles(entryPath);
    }
    return entry.isFile() ? [entryPath] : [];
  });
}

const publicResumeAssets = walkFiles(publicDir).filter((filePath) => {
  const fileName = path.basename(filePath);
  return /\.pdf$/i.test(fileName) && /resume/i.test(fileName);
});

if (publicResumeAssets.length > 0) {
  console.error('Public resume assets are not allowed.');
  publicResumeAssets.forEach((filePath) => console.error(`Found: ${path.relative(projectRoot, filePath)}`));
  process.exit(1);
}

const forbiddenSourcePatterns = [
  { name: 'GPA disclosure', pattern: /GPA\s*:/i },
  { name: 'resume download label', pattern: /Download Resume/i },
  { name: 'resume file wiring', pattern: /resumeFileName/i },
];

const sourceTextFiles = walkFiles(srcDir).filter((filePath) => {
  const stat = statSync(filePath);
  return stat.isFile() && /\.(ts|tsx|js|jsx|css|html)$/i.test(filePath);
});

const sourceViolations = sourceTextFiles.flatMap((filePath) => {
  const content = readFileSync(filePath, 'utf8');
  return forbiddenSourcePatterns
    .filter(({ pattern }) => pattern.test(content))
    .map(({ name }) => `${path.relative(projectRoot, filePath)}: ${name}`);
});

if (sourceViolations.length > 0) {
  console.error('Resume privacy verification failed.');
  sourceViolations.forEach((violation) => console.error(violation));
  process.exit(1);
}

console.log('Resume privacy verified.');
console.log('No public resume PDF assets, resume download labels, or GPA disclosure found.');
