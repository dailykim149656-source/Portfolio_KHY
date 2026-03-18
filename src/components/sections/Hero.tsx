import { sectionLabels, sectionOrder, uiText } from '../../content/ui';
import type { PortfolioData } from '../../data/portfolio';
import { getSectionHash } from '../../lib/hashRouting';
import type { Locale } from '../../lib/i18n';
import { resolveLocalizedText } from '../../lib/i18n';
import { ContactLinks } from '../ContactLink';

export function Hero({ portfolio, locale }: { portfolio: PortfolioData; locale: Locale }) {
  return (
    <header className="hero">
      <nav>
        <p className="brand">{uiText.brand}</p>
        {sectionOrder.map((section) => (
          <a key={section} href={getSectionHash(section)}>
            {sectionLabels[section]}
          </a>
        ))}
      </nav>
      <div className="hero-copy">
        <div className="hero-title-block">
          <p className="eyebrow">{resolveLocalizedText(portfolio.title, locale)}</p>
          <h1>{portfolio.name}</h1>
        </div>
        <ContactLinks contact={portfolio.contact} variant="hero" />
      </div>
    </header>
  );
}
