import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  Globe,
  Mail,
  MapPin,
  Monitor,
  Target,
  Users,
} from 'lucide-react';
import SiteNavbar from './SiteNavbar';
import SeoHead from './SeoHead';
import { SITE_NAME, absoluteUrl } from './seoConfig';
import './index.css';

const BOOK_CALL_URL = 'https://calendly.com/gade';
const CONTACT_EMAIL = 'contact@up4growth.ch';
const COACHING_PATH = '/coaching/leadership-coaching';
const HERO_IMAGE = '/images/constructive-feedback-hero.png';

const emailSubject = 'Leadership Coaching Inquiry';
const emailBody = `Hello Up4Growth Team,

I am interested in Leadership Coaching and would like to learn more.

Best regards,
[Your Name]`;
const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

const whatsInItItems = [
  'Personalized one-to-one leadership coaching sessions',
  'Clarity on leadership presence, strengths, and blind spots',
  'Action plans with accountability and regular progress reviews',
];

const highlightItems = [
  'Strengthen leadership presence and influence',
  'Build strategic thinking for complex decisions',
  'Develop confidence in giving and receiving feedback',
  'Learn frameworks for clear, empathetic communication',
  'Practice real-world leadership scenarios',
  'Cultivate a culture that fuels growth and collaboration',
];

const purposeItems = [
  'Cultivate a feedback culture that fuels growth, collaboration, and continuous improvement',
  'Strengthen leadership presence, strategic thinking, and the ability to inspire teams',
  'Build confidence to lead with clarity, empathy, and accountability',
];

const outcomeItems = [
  'Learn frameworks for giving clear, empathetic feedback',
  'Develop confidence in receiving feedback constructively',
  'Practice real-world scenarios through role-plays',
  'Lead with clearer presence and stronger influence',
  'Make intentional decisions that inspire team growth',
];

const audienceItems = [
  'Emerging and established leaders',
  'Managers building stronger team cultures',
  'Professionals preparing for leadership roles',
  'Founders and people managers',
  'Anyone who wants to lead with clarity and confidence',
];

const footerNav = [
  { label: 'Purpose', href: '#purpose' },
  { label: 'Program Highlights', href: '#program-highlights' },
  { label: 'Expected Outcomes', href: '#expected-outcomes' },
  { label: 'Who Is This For?', href: '#who-is-this-for' },
  { label: 'Delivery Options', href: '#delivery-options' },
  { label: 'Book a Call', href: BOOK_CALL_URL, external: true },
  { label: 'Contact', href: mailtoLink, external: true },
];

function CoachingCtaButtons({ className = '' }) {
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

function CoachingLandingFooter() {
  return (
    <footer className="workshop-landing-footer">
      <div className="container">
        <div className="workshop-landing-footer-grid">
          <div className="workshop-landing-footer-brand">
            <Link to="/" className="workshop-landing-footer-logo">
              <img src="/images/logo-clean.png" alt="Up4Growth" loading="lazy" decoding="async" />
            </Link>
            <p className="workshop-landing-footer-text">
              Coaching and programs that help professionals design careers with clarity, intention, and confidence.
            </p>
          </div>

          <nav className="workshop-landing-footer-nav" aria-label="Coaching page">
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

export default function LeadershipCoaching() {
  return (
    <div className="layout workshop-landing-page">
      <SeoHead
        title={`Leadership Coaching | ${SITE_NAME}`}
        description="Strengthen leadership presence, strategic thinking, and the ability to inspire teams through focused one-on-one coaching."
        canonical={absoluteUrl(COACHING_PATH)}
        image={absoluteUrl(HERO_IMAGE)}
        type="website"
      />
      <SiteNavbar />

      <main>
        <header className="workshop-landing-hero" id="top">
          <div className="container workshop-landing-hero-grid">
            <div className="workshop-landing-hero-visual">
              <img
                src={HERO_IMAGE}
                alt="Leadership coaching conversation in a professional workshop setting"
                className="workshop-landing-hero-image"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="workshop-landing-hero-content">
              <Link to="/coaching" className="workshop-detail-back">
                ← Back to Coaching
              </Link>

              <span className="workshop-program-card-badge workshop-landing-hero-badge">
                Leadership
              </span>

              <h1 className="workshop-landing-hero-title">Leadership Coaching</h1>
              <p className="workshop-landing-hero-subtitle">
                Lead with clarity, presence, and lasting impact
              </p>

              <div className="workshop-landing-meta">
                <span className="workshop-landing-meta-item">
                  <Calendar size={18} aria-hidden="true" />
                  Duration: Personalized coaching journey
                </span>
                <span className="workshop-landing-meta-item">
                  <Globe size={18} aria-hidden="true" />
                  Format: Online or In-Person
                </span>
              </div>

              <div className="workshop-landing-intro">
                <p>
                  Strengthen leadership presence, strategic thinking, and the ability to inspire teams
                  through focused one-on-one coaching. Build confidence to lead with clarity, empathy,
                  and accountability — and cultivate a culture that fuels growth, collaboration, and
                  continuous improvement.
                </p>
              </div>

              <CoachingCtaButtons />
            </div>
          </div>
        </header>

        <section className="section workshop-landing-section" id="purpose">
          <div className="container">
            <div className="workshop-landing-section-head">
              <span className="section-tag">Why this coaching</span>
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

        <section className="section workshop-landing-section workshop-landing-section--alt" id="whats-in-it">
          <div className="container">
            <div className="workshop-landing-section-head">
              <span className="section-tag">Coaching overview</span>
              <h2 className="section-title workshop-landing-section-title">What&apos;s in it</h2>
            </div>

            <div className="workshop-landing-purpose-grid">
              {whatsInItItems.map((item) => (
                <article key={item} className="workshop-landing-point-card">
                  <div className="workshop-landing-point-icon">
                    <Briefcase size={22} aria-hidden="true" />
                  </div>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section workshop-landing-section" id="program-highlights">
          <div className="container">
            <div className="workshop-landing-section-head">
              <span className="section-tag">What you will gain</span>
              <h2 className="section-title workshop-landing-section-title">Program Highlights</h2>
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

        <section className="section workshop-landing-section workshop-landing-section--alt" id="expected-outcomes">
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

        <section className="section workshop-landing-section" id="who-is-this-for">
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

        <section className="section workshop-landing-section workshop-landing-section--alt" id="delivery-options">
          <div className="container">
            <div className="workshop-landing-section-head">
              <span className="section-tag">Flexible delivery</span>
              <h2 className="section-title workshop-landing-section-title">Delivery Options</h2>
            </div>

            <div className="workshop-landing-delivery-grid">
              <article className="workshop-landing-delivery-card">
                <div className="workshop-landing-delivery-icon">
                  <Monitor size={28} aria-hidden="true" />
                </div>
                <h3>Online</h3>
                <ul>
                  <li>Virtual coaching sessions</li>
                  <li>Flexible scheduling</li>
                  <li>Accessible from anywhere</li>
                </ul>
              </article>

              <article className="workshop-landing-delivery-card">
                <div className="workshop-landing-delivery-icon">
                  <MapPin size={28} aria-hidden="true" />
                </div>
                <h3>In-Person</h3>
                <ul>
                  <li>Face-to-face coaching</li>
                  <li>Interactive discussions</li>
                  <li>Personalized experience</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="workshop-landing-bottom-cta" id="book-a-call">
          <div className="container workshop-landing-bottom-cta-inner">
            <h2>Ready to Strengthen Your Leadership?</h2>
            <p>
              Let&apos;s build the presence, clarity, and confidence you need to inspire teams
              and lead with lasting impact.
            </p>
            <CoachingCtaButtons className="workshop-landing-cta-group--centered" />
          </div>
        </section>

        <section className="workshop-landing-contact-strip" id="contact">
          <div className="container workshop-landing-contact-strip-inner">
            <div>
              <h2>Have questions?</h2>
              <p>Reach out to discuss how Leadership Coaching can support your goals.</p>
            </div>
            <CoachingCtaButtons />
          </div>
        </section>
      </main>

      <CoachingLandingFooter />
    </div>
  );
}
