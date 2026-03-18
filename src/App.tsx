import { useEffect, useState } from 'react';
import { CtaBanner } from './components/sections/CtaBanner';
import { ContactSection } from './components/sections/ContactSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { Hero } from './components/sections/Hero';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { SummarySection } from './components/sections/SummarySection';
import { portfolio } from './data/portfolio';
import { getProjectSlugFromHash, getSectionFromHash, getSectionHash, type Section } from './lib/hashRouting';
import { DEFAULT_LOCALE } from './lib/i18n';

function App() {
  const locale = DEFAULT_LOCALE;
  const [slug, setSlug] = useState<string | null>(() => getProjectSlugFromHash(window.location.hash));
  const [showSkillToneLabel, setShowSkillToneLabel] = useState(false);
  const [showStackToneLabel, setShowStackToneLabel] = useState(false);

  const scrollToSection = (section: Section) => {
    const target = document.getElementById(section);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const nextSlug = getProjectSlugFromHash(window.location.hash);
      const nextSection = getSectionFromHash(window.location.hash);
      setSlug(nextSlug);

      if (nextSlug) {
        scrollToSection('projects');
        return;
      }

      if (nextSection) {
        scrollToSection(nextSection);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="page">
      <Hero portfolio={portfolio} locale={locale} />
      <main>
        <SummarySection portfolio={portfolio} locale={locale} />
        <ExperienceSection portfolio={portfolio} locale={locale} />
        <ProjectsSection
          projects={portfolio.projects}
          locale={locale}
          requestedSlug={slug}
          showStackToneLabel={showStackToneLabel}
          onToggleShowStackToneLabel={setShowStackToneLabel}
          onBackToProjects={() => {
            window.location.hash = getSectionHash('projects');
            setSlug(null);
          }}
        />
        <SkillsSection
          skills={portfolio.skills}
          locale={locale}
          showSkillToneLabel={showSkillToneLabel}
          onToggleShowSkillToneLabel={setShowSkillToneLabel}
        />
        <ContactSection portfolio={portfolio} />
        {!slug ? <CtaBanner portfolio={portfolio} /> : null}
      </main>
    </div>
  );
}

export default App;
