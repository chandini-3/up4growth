import { Link } from 'react-router-dom';
import SiteNavbar from './SiteNavbar';
import SeoHead from './SeoHead';
import CalendlyInline from './CalendlyInline';
import { SITE_NAME, absoluteUrl, buildPageSeoJsonLd, truncateDescription } from './seoConfig';
import './index.css';

const BOOK_PATH = '/book';
const BOOK_DESCRIPTION = truncateDescription(
  'Schedule your free 30-minute consultation with Madhu Gade. Choose a time that works for you and explore whether coaching is the right fit.',
);

export default function BookConsultation() {
  return (
    <div className="layout book-consultation-page">
      <SeoHead
        title={`Schedule Your Free Consultation | ${SITE_NAME}`}
        description={BOOK_DESCRIPTION}
        canonical={absoluteUrl(BOOK_PATH)}
        image={absoluteUrl('/images/hero.png')}
        type="website"
        jsonLd={buildPageSeoJsonLd({
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Schedule Free Consultation', path: BOOK_PATH },
          ],
        })}
      />
      <SiteNavbar />

      <main>
        <section className="section book-consultation-section" id="book-discovery-session">
          <div className="container book-consultation-container">
            <Link to="/" className="programs-back-home">
              ← Back to Home
            </Link>
            <h1 className="visually-hidden">Schedule Your Free Consultation</h1>

            <div className="book-consultation-calendly">
              <CalendlyInline className="book-consultation-calendly-widget" minHeight={700} />
            </div>
          </div>
        </section>
      </main>

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
    </div>
  );
}
