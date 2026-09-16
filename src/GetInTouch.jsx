import { Link } from 'react-router-dom';
import SiteNavbar from './SiteNavbar';
import SeoHead from './SeoHead';
import CalComInline from './CalComInline';
import { GET_IN_TOUCH_PAGE_PATH } from './calendlyConfig';
import { SITE_NAME, absoluteUrl, buildPageSeoJsonLd, truncateDescription } from './seoConfig';
import './index.css';

const PAGE_DESCRIPTION = truncateDescription(
  'Schedule a free 30-minute meeting with Up4Growth. Pick a time that works for you — right here on our site.',
);

export default function GetInTouch() {
  return (
    <div className="layout book-consultation-page">
      <SeoHead
        title={`Get in Touch | ${SITE_NAME}`}
        description={PAGE_DESCRIPTION}
        canonical={absoluteUrl(GET_IN_TOUCH_PAGE_PATH)}
        image={absoluteUrl('/images/hero.png')}
        type="website"
        jsonLd={buildPageSeoJsonLd({
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Get in Touch', path: GET_IN_TOUCH_PAGE_PATH },
          ],
        })}
      />
      <SiteNavbar />

      <main>
        <section className="section book-consultation-section" id="get-in-touch">
          <div className="container book-consultation-container">
            <Link to="/" className="programs-back-home">
              ← Back to Home
            </Link>
            <h1 className="visually-hidden">Get in Touch</h1>

            <div className="book-consultation-calendly">
              <CalComInline className="book-consultation-calendly-widget" minHeight={700} />
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
