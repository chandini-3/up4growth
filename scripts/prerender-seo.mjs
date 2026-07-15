import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { blogArticles } from '../src/blogIndex.js';
import { articleContents } from '../src/blogArticles.js';
import {
  SITE_NAME,
  absoluteUrl,
  buildBlogIndexJsonLd,
  buildBlogPostingJsonLd,
  getArticleDescription,
} from '../src/seoConfig.js';
import { injectSeo } from './seo-html.mjs';

const rootDir = dirname(fileURLToPath(import.meta.url));
const distDir = join(rootDir, '../dist');
const templatePath = join(distDir, 'index.html');

function writeRouteHtml(routePath, html) {
  const outputPath = routePath === '/'
    ? templatePath
    : join(distDir, routePath, 'index.html');

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, html, 'utf8');
  return outputPath;
}

const template = readFileSync(templatePath, 'utf8');

const blogIndexSeo = {
  title: `Blog | ${SITE_NAME}`,
  description:
    'Explore practical strategies, thought-provoking insights, and inspiring stories on career development, leadership, productivity, and wellbeing.',
  canonical: absoluteUrl('/blog'),
  image: absoluteUrl('/images/hero.png'),
  type: 'website',
  jsonLd: buildBlogIndexJsonLd(blogArticles),
};

writeRouteHtml('/blog', injectSeo(template, blogIndexSeo));

let articleCount = 0;

for (const article of blogArticles) {
  const content = articleContents[article.id];
  if (!content) continue;

  const description = getArticleDescription(content);
  const canonical = absoluteUrl(article.href);

  const articleSeo = {
    title: `${content.title} | ${SITE_NAME}`,
    description,
    canonical,
    image: absoluteUrl(article.image),
    type: 'article',
    publishedTime: article.dateISO,
    author: content.author,
    jsonLd: buildBlogPostingJsonLd({
      title: content.title,
      description,
      author: content.author,
      datePublished: article.dateISO,
      image: article.image,
      url: canonical,
    }),
  };

  writeRouteHtml(article.href, injectSeo(template, articleSeo));
  articleCount += 1;
}

console.log(`Prerendered SEO HTML for /blog and ${articleCount} article routes.`);
