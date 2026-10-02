import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

/**
 * Exact Wheel of Life look (pastel wedges + domain labels).
 * Wheel fills most of the canvas for a larger, sharper card image.
 */
const SIZE = 3200;
const CX = SIZE / 2;
const CY = SIZE / 2;
const OUTER_R = 980; // large wheel
const LABEL_R = 1140;
const DOT_R = OUTER_R + 28;
const GRID_LEVELS = 10;
const FONT =
  "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const segments = [
  { name: 'Career', fill: '#f9c5c9', stroke: '#e87a86' },
  { name: 'Health', fill: '#f8c89a', stroke: '#f08a3a' },
  { name: 'Financial Well-Being', fill: '#f5e89a', stroke: '#e6c84a' },
  { name: 'Relationships', fill: '#b8e6b8', stroke: '#6bc96b' },
  { name: 'Fun and Recreation', fill: '#9ddfd9', stroke: '#3db8ae' },
  { name: 'Physical Environment', fill: '#9ec8ea', stroke: '#4a9ad4' },
  { name: 'Personal Growth', fill: '#b8b0e0', stroke: '#7b6fc7' },
  { name: 'Spirituality', fill: '#e0b0d4', stroke: '#c96ba8' },
];

const n = segments.length;
const slice = 360 / n;

function polar(r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
}

function wedgePath(index) {
  const start = index * slice;
  const end = (index + 1) * slice;
  const [x1, y1] = polar(OUTER_R, start);
  const [x2, y2] = polar(OUTER_R, end);
  return `M ${CX} ${CY} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${OUTER_R} ${OUTER_R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
}

function escapeXml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function labelAnchor(midAngle) {
  if (midAngle > 22 && midAngle < 158) return { anchor: 'start', dx: 26 };
  if (midAngle > 202 && midAngle < 338) return { anchor: 'end', dx: -26 };
  return { anchor: 'middle', dx: 0 };
}

const gradients = segments
  .map(
    (seg, i) => `
    <radialGradient id="g${i}" cx="50%" cy="50%" r="80%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.72"/>
      <stop offset="38%" stop-color="${seg.fill}" stop-opacity="0.96"/>
      <stop offset="100%" stop-color="${seg.fill}" stop-opacity="1"/>
    </radialGradient>`
  )
  .join('');

const wedges = segments
  .map((_, i) => `<path d="${wedgePath(i)}" fill="url(#g${i})" stroke="#ffffff" stroke-width="12"/>`)
  .join('\n');

const rings = Array.from({ length: GRID_LEVELS }, (_, i) => {
  const level = i + 1;
  const r = (level / GRID_LEVELS) * OUTER_R;
  return `<circle cx="${CX}" cy="${CY}" r="${r.toFixed(2)}" fill="none" stroke="#ffffff" stroke-opacity="${level === GRID_LEVELS ? 0.98 : 0.62}" stroke-width="${level === GRID_LEVELS ? 9 : 4.5}"/>`;
}).join('\n');

const spokes = Array.from({ length: n }, (_, i) => {
  const [x, y] = polar(OUTER_R, i * slice);
  return `<line x1="${CX}" y1="${CY}" x2="${x.toFixed(2)}" y2="${y.toFixed(2)}" stroke="#ffffff" stroke-opacity="0.96" stroke-width="9"/>`;
}).join('\n');

const dots = segments
  .map((seg, i) => {
    const mid = i * slice + slice / 2;
    const [x, y] = polar(DOT_R, mid);
    return `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="26" fill="${seg.stroke}"/>`;
  })
  .join('\n');

const labels = segments
  .map((seg, i) => {
    const mid = i * slice + slice / 2;
    const [x, y] = polar(LABEL_R, mid);
    const { anchor, dx } = labelAnchor(mid);
    return `<text x="${(x + dx).toFixed(2)}" y="${y.toFixed(2)}" text-anchor="${anchor}" dominant-baseline="middle" font-family="${FONT}" font-size="64" font-weight="700" fill="#1a3558">${escapeXml(seg.name)}</text>`;
  })
  .join('\n');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" fill="#ffffff"/>
  <defs>${gradients}</defs>
  ${wedges}
  ${rings}
  ${spokes}
  ${dots}
  ${labels}
  <circle cx="${CX}" cy="${CY}" r="16" fill="#94a3b8"/>
</svg>
`;

const outPath = path.resolve('public/images/wheel-of-life-card.png');
const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 6, effort: 10 }).toBuffer();
await writeFile(outPath, png);
console.log(`saved ${outPath} (${png.length} bytes, ${SIZE}x${SIZE})`);
