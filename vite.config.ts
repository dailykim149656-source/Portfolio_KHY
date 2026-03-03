import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const githubRepo = process.env.GITHUB_REPOSITORY;
const repoBase = githubRepo ? `/${githubRepo.split('/')[1]}/` : './';
const basePath = process.env.BASE_PATH ?? repoBase;

export default defineConfig({
  plugins: [react()],
  base: basePath,
});
