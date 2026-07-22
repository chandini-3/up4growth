import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  Globe,
  Mail,
  Monitor,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import SiteNavbar from './SiteNavbar';
import SeoHead from './SeoHead';
import { SITE_NAME, absoluteUrl } from './seoConfig';
import './index.css';

const BOOK_CALL_URL = 'https://calendly.com/gade';
const CONTACT_EMAIL = 'contact@up4growth.ch';
const PROGRAM_PATH = '/programs/deep-work';
const PROGRAM_HERO_IMAGE = '/images/hero.png';

const emailSubject = 'Deep Work Sprints Program Inquiry';
const emailBody = `Hello Up4Growth Team,

I am interested in the Deep Work Sprints program and would like to learn more.

Best regards,
[Your Name]`;
const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

const whatsInItItems = [
  '60 min deep work sprint per day, for 6 weeks',
  'Intense focus created by group accountability',
  'Accelerate your career by immersing yourself in deep, focused work every day',
];

const highlightItems = [
  '60-minute deep work session daily for 6 weeks',
  'Facilitated by a professional facilitator to create optimal focus conditions',
  'Group accountability through goal sharing and progress check-ins',
  'Practical structure for maintaining flow and eliminating distractions',
];

const outcomeItems = [
  'Develop the habit of sustained deep work and focused attention',
  'Experience measurable progress on high-value projects and goals',
  'Build self-discipline, consistency, and accountability in daily work',
  'Learn how to replicate “flow state” independently after the program',
];

const audienceItems = [
  'Professionals seeking deeper focus and fewer distractions',
  'Individuals working on high-value projects and goals',
  'Teams who want shared accountability for deep work',
  'Anyone ready to build sustainable focus habits',
];

const footerNav = [
  { label: "What's in it", href: '#whats-in-it' },
  { label: 'Program Highlights', href: '#program-highlights' },
  { label: 'Expected Outcomes', href: '#expected-outcomes' },
  { label: 'Who Is This For?', href: '#who-is-this-for' },
  { label: 'Delivery Options', href: '#delivery-options' },
  { label: 'Book a Call', href: BOOK_CALL_URL, external: true },
  { label: 'Contact', href: mailtoLink, external: true },
];

function ProgramCtaButtons({ className = '' }) {
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

function ProgramLandingFooter() {
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

          <nav className="workshop-landing-footer-nav" aria-label="Program page">
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

export default function DeepWorkProgram() {
  return (
    <div className="layout workshop-landing-page">
      <SeoHead
        title={`Deep Work Sprints Program | ${SITE_NAME}`}
        description="Build discipline, focus, and consistency with the Deep Work Sprints Program — 60-minute daily focus sessions for 6 weeks with group accountability."
        canonical={absoluteUrl(PROGRAM_PATH)}
        image={absoluteUrl('/images/hero.png')}
        type="website"
      />
      <SiteNavbar />

      <main>
        <header className="workshop-landing-hero" id="top">
          <div className="container workshop-landing-hero-grid">
            <div className="workshop-landing-hero-visual">
              <img
                src={PROGRAM_HERO_IMAGE}
                alt="Professionals building focus and deep work habits"
                className="workshop-landing-hero-image"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="workshop-landing-hero-content">
              <Link to="/programs" className="workshop-detail-back">
                ← Back to Programs
              </Link>

              <span className="workshop-program-card-badge workshop-landing-hero-badge">
                Program 02/02 · Productivity
              </span>

              <h1 className="workshop-landing-hero-title">Deep Work Sprints</h1>
              <p className="workshop-landing-hero-subtitle">
                Accelerate your career by immersing yourself in deep, focused work every day.
              </p>

              <div className="workshop-landing-meta">
                <span className="workshop-landing-meta-item">
                  <Calendar size={18} aria-hidden="true" />
                  Duration: 60 min per day, for 6 weeks
                </span>
                <span className="workshop-landing-meta-item">
                  <Globe size={18} aria-hidden="true" />
                  Format: Online
                </span>
              </div>

              <div className="workshop-landing-intro">
                <p>
                  Help professionals build the discipline, focus, and consistency required for high-impact
                  work in a world full of distractions. Through structured daily sprints and group
                  accountability, participants experience the transformative power of deep, uninterrupted
                  focus — leading to higher productivity, creativity, and career momentum.
                </p>
              </div>

              <ProgramCtaButtons />
            </div>
          </div>
        </header>

        <section className="section workshop-landing-section" id="whats-in-it">
          <div className="container">
            <div className="workshop-landing-section-head">
              <span className="section-tag">Program overview</span>
              <h2 className="section-title workshop-landing-section-title">What&apos;s in it</h2>
            </div>

            <div className="workshop-landing-purpose-grid">
              {whatsInItItems.map((item) => (
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

        <section className="section workshop-landing-section workshop-landing-section--alt" id="program-highlights">
          <div className="container">
            <div className="workshop-landing-section-head">
              <span className="section-tag">Programme support</span>
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

        <section className="section workshop-landing-section" id="expected-outcomes">
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

        <section className="section workshop-landing-section" id="delivery-options">
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
                  <li>Virtual deep work sprint sessions</li>
                  <li>Group accountability check-ins</li>
                  <li>Accessible from anywhere</li>
                </ul>
              </article>

              <article className="workshop-landing-delivery-card">
                <div className="workshop-landing-delivery-icon">
                  <Zap size={28} aria-hidden="true" />
                </div>
                <h3>Daily Structure</h3>
                <ul>
                  <li>60-minute focused sessions</li>
                  <li>Facilitated focus conditions</li>
                  <li>Practical flow-state habits</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="workshop-landing-bottom-cta" id="book-a-call">
          <div className="container workshop-landing-bottom-cta-inner">
            <h2>Ready to Build Your Deep Work Habit?</h2>
            <p>
              Join structured daily sprints and experience the power of uninterrupted focus
              for higher productivity and career momentum.
            </p>
            <ProgramCtaButtons className="workshop-landing-cta-group--centered" />
          </div>
        </section>

        <section className="workshop-landing-contact-strip" id="contact">
          <div className="container workshop-landing-contact-strip-inner">
            <div>
              <h2>Have questions?</h2>
              <p>Reach out to discuss how Deep Work Sprints can support your focus and goals.</p>
            </div>
            <ProgramCtaButtons />
          </div>
        </section>
      </main>

      <ProgramLandingFooter />
    </div>
  );
}
