import { Link } from 'react-router-dom';
import SiteNavbar from './SiteNavbar';
import SeoHead from './SeoHead';
import { SITE_NAME, absoluteUrl } from './seoConfig';
import { coachingOffers } from './coachingData';
import './index.css';

function CoachingCard({ offer }) {
  const offerHref = `/coaching/${offer.id}`;
  const cardImage = offer.heroImage
    ? offer.heroImage.split('?')[0]
    : null;

  return (
    <article className="workshop-program-card" aria-label={offer.title}>
      <Link
        to={offerHref}
        className="workshop-program-card-image-link"
        aria-label={`View coaching: ${offer.title}`}
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
              className={`workshop-program-card-image workshop-program-card-image--${offer.category}`}
              aria-hidden="true"
            />
          )}
        </div>
      </Link>

      <div className="workshop-program-card-body">
        <span className="workshop-program-card-badge">{offer.badge}</span>
        <h2 className="workshop-program-card-title">
          <Link to={offerHref}>{offer.title}</Link>
        </h2>
        <p className="workshop-program-card-excerpt">{offer.excerpt}</p>
        <Link to={offerHref} className="workshop-program-card-view">
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

export default function Coaching() {
  return (
    <div className="layout">
      <SeoHead
        title={`One-on-One Coaching | ${SITE_NAME}`}
        description="Explore Up4Growth one-on-one coaching options focused on growth, career ownership, and leadership development."
        canonical={absoluteUrl('/coaching')}
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
            <h1 className="workshop-topics-title">One-on-One Coaching</h1>
            <p className="programs-page-lead">
              Personalized coaching sessions focused on self-awareness, goal setting, and performance improvement.
              We empower professionals to reach their full potential.
            </p>

            <div className="workshop-program-grid">
              {coachingOffers.map((offer) => (
                <CoachingCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
