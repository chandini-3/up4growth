import { Link, useParams } from 'react-router-dom';
import SiteNavbar from './SiteNavbar';
import SeoHead from './SeoHead';
import WorkshopTopicLanding from './WorkshopTopicLanding';
import { SITE_NAME, absoluteUrl } from './seoConfig';
import { getCoachingOfferById } from './coachingData';
import './index.css';

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

export default function CoachingPage() {
  const { slug } = useParams();
  const offer = slug ? getCoachingOfferById(slug) : null;

  if (!offer) {
    return (
      <div className="layout">
        <SeoHead
          title={`Coaching Not Found | ${SITE_NAME}`}
          description="The requested coaching option could not be found."
          canonical={absoluteUrl('/coaching')}
        />
        <SiteNavbar />
        <main>
          <section className="section workshop-detail-section">
            <div className="container workshop-detail-container">
              <Link to="/coaching" className="workshop-detail-back">
                ← Back to Coaching
              </Link>
              <h1 className="workshop-detail-title">Coaching not found</h1>
              <p className="workshop-detail-empty">
                This coaching option does not exist or may have been moved.
              </p>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return <WorkshopTopicLanding topic={offer} />;
}
