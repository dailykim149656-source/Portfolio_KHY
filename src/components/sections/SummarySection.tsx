import { uiText } from '../../content/ui';
import type { PortfolioData } from '../../data/portfolio';
import type { Locale } from '../../lib/i18n';
import { resolveLocalizedList, resolveLocalizedText } from '../../lib/i18n';

export function SummarySection({ portfolio, locale }: { portfolio: PortfolioData; locale: Locale }) {
  return (
    <section id="summary" className="section">
      <h2>{uiText.summary}</h2>
      <p>{resolveLocalizedText(portfolio.summary, locale)}</p>
      <p className="meta">
        {uiText.educationLabel}: {resolveLocalizedText(portfolio.education.school, locale)} (
        {resolveLocalizedText(portfolio.education.period, locale)}) |{' '}
        {resolveLocalizedText(portfolio.education.detail, locale)}
      </p>
      <p className="meta">
        {uiText.certLabel}: {resolveLocalizedList(portfolio.certs, locale).join(' | ')}
      </p>
    </section>
  );
}
