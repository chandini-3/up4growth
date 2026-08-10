import { Link } from 'react-router-dom';
import SiteNavbar from './SiteNavbar';
import SeoHead from './SeoHead';
import { SITE_NAME, absoluteUrl } from './seoConfig';
import { programs } from './programData';
import './index.css';

function ProgramCard({ program }) {
  const programHref = `/programs/${program.id}`;
  const cardImage = program.heroImage
    ? program.heroImage.split('?')[0]
    : null;

  return (
    <article className="workshop-program-card" aria-label={program.title}>
      <Link
        to={programHref}
        className="workshop-program-card-image-link"
        aria-label={`View program: ${program.title}`}
      >
        <div className="workshop-program-card-image-wrap">
          {cardImage ? (
            <img
              src={cardImage}
              alt=""
              className="workshop-program-card-image"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className={`workshop-program-card-image workshop-program-card-image--${program.category}`}
              aria-hidden="true"
            />
          )}
        </div>
      </Link>

      <div className="workshop-program-card-body">
        <span className="workshop-program-card-badge">{program.badge}</span>
        <h2 className="workshop-program-card-title">
          <Link to={programHref}>{program.title}</Link>
        </h2>
        <p className="workshop-program-card-excerpt">{program.excerpt}</p>
        <Link to={programHref} className="workshop-program-card-view">
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

export default function Programs() {
  return (
    <div className="layout">
      <SeoHead
        title={`Up4Growth Programs | ${SITE_NAME}`}
        description="Explore customized Up4Growth programs designed to help individuals and teams achieve clarity, focus, and meaningful progress."
        canonical={absoluteUrl('/programs')}
        image={absoluteUrl('/images/hero.png')}
        type="website"
      />
      <SiteNavbar />

      <main>
        <section className="section workshop-topics-section">
          <div className="container">
            <Link to="/" className="programs-back-home">
              ← Back to Home
            </Link>
            <h1 className="workshop-topics-title">Up4Growth Programs</h1>
            <p className="programs-page-lead">
              We design customized programs tailored to each client&apos;s unique needs.
              Practical solutions that help individuals and teams achieve their goals.
            </p>

            <div className="workshop-program-grid workshop-program-grid--programs">
              {programs.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
