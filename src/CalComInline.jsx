/**
 * Cal.com inline embed — same role as CalendlyInline on /book.
 * Uses Cal.com's embed iframe so it stays on-site (no external redirect).
 *
 * Booking link: https://cal.com/chandini-majji-tq29od/30min
 */
import { HOME_GET_IN_TOUCH_CAL_LINK, HOME_GET_IN_TOUCH_URL } from './calendlyConfig';

function buildCalEmbedSrc(calLink = HOME_GET_IN_TOUCH_CAL_LINK) {
  try {
    const parsed = new URL(`https://cal.com/${calLink.replace(/^\//, '')}`);
    parsed.searchParams.set('embed', 'true');
    parsed.searchParams.set('layout', 'month_view');
    return parsed.toString();
  } catch {
    return `${HOME_GET_IN_TOUCH_URL}?embed=true&layout=month_view`;
  }
}

export default function CalComInline({
  calLink = HOME_GET_IN_TOUCH_CAL_LINK,
  minHeight = 700,
  className = '',
  title = 'Schedule with Cal.com',
}) {
  const src = buildCalEmbedSrc(calLink);

  return (
    <div
      className={`cal-inline-widget ${className}`.trim()}
      style={{ width: '100%', minHeight: `${minHeight}px`, height: `${minHeight}px` }}
      data-cal-link={calLink}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          border: 0,
          display: 'block',
        }}
        allow="camera; microphone; fullscreen; payment"
      />
    </div>
  );
}
