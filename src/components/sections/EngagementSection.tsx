import { uiText } from '../../content/ui';
import type { PortfolioData } from '../../data/portfolio';
import type { Locale } from '../../lib/i18n';
import { resolveLocalizedList, resolveLocalizedText } from '../../lib/i18n';

export function EngagementSection({ portfolio, locale }: { portfolio: PortfolioData; locale: Locale }) {
  return (
    <section id="engagement" className="section">
      <h2>{uiText.engagementTitle}</h2>
      <div className="skills-grid">
        <article className="skill-group">
          <h4>{uiText.engagementTitle}</h4>
          {portfolio.engagements.map((item) => (
            <div key={resolveLocalizedText(item.title, locale)} className="engagement-card">
              <h4>{resolveLocalizedText(item.title, locale)}</h4>
              <p className="meta">{resolveLocalizedText(item.period, locale)}</p>
              <p className="meta subtle">{resolveLocalizedText(item.status, locale)}</p>
              <p>{resolveLocalizedText(item.summary, locale)}</p>
              <ul>
                {resolveLocalizedList(item.details, locale).map((detail, index) => (
                  <li key={`${resolveLocalizedText(item.title, locale)}-${index}`}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </article>
        <article className="skill-group">
          <h4>{uiText.languagesTitle}</h4>
          <div className="chips">
            {portfolio.languages.map((item) => (
              <span
                key={resolveLocalizedText(item.name, locale)}
                className="chip chip-default"
                title={`${resolveLocalizedText(item.name, locale)} ${resolveLocalizedText(item.level, locale)}`}
              >
                <span>{resolveLocalizedText(item.name, locale)}</span>
                <span className="chip-tone chip-tone-language">
                  {uiText.languageLevelLabel}: {resolveLocalizedText(item.level, locale)}
                </span>
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
