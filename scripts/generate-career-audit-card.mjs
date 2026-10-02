import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

/**
 * Career Audit card image — high-resolution wheel for crisp display.
 */
const SIZE = 4800;
const CX = SIZE / 2;
const CY = SIZE / 2;
const OUTER_R = 1470;
const LABEL_R = 1710;
const DOT_R = OUTER_R + 42;
const GRID_LEVELS = 10;
const FONT =
  "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const segments = [
  { name: 'Career Direction', fill: '#f9c5c9', stroke: '#e87a86' },
  { name: 'Income', fill: '#f8c89a', stroke: '#f08a3a' },
  { name: 'Mental Wellbeing', fill: '#f5e89a', stroke: '#e6c84a' },
  { name: 'Work-Life Balance', fill: '#b8e6b8', stroke: '#6bc96b' },
  { name: 'Relationships at Work', fill: '#9ddfd9', stroke: '#3db8ae' },
  { name: 'Professional Development', fill: '#9ec8ea', stroke: '#4a9ad4' },
  { name: 'Workplace Performance', fill: '#b8b0e0', stroke: '#7b6fc7' },
  { name: 'Work Environment', fill: '#e0b0d4', stroke: '#c96ba8' },
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
  if (midAngle > 22 && midAngle < 158) return { anchor: 'start', dx: 39 };
  if (midAngle > 202 && midAngle < 338) return { anchor: 'end', dx: -39 };
  return { anchor: 'middle', dx: 0 };
}

function labelLines(name) {
  if (name === 'Career Direction') return ['Career', 'Direction'];
  if (name === 'Mental Wellbeing') return ['Mental', 'Wellbeing'];
  if (name === 'Work-Life Balance') return ['Work-Life', 'Balance'];
  if (name === 'Relationships at Work') return ['Relationships', 'at Work'];
  if (name === 'Professional Development') return ['Professional', 'Development'];
  if (name === 'Workplace Performance') return ['Workplace', 'Performance'];
  if (name === 'Work Environment') return ['Work', 'Environment'];
  return [name];
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
  .map((_, i) => `<path d="${wedgePath(i)}" fill="url(#g${i})" stroke="#ffffff" stroke-width="18"/>`)
  .join('\n');

const rings = Array.from({ length: GRID_LEVELS }, (_, i) => {
  const level = i + 1;
  const r = (level / GRID_LEVELS) * OUTER_R;
  return `<circle cx="${CX}" cy="${CY}" r="${r.toFixed(2)}" fill="none" stroke="#ffffff" stroke-opacity="${level === GRID_LEVELS ? 0.98 : 0.62}" stroke-width="${level === GRID_LEVELS ? 13.5 : 6.75}"/>`;
}).join('\n');

const spokes = Array.from({ length: n }, (_, i) => {
  const [x, y] = polar(OUTER_R, i * slice);
  return `<line x1="${CX}" y1="${CY}" x2="${x.toFixed(2)}" y2="${y.toFixed(2)}" stroke="#ffffff" stroke-opacity="0.96" stroke-width="13.5"/>`;
}).join('\n');

const dots = segments
  .map((seg, i) => {
    const mid = i * slice + slice / 2;
    const [x, y] = polar(DOT_R, mid);
    return `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="39" fill="${seg.stroke}"/>`;
  })
  .join('\n');

const labels = segments
  .map((seg, i) => {
    const mid = i * slice + slice / 2;
    const [x, y] = polar(LABEL_R, mid);
    const { anchor, dx } = labelAnchor(mid);
    const lines = labelLines(seg.name);
    const lineHeight = 105;
    const startDy = -((lines.length - 1) * lineHeight) / 2;
    const tspans = lines
      .map((line, li) => {
        const dy = li === 0 ? startDy : lineHeight;
        return `<tspan x="${(x + dx).toFixed(2)}" dy="${dy}">${escapeXml(line)}</tspan>`;
      })
      .join('');
    return `<text x="${(x + dx).toFixed(2)}" y="${y.toFixed(2)}" text-anchor="${anchor}" dominant-baseline="middle" font-family="${FONT}" font-size="84" font-weight="700" fill="#1a3558" style="text-rendering:geometricPrecision">${tspans}</text>`;
  })
  .join('\n');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" shape-rendering="geometricPrecision">
  <rect width="${SIZE}" height="${SIZE}" fill="#ffffff"/>
  <defs>${gradients}</defs>
  ${wedges}
  ${rings}
  ${spokes}
  ${dots}
  ${labels}
  <circle cx="${CX}" cy="${CY}" r="24" fill="#94a3b8"/>
</svg>
`;

const outPath = path.resolve('public/images/career-audit-card.png');
const png = await sharp(Buffer.from(svg))
  .png({
    compressionLevel: 1,
    quality: 100,
    effort: 10,
    palette: false,
    adaptiveFiltering: true,
  })
  .toBuffer();
await writeFile(outPath, png);
console.log(`saved ${outPath} (${png.length} bytes, ${SIZE}x${SIZE})`);
