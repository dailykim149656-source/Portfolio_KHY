import { uiText } from '../../content/ui';
import type { PortfolioData } from '../../data/portfolio';

export function CtaBanner({ portfolio }: { portfolio: PortfolioData }) {
  return (
    <section className="section cta-banner">
      <h2>{uiText.actions.share}</h2>
      <p>{uiText.bannerMessage}</p>
      <a href={`mailto:${portfolio.contact.email}`} className="btn-accent">
        {uiText.actions.contact}
      </a>
    </section>
  );
}
