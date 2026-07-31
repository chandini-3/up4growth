import { Link, useParams } from 'react-router-dom';
import SiteNavbar from './SiteNavbar';
import SeoHead from './SeoHead';
import WorkshopTopicLanding from './WorkshopTopicLanding';
import { SITE_NAME, absoluteUrl } from './seoConfig';
import { getWorkshopTopicById } from './workshopTopicData';
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

export default function WorkshopTopicPage() {
  const { slug } = useParams();
  const topic = slug ? getWorkshopTopicById(slug) : null;

  if (!topic) {
    return (
      <div className="layout">
        <SeoHead
          title={`Workshop Topic Not Found | ${SITE_NAME}`}
          description="The requested workshop topic could not be found."
          canonical={absoluteUrl('/workshops/topics')}
        />
        <SiteNavbar />
        <main>
          <section className="section workshop-detail-section">
            <div className="container workshop-detail-container">
              <Link to="/workshops/topics" className="workshop-detail-back">
                ← Back to Topics
              </Link>
              <h1 className="workshop-detail-title">Topic not found</h1>
              <p className="workshop-detail-empty">
                This workshop topic does not exist or may have been moved.
              </p>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return <WorkshopTopicLanding topic={topic} />;
}
