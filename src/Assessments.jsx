import { useEffect, useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SiteNavbar from './SiteNavbar';
import SeoHead from './SeoHead';
import { assessments, getAssessmentBySlug, getAssessmentPath } from './assessmentsData';
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

function AssessmentCard({ assessment }) {
  const path = getAssessmentPath(assessment);
  const cardClass =
    assessment.id === 'career-audit'
      ? 'blog-card assessments-card assessments-card--career'
      : 'blog-card assessments-card';

  return (
    <article className={cardClass}>
      <Link
        to={path}
        className="blog-card-image-link"
        aria-label={`Start assessment: ${assessment.title}`}
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
      </Link>

      <div className="blog-card-body">
        <h3 className="blog-card-title">
          <Link to={path}>{assessment.title}</Link>
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

        <Link to={path} className="blog-card-read-more">
          {assessment.cta || 'Start assessment'}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function Assessments() {
  const { slug } = useParams();
  const routedAssessment = slug ? getAssessmentBySlug(slug) : null;

  useEffect(() => {
    if (!slug) {
      document.body.style.overflow = '';
    }
  }, [slug]);

  const seo = useMemo(() => {
    if (routedAssessment) {
      return {
        title: `${routedAssessment.title} | Assessments | ${SITE_NAME}`,
        description: truncateDescription(
          routedAssessment.summary ||
            `Start the ${routedAssessment.title} assessment from Up4Growth.`,
        ),
        canonical: absoluteUrl(getAssessmentPath(routedAssessment)),
        image: absoluteUrl(routedAssessment.image || '/images/wheel-of-life-card.png'),
        type: 'website',
        jsonLd: buildPageSeoJsonLd({
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Assessments', path: '/assessments' },
            { name: routedAssessment.title, path: getAssessmentPath(routedAssessment) },
          ],
        }),
      };
    }

    return {
      title: `Assessments | ${SITE_NAME}`,
      description: truncateDescription(
        'Explore interactive Up4Growth assessments, including the Wheel of Life and Career Audit.',
      ),
      canonical: absoluteUrl('/assessments'),
      image: absoluteUrl('/images/wheel-of-life-card.png'),
      type: 'website',
      jsonLd: buildPageSeoJsonLd({
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Assessments', path: '/assessments' },
        ],
      }),
    };
  }, [routedAssessment]);

  if (slug && !routedAssessment) {
    return <Navigate to="/assessments" replace />;
  }

  return (
    <div className="layout assessments-page">
      <SeoHead {...seo} />
      <SiteNavbar />

      <main>
        <section className="blog-hero assessments-hero">
          <div className="container">
            <div className="blog-hero-inner">
              <h1 className="blog-hero-title">Assessments</h1>
            </div>
          </div>
        </section>

        <section className="blog-index assessments-index">
          <div className="container">
            <div className="blog-cards-grid assessments-cards-grid" role="feed" aria-label="Assessments">
              {assessments.map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
