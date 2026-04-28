export type Section = 'summary' | 'experience' | 'engagement' | 'projects' | 'skills' | 'contact';
export type NavTarget = Section | 'posts';

export function getSectionFromHash(hash: string): Section | null {
  const match = hash.match(/^#\/?(summary|experience|engagement|projects|skills|contact)$/);
  if (match) {
    return match[1] as Section;
  }

  if (hash === '#/' || hash === '#' || hash === '') {
    return 'summary';
  }

  return null;
}

export function getProjectSlugFromHash(hash: string) {
  const match = hash.match(/^#\/project\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function getProjectDetailHash(slug: string) {
  return `#/project/${encodeURIComponent(slug)}`;
}

export function getPostSlugFromHash(hash: string) {
  const match = hash.match(/^#\/posts\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function getPostDetailHash(slug: string) {
  return `#/posts/${encodeURIComponent(slug)}`;
}

export function isPostsIndexHash(hash: string) {
  return /^#\/?posts$/.test(hash);
}

export function isPostsRouteHash(hash: string) {
  return isPostsIndexHash(hash) || getPostSlugFromHash(hash) !== null;
}

export const isPostsHash = isPostsIndexHash;

export function getSectionHash(section: NavTarget) {
  return `#/${section}`;
}
