import { Link } from 'react-router-dom';
import SiteNavbar from './SiteNavbar';
import SeoHead from './SeoHead';
import { BOOK_PAGE_PATH } from './calendlyConfig';
import {
  SITE_NAME,
  absoluteUrl,
  buildPageSeoJsonLd,
  truncateDescription,
} from './seoConfig';
import { coachingOffers } from './coachingData';
import './index.css';

const COACHING_DESCRIPTION = truncateDescription(
  'Explore Up4Growth one-on-one coaching options designed to help you grow with clarity, confidence, and purposeful action in your career and life.',
);

function CoachingCard({ offer }) {
  const offerHref = `/coaching/${offer.id}`;
  const cardImage = offer.heroImage ? offer.heroImage.split('?')[0] : null;

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
        description={COACHING_DESCRIPTION}
        canonical={absoluteUrl('/coaching')}
        image={absoluteUrl(
          coachingOffers[0]?.heroImage?.split('?')[0] || '/images/hero.png',
        )}
        type="website"
        jsonLd={buildPageSeoJsonLd({
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'One-on-One Coaching', path: '/coaching' },
          ],
          collection: {
            name: 'One-on-One Coaching',
            description: COACHING_DESCRIPTION,
            url: '/coaching',
            items: coachingOffers.map((offer) => ({
              name: offer.shortTitle || offer.title,
              path: `/coaching/${offer.id}`,
            })),
          },
        })}
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
              Personalized coaching to help you grow with clarity, confidence, and purposeful action.
            </p>

            <div className="workshop-program-grid workshop-program-grid--programs">
              {coachingOffers.map((offer) => (
                <CoachingCard key={offer.id} offer={offer} />
              ))}
            </div>

            <section className="workshop-landing-calendly-section" id="book-discovery-session" aria-label="Book a discovery session">
              <h2 className="workshop-landing-section-title">Book your free discovery session</h2>
              <p className="programs-page-lead">
                Choose a time that works for you. The first session is an opportunity to explore whether coaching is the right fit.
              </p>
              <Link to={BOOK_PAGE_PATH} className="btn btn-primary">
                Schedule Your Free Consultation
              </Link>
            </section>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
