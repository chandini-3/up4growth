import { Link, useParams } from 'react-router-dom';
import SiteNavbar from './SiteNavbar';
import SeoHead from './SeoHead';
import OwnYourCareerProgram from './OwnYourCareerProgram';
import DeepWorkProgram from './DeepWorkProgram';
import { SITE_NAME, absoluteUrl, buildPageSeoJsonLd, truncateDescription } from './seoConfig';
import { getProgramById } from './programData';
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

export default function ProgramPage() {
  const { slug } = useParams();
  const program = slug ? getProgramById(slug) : null;

  if (!program) {
    return (
      <div className="layout">
        <SeoHead
          title={`Program Not Found | ${SITE_NAME}`}
          description="The requested Up4Growth program could not be found."
          canonical={absoluteUrl('/programs')}
          noIndex
        />
        <SiteNavbar />
        <main>
          <section className="section workshop-detail-section">
            <div className="container workshop-detail-container">
              <Link to="/programs" className="workshop-detail-back">
                ← Back to Programs
              </Link>
              <h1 className="workshop-detail-title">Program not found</h1>
              <p className="workshop-detail-empty">
                This program does not exist or may have been moved.
              </p>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (program.id === 'custom-growth') {
    return <OwnYourCareerProgram />;
  }

  if (program.id === 'deep-work') {
    return <DeepWorkProgram />;
  }

  const programUrl = `/programs/${program.id}`;
  const seoDescription = truncateDescription(program.excerpt);
  const heroImage = program.heroImage?.split('?')[0] || '/images/hero.png';

  return (
    <div className="layout">
      <SeoHead
        title={`${program.title} | Up4Growth Programs | ${SITE_NAME}`}
        description={seoDescription}
        canonical={absoluteUrl(programUrl)}
        image={absoluteUrl(heroImage)}
        type="website"
        jsonLd={buildPageSeoJsonLd({
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Up4Growth Programs', path: '/programs' },
            { name: program.title, path: programUrl },
          ],
          service: {
            name: program.title,
            description: seoDescription,
            url: programUrl,
            image: heroImage,
            serviceType: program.badge || 'Up4Growth Program',
          },
        })}
      />
      <SiteNavbar />

      <main>
        <section className="section workshop-detail-section">
          <div className="container workshop-detail-container">
            <Link to="/programs" className="workshop-detail-back">
              ← Back to Programs
            </Link>

            <span className="workshop-program-card-badge workshop-detail-badge">
              {program.badge}
            </span>

            <h1 className="workshop-detail-title">{program.title}</h1>
            <p className="programs-detail-excerpt">{program.excerpt}</p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
