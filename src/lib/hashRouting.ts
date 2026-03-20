export type Section = 'summary' | 'experience' | 'engagement' | 'projects' | 'skills' | 'contact';

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

export function getSectionHash(section: Section) {
  return `#/${section}`;
}
