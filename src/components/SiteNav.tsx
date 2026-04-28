import { sectionLabels, sectionOrder, uiText } from '../content/ui';
import { getSectionHash } from '../lib/hashRouting';

export function SiteNav() {
  return (
    <nav>
      <p className="brand">{uiText.brand}</p>
      {sectionOrder.map((section) => (
        <a key={section} href={getSectionHash(section)}>
          {sectionLabels[section]}
        </a>
      ))}
    </nav>
  );
}
