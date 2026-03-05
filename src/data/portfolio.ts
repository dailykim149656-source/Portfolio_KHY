export type LocalizedText = {
  en: string;
};

export type LocalizedList = {
  en: string[];
};

export interface SkillItem {
  name: string;
  icon: PortfolioIconId;
  iconLabel?: string;
  tone?: PortfolioTone;
  tooltip?: string;
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
  name: string;
  icon: PortfolioIconId;
  iconLabel?: string;
  tone?: PortfolioTone;
  tooltip?: string;
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
  items: {
    en: SkillItem[];
  };
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
  notes: LocalizedList;
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

export const portfolio: PortfolioData = {
  name: 'Kim Hyoyeol',
  title: {
    en: 'Cloud/AI Systems Engineer',
  },
  contact: {
    email: 'daliykim149656@gmail.com',
    phone: '+82 10 9398 8411',
    linkedIn: 'linkedin.com/in/kimhyoyeol',
    github: 'github.com/dailykim149656-source',
  },
  summary: {
    en: 'Cloud/AI systems engineer with a semiconductor process engineering background and hands-on experience in ML PoC development and backend platforms. Led LabIT (Lab By Intelligence; MS AI SCHOOL final project) to 1st Place (Grand Prize), developing a full-stack PoC system with FastAPI, Next.js, Azure OpenAI, SQL Server, and Redis. Combines PyTorch modeling, API development, and manufacturing-grade root-cause analysis to optimize reliability, latency/throughput, and operational outcomes.',
  },
  experiences: [
    {
      role: {
        en: 'BEOL Process Integration Engineer',
      },
      company: {
        en: 'Samsung Electronics',
      },
      period: {
        en: '2024',
      },
      location: {
        en: 'Advanced Logic Process Integration (300mm, Sub-5nm)',
      },
      details: {
        en: [
          'Supported BEOL process integration for sub-5nm logic; analyzed yield data and performance metrics with statistical methods to identify actionable optimization pathways and risk drivers.',
          'Built practical understanding of on-chip SRAM architecture, memory bandwidth constraints, and hardware-software codesign tradeoffs relevant to specialized compute systems.',
          'Performed systematic root-cause analysis on yield-limiting factors; characterized process windows, design margins, and key defect mechanisms across critical steps.',
        ],
      },
    },
    {
      role: {
        en: 'Etch Process Development Engineer',
      },
      company: {
        en: 'SEMES (Semiconductor Equipment Co.)',
      },
      period: {
        en: 'Jan 2022 – 2024',
      },
      location: {
        en: 'Etch Process Development for 300mm Production Tools',
      },
      details: {
        en: [
          'Developed and qualified plasma etch processes on 300mm production equipment; achieved target uniformity and selectivity via structured DOE and iterative tuning.',
          'Performed equipment characterization and stability analysis; diagnosed performance bottlenecks and resolved instability using statistical methods and trace analysis.',
          'Defined process control plans and qualification criteria; verified repeatability across tools and coordinated change management.',
        ],
      },
    },
  ],
  education: {
    school: {
      en: 'B.S. Advanced Materials Science & Engineering, Sungkyunkwan University (SKKU)',
    },
    period: {
      en: '2022',
    },
    detail: {
      en: 'Capstone: Copper Nanoparticle Paste Improvement for Automotive Semiconductor Die-attach Process',
    },
  },
  certs: {
    en: ['Microsoft Azure AI Fundamentals (AI-900)', 'Microsoft AI School — Advanced ML Engineering Program (2025–Present)'],
  },
  skills: [
    {
      group: {
        en: 'AI & Deep Learning',
      },
      items: {
        en: [
          {
            name: 'PyTorch (custom models, CNNs, hyperparameter tuning)',
            icon: 'brain',
            iconLabel: 'PyTorch',
            tone: 'ai',
          },
          {
            name: 'Inference optimization and evaluation workflows',
            icon: 'chartLine',
            iconLabel: 'Inference optimization',
            tone: 'ai',
          },
          {
            name: 'Uncertainty-aware modeling approach for production use',
            icon: 'target',
            iconLabel: 'Uncertainty-aware modeling',
            tone: 'ai',
          },
        ],
      },
    },
    {
      group: {
        en: 'Backend & Platform',
      },
      items: {
        en: [
          {
            name: 'FastAPI',
            icon: 'bolt',
            iconLabel: 'FastAPI',
            tone: 'backend',
          },
          {
            name: 'REST API design',
            icon: 'code',
            iconLabel: 'REST APIs',
            tone: 'backend',
          },
          {
            name: 'JWT/CSRF auth patterns',
            icon: 'lock',
            iconLabel: 'Authentication',
            tone: 'backend',
          },
          {
            name: 'SQL Server',
            icon: 'database',
            iconLabel: 'SQL Server',
            tone: 'data',
          },
          {
            name: 'Redis',
            icon: 'stream',
            iconLabel: 'Redis',
            tone: 'data',
          },
          {
            name: 'SSE streaming',
            icon: 'stream',
            iconLabel: 'Streaming',
            tone: 'ops',
          },
        ],
      },
    },
    {
      group: {
        en: 'Cloud & DevOps',
      },
      items: {
        en: [
          {
            name: 'Azure OpenAI',
            icon: 'cloud',
            iconLabel: 'Azure OpenAI',
            tone: 'cloud',
          },
          {
            name: 'Azure ML',
            icon: 'brain',
            iconLabel: 'Azure ML',
            tone: 'ai',
          },
          {
            name: 'Azure AI Foundry',
            icon: 'cogs',
            iconLabel: 'Azure AI Foundry',
            tone: 'cloud',
          },
          {
            name: 'Azure App Service',
            icon: 'rocket',
            iconLabel: 'Azure App Service',
            tone: 'cloud',
          },
          {
            name: 'Static Web Apps',
            icon: 'globe',
            iconLabel: 'Static Web Apps',
            tone: 'cloud',
          },
          {
            name: 'Docker',
            icon: 'docker',
            iconLabel: 'Docker',
            tone: 'infra',
          },
          {
            name: 'GitHub Actions',
            icon: 'github',
            iconLabel: 'GitHub Actions',
            tone: 'infra',
          },
        ],
      },
    },
    {
      group: {
        en: 'Systems Engineering',
      },
      items: {
        en: [
          {
            name: 'Latency/throughput profiling',
            icon: 'tachometer',
            iconLabel: 'Profiling',
            tone: 'ops',
          },
          {
            name: 'Bottleneck isolation',
            icon: 'search',
            iconLabel: 'Bottleneck analysis',
            tone: 'ops',
          },
          {
            name: 'Experiment tracking',
            icon: 'flask',
            iconLabel: 'Experiment tracking',
            tone: 'ai',
          },
          {
            name: 'Monitoring and hardware-aware tradeoff analysis',
            icon: 'eye',
            iconLabel: 'Monitoring',
            tone: 'ops',
          },
        ],
      },
    },
    {
      group: {
        en: 'Programming',
      },
      items: {
        en: [
          {
            name: 'Python',
            icon: 'python',
            iconLabel: 'Python',
            tone: 'language',
          },
          {
            name: 'TypeScript',
            icon: 'js',
            iconLabel: 'TypeScript',
            tone: 'language',
          },
        ],
      },
    },
  ],
  projects: [
    {
      slug: 'snap-q',
      title: {
        en: 'Project A: SNAP-Q — AI Vehicle Damage Assessment',
      },
      period: {
        en: '2-week PoC sprint',
      },
      role: {
        en: 'Led vision model segment lead',
      },
      problem: {
        en: 'Need a vision model that can generate repair cost estimates with usable uncertainty from real-world vehicle damage photos.',
      },
      approach: {
        en: [
          'Built a multi-model vision pipeline using PyTorch in CUDA-based Azure ML Studio on scalable GPU infrastructure.',
          'Led Mask R-CNN damage segmentation and prioritized accuracy on real-world camera images.',
          'Built Bayesian fusion logic combining segmentation and classification for uncertainty-aware estimation.',
        ],
      },
      outcomes: {
        en: [
          'Built an end-to-end PoC prototype generating preliminary repair cost estimates with uncertainty ranges.',
          'Built a practical segmentation + classification architecture for experimentation.',
        ],
      },
      stack: [
        {
          name: 'PyTorch',
          icon: 'pytorch',
          iconLabel: 'PyTorch',
          tone: 'ai',
        },
        {
          name: 'Azure ML Studio',
          icon: 'azure',
          iconLabel: 'Azure ML Studio',
          tone: 'cloud',
        },
        {
          name: 'Azure ML',
          icon: 'azure',
          iconLabel: 'Azure ML',
          tone: 'cloud',
        },
        {
          name: 'Mask R-CNN',
          icon: 'robot',
          iconLabel: 'Mask R-CNN',
          tone: 'ai',
        },
        {
          name: 'Classification models',
          icon: 'chartLine',
          iconLabel: 'Classification models',
          tone: 'ai',
        },
        {
          name: 'Bayesian fusion',
          icon: 'target',
          iconLabel: 'Bayesian fusion',
          tone: 'ai',
        },
      ],
      links: [
        {
          href: 'https://www.linkedin.com/posts/kimhyoyeol_activity-7415780477254541312-ttNM?utm_source=share&utm_medium=member_desktop&rcm=ACoAACkMWEQB20TCGIFoYe8EtrvrSv7ot_DcjjM',
          label: {
            en: 'LinkedIn Post',
          },
        },
      ],
      notes: {
        en: ['Summary is adapted from LinkedIn posts and project timeline notes.'],
      },
    },
    {
      slug: 'honeypot',
      title: {
        en: 'Project B: HONEYPOT — AI Knowledge Handover Chatbot & Documentation System',
      },
      period: {
        en: 'HR SaaS platform',
      },
      role: {
        en: 'PM / Architecture Lead',
      },
      problem: {
        en: 'Knowledge gaps recur across departures, transfers, role changes, and extended absences.',
      },
      approach: {
        en: [
          'Designed modular service architecture configurable by team and role for handover workflows.',
          'Defined a handover JSON schema with reusable fields and metadata for durable transitions.',
          'Built RAG preprocessing with context-preserving summaries, metadata tagging, and robust chunking.',
          'Defined Azure and self-hosted deployment architecture options for later production hardening.',
        ],
      },
      outcomes: {
        en: [
          'Created a repeatable handover architecture with durable, role-aware documentation structure.',
          'Improved retrieval quality for organizational knowledge and reduced loss during transitions.',
        ],
      },
      stack: [
        {
          name: 'FastAPI',
          icon: 'fastapi',
          iconLabel: 'FastAPI',
          tone: 'backend',
        },
        {
          name: 'Azure AI Search',
          icon: 'azure',
          iconLabel: 'Azure AI Search',
          tone: 'cloud',
        },
        {
          name: 'RAG',
          icon: 'rag',
          iconLabel: 'RAG',
          tone: 'ai',
        },
        {
          name: 'JSON schema design',
          icon: 'code',
          iconLabel: 'JSON schema design',
          tone: 'backend',
        },
        {
          name: 'HR workflow design',
          icon: 'cogs',
          iconLabel: 'HR workflow design',
          tone: 'ops',
        },
      ],
      links: [
        {
          href: 'https://www.linkedin.com/posts/kimhyoyeol_activity-7416846994914115584-MkTB?utm_source=share&utm_medium=member_desktop&rcm=ACoAACkMWEQB20TCGIFoYe8EtrvrSv7ot_DcjjM',
          label: {
            en: 'LinkedIn Post',
          },
        },
      ],
      notes: {
        en: ['Project direction and framing were validated through practical usage scenarios and operational constraints.'],
      },
    },
    {
      slug: 'labit-lab',
      title: {
        en: 'Project C: LabIT (Lab By Intelligence) — Smart Lab Assistant & Dashboard',
      },
      period: {
        en: 'MS AI SCHOOL final project (1st Place, Grand Prize)',
      },
      role: {
        en: 'Backend lead and integration owner',
      },
      problem: {
        en: 'Laboratory operations needed a smarter support workflow combining knowledge retrieval, action history, and operational follow-up.',
      },
      approach: {
        en: [
          'Designed FastAPI-based backend architecture with SQL Server data model and dashboard API contracts.',
          'Integrated Azure OpenAI with LangChain SQL Agent for domain-aware prompting and tool call workflows.',
          'Implemented JWT access/refresh flow, CSRF protection, RBAC, Redis-backed rate limiting, and audit logging.',
          'Built multilingual processing and implemented Azure deployment workflow prototypes (GitHub Actions, App Service, Static Web Apps) with basic monitoring and cache-backed tuning.',
        ],
      },
      outcomes: {
        en: [
          'Delivered a full-stack PoC platform for AI-assisted lab operations with FastAPI, Next.js, Azure OpenAI, SQL Server, and Redis.',
          'Won 1st Place (Grand Prize) and improved consistency for AI-assisted lab workflows.',
        ],
      },
      stack: [
        {
          name: 'FastAPI',
          icon: 'fastapi',
          iconLabel: 'FastAPI',
          tone: 'backend',
        },
        {
          name: 'Next.js',
          icon: 'nextjs',
          iconLabel: 'Next.js',
          tone: 'language',
        },
        {
          name: 'Azure OpenAI',
          icon: 'openai',
          iconLabel: 'Azure OpenAI',
          tone: 'ai',
        },
        {
          name: 'LangChain',
          icon: 'langchain',
          iconLabel: 'LangChain',
          tone: 'ai',
        },
        {
          name: 'SQL Server',
          icon: 'sql',
          iconLabel: 'SQL Server',
          tone: 'data',
        },
        {
          name: 'Redis',
          icon: 'redis',
          iconLabel: 'Redis',
          tone: 'data',
        },
        {
          name: 'GitHub Actions',
          icon: 'githubActions',
          iconLabel: 'GitHub Actions',
          tone: 'infra',
        },
        {
          name: 'SSE',
          icon: 'sse',
          iconLabel: 'SSE',
          tone: 'ops',
        },
      ],
      links: [
        {
          href: 'https://www.linkedin.com/posts/kimhyoyeol_ms-ai-school-%EC%B5%9C%EC%A2%85-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-%EB%8C%80%ED%95%B4-%EC%A0%95%EB%A6%AC%ED%95%B4%EB%B3%B4%EC%95%98%EC%8A%B5%EB%8B%88%EB%8B%A4-activity-7434870216364318720-MKY6?utm_source=share&utm_medium=member_desktop&rcm=ACoAACkMWEQB20TCGIFoYe8EtrvrSv7ot_DcjjM',
          label: {
            en: 'LinkedIn Post',
          },
        },
      ],
      notes: {
        en: ['Backend-first architecture plus security and performance tuning were central to the deliverable.'],
      },
    },
    {
      slug: 'sram-noise',
      title: {
        en: 'Project D: SRAM Reliability Exploration Tooling (SPICE + ML Acceleration)',
      },
      period: {
        en: 'Individual project',
      },
      role: {
        en: 'Research engineer',
      },
      problem: {
        en: 'SRAM reliability exploration across PVT/corner/Monte Carlo space was limited by long simulation runtime and reproducibility friction.',
      },
      approach: {
        en: [
          'Built a PDK-informed perceptron surrogate path combined with C++/Rust-native compute acceleration and parallel execution.',
          'Replaced heuristic noise handling with uncertainty-aware surrogate training on pdk-informed targets.',
          'Added simulator adapters, PASS/BLOCKED reproducibility checks, and common output schema for repeatability.',
          'Tracked reliability metrics (SNM, BER, noise sigma, margins) with multi-target training and validation.',
        ],
      },
      outcomes: {
        en: [
          'Reduced benchmark wall-clock from 119.916s to 89.253s (~1.34x faster).',
          'Achieved 4/5 open PDK flow pass coverage with 1/5 PSP runtime blocker and clearer reproducibility gates.',
        ],
      },
      stack: [
        {
          name: 'Python',
          icon: 'python',
          iconLabel: 'Python',
          tone: 'language',
        },
        {
          name: 'PyTorch',
          icon: 'pytorch',
          iconLabel: 'PyTorch',
          tone: 'ai',
        },
        {
          name: 'SPICE',
          icon: 'flask',
          iconLabel: 'SPICE',
          tone: 'ops',
        },
        {
          name: 'Monte Carlo',
          icon: 'chartLine',
          iconLabel: 'Monte Carlo',
          tone: 'data',
        },
        {
          name: 'C++',
          icon: 'cpp',
          iconLabel: 'C++',
          tone: 'language',
        },
        {
          name: 'Rust',
          icon: 'rust',
          iconLabel: 'Rust',
          tone: 'language',
        },
        {
          name: 'NumPy',
          icon: 'numpy',
          iconLabel: 'NumPy',
          tone: 'data',
        },
        {
          name: 'Pandas',
          icon: 'pandas',
          iconLabel: 'Pandas',
          tone: 'data',
        },
        {
          name: 'SQL Server',
          icon: 'sql',
          iconLabel: 'SQL Server',
          tone: 'data',
        },
      ],
      notes: {
        en: ['Focus was on reproducibility and physically grounded metric contracts instead of one-off benchmark gains.'],
      },
    },
  ],
};
