import { useEffect, useMemo, useState } from 'react';
import { portfolio } from './data/portfolio';
import type { ExperienceItem, ProjectItem, PortfolioTone, SkillGroup, PortfolioIconId, TechStackItem } from './data/portfolio';
import { IconType } from 'react-icons';
import {
  FaBrain,
  FaChartLine,
  FaBullseye,
  FaBolt,
  FaCode,
  FaLock,
  FaDatabase,
  FaCloud,
  FaRobot,
  FaCogs,
  FaRocket,
  FaGlobe,
  FaDocker,
  FaEnvelopeOpenText,
  FaGithub,
  FaLinkedinIn,
  FaPhoneAlt,
  FaTachometerAlt,
  FaSearch,
  FaFlask,
  FaEye,
  FaPython,
  FaJsSquare,
  FaServer,
  FaWrench,
  FaTools,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiFastapi,
  SiPytorch,
  SiOpenai,
  SiLangchain,
  SiRedis,
  SiRust,
  SiCplusplus,
  SiNumpy,
  SiPandas,
  SiGithubactions,
} from 'react-icons/si';

type Section = 'summary' | 'experience' | 'projects' | 'skills' | 'contact';

type SectionItem = {
  id: Section;
  label: string;
};

const sections: SectionItem[] = [
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const label = {
  brand: 'KH Portfolio',
  eyebrow: 'AI Systems Engineer',
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
  educationLabel: 'Education',
  certLabel: 'Certifications',
  phoneLabel: 'Phone',
  bannerMessage: 'Tell me your team context and I can suggest an implementation plan in a practical stack.',
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
  contactLabel: 'Email',
};

const toneLabelMap: Record<PortfolioTone, string> = {
  ai: 'AI',
  backend: 'Backend',
  cloud: 'Cloud',
  data: 'Data',
  language: 'Language',
  ops: 'Ops',
  infra: 'Infra',
};

const toneIconMap: Record<PortfolioTone, IconType> = {
  ai: FaBrain,
  backend: FaServer,
  cloud: FaCloud,
  data: FaDatabase,
  language: FaCode,
  ops: FaWrench,
  infra: FaTools,
};

const portfolioIconMap: Record<PortfolioIconId, IconType> = {
  brain: FaBrain,
  chartLine: FaChartLine,
  target: FaBullseye,
  bolt: FaBolt,
  code: FaCode,
  lock: FaLock,
  database: FaDatabase,
  stream: FaRocket,
  cloud: FaCloud,
  robot: FaRobot,
  cogs: FaCogs,
  rocket: FaRocket,
  globe: FaGlobe,
  docker: FaDocker,
  github: FaGithub,
  tachometer: FaTachometerAlt,
  search: FaSearch,
  flask: FaFlask,
  eye: FaEye,
  python: FaPython,
  js: FaJsSquare,
  nextjs: SiNextdotjs,
  azure: FaCloud,
  openai: SiOpenai,
  fastapi: SiFastapi,
  langchain: SiLangchain,
  rag: FaRobot,
  cpp: SiCplusplus,
  rust: SiRust,
  pytorch: SiPytorch,
  redis: SiRedis,
  numpy: SiNumpy,
  pandas: SiPandas,
  sql: FaDatabase,
  sse: FaTachometerAlt,
  githubActions: SiGithubactions,
};

const resumeFileName = 'main_resume_kimhyoyeol.pdf';

function getChipClass(base: string, tone?: PortfolioTone) {
  const toneClass = tone ? `chip-${tone}` : 'chip-default';
  return `${base} ${toneClass}`;
}

function renderChipIcon(iconId: PortfolioIconId) {
  const Icon = portfolioIconMap[iconId];
  return <Icon className="skill-icon" aria-hidden="true" />;
}

function getTooltipText(name: string, iconLabel?: string, tooltip?: string) {
  const title = iconLabel ?? name;
  if (!tooltip || tooltip === title) {
    return title;
  }
  return `${title}\n${tooltip}`;
}

function ToneBadge({ tone, showLabel }: { tone: PortfolioTone; showLabel: boolean }) {
  const Icon = toneIconMap[tone];
  return (
    <span className={`chip-tone chip-tone-${tone}`} aria-hidden="true">
      {showLabel && <Icon className="chip-tone-icon" />}
      <span>{toneLabelMap[tone]}</span>
    </span>
  );
}

function StackIcons({ items, showToneLabel }: { items: TechStackItem[]; showToneLabel: boolean }) {
  return (
    <div className="chips">
      {items.map((item, index) => {
        const tooltip = getTooltipText(item.name, item.iconLabel, item.tooltip);
        return (
          <span
            key={`${item.name}-${index}`}
            className={getChipClass('chip stacked', item.tone)}
            aria-label={`${tooltip} stack`}
            title={tooltip}
            data-tooltip={tooltip}
            tabIndex={0}
          >
            <span className="skill-icon-wrap" aria-hidden="true">
              {renderChipIcon(item.icon)}
            </span>
            {item.tone && showToneLabel ? <ToneBadge tone={item.tone} showLabel /> : null}
            <span>{item.name}</span>
          </span>
        );
      })}
    </div>
  );
}

function SkillChip({
  icon,
  name,
  iconLabel,
  tone,
  hasTone,
  tooltip,
  showToneLabel,
}: {
  icon: PortfolioIconId;
  name: string;
  iconLabel?: string;
  tone?: PortfolioTone;
  tooltip?: string;
  hasTone: boolean;
  showToneLabel: boolean;
}) {
  const tooltipText = getTooltipText(name, iconLabel, tooltip);
  return (
    <span
      className={getChipClass('chip', tone)}
      aria-label={`${tooltipText} skill`}
      title={tooltipText}
      data-tooltip={tooltipText}
      tabIndex={0}
    >
      <span className="skill-icon-wrap" aria-hidden="true">
        {renderChipIcon(icon)}
      </span>
      {hasTone && tone && showToneLabel ? <ToneBadge tone={tone} showLabel /> : null}
      <span>{name}</span>
    </span>
  );
}

function ContactLink({
  href,
  ariaLabel,
  labelText,
  value,
  icon: Icon,
  external = false,
}: {
  href: string;
  ariaLabel: string;
  labelText: string;
  value: string;
  icon: IconType;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className="contact-link"
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      aria-label={ariaLabel}
    >
      <span className="contact-icon-badge" aria-hidden="true">
        <Icon className="contact-icon" />
      </span>
      <span className="contact-copy">
        <span className="contact-kicker">{labelText}</span>
        <span className="contact-value">{value}</span>
      </span>
    </a>
  );
}

function Anchor({ section }: { section: Section }) {
  const item = sections.find((x) => x.id === section);
  return <a href={getSectionHash(section)}>{item?.label ?? section}</a>;
}

function getSectionFromHash(hash: string): Section | null {
  const match = hash.match(/^#\/?(summary|experience|projects|skills|contact)$/);
  if (match) {
    return match[1] as Section;
  }

  const root = hash.match(/^#\/$/);
  if (root || hash === '#' || hash === '' ) {
    return 'summary';
  }

  return null;
}

function getProjectSlugFromHash(hash: string) {
  const match = hash.match(/^#\/project\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getProjectDetailHash(slug: string) {
  return `#/project/${encodeURIComponent(slug)}`;
}

function getSectionHash(section: Section) {
  return `#/${section}`;
}

function resolveText(value: { en: string }) {
  return value.en;
}

function resolveList(value: { en: string[] }) {
  return value.en;
}

function normalizeUrl(value: string) {
  return value.startsWith('http://') || value.startsWith('https://') ? value : `https://${value}`;
}

function normalizePhoneHref(phone: string) {
  return `tel:${phone.replace(/[^0-9+]/g, '')}`;
}

function ExperienceBlock({ data }: { data: ExperienceItem }) {
  return (
    <article className="timeline-card">
      <header>
        <h3>{resolveText(data.role)}</h3>
        <p className="meta">
          {resolveText(data.company)} · {resolveText(data.location)}
        </p>
        <p className="meta subtle">{resolveText(data.period)}</p>
      </header>
      <ul>
        {resolveList(data.details).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function SkillBlock({ data, showToneLabel }: { data: SkillGroup; showToneLabel: boolean }) {
  return (
    <section className="skill-group">
      <h4>{resolveText(data.group)}</h4>
      <div className="chips">
        {data.items.en.map((item) => (
          <SkillChip
            key={`${item.name}-${item.icon}`}
            icon={item.icon}
            name={item.name}
            iconLabel={item.iconLabel}
            tone={item.tone}
            tooltip={item.tooltip}
            hasTone
            showToneLabel={showToneLabel}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ data, showStackToneLabel }: { data: ProjectItem; showStackToneLabel: boolean }) {
  return (
    <article className="project-card">
      <header className="project-header">
        <h3>{resolveText(data.title)}</h3>
        <p className="meta">{resolveText(data.period)}</p>
      </header>
      <p className="role">{resolveText(data.role)}</p>
      <p>{resolveText(data.problem)}</p>
      <p className="meta section-subtitle">{label.approach}</p>
      <ul>
        {resolveList(data.approach).map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
      <p className="meta section-subtitle">{label.outcomes}</p>
      <ul>
        {resolveList(data.outcomes).map((result) => (
          <li key={result}>{result}</li>
        ))}
      </ul>
      <p className="meta section-subtitle">{label.techStack}</p>
      <StackIcons items={data.stack} showToneLabel={showStackToneLabel} />
      <div className="project-actions">
        <a href={getProjectDetailHash(data.slug)} className="btn-secondary">
          {label.actions.projectDetail}
        </a>
      </div>
      {data.links && data.links.length > 0 && (
        <details className="notes-details">
          <summary>{label.links}</summary>
          <p className="project-links">
            {data.links.map((link, i) => (
              <span key={`${link.href}-${i}`}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {resolveText(link.label)}
                </a>
                {i < data.links!.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
        </details>
      )}
      {data.notes && resolveList(data.notes).length > 0 && (
        <details className="notes-details">
          <summary>{label.notes}</summary>
          <ul>
            {resolveList(data.notes).map((note) => (
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
  onBack,
  showStackToneLabel,
}: {
  data: ProjectItem;
  onBack: () => void;
  showStackToneLabel: boolean;
}) {
  return (
    <article className="project-detail">
      <h3>
        {label.detail}: {resolveText(data.title)}
      </h3>
      <p className="meta">{resolveText(data.period)}</p>
      <p className="role">{resolveText(data.role)}</p>
      <p>{resolveText(data.problem)}</p>
      <p className="meta section-subtitle">{label.approach}</p>
      <ul>
        {resolveList(data.approach).map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
      <p className="meta section-subtitle">{label.outcomes}</p>
      <ul>
        {resolveList(data.outcomes).map((result) => (
          <li key={result}>{result}</li>
        ))}
      </ul>
      <p className="meta section-subtitle">{label.techStack}</p>
      <StackIcons items={data.stack} showToneLabel={showStackToneLabel} />
      {data.links && data.links.length > 0 && (
        <p className="project-links">
          <strong>{label.links}:</strong>
          {data.links.map((link, i) => (
            <span key={`${link.href}-${i}`}>
              {' '}
              <a href={link.href} target="_blank" rel="noreferrer">
                {resolveText(link.label)}
              </a>
              {i < data.links!.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </p>
      )}
      {data.notes && resolveList(data.notes).length > 0 && (
        <details className="notes-details">
          <summary>{label.notes}</summary>
          <ul>
            {resolveList(data.notes).map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </details>
      )}
      <div className="project-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          {label.actions.backToProjects}
        </button>
      </div>
    </article>
  );
}

function App() {
  const [slug, setSlug] = useState<string | null>(getProjectSlugFromHash(window.location.hash));
  const [showSkillToneLabel, setShowSkillToneLabel] = useState(false);
  const [showStackToneLabel, setShowStackToneLabel] = useState(false);

  const scrollToSection = (section: Section) => {
    const target = document.getElementById(section);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleHashChange = () => {
    const nextSlug = getProjectSlugFromHash(window.location.hash);
    const nextSection = getSectionFromHash(window.location.hash);
    setSlug(nextSlug);
    if (nextSlug) {
      scrollToSection('projects');
      return;
    }
    if (nextSection) {
      scrollToSection(nextSection);
    }
  };

  useEffect(() => {
    const initialSlug = getProjectSlugFromHash(window.location.hash);
    const initialSection = getSectionFromHash(window.location.hash);
    if (initialSlug) {
      scrollToSection('projects');
    } else if (initialSection) {
      scrollToSection(initialSection);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const selectedProject = useMemo(() => portfolio.projects.find((project) => project.slug === slug), [slug]);

  return (
    <div className="page">
      <header className="hero">
        <nav>
          <p className="brand">{label.brand}</p>
          {sections.map((section) => (
            <Anchor key={section.id} section={section.id} />
          ))}
        </nav>
        <div className="hero-copy">
          <h1>{portfolio.name}</h1>
          <div className="hero-meta">
            <ContactLink
              href={`mailto:${portfolio.contact.email}`}
              ariaLabel={`${label.contactLabel}: ${portfolio.contact.email}`}
              labelText={label.contactLabel}
              value={portfolio.contact.email}
              icon={FaEnvelopeOpenText}
            />
            <ContactLink
              href={normalizePhoneHref(portfolio.contact.phone)}
              ariaLabel={`${label.phoneLabel}: ${portfolio.contact.phone}`}
              labelText={label.phoneLabel}
              value={portfolio.contact.phone}
              icon={FaPhoneAlt}
            />
            <ContactLink
              href={normalizeUrl(portfolio.contact.linkedIn)}
              ariaLabel={`LinkedIn: ${portfolio.contact.linkedIn}`}
              labelText={label.linkedInLabel}
              value={portfolio.contact.linkedIn}
              icon={FaLinkedinIn}
              external
            />
            <ContactLink
              href={normalizeUrl(portfolio.contact.github)}
              ariaLabel={`GitHub: ${portfolio.contact.github}`}
              labelText={label.githubLabel}
              value={portfolio.contact.github}
              icon={FaGithub}
              external
            />
          </div>
        </div>
      </header>

      <main>
        <section id="summary" className="section">
          <h2>{label.summary}</h2>
          <p>{portfolio.summary.en}</p>
          <p className="meta">
            {label.educationLabel}: {portfolio.education.school.en} ({portfolio.education.period.en}) — {portfolio.education.detail.en}
          </p>
          <p className="meta">
            {label.certLabel}: {portfolio.certs.en.join(' · ')}
          </p>
        </section>

        <section id="experience" className="section">
          <h2>{label.experience}</h2>
          <div className="timeline">
            {portfolio.experiences.map((exp) => (
              <ExperienceBlock key={`${resolveText(exp.company)}-${resolveText(exp.period)}`} data={exp} />
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <h2>{label.projects}</h2>
          <div className="chip-controls" role="group" aria-label="Project chip options">
            <label className="chip-toggle">
              <input
                type="checkbox"
                checked={showStackToneLabel}
                onChange={(event) => setShowStackToneLabel(event.currentTarget.checked)}
              />
              Stack tone labels
            </label>
          </div>
          {selectedProject && (
            <ProjectDetail
              data={selectedProject}
              onBack={() => {
                window.location.hash = getSectionHash('projects');
                setSlug(null);
              }}
              showStackToneLabel={showStackToneLabel}
            />
          )}
          {!selectedProject && (
            <div className="projects">
              {portfolio.projects.map((project) => (
                <ProjectCard key={project.slug} data={project} showStackToneLabel={showStackToneLabel} />
              ))}
            </div>
          )}
        </section>

        <section id="skills" className="section">
          <h2>{label.skills}</h2>
          <div className="chip-controls" role="group" aria-label="Skill chip options">
            <label className="chip-toggle">
              <input
                type="checkbox"
                checked={showSkillToneLabel}
                onChange={(event) => setShowSkillToneLabel(event.currentTarget.checked)}
              />
              Skill tone labels
            </label>
          </div>
          <div className="skills-grid">
            {portfolio.skills.map((block) => (
              <SkillBlock key={resolveText(block.group)} data={block} showToneLabel={showSkillToneLabel} />
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <h2>{label.contactTitle}</h2>
          <p>{label.contactText}</p>
          <div className="contact-list">
            <ContactLink
              href={`mailto:${portfolio.contact.email}`}
              ariaLabel={`${label.contactLabel}: ${portfolio.contact.email}`}
              labelText={label.contactLabel}
              value={portfolio.contact.email}
              icon={FaEnvelopeOpenText}
            />
            <ContactLink
              href={normalizePhoneHref(portfolio.contact.phone)}
              ariaLabel={`${label.phoneLabel}: ${portfolio.contact.phone}`}
              labelText={label.phoneLabel}
              value={portfolio.contact.phone}
              icon={FaPhoneAlt}
            />
            <ContactLink
              href={normalizeUrl(portfolio.contact.linkedIn)}
              ariaLabel={`LinkedIn: ${portfolio.contact.linkedIn}`}
              labelText={label.linkedInLabel}
              value={portfolio.contact.linkedIn}
              icon={FaLinkedinIn}
              external
            />
            <ContactLink
              href={normalizeUrl(portfolio.contact.github)}
              ariaLabel={`GitHub: ${portfolio.contact.github}`}
              labelText={label.githubLabel}
              value={portfolio.contact.github}
              icon={FaGithub}
              external
            />
          </div>
          <div className="hero-actions">
            <a href={`mailto:${portfolio.contact.email}`} className="btn-primary">
              {label.actions.contact}
            </a>
            <a href={`${import.meta.env.BASE_URL}${resumeFileName}`} className="btn-secondary">
              {label.actions.resume}
            </a>
          </div>
        </section>

        {!slug && (
          <section className="section cta-banner">
            <h2>{label.actions.share}</h2>
            <p>{label.bannerMessage}</p>
            <a href={`mailto:${portfolio.contact.email}`} className="btn-accent">
              {label.actions.contact}
            </a>
          </section>
        )}

        {slug && !selectedProject && (
          <section className="section">
            <p className="meta">{label.projectNotFound}</p>
            <a href={getSectionHash('projects')} className="btn-secondary">
              {label.return}
            </a>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;

