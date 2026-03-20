import type { Section } from '../lib/hashRouting';

export const sectionOrder: Section[] = ['summary', 'experience', 'engagement', 'projects', 'skills', 'contact'];

export const sectionLabels: Record<Section, string> = {
  summary: 'Summary',
  experience: 'Experience',
  engagement: 'Engagement',
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
  engagementTitle: 'Current Engagement',
  projects: 'Selected Projects',
  skills: 'Technical Skills',
  contactTitle: 'Contact',
  educationLabel: 'Education',
  certLabel: 'Certifications',
  phoneLabel: 'Phone',
  contactLabel: 'Email',
  linkedInLabel: 'LinkedIn',
  githubLabel: 'GitHub',
  languagesTitle: 'Languages',
  languageLevelLabel: 'Level',
  completedLabel: 'Completed',
  bannerMessage: 'Tell me about your AI workflow, backend platform, or deployment constraints and I can map out a practical implementation approach.',
  contactText: 'Need help with AI workflow systems, backend platforms, or deployment readiness? Tell me what you want to solve.',
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
