import { IconType } from 'react-icons';
import {
  FaBrain,
  FaBolt,
  FaBullseye,
  FaChartLine,
  FaCloud,
  FaCode,
  FaCogs,
  FaDatabase,
  FaDocker,
  FaEye,
  FaFlask,
  FaGithub,
  FaGlobe,
  FaJsSquare,
  FaLock,
  FaPython,
  FaRobot,
  FaRocket,
  FaSearch,
  FaServer,
  FaTachometerAlt,
  FaTools,
  FaWrench,
} from 'react-icons/fa';
import {
  SiCplusplus,
  SiFastapi,
  SiGithubactions,
  SiLangchain,
  SiNextdotjs,
  SiNumpy,
  SiOpenai,
  SiPandas,
  SiPytorch,
  SiRedis,
  SiRust,
} from 'react-icons/si';
import type { PortfolioIconId, PortfolioTone, SkillItem, TechStackItem } from '../data/portfolio';
import type { Locale } from '../lib/i18n';
import { resolveLocalizedText } from '../lib/i18n';

const toneLabelMap: Record<PortfolioTone, string> = {
  ai: 'AI',
  backend: 'Backend',
  cloud: 'Cloud',
  data: 'Data',
  language: 'Language',
  ops: 'Ops',
  infra: 'Infra',
};

const toneIconMap: Record<PortfolioTone, IconType> = {
  ai: FaBrain,
  backend: FaServer,
  cloud: FaCloud,
  data: FaDatabase,
  language: FaCode,
  ops: FaWrench,
  infra: FaTools,
};

const portfolioIconMap: Record<PortfolioIconId, IconType> = {
  brain: FaBrain,
  chartLine: FaChartLine,
  target: FaBullseye,
  bolt: FaBolt,
  code: FaCode,
  lock: FaLock,
  database: FaDatabase,
  stream: FaRocket,
  cloud: FaCloud,
  robot: FaRobot,
  cogs: FaCogs,
  rocket: FaRocket,
  globe: FaGlobe,
  docker: FaDocker,
  github: FaGithub,
  tachometer: FaTachometerAlt,
  search: FaSearch,
  flask: FaFlask,
  eye: FaEye,
  python: FaPython,
  js: FaJsSquare,
  nextjs: SiNextdotjs,
  azure: FaCloud,
  openai: SiOpenai,
  fastapi: SiFastapi,
  langchain: SiLangchain,
  rag: FaRobot,
  cpp: SiCplusplus,
  rust: SiRust,
  pytorch: SiPytorch,
  redis: SiRedis,
  numpy: SiNumpy,
  pandas: SiPandas,
  sql: FaDatabase,
  sse: FaTachometerAlt,
  githubActions: SiGithubactions,
};

function getChipClass(base: string, tone?: PortfolioTone) {
  const toneClass = tone ? `chip-${tone}` : 'chip-default';
  return `${base} ${toneClass}`;
}

function renderChipIcon(iconId: PortfolioIconId) {
  const Icon = portfolioIconMap[iconId];
  return <Icon className="skill-icon" aria-hidden="true" />;
}

function getTooltipText(name: string, iconLabel?: string, tooltip?: string) {
  const title = iconLabel ?? name;
  if (!tooltip || tooltip === title) {
    return title;
  }
  return `${title}\n${tooltip}`;
}

function ToneBadge({ tone, showLabel }: { tone: PortfolioTone; showLabel: boolean }) {
  const Icon = toneIconMap[tone];
  return (
    <span className={`chip-tone chip-tone-${tone}`} aria-hidden="true">
      {showLabel ? <Icon className="chip-tone-icon" /> : null}
      <span>{toneLabelMap[tone]}</span>
    </span>
  );
}

export function StackChips({
  items,
  locale,
  showToneLabel,
}: {
  items: TechStackItem[];
  locale: Locale;
  showToneLabel: boolean;
}) {
  return (
    <div className="chips">
      {items.map((item, index) => {
        const name = resolveLocalizedText(item.name, locale);
        const iconLabel = item.iconLabel ? resolveLocalizedText(item.iconLabel, locale) : undefined;
        const tooltip = item.tooltip ? resolveLocalizedText(item.tooltip, locale) : undefined;
        const tooltipText = getTooltipText(name, iconLabel, tooltip);

        return (
          <span
            key={`${item.icon}-${name}-${index}`}
            className={getChipClass('chip stacked', item.tone)}
            aria-label={`${tooltipText} stack`}
            title={tooltipText}
            data-tooltip={tooltipText}
            tabIndex={0}
          >
            <span className="skill-icon-wrap" aria-hidden="true">
              {renderChipIcon(item.icon)}
            </span>
            {item.tone && showToneLabel ? <ToneBadge tone={item.tone} showLabel /> : null}
            <span>{name}</span>
          </span>
        );
      })}
    </div>
  );
}

export function SkillChipList({
  items,
  locale,
  showToneLabel,
}: {
  items: SkillItem[];
  locale: Locale;
  showToneLabel: boolean;
}) {
  return (
    <div className="chips">
      {items.map((item, index) => {
        const name = resolveLocalizedText(item.name, locale);
        const iconLabel = item.iconLabel ? resolveLocalizedText(item.iconLabel, locale) : undefined;
        const tooltip = item.tooltip ? resolveLocalizedText(item.tooltip, locale) : undefined;
        const tooltipText = getTooltipText(name, iconLabel, tooltip);

        return (
          <span
            key={`${item.icon}-${name}-${index}`}
            className={getChipClass('chip', item.tone)}
            aria-label={`${tooltipText} skill`}
            title={tooltipText}
            data-tooltip={tooltipText}
            tabIndex={0}
          >
            <span className="skill-icon-wrap" aria-hidden="true">
              {renderChipIcon(item.icon)}
            </span>
            {item.tone && showToneLabel ? <ToneBadge tone={item.tone} showLabel /> : null}
            <span>{name}</span>
          </span>
        );
      })}
    </div>
  );
}
