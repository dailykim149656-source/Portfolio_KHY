import { uiText } from '../../content/ui';
import type { PortfolioData } from '../../data/portfolio';
import { ContactLinks } from '../ContactLink';

export function ContactSection({ portfolio }: { portfolio: PortfolioData }) {
  return (
    <section id="contact" className="section">
      <h2>{uiText.contactTitle}</h2>
      <p>{uiText.contactText}</p>
      <ContactLinks contact={portfolio.contact} variant="section" />
      <div className="hero-actions">
        <a href={`mailto:${portfolio.contact.email}`} className="btn-primary">
          {uiText.actions.contact}
        </a>
      </div>
    </section>
  );
}
