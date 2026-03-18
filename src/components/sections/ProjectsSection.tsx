import { uiText } from '../../content/ui';
import type { ProjectItem } from '../../data/portfolio';
import { getProjectDetailHash, getSectionHash } from '../../lib/hashRouting';
import type { Locale } from '../../lib/i18n';
import { resolveLocalizedText } from '../../lib/i18n';
import { ProjectContent } from '../project-content';

function ProjectCard({
  project,
  locale,
  showStackToneLabel,
}: {
  project: ProjectItem;
  locale: Locale;
  showStackToneLabel: boolean;
}) {
  return (
    <article className="project-card">
      <header className="project-header">
        <div>
          <h3>{resolveLocalizedText(project.title, locale)}</h3>
          <p className="meta">{resolveLocalizedText(project.period, locale)}</p>
        </div>
      </header>
      <ProjectContent project={project} locale={locale} showStackToneLabel={showStackToneLabel} linkMode="details" />
      <div className="project-actions">
        <a href={getProjectDetailHash(project.slug)} className="btn-secondary">
          {uiText.actions.projectDetail}
        </a>
      </div>
    </article>
  );
}

function ProjectDetail({
  project,
  locale,
  showStackToneLabel,
  onBack,
}: {
  project: ProjectItem;
  locale: Locale;
  showStackToneLabel: boolean;
  onBack: () => void;
}) {
  return (
    <article className="project-detail">
      <h3>
        {uiText.detail}: {resolveLocalizedText(project.title, locale)}
      </h3>
      <p className="meta">{resolveLocalizedText(project.period, locale)}</p>
      <ProjectContent project={project} locale={locale} showStackToneLabel={showStackToneLabel} linkMode="inline" />
      <div className="project-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          {uiText.actions.backToProjects}
        </button>
      </div>
    </article>
  );
}

export function ProjectsSection({
  projects,
  locale,
  requestedSlug,
  showStackToneLabel,
  onToggleShowStackToneLabel,
  onBackToProjects,
}: {
  projects: ProjectItem[];
  locale: Locale;
  requestedSlug: string | null;
  showStackToneLabel: boolean;
  onToggleShowStackToneLabel: (value: boolean) => void;
  onBackToProjects: () => void;
}) {
  const selectedProject = requestedSlug ? projects.find((project) => project.slug === requestedSlug) ?? null : null;
  const missingProject = Boolean(requestedSlug) && !selectedProject;

  return (
    <section id="projects" className="section">
      <h2>{uiText.projects}</h2>
      <div className="chip-controls" role="group" aria-label="Project chip options">
        <label className="chip-toggle">
          <input
            type="checkbox"
            checked={showStackToneLabel}
            onChange={(event) => onToggleShowStackToneLabel(event.currentTarget.checked)}
          />
          Stack tone labels
        </label>
      </div>
      {selectedProject ? (
        <ProjectDetail
          project={selectedProject}
          locale={locale}
          showStackToneLabel={showStackToneLabel}
          onBack={onBackToProjects}
        />
      ) : null}
      {missingProject ? (
        <div className="project-detail">
          <p className="meta">{uiText.projectNotFound}</p>
          <a href={getSectionHash('projects')} className="btn-secondary">
            {uiText.return}
          </a>
        </div>
      ) : null}
      {!requestedSlug ? (
        <div className="projects">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              showStackToneLabel={showStackToneLabel}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
