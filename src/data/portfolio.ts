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
  title: text('AI Application & Technical Solutions Engineer'),
  contact: {
    email: 'daliykim149656@gmail.com',
    phone: '(+82) 010-9398-8411',
    linkedIn: 'https://linkedin.com/in/kimhyoyeol',
    github: 'https://github.com/dailykim149656-source',
  },
  summary: text(
    'AI application and technical solutions engineer with nearly three years of semiconductor process engineering experience and hands-on delivery across AI applications, backend systems, deployment-ready prototypes, and reproducible validation assets. Built PoCs, live systems, benchmark reports, smoke/readiness checks, and technical documentation using FastAPI, Azure OpenAI, SQL Server, Redis, PyTorch, and cloud deployment tooling. Strong at translating engineering constraints and stakeholder requirements into practical AI-enabled systems with measurable outcomes and rollout discipline.',
  ),
  experiences: [
    {
      role: text('BEOL Process Integration Engineer'),
      company: text('Samsung Electronics'),
      period: text('Feb 2024 - Nov 2024'),
      location: text('Advanced Foundry BEOL Process Integration'),
      details: list([
        'Supported BEOL process integration for sub-5nm foundry development, analyzing trade-offs across yield, performance, manufacturability, and process constraints.',
        'Coordinated technical issue analysis across multiple engineering stakeholders, aligning root-cause findings and next actions for time-sensitive decisions.',
        'Built familiarity with SRAM-related, bandwidth-related, and manufacturing-variability constraints relevant to specialized compute systems and AI workload discussions.',
        'Strengthened customer-facing communication habits by explaining technical issues clearly across teams with different priorities.',
      ]),
    },
    {
      role: text('Etch Process Development Engineer'),
      company: text('SEMES (Semiconductor Equipment Co.)'),
      period: text('Jan 2022 - 2024'),
      location: text('Etch Process Development for 300mm Production Tools'),
      details: list([
        'Developed and qualified plasma etch processes on 300mm production tools through structured DOE, iterative tuning, and repeatability-oriented validation.',
        'Performed equipment characterization, stability analysis, and troubleshooting to isolate technical blockers affecting downstream performance and reliability.',
        'Defined process control plans, qualification criteria, documentation, and change-management practices for consistent rollout on production equipment.',
        'Built execution habits in on-site troubleshooting, reproducible validation, and cross-functional communication under production requirements.',
      ]),
    },
  ],
  engagements: [
    {
      title: text('Microsoft AI School - Advanced ML Engineering Program'),
      period: text('2025 - Feb 2026'),
      status: text('Completed'),
      summary: text(
        'Advanced ML engineering program focused on ML systems engineering, model evaluation, and Azure deployment; served as backend lead for LabIT, which won 1st Place (Grand Prize) as the final project.',
      ),
      details: list([
        'Completed an advanced ML engineering program focused on ML systems engineering, model evaluation, and Azure deployment.',
        'Led backend architecture for LabIT (Lab By Intelligence), a smart lab assistant and dashboard recognized with 1st Place (Grand Prize).',
      ]),
    },
  ],
  education: {
    school: text('B.S. Advanced Materials Science & Engineering, Sungkyunkwan Univ. (SKKU)'),
    period: text('2022'),
    detail: text('Capstone: Copper nanoparticle paste improvement for automotive semiconductor die-attach process'),
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
      group: text('AI & Data'),
      items: [
        {
          name: text('PyTorch and scikit-learn model evaluation workflows'),
          icon: 'brain',
          iconLabel: text('Model evaluation'),
          tone: 'ai',
        },
        {
          name: text('Azure OpenAI and LangChain SQL Agent application flows'),
          icon: 'openai',
          iconLabel: text('LLM application flows'),
          tone: 'ai',
        },
        {
          name: text('Custom CNN and multi-model vision inference'),
          icon: 'robot',
          iconLabel: text('Vision inference'),
          tone: 'ai',
        },
        {
          name: text('Uncertainty-aware outputs and validation-first AI workflows'),
          icon: 'target',
          iconLabel: text('Validation-first AI'),
          tone: 'ai',
        },
      ],
    },
    {
      group: text('Backend & Integration'),
      items: [
        {
          name: text('FastAPI and REST API design'),
          icon: 'bolt',
          iconLabel: text('FastAPI / REST'),
          tone: 'backend',
        },
        {
          name: text('SQL Server data models and dashboard API contracts'),
          icon: 'database',
          iconLabel: text('SQL Server'),
          tone: 'data',
        },
        {
          name: text('Redis, SSE streaming, RBAC, JWT/CSRF auth patterns'),
          icon: 'stream',
          iconLabel: text('Runtime integration'),
          tone: 'backend',
        },
        {
          name: text('Audit logging, email alerts, and integration contracts'),
          icon: 'lock',
          iconLabel: text('Operational controls'),
          tone: 'ops',
        },
      ],
    },
    {
      group: text('Cloud & Delivery'),
      items: [
        {
          name: text('Azure deployment workflows'),
          icon: 'cloud',
          iconLabel: text('Azure deployment'),
          tone: 'cloud',
        },
        {
          name: text('Firebase Hosting, Cloud Run, Vertex AI, Firestore'),
          icon: 'rocket',
          iconLabel: text('Google Cloud delivery'),
          tone: 'cloud',
        },
        {
          name: text('Docker, Git, GitHub Actions CI workflows'),
          icon: 'docker',
          iconLabel: text('CI tooling'),
          tone: 'infra',
        },
        {
          name: text('Health checks, smoke tests, and readiness validation'),
          icon: 'githubActions',
          iconLabel: text('Readiness validation'),
          tone: 'ops',
        },
      ],
    },
    {
      group: text('Benchmarking & Systems'),
      items: [
        {
          name: text('Benchmark design with warmup/repeat rules'),
          icon: 'flask',
          iconLabel: text('Benchmark design'),
          tone: 'ops',
        },
        {
          name: text('Throughput measurement and performance reporting'),
          icon: 'tachometer',
          iconLabel: text('Throughput measurement'),
          tone: 'ops',
        },
        {
          name: text('Parity and fidelity checks across CPU, NumPy, and PyTorch paths'),
          icon: 'chartLine',
          iconLabel: text('Fidelity checks'),
          tone: 'ops',
        },
        {
          name: text('Semiconductor root-cause analysis and rollout discipline'),
          icon: 'search',
          iconLabel: text('Root-cause analysis'),
          tone: 'ops',
        },
      ],
    },
    {
      group: text('Programming & Communication'),
      items: [
        {
          name: text('Python'),
          icon: 'python',
          iconLabel: text('Python'),
          tone: 'language',
        },
        {
          name: text('SQL'),
          icon: 'sql',
          iconLabel: text('SQL'),
          tone: 'language',
        },
        {
          name: text('TypeScript'),
          icon: 'js',
          iconLabel: text('TypeScript'),
          tone: 'language',
        },
        {
          name: text('Basic C++'),
          icon: 'cpp',
          iconLabel: text('C++'),
          tone: 'language',
        },
        {
          name: text('Technical documentation and stakeholder communication'),
          icon: 'code',
          iconLabel: text('Technical communication'),
          tone: 'ops',
        },
      ],
    },
  ],
  projects: [
    {
      slug: 'docsy',
      title: text('Docsy - AI Document Workflow Agent'),
      period: text('Live domain deployment'),
      role: text('Led deployment and production-readiness work'),
      problem: text(
        'Non-developer editors needed a safe Markdown-to-WYSIWYG documentation workflow with AI patch generation, human confirmation, and reliable live-domain operation.',
      ),
      approach: list([
        'Led deployment and maintenance of a live AI documentation workflow system using Firebase Hosting, Cloud Run, Vertex AI, and Firestore.',
        'Designed a Markdown-to-WYSIWYG editing flow that lets non-developers update developer documentation through AI patch generation and human confirmation.',
        'Built structured action/patch JSON generation, authentication/session handling, health checks, smoke checks, and runtime readiness validation.',
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
        'Removed operational blockers around auth state, hosted sessions, and runtime readiness.',
        'Kept AI edits review-first instead of silent, preserving user control over documentation changes.',
        'Supported reliable day-to-day use through smoke testing, readiness validation, and continuous deployment practices.',
      ]),
      notes: list(['Live domain deployment emphasized safe AI-assisted editing, production readiness, and operational reliability.']),
    },
    {
      slug: 'labit-lab',
      title: text('LabIT - Smart Lab Assistant & Dashboard'),
      period: text('MS AI SCHOOL final project (1st Place, Grand Prize)'),
      role: text('Led backend architecture and integration'),
      problem: text(
        'Basic research labs needed an accessible reagent-management and lab-environment simulation service that could surface accident risk before and during experiments.',
      ),
      approach: list([
        'Designed backend architecture across FastAPI, SQL Server, Redis, email alerts, and dashboard API contracts for real-time safety monitoring.',
        'Integrated Azure OpenAI and LangChain SQL Agent workflows so users could query and manage lab-environment operations through chat.',
        'Implemented SSE streaming, JWT/CSRF auth, RBAC, audit logging, Azure deployment prototypes, and cost-aware validation decisions.',
      ]),
      outcomes: list([
        'Delivered a full-stack PoC platform for AI-assisted lab operations with FastAPI, Next.js, Azure OpenAI, SQL Server, and Redis.',
        'Enabled dashboards and mail notifications for safety issues and simulated lab conditions.',
        'Won 1st Place (Grand Prize) as the Microsoft AI School final project.',
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
      title: text('SNAP-Q - AI Vehicle Damage Assessment'),
      period: text('2-week PoC sprint'),
      role: text('Led Mask R-CNN damage segmentation'),
      problem: text(
        'Need a vision model that could generate repair cost estimates with usable uncertainty from real-world vehicle damage photos.',
      ),
      approach: list([
        'Built a multi-model vision pipeline using PyTorch in CUDA-based Azure ML Studio on scalable GPU infrastructure.',
        'Integrated Mask R-CNN-based segmentation with classification models and Bayesian fusion for uncertainty-aware repair cost estimates.',
        'Contributed to end-to-end inference workflow, model integration, and evaluation logic focused on robustness and deployability.',
      ]),
      outcomes: list([
        'Delivered an end-to-end prototype for repair-cost estimates with uncertainty ranges.',
        'Kept output quality consistent across diverse real-world vehicle damage inputs.',
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
      title: text('HONEYPOT - AI Knowledge Handover Chatbot'),
      period: text('HR SaaS platform'),
      role: text('PM / Architecture Lead'),
      problem: text(
        'Teams needed a way to turn implicit individual knowledge into searchable, reusable documentation during departures, transfers, role changes, and extended absences.',
      ),
      approach: list([
        'Designed modular handover workflows configurable by team and role.',
        'Defined a reusable handover JSON schema with durable metadata for role-aware transitions.',
        'Built retrieval-oriented preprocessing, metadata tagging, context-preserving summaries, and robust chunking to improve answer relevance.',
        'Defined Azure and self-hosted deployment options to clarify modernization paths and adoption trade-offs.',
      ]),
      outcomes: list([
        'Created a repeatable handover architecture with durable, role-aware documentation structure.',
        'Improved retrieval quality for organizational knowledge and gave stakeholders a clearer adoption path.',
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
      title: text('SRAM GPU Portability & Benchmarking Project'),
      period: text('Individual project'),
      role: text('Research engineer'),
      problem: text(
        'SRAM surrogate and simulation workloads needed reproducible benchmark assets with clear performance reports, fidelity validation, and portability boundaries.',
      ),
      approach: list([
        'Refactored the workload into a reproducible performance-validation asset with standardized metadata, performance reports, and fidelity validation results.',
        'Designed benchmark methodology including warmup/repeat rules, throughput measurement, and parity checks across CPU, NumPy, and PyTorch inference paths.',
        'Introduced a canonical accelerated inference path and isolated runtime-dependent components for controlled CPU/GPU comparison.',
        'Preserved SRAM reliability metrics such as SNM, BER, noise sigma, and margins while improving repeatability.',
      ]),
      outcomes: list([
        'Reduced end-to-end benchmark runtime from 119.9 s to 89.3 s (1.34x faster).',
        'Created a clearer portability foundation for future ROCm/HIP evaluation without hardwiring runtime-specific logic throughout the project.',
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
        'Focus was on reproducible validation assets, controlled acceleration paths, and physically grounded metric contracts.',
      ]),
    },
  ],
};
