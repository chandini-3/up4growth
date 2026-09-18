import { useEffect, useRef, useState } from 'react';
import SiteNavbar from './SiteNavbar';
import SeoHead from './SeoHead';
import CalendlyInline from './CalendlyInline';
import { SITE_NAME, absoluteUrl, buildPageSeoJsonLd, truncateDescription } from './seoConfig';
import './index.css';

const BOOK_PATH = '/book';
const BOOK_DESCRIPTION = truncateDescription(
  'Schedule your free 30-minute consultation with Madhu Gade. Choose a time that works for you and explore whether coaching is the right fit.',
);

/** Embed size large enough that Calendly does not need an inner scrollbar. */
const EMBED_HEIGHT = 750;
const EMBED_WIDTH = 1000;
const NAV_OFFSET = 72;
const PAGE_PAD = 16;

export default function BookConsultation() {
  const frameRef = useRef(null);
  const [scale, setScale] = useState(() => {
    if (typeof window === 'undefined') return 0.85;
    const availH = Math.max(320, window.innerHeight - NAV_OFFSET - PAGE_PAD);
    const availW = Math.max(320, window.innerWidth - 48);
    return Number(Math.min(1, availH / EMBED_HEIGHT, availW / EMBED_WIDTH).toFixed(3));
  });

  useEffect(() => {
    document.documentElement.classList.add('book-page-lock');
    return () => document.documentElement.classList.remove('book-page-lock');
  }, []);

  useEffect(() => {
    const updateScale = () => {
      const availH = Math.max(320, window.innerHeight - NAV_OFFSET - PAGE_PAD);
      const availW = Math.max(320, (frameRef.current?.clientWidth || window.innerWidth) - 8);
      const next = Math.min(1, availH / EMBED_HEIGHT, availW / EMBED_WIDTH);
      setScale(Number(next.toFixed(3)));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const safeScale = Math.max(scale, 0.5);
  const visualHeight = Math.round(EMBED_HEIGHT * safeScale);

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

      <main className="book-consultation-main">
        <section className="section book-consultation-section" id="book-discovery-session">
          <h1 className="visually-hidden">Schedule Your Free Consultation</h1>
          <div className="container book-consultation-container" ref={frameRef}>
            <div
              className="book-consultation-calendly"
              style={{ height: `${visualHeight}px` }}
            >
              <div
                className="book-consultation-calendly-scale"
                style={{
                  width: `${100 / safeScale}%`,
                  height: `${EMBED_HEIGHT}px`,
                  transform: `scale(${safeScale})`,
                }}
              >
                <CalendlyInline
                  className="book-consultation-calendly-widget"
                  minHeight={EMBED_HEIGHT}
                  minWidth={EMBED_WIDTH}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
