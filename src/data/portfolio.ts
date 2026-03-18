import type { LocalizedList, LocalizedText } from '../lib/i18n';

export type { LocalizedList, LocalizedText } from '../lib/i18n';

export interface SkillItem {
  name: LocalizedText;
  icon: PortfolioIconId;
  iconLabel?: LocalizedText;
  tone?: PortfolioTone;
  tooltip?: LocalizedText;
}

export type PortfolioIconId =
  | 'brain'
  | 'chartLine'
  | 'target'
  | 'bolt'
  | 'code'
  | 'lock'
  | 'database'
  | 'stream'
  | 'cloud'
  | 'robot'
  | 'cogs'
  | 'rocket'
  | 'globe'
  | 'docker'
  | 'github'
  | 'tachometer'
  | 'search'
  | 'flask'
  | 'eye'
  | 'python'
  | 'js'
  | 'nextjs'
  | 'azure'
  | 'openai'
  | 'fastapi'
  | 'langchain'
  | 'rag'
  | 'cpp'
  | 'rust'
  | 'pytorch'
  | 'redis'
  | 'numpy'
  | 'pandas'
  | 'sql'
  | 'sse'
  | 'githubActions';

export type PortfolioTone = 'ai' | 'backend' | 'cloud' | 'data' | 'language' | 'ops' | 'infra';

export interface TechStackItem {
  name: LocalizedText;
  icon: PortfolioIconId;
  iconLabel?: LocalizedText;
  tone?: PortfolioTone;
  tooltip?: LocalizedText;
}

export interface ExperienceItem {
  role: LocalizedText;
  company: LocalizedText;
  period: LocalizedText;
  location: LocalizedText;
  details: LocalizedList;
}

export interface SkillGroup {
  group: LocalizedText;
  items: SkillItem[];
}

export interface ProjectItem {
  slug: string;
  title: LocalizedText;
  period: LocalizedText;
  role: LocalizedText;
  problem: LocalizedText;
  approach: LocalizedList;
  outcomes: LocalizedList;
  stack: TechStackItem[];
  links?: {
    href: string;
    label: LocalizedText;
  }[];
  notes?: LocalizedList;
}

export interface PortfolioData {
  name: string;
  contact: {
    email: string;
    phone: string;
    linkedIn: string;
    github: string;
  };
  title: LocalizedText;
  summary: LocalizedText;
  experiences: ExperienceItem[];
  education: {
    school: LocalizedText;
    period: LocalizedText;
    detail: LocalizedText;
  };
  certs: LocalizedList;
  skills: SkillGroup[];
  projects: ProjectItem[];
}

const text = (en: string, ko?: string): LocalizedText => (ko ? { en, ko } : { en });
const list = (en: string[], ko?: string[]): LocalizedList => (ko ? { en, ko } : { en });

export const portfolio: PortfolioData = {
  name: 'Kim Hyoyeol',
  title: text('Cloud/AI Systems Engineer'),
  contact: {
    email: 'daliykim149656@gmail.com',
    phone: '+82 10 9398 8411',
    linkedIn: 'https://linkedin.com/in/kimhyoyeol',
    github: 'https://github.com/dailykim149656-source',
  },
  summary: text(
    'Cloud/AI systems engineer with a semiconductor process engineering background and hands-on experience in ML proof-of-concept development and backend platforms. Led LabIT (Lab By Intelligence; MS AI SCHOOL final project) to 1st Place (Grand Prize), developing a full-stack PoC system with FastAPI, Next.js, Azure OpenAI, SQL Server, and Redis. Combines PyTorch modeling, API development, and manufacturing-grade root-cause analysis to optimize reliability, latency, throughput, and operational outcomes.',
  ),
  experiences: [
    {
      role: text('BEOL Process Integration Engineer'),
      company: text('Samsung Electronics'),
      period: text('2024'),
      location: text('Advanced Logic Process Integration (300mm, Sub-5nm)'),
      details: list([
        'Supported BEOL process integration for sub-5nm logic, analyzing yield data and performance metrics with statistical methods to identify actionable optimization pathways and risk drivers.',
        'Built practical understanding of on-chip SRAM architecture, memory bandwidth constraints, and hardware-software co-design tradeoffs relevant to specialized compute systems.',
        'Performed systematic root-cause analysis on yield-limiting factors, characterizing process windows, design margins, and key defect mechanisms across critical steps.',
      ]),
    },
    {
      role: text('Etch Process Development Engineer'),
      company: text('SEMES (Semiconductor Equipment Co.)'),
      period: text('Jan 2022 - 2024'),
      location: text('Etch Process Development for 300mm Production Tools'),
      details: list([
        'Developed and qualified plasma etch processes on 300mm production equipment, achieving target uniformity and selectivity through structured DOE and iterative tuning.',
        'Performed equipment characterization and stability analysis, diagnosing performance bottlenecks and resolving instability with statistical methods and trace analysis.',
        'Defined process control plans and qualification criteria, verified repeatability across tools, and coordinated change management.',
      ]),
    },
  ],
  education: {
    school: text('B.S. Advanced Materials Science & Engineering, Sungkyunkwan University (SKKU)'),
    period: text('2022'),
    detail: text('Capstone: Copper Nanoparticle Paste Improvement for Automotive Semiconductor Die-attach Process'),
  },
  certs: list([
    'Microsoft Azure AI Fundamentals (AI-900)',
    'Microsoft AI School - Advanced ML Engineering Program (2025-present)',
  ]),
  skills: [
    {
      group: text('AI & Deep Learning'),
      items: [
        {
          name: text('PyTorch (custom models, CNNs, hyperparameter tuning)'),
          icon: 'brain',
          iconLabel: text('PyTorch'),
          tone: 'ai',
        },
        {
          name: text('Inference optimization and evaluation workflows'),
          icon: 'chartLine',
          iconLabel: text('Inference optimization'),
          tone: 'ai',
        },
        {
          name: text('Uncertainty-aware modeling approach for production use'),
          icon: 'target',
          iconLabel: text('Uncertainty-aware modeling'),
          tone: 'ai',
        },
      ],
    },
    {
      group: text('Backend & Platform'),
      items: [
        {
          name: text('FastAPI'),
          icon: 'bolt',
          iconLabel: text('FastAPI'),
          tone: 'backend',
        },
        {
          name: text('REST API design'),
          icon: 'code',
          iconLabel: text('REST APIs'),
          tone: 'backend',
        },
        {
          name: text('JWT/CSRF auth patterns'),
          icon: 'lock',
          iconLabel: text('Authentication'),
          tone: 'backend',
        },
        {
          name: text('SQL Server'),
          icon: 'database',
          iconLabel: text('SQL Server'),
          tone: 'data',
        },
        {
          name: text('Redis'),
          icon: 'stream',
          iconLabel: text('Redis'),
          tone: 'data',
        },
        {
          name: text('SSE streaming'),
          icon: 'stream',
          iconLabel: text('Streaming'),
          tone: 'ops',
        },
      ],
    },
    {
      group: text('Cloud & DevOps'),
      items: [
        {
          name: text('Azure OpenAI'),
          icon: 'cloud',
          iconLabel: text('Azure OpenAI'),
          tone: 'cloud',
        },
        {
          name: text('Azure ML'),
          icon: 'brain',
          iconLabel: text('Azure ML'),
          tone: 'ai',
        },
        {
          name: text('Azure AI Foundry'),
          icon: 'cogs',
          iconLabel: text('Azure AI Foundry'),
          tone: 'cloud',
        },
        {
          name: text('Azure App Service'),
          icon: 'rocket',
          iconLabel: text('Azure App Service'),
          tone: 'cloud',
        },
        {
          name: text('Static Web Apps'),
          icon: 'globe',
          iconLabel: text('Static Web Apps'),
          tone: 'cloud',
        },
        {
          name: text('Docker'),
          icon: 'docker',
          iconLabel: text('Docker'),
          tone: 'infra',
        },
        {
          name: text('GitHub Actions'),
          icon: 'github',
          iconLabel: text('GitHub Actions'),
          tone: 'infra',
        },
      ],
    },
    {
      group: text('Systems Engineering'),
      items: [
        {
          name: text('Latency/throughput profiling'),
          icon: 'tachometer',
          iconLabel: text('Profiling'),
          tone: 'ops',
        },
        {
          name: text('Bottleneck isolation'),
          icon: 'search',
          iconLabel: text('Bottleneck analysis'),
          tone: 'ops',
        },
        {
          name: text('Experiment tracking'),
          icon: 'flask',
          iconLabel: text('Experiment tracking'),
          tone: 'ai',
        },
        {
          name: text('Monitoring and hardware-aware tradeoff analysis'),
          icon: 'eye',
          iconLabel: text('Monitoring'),
          tone: 'ops',
        },
      ],
    },
    {
      group: text('Programming'),
      items: [
        {
          name: text('Python'),
          icon: 'python',
          iconLabel: text('Python'),
          tone: 'language',
        },
        {
          name: text('TypeScript'),
          icon: 'js',
          iconLabel: text('TypeScript'),
          tone: 'language',
        },
      ],
    },
  ],
  projects: [
    {
      slug: 'snap-q',
      title: text('Project A: SNAP-Q - AI Vehicle Damage Assessment'),
      period: text('2-week PoC sprint'),
      role: text('Led vision model segment lead'),
      problem: text(
        'Need a vision model that can generate repair cost estimates with usable uncertainty from real-world vehicle damage photos.',
      ),
      approach: list([
        'Built a multi-model vision pipeline using PyTorch in CUDA-based Azure ML Studio on scalable GPU infrastructure.',
        'Led Mask R-CNN damage segmentation and prioritized accuracy on real-world camera images.',
        'Built Bayesian fusion logic combining segmentation and classification for uncertainty-aware estimation.',
      ]),
      outcomes: list([
        'Built an end-to-end PoC prototype generating preliminary repair cost estimates with uncertainty ranges.',
        'Built a practical segmentation and classification architecture for experimentation.',
      ]),
      stack: [
        {
          name: text('PyTorch'),
          icon: 'pytorch',
          iconLabel: text('PyTorch'),
          tone: 'ai',
        },
        {
          name: text('Azure ML Studio'),
          icon: 'azure',
          iconLabel: text('Azure ML Studio'),
          tone: 'cloud',
        },
        {
          name: text('Azure ML'),
          icon: 'azure',
          iconLabel: text('Azure ML'),
          tone: 'cloud',
        },
        {
          name: text('Mask R-CNN'),
          icon: 'robot',
          iconLabel: text('Mask R-CNN'),
          tone: 'ai',
        },
        {
          name: text('Classification models'),
          icon: 'chartLine',
          iconLabel: text('Classification models'),
          tone: 'ai',
        },
        {
          name: text('Bayesian fusion'),
          icon: 'target',
          iconLabel: text('Bayesian fusion'),
          tone: 'ai',
        },
      ],
      links: [
        {
          href: 'https://www.linkedin.com/posts/kimhyoyeol_activity-7415780477254541312-ttNM?utm_source=share&utm_medium=member_desktop&rcm=ACoAACkMWEQB20TCGIFoYe8EtrvrSv7ot_DcjjM',
          label: text('LinkedIn Post'),
        },
      ],
      notes: list(['Summary is adapted from LinkedIn posts and project timeline notes.']),
    },
    {
      slug: 'honeypot',
      title: text('Project B: HONEYPOT - AI Knowledge Handover Chatbot & Documentation System'),
      period: text('HR SaaS platform'),
      role: text('PM / Architecture Lead'),
      problem: text('Knowledge gaps recur across departures, transfers, role changes, and extended absences.'),
      approach: list([
        'Designed modular service architecture configurable by team and role for handover workflows.',
        'Defined a handover JSON schema with reusable fields and metadata for durable transitions.',
        'Built RAG preprocessing with context-preserving summaries, metadata tagging, and robust chunking.',
        'Defined Azure and self-hosted deployment architecture options for later production hardening.',
      ]),
      outcomes: list([
        'Created a repeatable handover architecture with durable, role-aware documentation structure.',
        'Improved retrieval quality for organizational knowledge and reduced loss during transitions.',
      ]),
      stack: [
        {
          name: text('FastAPI'),
          icon: 'fastapi',
          iconLabel: text('FastAPI'),
          tone: 'backend',
        },
        {
          name: text('Azure AI Search'),
          icon: 'azure',
          iconLabel: text('Azure AI Search'),
          tone: 'cloud',
        },
        {
          name: text('RAG'),
          icon: 'rag',
          iconLabel: text('RAG'),
          tone: 'ai',
        },
        {
          name: text('JSON schema design'),
          icon: 'code',
          iconLabel: text('JSON schema design'),
          tone: 'backend',
        },
        {
          name: text('HR workflow design'),
          icon: 'cogs',
          iconLabel: text('HR workflow design'),
          tone: 'ops',
        },
      ],
      links: [
        {
          href: 'https://www.linkedin.com/posts/kimhyoyeol_activity-7416846994914115584-MkTB?utm_source=share&utm_medium=member_desktop&rcm=ACoAACkMWEQB20TCGIFoYe8EtrvrSv7ot_DcjjM',
          label: text('LinkedIn Post'),
        },
      ],
      notes: list([
        'Project direction and framing were validated through practical usage scenarios and operational constraints.',
      ]),
    },
    {
      slug: 'labit-lab',
      title: text('Project C: LabIT (Lab By Intelligence) - Smart Lab Assistant & Dashboard'),
      period: text('MS AI SCHOOL final project (1st Place, Grand Prize)'),
      role: text('Backend lead and integration owner'),
      problem: text(
        'Laboratory operations needed a smarter support workflow combining knowledge retrieval, action history, and operational follow-up.',
      ),
      approach: list([
        'Designed FastAPI-based backend architecture with SQL Server data model and dashboard API contracts.',
        'Integrated Azure OpenAI with LangChain SQL Agent for domain-aware prompting and tool call workflows.',
        'Implemented JWT access and refresh flow, CSRF protection, RBAC, Redis-backed rate limiting, and audit logging.',
        'Built multilingual processing and implemented Azure deployment workflow prototypes (GitHub Actions, App Service, Static Web Apps) with basic monitoring and cache-backed tuning.',
      ]),
      outcomes: list([
        'Delivered a full-stack PoC platform for AI-assisted lab operations with FastAPI, Next.js, Azure OpenAI, SQL Server, and Redis.',
        'Won 1st Place (Grand Prize) and improved consistency for AI-assisted lab workflows.',
      ]),
      stack: [
        {
          name: text('FastAPI'),
          icon: 'fastapi',
          iconLabel: text('FastAPI'),
          tone: 'backend',
        },
        {
          name: text('Next.js'),
          icon: 'nextjs',
          iconLabel: text('Next.js'),
          tone: 'language',
        },
        {
          name: text('Azure OpenAI'),
          icon: 'openai',
          iconLabel: text('Azure OpenAI'),
          tone: 'ai',
        },
        {
          name: text('LangChain'),
          icon: 'langchain',
          iconLabel: text('LangChain'),
          tone: 'ai',
        },
        {
          name: text('SQL Server'),
          icon: 'sql',
          iconLabel: text('SQL Server'),
          tone: 'data',
        },
        {
          name: text('Redis'),
          icon: 'redis',
          iconLabel: text('Redis'),
          tone: 'data',
        },
        {
          name: text('GitHub Actions'),
          icon: 'githubActions',
          iconLabel: text('GitHub Actions'),
          tone: 'infra',
        },
        {
          name: text('SSE'),
          icon: 'sse',
          iconLabel: text('SSE'),
          tone: 'ops',
        },
      ],
      links: [
        {
          href: 'https://www.linkedin.com/posts/kimhyoyeol_ms-ai-school-%EC%B5%9C%EC%A2%85-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-%EB%8C%80%ED%95%B4-%EC%A0%95%EB%A6%AC%ED%95%B4%EB%B3%B4%EC%95%98%EC%8A%B5%EB%8B%88%EB%8B%A4-activity-7434870216364318720-MKY6?utm_source=share&utm_medium=member_desktop&rcm=ACoAACkMWEQB20TCGIFoYe8EtrvrSv7ot_DcjjM',
          label: text('LinkedIn Post'),
        },
      ],
      notes: list([
        'Backend-first architecture plus security and performance tuning were central to the deliverable.',
      ]),
    },
    {
      slug: 'sram-noise',
      title: text('Project D: SRAM Reliability Exploration Tooling (SPICE + ML Acceleration)'),
      period: text('Individual project'),
      role: text('Research engineer'),
      problem: text(
        'SRAM reliability exploration across PVT, corner, and Monte Carlo space was limited by long simulation runtime and reproducibility friction.',
      ),
      approach: list([
        'Built a PDK-informed perceptron surrogate path combined with C++ and Rust-native compute acceleration and parallel execution.',
        'Replaced heuristic noise handling with uncertainty-aware surrogate training on PDK-informed targets.',
        'Added simulator adapters, PASS/BLOCKED reproducibility checks, and a common output schema for repeatability.',
        'Tracked reliability metrics (SNM, BER, noise sigma, margins) with multi-target training and validation.',
      ]),
      outcomes: list([
        'Reduced benchmark wall-clock from 119.916s to 89.253s (about 1.34x faster).',
        'Achieved 4/5 open PDK flow pass coverage with 1/5 PSP runtime blocker and clearer reproducibility gates.',
      ]),
      stack: [
        {
          name: text('Python'),
          icon: 'python',
          iconLabel: text('Python'),
          tone: 'language',
        },
        {
          name: text('PyTorch'),
          icon: 'pytorch',
          iconLabel: text('PyTorch'),
          tone: 'ai',
        },
        {
          name: text('SPICE'),
          icon: 'flask',
          iconLabel: text('SPICE'),
          tone: 'ops',
        },
        {
          name: text('Monte Carlo'),
          icon: 'chartLine',
          iconLabel: text('Monte Carlo'),
          tone: 'data',
        },
        {
          name: text('C++'),
          icon: 'cpp',
          iconLabel: text('C++'),
          tone: 'language',
        },
        {
          name: text('Rust'),
          icon: 'rust',
          iconLabel: text('Rust'),
          tone: 'language',
        },
        {
          name: text('NumPy'),
          icon: 'numpy',
          iconLabel: text('NumPy'),
          tone: 'data',
        },
        {
          name: text('Pandas'),
          icon: 'pandas',
          iconLabel: text('Pandas'),
          tone: 'data',
        },
        {
          name: text('SQL Server'),
          icon: 'sql',
          iconLabel: text('SQL Server'),
          tone: 'data',
        },
      ],
      notes: list([
        'Focus was on reproducibility and physically grounded metric contracts instead of one-off benchmark gains.',
      ]),
    },
  ],
};
