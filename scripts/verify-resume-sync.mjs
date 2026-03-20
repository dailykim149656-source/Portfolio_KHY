import { createHash } from 'node:crypto';
import { existsSync, statSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const targetPath = path.join(projectRoot, 'public', 'main_resume_kimhyoyeol.pdf');
const sourcePath = process.argv[2] ?? process.env.RESUME_SOURCE_PATH;

function sha256(filePath) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex');
}

if (!sourcePath) {
  console.error('Usage: node scripts/verify-resume-sync.mjs <source-pdf-path>');
  process.exit(1);
}

if (!existsSync(sourcePath)) {
  console.error(`Source PDF not found: ${sourcePath}`);
  process.exit(1);
}

if (!existsSync(targetPath)) {
  console.error(`Target PDF not found: ${targetPath}`);
  process.exit(1);
}

const sourceStat = statSync(sourcePath);
const targetStat = statSync(targetPath);
const sourceHash = sha256(sourcePath);
const targetHash = sha256(targetPath);

if (sourceStat.size !== targetStat.size || sourceHash !== targetHash) {
  console.error('Resume sync verification failed.');
  console.error(`Source size: ${sourceStat.size}, Target size: ${targetStat.size}`);
  console.error(`Source sha256: ${sourceHash}`);
  console.error(`Target sha256: ${targetHash}`);
  process.exit(1);
}

console.log('Resume sync verified.');
console.log(`Size: ${targetStat.size}`);
console.log(`SHA256: ${targetHash}`);
