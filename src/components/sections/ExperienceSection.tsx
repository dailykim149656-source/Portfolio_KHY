import { uiText } from '../../content/ui';
import type { PortfolioData } from '../../data/portfolio';
import type { Locale } from '../../lib/i18n';
import { resolveLocalizedList, resolveLocalizedText } from '../../lib/i18n';

function ExperienceCard({
  experience,
  locale,
  index,
}: {
  experience: PortfolioData['experiences'][number];
  locale: Locale;
  index: number;
}) {
  return (
    <article className="timeline-card">
      <header>
        <h3>{resolveLocalizedText(experience.role, locale)}</h3>
        <p className="meta">
          {resolveLocalizedText(experience.company, locale)} | {resolveLocalizedText(experience.location, locale)}
        </p>
        <p className="meta subtle">{resolveLocalizedText(experience.period, locale)}</p>
      </header>
      <ul>
        {resolveLocalizedList(experience.details, locale).map((item, itemIndex) => (
          <li key={`${index}-${itemIndex}`}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export function ExperienceSection({ portfolio, locale }: { portfolio: PortfolioData; locale: Locale }) {
  return (
    <section id="experience" className="section">
      <h2>{uiText.experience}</h2>
      <div className="timeline">
        {portfolio.experiences.map((experience, index) => (
          <ExperienceCard
            key={`${index}-${resolveLocalizedText(experience.company, locale)}`}
            experience={experience}
            locale={locale}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
