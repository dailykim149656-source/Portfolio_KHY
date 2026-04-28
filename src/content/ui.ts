import type { NavTarget } from '../lib/hashRouting';

export const sectionOrder: NavTarget[] = ['summary', 'experience', 'engagement', 'projects', 'posts', 'skills', 'contact'];

export const sectionLabels: Record<NavTarget, string> = {
  summary: 'Summary',
  experience: 'Experience',
  engagement: 'Training',
  projects: 'Projects',
  posts: 'Posts',
  skills: 'Skills',
  contact: 'Contact',
};

export const uiText = {
  brand: 'KH Portfolio',
  heroLead:
    'AI application and technical solutions engineer connecting semiconductor process discipline with ML systems, deployment readiness, and measurable validation.',
  heroProofs: [
    'LabIT Grand Prize - MS AI School',
    'Live AI documentation workflow - Docsy',
    'Benchmarking, smoke checks, and readiness validation',
  ],
  actions: {
    contact: 'Contact Me',
    projects: 'View Projects',
    projectDetail: 'Open project detail',
    backToProjects: 'Back to projects',
    share: 'Discuss your project',
  },
  summary: 'Summary',
  experience: 'Professional Experience',
  engagementTitle: 'Education & Training',
  projects: 'Selected Projects',
  posts: 'Posts',
  lastUpdated: 'Last updated',
  noPosts: 'No posts yet.',
  readPost: 'Read post',
  backToPosts: 'Back to posts',
  postNotFound: 'Post not found',
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
