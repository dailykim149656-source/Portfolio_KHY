import { useEffect, useState } from 'react';
import { CtaBanner } from './components/sections/CtaBanner';
import { ContactSection } from './components/sections/ContactSection';
import { EngagementSection } from './components/sections/EngagementSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { Hero } from './components/sections/Hero';
import { PostsSection } from './components/sections/PostsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { SummarySection } from './components/sections/SummarySection';
import { SiteNav } from './components/SiteNav';
import { portfolio } from './data/portfolio';
import {
  getPostSlugFromHash,
  getProjectSlugFromHash,
  getSectionFromHash,
  getSectionHash,
  isPostsRouteHash,
  type Section,
} from './lib/hashRouting';
import { DEFAULT_LOCALE } from './lib/i18n';

function App() {
  const locale = DEFAULT_LOCALE;
  const [hash, setHash] = useState(() => window.location.hash);
  const [showSkillToneLabel, setShowSkillToneLabel] = useState(false);
  const [showStackToneLabel, setShowStackToneLabel] = useState(false);
  const slug = getProjectSlugFromHash(hash);
  const postSlug = getPostSlugFromHash(hash);
  const postsPage = isPostsRouteHash(hash);
  const section = getSectionFromHash(hash);

  const scrollToSection = (section: Section) => {
    const target = document.getElementById(section);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (postsPage) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    if (slug) {
      scrollToSection('projects');
      return;
    }

    if (section) {
      scrollToSection(section);
    }
  }, [postsPage, section, slug]);

  if (postsPage) {
    return (
      <div className="page posts-page">
        <SiteNav />
        <main className="posts-page-main">
          <PostsSection requestedSlug={postSlug} />
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <Hero portfolio={portfolio} locale={locale} />
      <main>
        <SummarySection portfolio={portfolio} locale={locale} />
        <ExperienceSection portfolio={portfolio} locale={locale} />
        <EngagementSection portfolio={portfolio} locale={locale} />
        <ProjectsSection
          projects={portfolio.projects}
          locale={locale}
          requestedSlug={slug}
          showStackToneLabel={showStackToneLabel}
          onToggleShowStackToneLabel={setShowStackToneLabel}
          onBackToProjects={() => {
            window.location.hash = getSectionHash('projects');
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
