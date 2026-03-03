export type Locale = 'en' | 'ko';

export interface LocalizedText {
  en: string;
  ko: string;
}

export interface LocalizedList {
  en: string[];
  ko: string[];
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
  items: LocalizedList;
}

export interface ProjectItem {
  slug: string;
  title: LocalizedText;
  period: LocalizedText;
  role: LocalizedText;
  problem: LocalizedText;
  approach: LocalizedList;
  outcomes: LocalizedList;
  stack: string[];
  notes: LocalizedList;
  links?: Array<{ label: LocalizedText; href: string }>;
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
  location: LocalizedText;
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
    en: 'Machine Learning Systems Engineer',
    ko: '머신러닝 시스템 엔지니어',
  },
  location: {
    en: 'Hwaseong, South Korea',
    ko: '화성시, 대한민국',
  },
  contact: {
    email: 'daliykim149656@gmail.com',
    phone: '+82 10 9398 8411',
    linkedIn: 'linkedin.com/in/kimhyoyeol',
    github: 'github.com/dailykim149656-source',
  },
  summary: {
    en: 'Engineered transition from semiconductor process engineering to cloud and ML systems. Built ML prototypes and web APIs using PyTorch and FastAPI while keeping a performance-driven lens: latency profiling, bottleneck tracking, and production-oriented monitoring.',
    ko: '반도체 공정 엔지니어링에서 클라우드/ML 시스템으로 전환했습니다. PyTorch와 FastAPI로 ML 프로토타입과 웹 API를 구현하며 지연시간 프로파일링, 병목 분석, 운영 지향 모니터링 관점으로 성능 개선을 설계했습니다.',
  },
  experiences: [
    {
      role: {
        en: 'BEOL Process Integration Engineer',
        ko: 'BEOL 공정 통합 엔지니어',
      },
      company: {
        en: 'Samsung Electronics',
        ko: '삼성전자',
      },
      period: {
        en: '2024',
        ko: '2024',
      },
      location: {
        en: 'Hwaseong, Sub-5nm Logic',
        ko: '화성, 5nm 미만 로직 공정',
      },
      details: {
        en: [
          'Supported BEOL integration for sub-5nm logic and analyzed yield/performance metrics with statistical methods.',
          'Mapped architecture constraints across on-chip SRAM memory bandwidth tradeoffs and hardware/software co-design context.',
          'Ran root-cause workflows on yield-limiting factors to characterize process windows and design margins.',
        ],
        ko: [
          'Sub-5nm 로직 BEOL 통합을 지원하며 수율 및 성능 지표를 통계 기반으로 분석했습니다.',
          '온칩 SRAM의 메모리 대역폭 트레이드오프와 HW/SW 공동설계 관점을 고려해 구조적 제약을 정리했습니다.',
          '수율 한계 요인을 원인 분석해 공정 윈도우와 마진 범위를 정량적으로 도출했습니다.',
        ],
      },
    },
    {
      role: {
        en: 'Etch Process Development Engineer',
        ko: '에칭 공정 개발 엔지니어',
      },
      company: {
        en: 'SEMES (Semiconductor Equipment Co.)',
        ko: '세메스(주)',
      },
      period: {
        en: 'Jan 2022 – 2024',
        ko: '2022년 1월 – 2024년',
      },
      location: {
        en: 'Far-BEOL Etch Process',
        ko: 'Far-BEOL 에칭 공정',
      },
      details: {
        en: [
          'Developed and qualified plasma etch recipes on 300mm production tools to meet selectivity and uniformity targets.',
          'Performed equipment characterization and resolved instability issues through structured data analysis.',
          'Collaborated with foundry teams on process requirements and stable handoff criteria.',
        ],
        ko: [
          '300mm 생산 장비에서 플라즈마 에칭 레시피를 개발·검증하여 선택비와 균일도 목표를 달성했습니다.',
          '장비 특성화를 수행하고 데이터 기반 분석으로 불안정 이슈를 체계적으로 해결했습니다.',
          '파운드리 협업 팀과 공정 요구사항 및 인수인계 기준을 정합해 납품 안정성을 높였습니다.',
        ],
      },
    },
  ],
  education: {
    school: {
      en: 'Sungkyunkwan University (SKKU), B.S. Advanced Materials Science & Engineering',
      ko: '성균관대학교 전자재료공학과 학사',
    },
    period: {
      en: '2022',
      ko: '2022',
    },
    detail: {
      en: 'GPA 3.65/4.5 · Capstone: Copper nanoparticle paste reliability in die-attach process',
      ko: '평점 3.65/4.5, 캡스톤: 다이-어태치 공정용 구리 나노입자 페이스트 신뢰성 향상',
    },
  },
  certs: {
    en: ['Microsoft Azure AI Fundamentals (AI-900)', 'Microsoft AI School — Advanced ML Engineering (2025 – Present)'],
    ko: ['마이크로소프트 Azure AI 기초(AI-900)', 'Microsoft AI School — 고급 ML 엔지니어링 (2025 – 현재)'],
  },
  skills: [
    {
      group: {
        en: 'ML / Inference Systems',
        ko: 'ML / 추론 시스템',
      },
      items: {
        en: [
          'PyTorch',
          'CNNs, segmentation models',
          'Bayesian uncertainty & model fusion',
          'Latency/throughput profiling',
          'Monitoring and evaluation pipelines',
          'Production optimization',
        ],
        ko: [
          'PyTorch',
          'CNN/세분화(segmentation) 모델',
          '베이지안 불확실성 및 모델 결합',
          '지연시간/처리량 프로파일링',
          '모니터링/평가 파이프라인',
          '프로덕션 최적화',
        ],
      },
    },
    {
      group: {
        en: 'Cloud & DevOps',
        ko: '클라우드 & DevOps',
      },
      items: {
        en: ['Azure ML', 'Azure AI Foundry / Azure OpenAI', 'Azure AI Search', 'Blob Storage', 'Docker', 'Git'],
        ko: ['Azure ML', 'Azure AI Foundry / Azure OpenAI', 'Azure AI Search', 'Blob Storage', 'Docker', 'Git'],
      },
    },
    {
      group: {
        en: 'Backend / Frontend',
        ko: '백엔드 / 프론트엔드',
      },
      items: {
        en: ['Python', 'TypeScript', 'FastAPI', 'REST API', 'React'],
        ko: ['Python', 'TypeScript', 'FastAPI', 'REST API', 'React'],
      },
    },
    {
      group: {
        en: 'Hardware-Informed Optimization',
        ko: '하드웨어 인지 최적화',
      },
      items: {
        en: [
          'On-chip SRAM architecture analysis',
          'Memory bandwidth tradeoff modeling',
          'Statistical root-cause analysis',
        ],
        ko: ['온칩 SRAM 아키텍처 분석', '메모리 대역폭 트레이드오프 모델링', '통계적 근본 원인 분석'],
      },
    },
  ],
  projects: [
    {
      slug: 'snap-q',
      title: {
        en: 'SNAP-Q: AI Vehicle Damage Assessment',
        ko: 'SNAP-Q: 차량 손상 평가 AI 시스템',
      },
      period: {
        en: '2-week sprint',
        ko: '2주 스프린트',
      },
      role: {
        en: 'Lead segmentation engineer',
        ko: '세그멘테이션 파트 리드',
      },
      problem: {
        en: 'Vehicle damage images had uneven camera conditions, and the team needed a reliable cost estimate with uncertainty for realistic repairs.',
        ko: '차량 손상 이미지의 촬영 조건이 일관되지 않아, 현실적인 수리비 산출 시 신뢰도 있는 비용 예측과 오차 범위가 필요했습니다.',
      },
      approach: {
        en: [
          'Built a multi-model vision pipeline in PyTorch and deployed training on Azure ML GPU infrastructure.',
          'Led Mask R-CNN damage segmentation with emphasis on real-world image quality robustness.',
          'Implemented Bayesian fusion between segmentation and image classification results for final estimation confidence.',
        ],
        ko: [
          'PyTorch 기반의 멀티모델 비전 파이프라인을 구축하고 Azure ML GPU 인프라로 학습을 운영했습니다.',
          'Mask R-CNN 손상 분할 모델의 실제 촬영 환경 강건성을 우선순위로 설계했습니다.',
          '분할 결과와 분류 결과를 베이지안 결합해 최종 추정값의 신뢰 구간을 계산했습니다.',
        ],
      },
      outcomes: {
        en: [
          'End-to-end inference pipeline for repair cost prediction with confidence intervals.',
          'Operational template for combining geometry-focused segmentation and semantic classification.',
        ],
        ko: [
          '수리비 예측 시 신뢰 구간을 포함한 end-to-end 추론 파이프라인을 구현했습니다.',
          '형상 기반 분할 모델과 의미 분류 모델을 결합한 운영 템플릿을 정립했습니다.',
        ],
      },
      stack: ['PyTorch', 'Azure ML', 'Mask R-CNN', 'Bayesian fusion', 'Python'],
      notes: {
        en: ['Project format inspired by LinkedIn technical write-up and prototype review notes.'],
        ko: ['LinkedIn 기술 정리 글과 프로토타입 리뷰 노트를 기반으로 구조화된 프로젝트입니다.'],
      },
    },
    {
      slug: 'honeypot',
      title: {
        en: 'HONEYPOT: AI Knowledge Handover Platform',
        ko: 'HONEYPOT: AI 지식 인수인계 플랫폼',
      },
      period: {
        en: 'HR SaaS Platform',
        ko: 'HR SaaS 플랫폼',
      },
      role: {
        en: 'PM / Architecture Lead',
        ko: 'PM / 아키텍처 리드',
      },
      problem: {
        en: 'Knowledge disappears during transfers, leaves, or role changes and reappears as repeated onboarding overhead.',
        ko: '인사 이동, 퇴사, 역할 변경 시 암묵지 손실이 반복되어 반복 교육 비용으로 다시 되돌아옵니다.',
      },
      approach: {
        en: [
          'Designed handover service architecture with interchangeable workflow modules per department and role.',
          'Defined handover JSON schema with workflow metadata for long-term reuse.',
          'Built RAG preprocessing with context-preserving summaries, robust chunking, and retrieval tags.',
        ],
        ko: [
          '부서/역할별로 교체 가능한 워크플로우 모듈을 가진 인수인계 아키텍처를 설계했습니다.',
          '반복 재사용 가능한 워크플로우 메타데이터 기반 handover JSON 스키마를 정립했습니다.',
          '컨텍스트 보존 요약, 안정적인 chunking, 검색 태그를 포함한 RAG 전처리 파이프라인을 구축했습니다.',
        ],
      },
      outcomes: {
        en: [
          'Reusable knowledge handover assets with retrieval-ready summaries.',
          'Ready-for-enterprise template for secure and scalable B2B deployment.',
        ],
        ko: [
          '검색 즉시 사용 가능한 요약 기반의 재사용 가능한 지식 자산을 만들었습니다.',
          '보안성과 확장성을 고려한 B2B 배포 템플릿을 정비했습니다.',
        ],
      },
      stack: ['Azure AI Search', 'RAG', 'Knowledge schema design', 'Azure services', 'Python'],
      links: [
        {
          label: {
            en: 'Project Outline',
            ko: '프로젝트 개요',
          },
          href: '#',
        },
      ],
      notes: {
        en: ['Designed for transfer, absence, and role-transition workflows with future external integration in mind.'],
        ko: ['이직/휴직/역할 전환 상황을 위한 지식 전파를 위해 향후 외부 연동 확장도 고려해 설계했습니다.'],
      },
    },
    {
      slug: 'sram-noise',
      title: {
        en: 'Perceptron-Gated SRAM Noise Simulation',
        ko: 'Perceptron-Gated SRAM 잡음 시뮬레이션',
      },
      period: {
        en: 'Research Prototype',
        ko: '연구형 프로토타입',
      },
      role: {
        en: 'Research / ML-Reliability Engineer',
        ko: '연구 / ML 신뢰성 엔지니어',
      },
      problem: {
        en: 'TCAD Monte Carlo reliability runs were too slow for rapid iteration in SRAM reliability planning.',
        ko: 'SRAM 신뢰성 평가에서 TCAD Monte Carlo는 반복 실행 비용이 커서 설계 반복 속도를 낮췄습니다.',
      },
      approach: {
        en: [
          'Modeled SNM/butterfly behavior under FF/TT/SS conditions as a constrained regression target.',
          'Trained a perceptron-gated noise predictor from Temperature and Voltage conditions.',
          'Combined Monte Carlo acceleration with physics-informed terms: Pelgrom variability, retention quasi-potential, and degradation models.',
        ],
        ko: [
          'FF/TT/SS 조건에서 SNM과 butterfly 곡선을 제약 회귀 타깃으로 모델링했습니다.',
          '온도 및 전압 조건으로부터 퍼셉트론 게이트 잡음 예측기를 학습시켰습니다.',
          'Pelgrom 분산, retention 준퍼텐셜, 열화 모델을 반영해 물리 기반 가속화를 결합했습니다.',
        ],
      },
      outcomes: {
        en: [
          'Reduced iteration cycle versus full TCAD scans while keeping reliability constraints visible.',
          'Created an interactive Streamlit tuning path and prepared GPU scaling direction for future work.',
        ],
        ko: [
          '전체 TCAD 스캔 대비 반복 주기를 단축하면서도 신뢰성 제약 조건을 유지할 수 있었습니다.',
          'Streamlit 기반 상호작용 튜닝 경로를 만들고 향후 GPU 확장 방향을 제시했습니다.',
        ],
      },
      stack: ['Python', 'PyTorch', 'SDE', 'Monte Carlo', 'Streamlit'],
      links: [
        {
          label: {
            en: 'Whitepaper Notes',
            ko: '기술 노트',
          },
          href: '#',
        },
      ],
      notes: {
        en: ['Implementation includes stochastic process modeling with uncertainty-aware bounds and confidence interval tracking.'],
        ko: ['불확실성 구간 추정과 신뢰구간 추적을 갖춘 확률 과정 기반 모델링까지 포함했습니다.'],
      },
    },
  ],
};
