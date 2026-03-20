import type { LocalizedList, LocalizedText } from '../lib/i18n';

export type { LocalizedList, LocalizedText } from '../lib/i18n';

export interface SkillItem {
  name: LocalizedText;
  icon: PortfolioIconId;
  iconLabel?: LocalizedText;
  tone?: PortfolioTone;
  tooltip?: LocalizedText;
}

export interface LanguageItem {
  name: LocalizedText;
  level: LocalizedText;
}

export interface EngagementItem {
  title: LocalizedText;
  period: LocalizedText;
  status: LocalizedText;
  summary: LocalizedText;
  details: LocalizedList;
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
  engagements: EngagementItem[];
  education: {
    school: LocalizedText;
    period: LocalizedText;
    detail: LocalizedText;
  };
  certs: LocalizedList;
  languages: LanguageItem[];
  skills: SkillGroup[];
  projects: ProjectItem[];
}

const text = (en: string, ko?: string): LocalizedText => (ko ? { en, ko } : { en });
const list = (en: string[], ko?: string[]): LocalizedList => (ko ? { en, ko } : { en });

export const portfolio: PortfolioData = {
  name: 'Kim Hyoyeol',
  title: text('AI/Backend Engineer'),
  contact: {
    email: 'daliykim149656@gmail.com',
    phone: '(+82) 010-9398-8411',
    linkedIn: 'https://linkedin.com/in/kimhyoyeol',
    github: 'https://github.com/dailykim149656-source',
  },
  summary: text(
    'AI/Backend Engineer with a semiconductor process engineering foundation and hands-on experience in production-focused ML and backend systems. Completed Microsoft AI School (Feb 2026) and led LabIT (Lab By Intelligence) to 1st Place (Grand Prize), delivering a full-stack platform with FastAPI, Next.js, Azure OpenAI, SQL Server, and Redis. Deployed and maintained Docsy on a live domain with Firebase Hosting, Cloud Run, Vertex AI, and Firestore, emphasizing review-first AI workflows, authentication/session handling, and runtime readiness checks.',
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
  engagements: [
    {
      title: text('Microsoft AI School - Advanced ML Engineering Program'),
      period: text('2025 - February 2026'),
      status: text('Completed'),
      summary: text(
        'Advanced ML engineering program focused on ML systems engineering, model evaluation, and Azure deployment; final project LabIT (Lab By Intelligence) won 1st Place (Grand Prize).',
      ),
      details: list([
        'Completed an advanced ML engineering program focused on ML systems engineering, model evaluation, and Azure deployment.',
        'Led LabIT (Lab By Intelligence; Smart Lab Assistant & Dashboard) to 1st Place (Grand Prize) as the final project.',
      ]),
    },
  ],
  education: {
    school: text('B.S. Advanced Materials Science & Engineering, Sungkyunkwan Univ. (SKKU)'),
    period: text('2022'),
    detail: text('GPA: 3.65/4.5 - Capstone: Copper Nanoparticle Paste Improvement for Automotive Semiconductor Die-attach Process'),
  },
  certs: list([
    'Microsoft Certified: Azure AI Fundamentals (AI-900)',
  ]),
  languages: [
    {
      name: text('Korean'),
      level: text('Native'),
    },
    {
      name: text('English'),
      level: text('Advanced'),
    },
  ],
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
      group: text('Systems Thinking'),
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
      group: text('Programming & Languages'),
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
      slug: 'docsy',
      title: text('Project A: DOCSY - AI Document Workflow Agent (Live Domain)'),
      period: text('Live domain deployment'),
      role: text('Owned full-stack delivery across frontend and AI backend'),
      problem: text(
        'Deployment-focused technical documentation workflow system needed review-first AI patching instead of silent edits.',
      ),
      approach: list([
        'Built the frontend with React and Vite and the AI backend with Node.js and Gemini on Vertex AI.',
        'Implemented structured action/patch JSON generation and a patch-review UX instead of silent edits.',
        'Shipped the live domain on Firebase Hosting and Cloud Run with readiness checks and Firestore-shared OAuth state.',
      ]),
      stack: [
        {
          name: text('React/Vite'),
          icon: 'js',
          iconLabel: text('React/Vite'),
          tone: 'language',
        },
        {
          name: text('Node.js'),
          icon: 'bolt',
          iconLabel: text('Node.js'),
          tone: 'backend',
        },
        {
          name: text('Gemini'),
          icon: 'brain',
          iconLabel: text('Gemini'),
          tone: 'ai',
        },
        {
          name: text('Vertex AI'),
          icon: 'cloud',
          iconLabel: text('Vertex AI'),
          tone: 'cloud',
        },
        {
          name: text('Firebase Hosting'),
          icon: 'globe',
          iconLabel: text('Firebase Hosting'),
          tone: 'cloud',
        },
        {
          name: text('Cloud Run'),
          icon: 'rocket',
          iconLabel: text('Cloud Run'),
          tone: 'cloud',
        },
        {
          name: text('Firestore'),
          icon: 'database',
          iconLabel: text('Firestore'),
          tone: 'data',
        },
      ],
      outcomes: list([
        'Established health and smoke checks for runtime readiness.',
        'Implemented Firestore-shared OAuth state.',
        'Implemented a hosted session-cookie contract for consistent auth behavior.',
      ]),
      notes: list(['Live domain deployment emphasized review-first AI workflows and runtime readiness checks.']),
    },
    {
      slug: 'labit-lab',
      title: text('Project B: LabIT (Lab By Intelligence) - Smart Lab Assistant & Dashboard'),
      period: text('MS AI SCHOOL final project (1st Place, Grand Prize)'),
      role: text('Led backend architecture and integration'),
      problem: text(
        'Laboratory operations needed a smarter support workflow combining knowledge retrieval, action history, and operational follow-up.',
      ),
      approach: list([
        'Designed the FastAPI backend architecture with SQL Server data models and dashboard API contracts.',
        'Integrated Azure OpenAI with LangChain SQL Agent and domain prompting plus SSE streaming chat.',
        'Implemented JWT and CSRF auth, RBAC, Redis rate limiting, audit logging, and Azure deployment workflow prototypes.',
      ]),
      outcomes: list([
        'Delivered a full-stack PoC platform for AI-assisted lab operations with FastAPI, Next.js, Azure OpenAI, SQL Server, and Redis.',
        'Won 1st Place (Grand Prize) as the final project.',
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
      notes: list(['Completed Microsoft AI School in February 2026.']),
    },
    {
      slug: 'snap-q',
      title: text('Project C: SNAP-Q - AI Vehicle Damage Assessment'),
      period: text('2-week PoC sprint'),
      role: text('Led Mask R-CNN damage segmentation'),
      problem: text(
        'Need a vision model that could generate repair cost estimates with usable uncertainty from real-world vehicle damage photos.',
      ),
      approach: list([
        'Built a multi-model vision pipeline using PyTorch in CUDA-based Azure ML Studio on scalable GPU infrastructure.',
        'Prioritized robustness on real-world camera inputs while segmenting damage with Mask R-CNN.',
        'Built Bayesian fusion logic combining segmentation and classifier outputs for uncertainty-aware estimation.',
      ]),
      outcomes: list([
        'Delivered an end-to-end prototype for repair-cost estimates with uncertainty ranges.',
        'Kept the segmentation and classification stack practical for experimentation.',
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
    },
    {
      slug: 'honeypot',
      title: text('Project D: HONEYPOT - AI Knowledge Handover Chatbot & Documentation System'),
      period: text('HR SaaS platform'),
      role: text('PM / Architecture Lead'),
      problem: text(
        'Knowledge gaps recur across departures, transfers, role changes, and extended absences.',
      ),
      approach: list([
        'Designed modular services configurable by team and role for handover workflows.',
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
          icon: 'search',
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
      slug: 'sram-noise',
      title: text('Project E: SRAM Reliability Exploration Tooling (SPICE + ML Acceleration)'),
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
        'Reduced benchmark wall-clock from 119.916 s to 89.253 s (1.34x faster).',
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
        {
          name: text('GitHub Actions'),
          icon: 'githubActions',
          iconLabel: text('GitHub Actions'),
          tone: 'infra',
        },
      ],
      notes: list([
        'Focus was on reproducibility and physically grounded metric contracts instead of one-off benchmark gains.',
      ]),
    },
  ],
};
