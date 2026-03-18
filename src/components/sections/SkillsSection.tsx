import { uiText } from '../../content/ui';
import type { SkillGroup } from '../../data/portfolio';
import type { Locale } from '../../lib/i18n';
import { resolveLocalizedText } from '../../lib/i18n';
import { SkillChipList } from '../chips';

function SkillGroupCard({
  group,
  locale,
  showToneLabel,
}: {
  group: SkillGroup;
  locale: Locale;
  showToneLabel: boolean;
}) {
  return (
    <section className="skill-group">
      <h4>{resolveLocalizedText(group.group, locale)}</h4>
      <SkillChipList items={group.items} locale={locale} showToneLabel={showToneLabel} />
    </section>
  );
}

export function SkillsSection({
  skills,
  locale,
  showSkillToneLabel,
  onToggleShowSkillToneLabel,
}: {
  skills: SkillGroup[];
  locale: Locale;
  showSkillToneLabel: boolean;
  onToggleShowSkillToneLabel: (value: boolean) => void;
}) {
  return (
    <section id="skills" className="section">
      <h2>{uiText.skills}</h2>
      <div className="chip-controls" role="group" aria-label="Skill chip options">
        <label className="chip-toggle">
          <input
            type="checkbox"
            checked={showSkillToneLabel}
            onChange={(event) => onToggleShowSkillToneLabel(event.currentTarget.checked)}
          />
          Skill tone labels
        </label>
      </div>
      <div className="skills-grid">
        {skills.map((group, index) => (
          <SkillGroupCard
            key={`${index}-${resolveLocalizedText(group.group, locale)}`}
            group={group}
            locale={locale}
            showToneLabel={showSkillToneLabel}
          />
        ))}
      </div>
    </section>
  );
}
