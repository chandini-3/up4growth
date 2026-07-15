import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SiteNavbar from './SiteNavbar';
import SeoHead from './SeoHead';
import { SITE_NAME, absoluteUrl } from './seoConfig';
import {
  getWorkshopCategoryMeta,
  workshopTopicCategories,
  workshopTopics,
} from './workshopTopicData';
import './index.css';

function WorkshopTopicCard({ topic }) {
  const categoryMeta = getWorkshopCategoryMeta(topic.category);
  const topicHref = `/workshops/topics/${topic.id}`;

  return (
    <article className="workshop-program-card" aria-label={topic.title}>
      <Link
        to={topicHref}
        className="workshop-program-card-image-link"
        aria-label={`View workshop: ${topic.title}`}
      >
        <div className="workshop-program-card-image-wrap">
          <div
            className={`workshop-program-card-image workshop-program-card-image--${topic.category}`}
            aria-hidden="true"
          />
        </div>
      </Link>

      <div className="workshop-program-card-body">
        <span className="workshop-program-card-badge">
          {categoryMeta.badgeLabel ?? categoryMeta.label}
        </span>
        <h2 className="workshop-program-card-title">
          <Link to={topicHref}>{topic.title}</Link>
        </h2>
        <Link to={topicHref} className="workshop-program-card-view">
          View →
        </Link>
      </div>
    </article>
  );
}

function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-bottom-bar">
          <span>© 2026 Up4Growth</span>
          <span className="footer-divider">|</span>
          <a href="/data-protection.html" className="footer-bottom-link">Data Protection</a>
          <span className="footer-divider">|</span>
          <a href="/imprint.html" className="footer-bottom-link">Imprint</a>
          <span className="footer-divider">|</span>
          <a href="/terms-and-conditions.html" className="footer-bottom-link">Terms and Conditions</a>
        </div>
      </div>
    </footer>
  );
}

export default function WorkshopTopics() {
  const [activeTopic, setActiveTopic] = useState('all');
  const visibleTopics = useMemo(() => (
    activeTopic === 'all'
      ? workshopTopics
      : workshopTopics.filter((topic) => topic.category === activeTopic)
  ), [activeTopic]);

  return (
    <div className="layout">
      <SeoHead
        title={`Workshop Topics | ${SITE_NAME}`}
        description="Explore Up4Growth corporate workshop topics across career development, wellbeing, leadership, and productivity."
        canonical={absoluteUrl('/workshops/topics')}
        image={absoluteUrl('/images/hero.png')}
        type="website"
      />
      <SiteNavbar />

      <main>
        <section className="section workshop-topics-section">
          <div className="container">
            <h1 className="workshop-topics-title">Topics</h1>

            <div className="workshop-topics-filters" role="tablist" aria-label="Workshop topics">
              {workshopTopicCategories.map((filter) => {
                const isActive = activeTopic === filter.key;
                return (
                  <button
                    key={filter.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`workshop-topics-filter${isActive ? ' active' : ''}`}
                    onClick={() => setActiveTopic(filter.key)}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <div className="workshop-program-grid">
              {visibleTopics.length > 0 ? (
                visibleTopics.map((topic) => (
                  <WorkshopTopicCard key={topic.id} topic={topic} />
                ))
              ) : (
                <p className="workshop-program-empty">No topics found for this category.</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
