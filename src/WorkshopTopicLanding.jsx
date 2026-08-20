import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  Check,
  Globe,
  Mail,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import SiteNavbar from './SiteNavbar';
import SeoHead from './SeoHead';
import { SITE_NAME, absoluteUrl } from './seoConfig';
import { getWorkshopCategoryMeta } from './workshopTopicData';
import './index.css';

const BOOK_CALL_URL = 'https://calendly.com/gade';
const CONTACT_EMAIL = 'contact@up4growth.ch';
const DEFAULT_HERO_IMAGE = '/images/hero.png';

const defaultAudienceByCategory = {
  career: [
    'Professionals seeking career clarity',
    'Individuals planning career growth',
    'Mid-career professionals looking for direction',
    'Professionals considering a career transition',
    'Aspiring leaders',
    'Anyone who wants to take ownership of their career',
  ],
  leadership: [
    'Emerging and established leaders',
    'Managers building stronger team cultures',
    'Professionals preparing for leadership roles',
    'Founders and people managers',
    'Anyone who wants to lead with clarity and confidence',
  ],
  productivity: [
    'Professionals seeking better focus and follow-through',
    'Individuals looking to overcome procrastination',
    'Teams who want sustainable productivity habits',
    'Anyone ready to build consistent daily progress',
  ],
  wellbeing: [
    'Professionals managing stress, fear, or self-doubt',
    'Individuals seeking emotional resilience',
    'Anyone ready to turn fear into confident action',
    'Teams supporting wellbeing and growth',
  ],
};

function buildMailto(topicTitle) {
  const emailSubject = `${topicTitle} Workshop Inquiry`;
  const emailBody = `Hello Up4Growth Team,

I am interested in the ${topicTitle} workshop and would like to learn more.

Best regards,
[Your Name]`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
}

const howItWorksIcons = {
  calendar: Calendar,
  award: Award,
  'trending-up': TrendingUp,
};

function WorkshopCtaButtons({ mailtoLink, className = '' }) {
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

function WorkshopLandingFooter({ mailtoLink, howItWorksTitle }) {
  const footerNav = [
    { label: 'Purpose', href: '#purpose' },
    ...(howItWorksTitle ? [{ label: howItWorksTitle, href: '#how-it-works' }] : []),
    { label: 'Outcomes', href: '#outcomes' },
    { label: 'Who Is This For?', href: '#who-is-this-for' },
    { label: 'Book a Call', href: BOOK_CALL_URL, external: true },
    { label: 'Contact', href: mailtoLink, external: true },
  ];

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

export default function WorkshopTopicLanding({ topic }) {
  const categoryMeta = getWorkshopCategoryMeta(topic.category);
  const topicUrl = topic.canonicalPath || `/workshops/topics/${topic.id}`;
  const displayTitle = topic.shortTitle || topic.title;
  const mailtoLink = buildMailto(displayTitle);
  const heroImage = topic.heroImage || DEFAULT_HERO_IMAGE;
  const heroVideo = topic.heroVideo || null;
  const heroImageClass = topic.heroImageClass || '';
  const duration = topic.duration || '2 hours';
  const format = topic.format || 'Online or In-Person';
  const formatLabel = topic.formatLabel || 'Delivery option';
  const purposeItems = topic.purpose || [];
  const outcomeItems = topic.outcomes || [];
  const highlightItems = topic.highlights || [];
  const audienceItems = topic.audience || defaultAudienceByCategory[topic.category] || defaultAudienceByCategory.career;
  const description = topic.description || `Learn more about the ${displayTitle} workshop from Up4Growth.`;
  const ctaTitle = topic.ctaTitle || `Ready to explore ${displayTitle}?`;
  const ctaText = topic.ctaText
    || 'Book a call to discuss how this workshop can support your goals and next steps.';
  const backTo = topic.backTo || '/workshops/topics';
  const backLabel = topic.backLabel || '← Back to Corporate Workshops';
  const whyTag = topic.whyTag || 'Why this workshop';
  const badgeLabel = topic.badge || categoryMeta.badgeLabel || categoryMeta.label;
  const howItWorks = topic.howItWorks || null;

  return (
    <div className="layout workshop-landing-page">
      <SeoHead
        title={`${displayTitle} | ${topic.seoSection || 'Workshop'} | ${SITE_NAME}`}
        description={description}
        canonical={absoluteUrl(topicUrl)}
        image={absoluteUrl(heroImage.split('?')[0])}
        type="website"
      />
      <SiteNavbar />

      <main>
        <header className="workshop-landing-hero" id="top">
          <div className="container workshop-landing-hero-grid">
            <div className="workshop-landing-hero-visual">
              {heroVideo ? (
                <video
                  className="workshop-landing-hero-image workshop-landing-hero-video"
                  src={heroVideo}
                  poster={heroImage}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`${displayTitle} workshop video`}
                />
              ) : (
                <img
                  src={heroImage}
                  alt={`${displayTitle} workshop`}
                  className={`workshop-landing-hero-image ${heroImageClass}`.trim()}
                  loading="eager"
                  decoding="async"
                />
              )}
            </div>

            <div className="workshop-landing-hero-content">
              <Link to={backTo} className="workshop-detail-back">
                {backLabel}
              </Link>

              <div className="workshop-topic-meta-row">
                <span className="workshop-program-card-badge workshop-landing-hero-badge">
                  {badgeLabel}
                </span>
                {topic.workshopNumber ? (
                  <span className="workshop-topic-number">
                    Workshop {topic.workshopNumber}
                  </span>
                ) : null}
              </div>

              <h1 className="workshop-landing-hero-title">{displayTitle}</h1>
              {topic.outcomeTitle ? (
                <p
                  className={`workshop-landing-hero-subtitle${topic.outcomeTitleItalic ? ' workshop-landing-hero-subtitle--italic' : ''}`}
                >
                  {topic.outcomeTitle}
                </p>
              ) : null}

              <div className="workshop-landing-meta">
                <span className="workshop-landing-meta-item">
                  <Calendar size={18} aria-hidden="true" />
                  Duration: {duration}
                </span>
                <span className="workshop-landing-meta-item">
                  <Globe size={18} aria-hidden="true" />
                  {formatLabel}: {format}
                </span>
              </div>

              <div className="workshop-landing-intro">
                <p>{description}</p>
              </div>

              <WorkshopCtaButtons mailtoLink={mailtoLink} />
            </div>
          </div>
        </header>

        {howItWorks ? (
          <section className="section workshop-landing-section workshop-landing-section--alt" id="how-it-works">
            <div className="container">
              <div className="workshop-landing-how-it-works-head">
                <h2 className="section-title workshop-landing-section-title">{howItWorks.title}</h2>
                {howItWorks.intro ? (
                  <p className="workshop-landing-how-it-works-intro">{howItWorks.intro}</p>
                ) : null}
              </div>

              <div className="workshop-landing-how-it-works-grid">
                {howItWorks.steps.map((step) => {
                  const StepIcon = howItWorksIcons[step.icon] || Calendar;

                  return (
                    <article
                      key={step.title}
                      className={`workshop-landing-how-it-works-card workshop-landing-how-it-works-card--${step.color}`}
                    >
                      <div className="workshop-landing-how-it-works-icon">
                        <StepIcon size={28} aria-hidden="true" />
                      </div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        {purposeItems.length > 0 ? (
          <section className="section workshop-landing-section" id="purpose">
            <div className="container">
              <div className="workshop-landing-section-head">
                <span className="section-tag">{whyTag}</span>
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
        ) : null}

        {outcomeItems.length > 0 ? (
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
        ) : null}

        {highlightItems.length > 0 ? (
          <section className="section workshop-landing-section" id="whats-included">
            <div className="container">
              <div className="workshop-landing-section-head">
                <span className="section-tag">Workshop support</span>
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
        ) : null}

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
            <h2>{ctaTitle}</h2>
            <p>{ctaText}</p>
            <WorkshopCtaButtons mailtoLink={mailtoLink} className="workshop-landing-cta-group--centered" />
          </div>
        </section>
      </main>

      <WorkshopLandingFooter
        mailtoLink={mailtoLink}
        howItWorksTitle={howItWorks?.title}
      />
    </div>
  );
}
