import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { blogArticles } from '../src/blogIndex.js';

const SITE_URL = 'https://up4growth.ch';
const rootDir = dirname(fileURLToPath(import.meta.url));
const outputPath = join(rootDir, '../public/sitemap.xml');

function formatUrl({ loc, lastmod, changefreq, priority }) {
  const lines = [
    '  <url>',
    `    <loc>${loc}</loc>`,
  ];

  if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
  if (changefreq) lines.push(`    <changefreq>${changefreq}</changefreq>`);
  if (priority) lines.push(`    <priority>${priority}</priority>`);

  lines.push('  </url>');
  return lines.join('\n');
}

const staticPages = [
  { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${SITE_URL}/blog`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${SITE_URL}/data-protection.html`, lastmod: '2026-05-09', changefreq: 'yearly', priority: '0.1' },
  { loc: `${SITE_URL}/imprint.html`, lastmod: '2026-05-09', changefreq: 'yearly', priority: '0.1' },
  { loc: `${SITE_URL}/terms-and-conditions.html`, lastmod: '2026-05-09', changefreq: 'yearly', priority: '0.1' },
];

const articlePages = blogArticles.map((article) => ({
  loc: `${SITE_URL}${article.href}`,
  lastmod: article.dateISO,
  changefreq: 'monthly',
  priority: '0.8',
}));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages, ...articlePages].map(formatUrl).join('\n')}
</urlset>
`;

writeFileSync(outputPath, sitemap, 'utf8');
console.log(`Generated sitemap with ${staticPages.length + articlePages.length} URLs.`);
