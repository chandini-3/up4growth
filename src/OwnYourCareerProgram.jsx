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
const DEFAULT_PROGRAM_PATH = '/programs/custom-growth';
const PROGRAM_HERO_IMAGE = '/images/own-your-career-hero.png?v=4';

const emailSubject = 'Own Your Career Program Inquiry';
const emailBody = `Hello Up4Growth Team,

I am interested in the Own Your Career coaching program and would like to learn more.

Best regards,
[Your Name]`;
const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

const whatsInItItems = [
  'Personalized one-to-one coaching sessions',
  'Career vision and long-term goal-setting',
  'Action plans with accountability and regular progress reviews',
];

const highlightItems = [
  'Personalized coaching aligned with your career aspirations',
  'Career Audit across key career dimensions',
  'Personalized Career Model Canvas',
  'Clear goals with measurable milestones',
  'Accountability to sustain momentum and action',
  'Practical tools for long-term career growth',
];

const outcomeItems = [
  'Gain clarity on your career direction and aspirations',
  'Identify your strengths, values, and growth opportunities',
  'Create a personalized Career Model Canvas',
  'Develop clear short- and long-term career plans',
  'Make confident, intentional career decisions',
  'Take consistent action with focus and accountability',
];

const audienceItems = [
  'Individuals unsure about what they want from their career',
  'Those who want to understand their strengths, values, and aspirations more deeply',
  'Individuals ready to create a personalized career roadmap and take purposeful action',
];

const footerNav = [
  { label: "What's in it", href: '#whats-in-it' },
  { label: 'Program Highlights', href: '#program-highlights' },
  { label: 'Expected Outcomes', href: '#expected-outcomes' },
  { label: 'Who Is This For?', href: '#who-is-this-for' },
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

export default function OwnYourCareerProgram({
  path = DEFAULT_PROGRAM_PATH,
  backTo = '/programs',
  backLabel = '← Back to Programs',
} = {}) {
  return (
    <div className="layout workshop-landing-page">
      <SeoHead
        title={`Own Your Career | Career Coaching Program | ${SITE_NAME}`}
        description="Take charge of your professional growth with the Own Your Career coaching program — personalized coaching, career clarity, and a practical roadmap for long-term aspirations."
        canonical={absoluteUrl(path)}
        image={absoluteUrl('/images/own-your-career-hero.png')}
        type="website"
      />
      <SiteNavbar />

      <main>
        <header className="workshop-landing-hero" id="top">
          <div className="container workshop-landing-hero-grid">
            <div className="workshop-landing-hero-visual">
              <img
                src={PROGRAM_HERO_IMAGE}
                alt="One-to-one career coaching conversation in a professional setting"
                className="workshop-landing-hero-image"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="workshop-landing-hero-content">
              <Link to={backTo} className="workshop-detail-back">
                {backLabel}
              </Link>

              <span className="workshop-program-card-badge workshop-landing-hero-badge">
                Program 01/02 · Career
              </span>

              <h1 className="workshop-landing-hero-title">Own Your Career</h1>
              <p className="workshop-landing-hero-subtitle">
                Career Coaching Program · Take Charge of Your Professional Growth
              </p>

              <div className="workshop-landing-meta">
                <span className="workshop-landing-meta-item">
                  <Calendar size={18} aria-hidden="true" />
                  Duration: 12 Weeks
                </span>
                <span className="workshop-landing-meta-item">
                  <Globe size={18} aria-hidden="true" />
                  Delivery option: Online or In-Person
                </span>
              </div>

              <div className="workshop-landing-intro">
                <p>
                  Help professionals take ownership of their careers by gaining clarity on where they are today,
                  defining where they want to be, and creating a practical roadmap to achieve their long-term
                  aspirations. Through personalized coaching, self-assessments, and structured action planning,
                  participants build the confidence and direction needed to make intentional career decisions.
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
              <span className="section-tag">Programs for sustainable growth</span>
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

        <section className="workshop-landing-bottom-cta" id="book-a-call">
          <div className="container workshop-landing-bottom-cta-inner">
            <h2>Ready to Take Ownership of Your Career?</h2>
            <p>
              Let&apos;s create a personalized roadmap that aligns with your strengths, values,
              and long-term aspirations.
            </p>
            <ProgramCtaButtons className="workshop-landing-cta-group--centered" />
          </div>
        </section>
      </main>

      <ProgramLandingFooter />
    </div>
  );
}
