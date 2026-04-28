import { uiText } from '../../content/ui';
import type { PortfolioData } from '../../data/portfolio';
import { getSectionHash } from '../../lib/hashRouting';
import type { Locale } from '../../lib/i18n';
import { resolveLocalizedText } from '../../lib/i18n';
import { ContactLinks } from '../ContactLink';
import { SiteNav } from '../SiteNav';

export function Hero({ portfolio, locale }: { portfolio: PortfolioData; locale: Locale }) {
  return (
    <header className="hero">
      <SiteNav />
      <div className="hero-copy">
        <div className="hero-main">
          <div className="hero-title-block">
            <p className="eyebrow">{resolveLocalizedText(portfolio.title, locale)}</p>
            <h1>{portfolio.name}</h1>
          </div>
          <p className="hero-lead">{uiText.heroLead}</p>
          <div className="hero-actions">
            <a href={getSectionHash('projects')} className="btn-primary">
              {uiText.actions.projects}
            </a>
          </div>
        </div>
        <div className="hero-side">
          <ContactLinks contact={portfolio.contact} variant="hero" />
          <div className="hero-proof-grid" aria-label="Portfolio highlights">
            {uiText.heroProofs.map((proof) => (
              <span key={proof} className="hero-proof">
                {proof}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
