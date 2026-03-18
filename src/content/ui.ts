import type { Section } from '../lib/hashRouting';

export const sectionOrder: Section[] = ['summary', 'experience', 'projects', 'skills', 'contact'];

export const sectionLabels: Record<Section, string> = {
  summary: 'Summary',
  experience: 'Experience',
  projects: 'Projects',
  skills: 'Skills',
  contact: 'Contact',
};

export const uiText = {
  brand: 'KH Portfolio',
  actions: {
    contact: 'Contact Me',
    projectDetail: 'Open project detail',
    backToProjects: 'Back to projects',
    share: 'Discuss your project',
    resume: 'Download Resume',
  },
  summary: 'Summary',
  experience: 'Professional Experience',
  projects: 'Selected Projects',
  skills: 'Technical Skills',
  contactTitle: 'Contact',
  educationLabel: 'Education',
  certLabel: 'Certifications',
  phoneLabel: 'Phone',
  contactLabel: 'Email',
  linkedInLabel: 'LinkedIn',
  githubLabel: 'GitHub',
  bannerMessage: 'Tell me your team context and I can suggest an implementation plan in a practical stack.',
  contactText: 'Need help with ML inference and deployment strategy? Let me know what you want to solve.',
  approach: 'Approach',
  outcomes: 'Outcomes',
  techStack: 'Tech Stack',
  notes: 'Notes',
  links: 'Related Links',
  detail: 'Project Detail',
  projectNotFound: 'Project not found',
  return: 'Return',
};

export const resumeFileName = 'main_resume_kimhyoyeol.pdf';
