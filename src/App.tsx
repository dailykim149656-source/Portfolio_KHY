import { useEffect, useMemo, useState } from 'react';
import { portfolio } from './data/portfolio';
import type { ExperienceItem, Locale, ProjectItem, SkillGroup } from './data/portfolio';

type Section = 'summary' | 'experience' | 'projects' | 'skills' | 'contact';

type SectionItem = {
  id: Section;
  label: {
    en: string;
    ko: string;
  };
};

const sections: SectionItem[] = [
  { id: 'summary', label: { en: 'Summary', ko: '요약' } },
  { id: 'experience', label: { en: 'Experience', ko: '경력' } },
  { id: 'projects', label: { en: 'Projects', ko: '프로젝트' } },
  { id: 'skills', label: { en: 'Skills', ko: '기술' } },
  { id: 'contact', label: { en: 'Contact', ko: '연락처' } },
];

const label = {
  en: {
    brand: 'KH Portfolio',
    eyebrow: 'Machine Learning Systems Engineer',
    actions: {
      explore: 'Explore Projects',
      resume: 'Download Resume',
      contact: 'Contact Me',
      projectDetail: 'Open project detail',
      backToProjects: 'Back to projects',
      share: 'Discuss your project',
    },
    summary: 'Summary',
    experience: 'Professional Experience',
    projects: 'Selected Projects',
    skills: 'Technical Skills',
    contactTitle: 'Contact',
    locationLabel: 'Location',
    educationLabel: 'Education',
    certLabel: 'Certifications',
    phoneLabel: 'Phone',
    bannerMessage:
      'Tell me your team context and I can suggest an implementation plan in a practical stack.',
    contactText: 'Need help with ML inference and deployment strategy? Let me know what you want to solve.',
    approach: 'Approach',
    outcomes: 'Outcomes',
    techStack: 'Tech Stack',
    notes: 'Notes',
    linkedInLabel: 'LinkedIn',
    githubLabel: 'GitHub',
    links: 'Related Links',
    detail: 'Project Detail',
    projectNotFound: 'Project not found',
    return: 'Return',
    contactLabel: 'email',
  },
  ko: {
    brand: 'KH 포트폴리오',
    eyebrow: '머신러닝 시스템 엔지니어',
    actions: {
      explore: '프로젝트 보기',
      resume: '이력서 다운로드',
      contact: '연락하기',
      projectDetail: '프로젝트 상세 보기',
      backToProjects: '목록으로',
      share: '상담 요청하기',
    },
    summary: '요약',
    experience: '경력',
    projects: '선택한 프로젝트',
    skills: '보유 스킬',
    contactTitle: '연락처',
    locationLabel: '위치',
    educationLabel: '학력',
    certLabel: '자격',
    phoneLabel: '전화',
    bannerMessage: '팀 상황을 알려주시면 현실적인 기술 스택으로 실행 계획을 제안하겠습니다.',
    contactText: 'AI 추론/배포 전략이 필요한 프로젝트가 있다면 언제든지 공유해 주세요.',
    approach: '접근 방식',
    outcomes: '결과',
    techStack: '기술 스택',
    notes: '메모',
    linkedInLabel: '링크드인',
    githubLabel: '깃허브',
    links: '관련 링크',
    detail: '프로젝트 상세',
    projectNotFound: '프로젝트를 찾을 수 없습니다',
    return: '목록으로',
    contactLabel: '이메일',
  },
};

function Anchor({ section, locale }: { section: Section; locale: Locale }) {
  const item = sections.find((x) => x.id === section);
  return <a href={getSectionHash(locale, section)}>{item?.label[locale] ?? section}</a>;
}

function getLocaleFromHash(hash: string): Locale | null {
  const match = hash.match(/^#\/(en|ko)(?:\/|$)/);
  return match ? (match[1] as Locale) : null;
}

function getSectionFromHash(hash: string): Section | null {
  const match = hash.match(/^#(?:\/(?:en|ko))?\/?(summary|experience|projects|skills|contact)$/);
  if (match) {
    return match[1] as Section;
  }

  const isLocaleRoot = hash.match(/^#\/(?:en|ko)\/?$/);
  if (isLocaleRoot) {
    return 'summary';
  }

  return null;
}

function getProjectSlugFromHash(hash: string) {
  const matchWithLocale = hash.match(/^#\/(?:en|ko)\/project\/([^/?#]+)/);
  if (matchWithLocale) {
    return decodeURIComponent(matchWithLocale[1]);
  }

  const match = hash.match(/^#\/project\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getProjectDetailHash(locale: Locale, slug: string) {
  return `#/${locale}/project/${encodeURIComponent(slug)}`;
}

function getSectionHash(locale: Locale, section: Section) {
  return `#/${locale}/${section}`;
}

function resolve(locale: Locale, value: { en: string; ko: string }) {
  return value[locale];
}

function resolveList(locale: Locale, value: { en: string[]; ko: string[] }) {
  return value[locale];
}

function normalizeUrl(value: string) {
  return value.startsWith('http://') || value.startsWith('https://') ? value : `https://${value}`;
}

function normalizePhoneHref(phone: string) {
  return `tel:${phone.replace(/[^0-9+]/g, '')}`;
}

function ExperienceBlock({ data, locale }: { data: ExperienceItem; locale: Locale }) {
  return (
    <article className="timeline-card">
      <header>
        <h3>{resolve(locale, data.role)}</h3>
        <p className="meta">
          {resolve(locale, data.company)} · {resolve(locale, data.location)}
        </p>
        <p className="meta subtle">{resolve(locale, data.period)}</p>
      </header>
      <ul>
        {resolveList(locale, data.details).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function SkillBlock({ data, locale }: { data: SkillGroup; locale: Locale }) {
  return (
    <section className="skill-group">
      <h4>{resolve(locale, data.group)}</h4>
      <div className="chips">
        {resolveList(locale, data.items).map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ data, locale }: { data: ProjectItem; locale: Locale }) {
  const ui = label[locale];

  return (
    <article className="project-card">
      <header className="project-header">
        <h3>{resolve(locale, data.title)}</h3>
        <p className="meta">{resolve(locale, data.period)}</p>
      </header>
      <p className="role">{resolve(locale, data.role)}</p>
      <p>{resolve(locale, data.problem)}</p>
      <p className="meta section-subtitle">{ui.approach}</p>
      <ul>
        {resolveList(locale, data.approach).map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
      <p className="meta section-subtitle">{ui.outcomes}</p>
      <ul>
        {resolveList(locale, data.outcomes).map((result) => (
          <li key={result}>{result}</li>
        ))}
      </ul>
      <p className="meta section-subtitle">{ui.techStack}</p>
      <div className="chips">
        {data.stack.map((item) => (
          <span key={item} className="chip stacked">
            {item}
          </span>
        ))}
      </div>
      <div className="project-actions">
        <a href={getProjectDetailHash(locale, data.slug)} className="btn-secondary">
          {ui.actions.projectDetail}
        </a>
      </div>
      {data.links && data.links.length > 0 && (
        <details className="notes-details">
          <summary>{ui.links}</summary>
          <p className="project-links">
            {data.links.map((link, i) => (
              <span key={`${link.href}-${i}`}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {resolve(locale, link.label)}
                </a>
                {i < data.links!.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
        </details>
      )}
      {data.notes && data.notes.length > 0 && (
        <details className="notes-details">
          <summary>{ui.notes}</summary>
          <ul>
            {resolveList(locale, data.notes).map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </details>
      )}
    </article>
  );
}

function ProjectDetail({
  data,
  locale,
  onBack,
}: {
  data: ProjectItem;
  locale: Locale;
  onBack: () => void;
}) {
  const ui = label[locale];
  return (
    <article className="project-detail">
      <h3>
        {ui.detail}: {resolve(locale, data.title)}
      </h3>
      <p className="meta">{resolve(locale, data.period)}</p>
      <p className="role">{resolve(locale, data.role)}</p>
      <p>{resolve(locale, data.problem)}</p>
      <p className="meta section-subtitle">{ui.approach}</p>
      <ul>
        {resolveList(locale, data.approach).map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
      <p className="meta section-subtitle">{ui.outcomes}</p>
      <ul>
        {resolveList(locale, data.outcomes).map((result) => (
          <li key={result}>{result}</li>
        ))}
      </ul>
      <p className="meta section-subtitle">{ui.techStack}</p>
      <div className="chips">
        {data.stack.map((item) => (
          <span key={item} className="chip stacked">
            {item}
          </span>
        ))}
      </div>
      {data.links && data.links.length > 0 && (
        <p className="project-links">
          <strong>{ui.links}:</strong>
            {data.links.map((link, i) => (
            <span key={`${link.href}-${i}`}>
              {' '}
              <a href={link.href} target="_blank" rel="noreferrer">
                {resolve(locale, link.label)}
              </a>
              {i < data.links!.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </p>
      )}
      {data.notes && data.notes.length > 0 && (
        <details className="notes-details">
          <summary>{ui.notes}</summary>
          <ul>
            {resolveList(locale, data.notes).map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </details>
      )}
      <div className="project-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          {ui.actions.backToProjects}
        </button>
      </div>
    </article>
  );
}

function LanguageSwitch({
  locale,
  onToggle,
}: {
  locale: Locale;
  onToggle: (next: Locale) => void;
}) {
  return (
    <div className="lang-switch" aria-label="language switch">
      <button type="button" onClick={() => onToggle('en')} className={locale === 'en' ? 'active' : ''}>
        EN
      </button>
      <button type="button" onClick={() => onToggle('ko')} className={locale === 'ko' ? 'active' : ''}>
        KR
      </button>
    </div>
  );
}

function App() {
  const [locale, setLocale] = useState<Locale>(() => {
    const hashLocale = getLocaleFromHash(window.location.hash);
    if (hashLocale) {
      return hashLocale;
    }

    const saved = window?.localStorage?.getItem('portfolioLocale');
    if (saved === 'en' || saved === 'ko') {
      return saved;
    }
    const browserLocale = window?.navigator?.language?.toLowerCase();
    return browserLocale?.startsWith('ko') ? 'ko' : 'en';
  });
  const [slug, setSlug] = useState<string | null>(getProjectSlugFromHash(window.location.hash));
  const ui = label[locale];
  const scrollToSection = (section: Section) => {
    const target = document.getElementById(section);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleHashChange = () => {
    const nextLocale = getLocaleFromHash(window.location.hash);
    if (nextLocale) {
      setLocale(nextLocale);
    }
    const nextSlug = getProjectSlugFromHash(window.location.hash);
    const nextSection = getSectionFromHash(window.location.hash);
    setSlug(nextSlug);
    if (!nextSlug && nextSection) {
      scrollToSection(nextSection);
    }
  };

  const syncHashLocale = (nextLocale: Locale) => {
    const hash = window.location.hash;
    const nextProjectSlug = getProjectSlugFromHash(hash);
    const nextSection = getSectionFromHash(hash);
    let nextHash = hash;

    if (/^#\/(?:en|ko)\/project\//.test(hash) && nextProjectSlug) {
      nextHash = getProjectDetailHash(nextLocale, nextProjectSlug);
    } else if (/^#\/project\//.test(hash) && nextProjectSlug) {
      nextHash = getProjectDetailHash(nextLocale, nextProjectSlug);
    } else if (nextSection) {
      nextHash = getSectionHash(nextLocale, nextSection);
    } else if (/^#\/(?:en|ko)\b/.test(hash)) {
      nextHash = hash.replace(/^#\/(?:en|ko)/, `#/${nextLocale}`);
    } else if (nextProjectSlug) {
      nextHash = getProjectDetailHash(nextLocale, nextProjectSlug);
    } else if (hash === '' || hash === '#') {
      nextHash = `#/${nextLocale}`;
    }

    if (nextHash !== hash) {
      window.history.replaceState(null, '', nextHash);
    }
  };

  useEffect(() => {
    const initialSection = getSectionFromHash(window.location.hash);
    if (initialSection) {
      scrollToSection(initialSection);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('portfolioLocale', locale);
    syncHashLocale(locale);
  }, [locale]);

  const selectedProject = useMemo(() => portfolio.projects.find((project) => project.slug === slug), [slug]);

  return (
    <div className="page">
      <header className="hero">
        <nav>
          <p className="brand">{ui.brand}</p>
          {sections.map((section) => (
            <Anchor key={section.id} section={section.id} locale={locale} />
          ))}
          <LanguageSwitch locale={locale} onToggle={setLocale} />
        </nav>
        <div className="hero-copy">
          <p className="eyebrow">{resolve(locale, portfolio.title)}</p>
          <h1>{portfolio.name}</h1>
          <p className="intro">{resolve(locale, portfolio.summary)}</p>
          <div className="hero-actions">
            <a href={getSectionHash(locale, 'projects')} className="btn-primary">
              {ui.actions.explore}
            </a>
            <a href={`${import.meta.env.BASE_URL}resume_google_kimhyoyeol.pdf`} className="btn-secondary">
              {ui.actions.resume}
            </a>
            <a href={`mailto:${portfolio.contact.email}`} className="btn-accent">
              {ui.actions.contact}
            </a>
          </div>
          <p className="hero-meta">
            <a href={`mailto:${portfolio.contact.email}`} aria-label={`${ui.contactLabel}: ${portfolio.contact.email}`}>
              {ui.contactLabel}: {portfolio.contact.email}
            </a>
            <a
              href={normalizePhoneHref(portfolio.contact.phone)}
              aria-label={`${ui.phoneLabel}: ${portfolio.contact.phone}`}
            >
              {ui.phoneLabel}: {portfolio.contact.phone}
            </a>
            <a
              href={normalizeUrl(portfolio.contact.linkedIn)}
              target="_blank"
              rel="noreferrer"
              aria-label={`LinkedIn: ${portfolio.contact.linkedIn}`}
            >
              {ui.linkedInLabel}: {portfolio.contact.linkedIn}
            </a>
            <a
              href={normalizeUrl(portfolio.contact.github)}
              target="_blank"
              rel="noreferrer"
              aria-label={`GitHub: ${portfolio.contact.github}`}
            >
              {ui.githubLabel}: {portfolio.contact.github}
            </a>
          </p>
        </div>
      </header>

      <main>
        <section id="summary" className="section">
          <h2>{ui.summary}</h2>
            <p>{resolve(locale, portfolio.summary)}</p>
          <p className="meta">
            {ui.locationLabel}: {resolve(locale, portfolio.location)}
          </p>
          <p className="meta">
            {ui.educationLabel}: {resolve(locale, portfolio.education.school)} ({resolve(locale, portfolio.education.period)}) —{' '}
            {resolve(locale, portfolio.education.detail)}
          </p>
          <p className="meta">
            {ui.certLabel}: {resolveList(locale, portfolio.certs).join(' · ')}
          </p>
        </section>

        <section id="experience" className="section">
          <h2>{ui.experience}</h2>
          <div className="timeline">
            {portfolio.experiences.map((exp) => (
              <ExperienceBlock
                key={`${resolve(locale, exp.company)}-${resolve(locale, exp.period)}`}
                data={exp}
                locale={locale}
              />
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <h2>{ui.projects}</h2>
          {selectedProject && (
            <ProjectDetail
              data={selectedProject}
              locale={locale}
              onBack={() => {
                window.location.hash = getSectionHash(locale, 'projects');
                setSlug(null);
              }}
            />
          )}
          {!selectedProject && (
          <div className="projects">
            {portfolio.projects.map((project) => (
              <ProjectCard key={project.slug} data={project} locale={locale} />
            ))}
          </div>
          )}
        </section>

        <section id="skills" className="section">
          <h2>{ui.skills}</h2>
          <div className="skills-grid">
            {portfolio.skills.map((block) => (
              <SkillBlock key={resolve(locale, block.group)} data={block} locale={locale} />
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <h2>{ui.contactTitle}</h2>
          <p>{ui.contactText}</p>
          <p className="meta">
            {ui.contactLabel}: <a href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email}</a> · {ui.phoneLabel}:{' '}
            {portfolio.contact.phone}
          </p>
          <div className="hero-actions">
            <a href={`mailto:${portfolio.contact.email}`} className="btn-primary">
              {ui.actions.contact}
            </a>
            <a href={`${import.meta.env.BASE_URL}resume_google_kimhyoyeol.pdf`} className="btn-secondary">
              {ui.actions.resume}
            </a>
          </div>
        </section>

        {!slug && (
          <section className="section cta-banner">
            <h2>{ui.actions.share}</h2>
            <p>{ui.bannerMessage}</p>
            <a href={`mailto:${portfolio.contact.email}`} className="btn-accent">
              {ui.actions.contact}
            </a>
          </section>
        )}

        {slug && !selectedProject && (
          <section className="section">
            <p className="meta">{ui.projectNotFound}</p>
            <a href={getSectionHash(locale, 'projects')} className="btn-secondary">
              {ui.return}
            </a>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
