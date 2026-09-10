/**
 * Calendly embed helpers — follows Calendly's official embed steps:
 * 1. Use the event type scheduling_url
 * 2. Load widget.js + widget.css
 * 3. Initialize with initInlineWidget / initPopupWidget / initBadgeWidget
 *
 * Scheduling URL:
 * https://calendly.com/gade/schedule_your_free_consultation
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BOOK_PAGE_PATH, CALENDLY_DISCOVERY_SESSION_URL } from './calendlyConfig';

const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';
const CALENDLY_STYLE_HREF = 'https://assets.calendly.com/assets/external/widget.css';

/** Event type scheduling_url from Calendly (kept on the Up4Growth page via embeds). */
export const CALENDLY_SCHEDULING_URL = CALENDLY_DISCOVERY_SESSION_URL;

function ensureCalendlyStyles() {
  if (document.querySelector(`link[href="${CALENDLY_STYLE_HREF}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = CALENDLY_STYLE_HREF;
  document.head.appendChild(link);
}

function loadCalendlyScript() {
  if (typeof window !== 'undefined' && window.Calendly) {
    return Promise.resolve(window.Calendly);
  }

  const existing = document.querySelector(`script[src="${CALENDLY_SCRIPT_SRC}"]`);
  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.Calendly) {
        resolve(window.Calendly);
        return;
      }
      existing.addEventListener('load', () => resolve(window.Calendly), { once: true });
      existing.addEventListener('error', reject, { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve(window.Calendly);
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export function isCalendlyUrl(url = '') {
  if (typeof url !== 'string' || !url) return false;
  try {
    const parsed = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'https://example.com');
    return parsed.hostname === 'calendly.com' || parsed.hostname.endsWith('.calendly.com');
  } catch {
    return url.includes('calendly.com');
  }
}

/**
 * Pop-up embed — Calendly.initPopupWidget({ url: myLink })
 * Opens the scheduling page as an overlay on the current Up4Growth page.
 */
export async function openCalendlyPopup(url = CALENDLY_SCHEDULING_URL) {
  ensureCalendlyStyles();

  try {
    const Calendly = await loadCalendlyScript();
    if (Calendly?.initPopupWidget) {
      Calendly.initPopupWidget({ url });
      return;
    }
  } catch {
    // fall through
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Link to the dedicated Up4Growth booking page (/book),
 * where Calendly is embedded with initInlineWidget.
 */
export function CalendlyLink({
  className = '',
  children,
  onClick,
  ...props
}) {
  return (
    <Link to={BOOK_PAGE_PATH} className={className} onClick={onClick} {...props}>
      {children}
    </Link>
  );
}

/**
 * Pop-up widget (floating badge) —
 * Calendly.initBadgeWidget({ url, text, color, textColor, branding })
 */
export function CalendlyBadge({
  url = CALENDLY_SCHEDULING_URL,
  text = 'Schedule Your Free Consultation',
  color = '#ff4f00',
  textColor = '#ffffff',
  branding = true,
}) {
  useEffect(() => {
    let cancelled = false;

    ensureCalendlyStyles();
    loadCalendlyScript()
      .then((Calendly) => {
        if (cancelled || !Calendly?.initBadgeWidget) return;
        Calendly.initBadgeWidget({
          url,
          text,
          color,
          textColor,
          branding,
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      document.querySelectorAll('.calendly-badge-widget, .calendly-badge-content').forEach((el) => {
        el.remove();
      });
    };
  }, [url, text, color, textColor, branding]);

  return null;
}

/** Compact inline embed params — calendar only, no nested landing scroll. */
export function buildCalendlyEmbedUrl(url = CALENDLY_SCHEDULING_URL, { compact = false } = {}) {
  try {
    const parsed = new URL(url);
    if (compact) {
      parsed.searchParams.set('hide_event_type_details', '1');
      parsed.searchParams.set('hide_gdpr_banner', '1');
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

/**
 * Inline embed — Calendly.initInlineWidget({ url: myLink, parentElement })
 * Keeps the full scheduling page open inside the Up4Growth page.
 *
 * For the full side-by-side layout (details | calendar), parent width must be
 * ~1000px+ and height ~700px — otherwise Calendly stacks and scrolls inside.
 */
export default function CalendlyInline({
  url = CALENDLY_SCHEDULING_URL,
  minHeight = 700,
  minWidth = 320,
  compact = false,
  className = '',
}) {
  const containerRef = useRef(null);
  const embedUrl = buildCalendlyEmbedUrl(url, { compact });

  useEffect(() => {
    let cancelled = false;

    ensureCalendlyStyles();
    loadCalendlyScript()
      .then((Calendly) => {
        if (cancelled || !containerRef.current || !Calendly?.initInlineWidget) return;

        containerRef.current.innerHTML = '';
        Calendly.initInlineWidget({
          url: embedUrl,
          parentElement: containerRef.current,
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [embedUrl]);

  return (
    <div
      ref={containerRef}
      className={`calendly-inline-widget ${className}`.trim()}
      data-url={embedUrl}
      style={{ minWidth: `${minWidth}px`, height: `${minHeight}px` }}
    />
  );
}
