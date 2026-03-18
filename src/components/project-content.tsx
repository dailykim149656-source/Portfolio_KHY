import { uiText } from '../content/ui';
import type { ProjectItem } from '../data/portfolio';
import type { Locale } from '../lib/i18n';
import { resolveLocalizedList, resolveLocalizedText } from '../lib/i18n';
import { StackChips } from './chips';

function ProjectLinks({
  project,
  locale,
  mode,
}: {
  project: ProjectItem;
  locale: Locale;
  mode: 'details' | 'inline';
}) {
  const links = project.links;

  if (!links || links.length === 0) {
    return null;
  }

  if (mode === 'details') {
    return (
      <details className="notes-details">
        <summary>{uiText.links}</summary>
        <p className="project-links">
          {links.map((link, index) => (
            <span key={`${link.href}-${index}`}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {resolveLocalizedText(link.label, locale)}
              </a>
              {index < links.length - 1 ? ' | ' : ''}
            </span>
          ))}
        </p>
      </details>
    );
  }

  return (
    <p className="project-links">
      <strong>{uiText.links}:</strong>{' '}
      {links.map((link, index) => (
        <span key={`${link.href}-${index}`}>
          <a href={link.href} target="_blank" rel="noreferrer">
            {resolveLocalizedText(link.label, locale)}
          </a>
          {index < links.length - 1 ? ' | ' : ''}
        </span>
      ))}
    </p>
  );
}

function ProjectNotes({ project, locale }: { project: ProjectItem; locale: Locale }) {
  const notes = project.notes ? resolveLocalizedList(project.notes, locale) : [];
  if (notes.length === 0) {
    return null;
  }

  return (
    <details className="notes-details">
      <summary>{uiText.notes}</summary>
      <ul>
        {notes.map((note, index) => (
          <li key={`${note}-${index}`}>{note}</li>
        ))}
      </ul>
    </details>
  );
}

export function ProjectContent({
  project,
  locale,
  showStackToneLabel,
  linkMode,
}: {
  project: ProjectItem;
  locale: Locale;
  showStackToneLabel: boolean;
  linkMode: 'details' | 'inline';
}) {
  const approach = resolveLocalizedList(project.approach, locale);
  const outcomes = resolveLocalizedList(project.outcomes, locale);

  return (
    <>
      <p className="role">{resolveLocalizedText(project.role, locale)}</p>
      <p>{resolveLocalizedText(project.problem, locale)}</p>
      <p className="meta section-subtitle">{uiText.approach}</p>
      <ul>
        {approach.map((step, index) => (
          <li key={`${step}-${index}`}>{step}</li>
        ))}
      </ul>
      <p className="meta section-subtitle">{uiText.outcomes}</p>
      <ul>
        {outcomes.map((result, index) => (
          <li key={`${result}-${index}`}>{result}</li>
        ))}
      </ul>
      <p className="meta section-subtitle">{uiText.techStack}</p>
      <StackChips items={project.stack} locale={locale} showToneLabel={showStackToneLabel} />
      <ProjectLinks project={project} locale={locale} mode={linkMode} />
      <ProjectNotes project={project} locale={locale} />
    </>
  );
}
