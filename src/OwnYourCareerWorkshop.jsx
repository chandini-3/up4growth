import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  Globe,
  Mail,
  Target,
  Users,
} from 'lucide-react';
import SiteNavbar from './SiteNavbar';
import SeoHead from './SeoHead';
import { SITE_NAME, absoluteUrl } from './seoConfig';
import './index.css';

const BOOK_CALL_URL = 'https://calendly.com/gade';
const CONTACT_EMAIL = 'contact@up4growth.ch';
const WORKSHOP_PATH = '/workshops/topics/own-your-career';
const WORKSHOP_HERO_IMAGE = '/images/own-your-career-hero.png?v=4';

const emailSubject = 'Own Your Career Workshop Inquiry';
const emailBody = `Hello Up4Growth Team,

I am interested in the Own Your Career workshop and would like to learn more.

Best regards,
[Your Name]`;
const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

const purposeItems = [
  'Assess your current career and clarify goals',
  'Use the Career Model Canvas to plan next steps',
  'Create a 30-60-90 day career roadmap for action',
  'Empower yourself to design a fulfilling career aligned with your strengths, values, and aspirations',
];

const outcomeItems = [
  'Gain clarity on your career direction and aspirations',
  'Identify your strengths, values, and growth opportunities',
  'Create a personalized Career Model Canvas',
  'Develop clear short-term and long-term career plans',
  'Make confident and intentional career decisions',
  'Take consistent action with focus and accountability',
];

const highlightItems = [
  'Personalized one-to-one coaching sessions',
  'Career vision and long-term goal-setting',
  'Personalized coaching aligned with your career aspirations',
  'Career Audit across key career dimensions',
  'Personalized Career Model Canvas',
  'Clear goals with measurable milestones',
  'Accountability to sustain momentum and action',
  'Practical tools for long-term career growth',
  'Action plans with accountability and regular progress reviews',
];

const audienceItems = [
  'Professionals seeking career clarity',
  'Individuals planning career growth',
  'Mid-career professionals looking for direction',
  'Professionals considering a career transition',
  'Aspiring leaders',
  'Anyone who wants to take ownership of their career',
];

const footerNav = [
  { label: 'Purpose', href: '#purpose' },
  { label: 'Outcomes', href: '#outcomes' },
  { label: 'Who Is This For?', href: '#who-is-this-for' },
  { label: 'Book a Call', href: BOOK_CALL_URL, external: true },
  { label: 'Contact', href: mailtoLink, external: true },
];

function WorkshopCtaButtons({ className = '' }) {
  return (
    <div className={`workshop-landing-cta-group ${className}`.trim()}>
      <a
        href={BOOK_CALL_URL}
        target="_blank"
        rel="noreferrer"
        className="btn btn-primary"
      >
        Book a Call
        <ArrowRight size={18} aria-hidden="true" />
      </a>
      <a href={mailtoLink} className="btn btn-outline workshop-landing-btn-outline">
        <Mail size={18} aria-hidden="true" />
        Contact
      </a>
    </div>
  );
}

function WorkshopLandingFooter() {
  return (
    <footer className="workshop-landing-footer">
      <div className="container">
        <div className="workshop-landing-footer-grid">
          <div className="workshop-landing-footer-brand">
            <Link to="/" className="workshop-landing-footer-logo">
              <img src="/images/logo-clean.png" alt="Up4Growth" loading="lazy" decoding="async" />
            </Link>
            <p className="workshop-landing-footer-text">
              Coaching and workshops that help professionals design careers with clarity, intention, and confidence.
            </p>
          </div>

          <nav className="workshop-landing-footer-nav" aria-label="Workshop page">
            <h2 className="workshop-landing-footer-title">On this page</h2>
            <ul>
              {footerNav.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <a href={item.href}>{item.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-bottom-bar workshop-landing-footer-bottom">
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

export default function OwnYourCareerWorkshop() {
  return (
    <div className="layout workshop-landing-page">
      <SeoHead
        title={`Own Your Career | Workshop | ${SITE_NAME}`}
        description="Take charge of your professional growth with the Own Your Career workshop — clarity, coaching, and a practical roadmap aligned with your strengths and aspirations."
        canonical={absoluteUrl(WORKSHOP_PATH)}
        image={absoluteUrl('/images/own-your-career-hero.png')}
        type="website"
      />
      <SiteNavbar />

      <main>
        <header className="workshop-landing-hero" id="top">
          <div className="container workshop-landing-hero-grid">
            <div className="workshop-landing-hero-visual">
              <img
                src={WORKSHOP_HERO_IMAGE}
                alt="One-to-one career coaching conversation in a professional setting"
                className="workshop-landing-hero-image"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="workshop-landing-hero-content">
              <Link to="/workshops/topics" className="workshop-detail-back">
                ← Back to Corporate Workshops
              </Link>

              <span className="workshop-program-card-badge workshop-landing-hero-badge">Career</span>

              <h1 className="workshop-landing-hero-title">Own Your Career</h1>
              <p className="workshop-landing-hero-subtitle">
                Take Charge of Your Professional Growth
              </p>

              <div className="workshop-landing-meta">
                <span className="workshop-landing-meta-item">
                  <Calendar size={18} aria-hidden="true" />
                  Duration: 2 hours
                </span>
                <span className="workshop-landing-meta-item">
                  <Globe size={18} aria-hidden="true" />
                  Delivery option: Online or In-Person
                </span>
              </div>

              <div className="workshop-landing-intro">
                <p>
                  Help professionals take ownership of their careers by gaining clarity on where they are today,
                  defining where they want to be, and creating a practical roadmap to achieve their long-term aspirations.
                </p>
                <p>
                  Through personalized coaching, self-assessments, and structured action planning, participants build
                  the confidence and direction needed to make intentional career decisions.
                </p>
              </div>

              <WorkshopCtaButtons />
            </div>
          </div>
        </header>

        <section className="section workshop-landing-section" id="purpose">
          <div className="container">
            <div className="workshop-landing-section-head">
              <span className="section-tag">Why this programme</span>
              <h2 className="section-title workshop-landing-section-title">Purpose</h2>
            </div>

            <div className="workshop-landing-purpose-grid">
              {purposeItems.map((item) => (
                <article key={item} className="workshop-landing-point-card">
                  <div className="workshop-landing-point-icon">
                    <Target size={22} aria-hidden="true" />
                  </div>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section workshop-landing-section workshop-landing-section--alt" id="outcomes">
          <div className="container">
            <div className="workshop-landing-section-head">
              <span className="section-tag">What you will achieve</span>
              <h2 className="section-title workshop-landing-section-title">Expected Outcomes</h2>
            </div>

            <div className="workshop-landing-outcomes-grid">
              {outcomeItems.map((item) => (
                <article key={item} className="workshop-landing-outcome-card">
                  <Check size={20} aria-hidden="true" />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section workshop-landing-section" id="whats-included">
          <div className="container">
            <div className="workshop-landing-section-head">
              <span className="section-tag">Programme support</span>
              <h2 className="section-title workshop-landing-section-title">What&apos;s Included</h2>
            </div>

            <div className="workshop-landing-highlights-grid">
              {highlightItems.map((item) => (
                <article key={item} className="workshop-landing-highlight-card">
                  <Briefcase size={20} aria-hidden="true" />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section workshop-landing-section workshop-landing-section--alt" id="who-is-this-for">
          <div className="container">
            <div className="workshop-landing-section-head">
              <span className="section-tag">Audience</span>
              <h2 className="section-title workshop-landing-section-title">Who Is This For?</h2>
              <p className="workshop-landing-section-lead">Suitable for:</p>
            </div>

            <div className="workshop-landing-audience-grid">
              {audienceItems.map((item) => (
                <article key={item} className="workshop-landing-audience-card">
                  <Users size={20} aria-hidden="true" />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="workshop-landing-bottom-cta" id="book-a-call">
          <div className="container workshop-landing-bottom-cta-inner">
            <h2>Ready to Take Ownership of Your Career?</h2>
            <p>
              Let&apos;s create a personalized roadmap that aligns with your strengths, values,
              and long-term aspirations.
            </p>
            <WorkshopCtaButtons className="workshop-landing-cta-group--centered" />
          </div>
        </section>
      </main>

      <WorkshopLandingFooter />
    </div>
  );
}
