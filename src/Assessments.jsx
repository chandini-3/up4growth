import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import SiteNavbar from './SiteNavbar';
import SeoHead from './SeoHead';
import { useAssessment } from './AssessmentProvider';
import { assessments } from './assessmentsData';
import { SITE_NAME, absoluteUrl, buildPageSeoJsonLd, truncateDescription } from './seoConfig';
import './index.css';

function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-bottom-bar">
          <span>&copy; 2026 Up4Growth</span>
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

function AssessmentCard({ assessment, onStart }) {
  return (
    <article className="blog-card assessments-card">
      <button
        type="button"
        className="blog-card-image-link"
        onClick={() => onStart(assessment.id)}
        aria-label={`Start assessment: ${assessment.title}`}
        style={{ width: '100%', padding: 0, border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <div
          className="blog-card-image-wrap"
          style={assessment.imageBackground ? { background: assessment.imageBackground } : undefined}
        >
          {assessment.image ? (
            <img
              src={assessment.image}
              alt={assessment.imageAlt || assessment.title}
              className="blog-card-image"
              style={{
                ...(assessment.imagePosition ? { objectPosition: assessment.imagePosition } : {}),
                ...(assessment.imageFit ? { objectFit: assessment.imageFit } : {}),
              }}
              loading="eager"
              decoding="async"
            />
          ) : (
            <div className="blog-card-image blog-card-image--wellbeing" aria-hidden="true" />
          )}
        </div>
      </button>

      <div className="blog-card-body">
        <h3 className="blog-card-title">
          <button
            type="button"
            onClick={() => onStart(assessment.id)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'left',
              color: 'inherit',
              font: 'inherit',
            }}
          >
            {assessment.title}
          </button>
        </h3>

        <p className="blog-card-meta">
          <span>{assessment.duration}</span>
          <span className="blog-card-meta-divider" aria-hidden="true">·</span>
          <span>{assessment.domains} domains</span>
        </p>

        {assessment.summary && (
          <div className="blog-card-summary">
            <p className="blog-card-summary-line">{assessment.summary}</p>
          </div>
        )}

        <button
          type="button"
          className="blog-card-read-more"
          onClick={() => onStart(assessment.id)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          {assessment.cta || 'Start assessment'}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export default function Assessments() {
  const { openAssessment } = useAssessment() || {};

  const seo = useMemo(
    () => ({
      title: `Assessment | ${SITE_NAME}`,
      description: truncateDescription(
        'Explore interactive Up4Growth assessments, including the Life Audit Assessment across eight life domains.',
      ),
      canonical: absoluteUrl('/assessments'),
      image: absoluteUrl('/images/wheel-of-life-card.png'),
      type: 'website',
      jsonLd: buildPageSeoJsonLd({
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Assessment', path: '/assessments' },
        ],
      }),
    }),
    [],
  );

  const handleStart = (id) => {
    openAssessment?.(id);
  };

  return (
    <div className="layout assessments-page">
      <SeoHead {...seo} />
      <SiteNavbar />

      <main>
        <section className="blog-hero assessments-hero">
          <div className="container">
            <div className="blog-hero-inner">
              <span className="section-tag blog-hero-tag">Tools</span>
              <h1 className="blog-hero-title">Assessment</h1>
              <p className="blog-hero-description">
                Reflect on where you are and design where you want to grow.
              </p>
            </div>
          </div>
        </section>

        <section className="blog-index assessments-index">
          <div className="container">
            <div className="blog-cards-grid assessments-cards-grid" role="feed" aria-label="Assessment">
              {assessments.map((assessment) => (
                <AssessmentCard
                  key={assessment.id}
                  assessment={assessment}
                  onStart={handleStart}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
