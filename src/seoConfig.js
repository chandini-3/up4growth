export const SITE_URL = 'https://up4growth.ch';
export const SITE_NAME = 'Up4Growth';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero.png`;
export const LOGO_URL = `${SITE_URL}/images/logo-clean.png`;

export const defaultSeo = {
  title: 'Up4Growth | Unlock Your Full Potential',
  description:
    'Up4Growth helps individuals and organizations unlock potential through coaching, leadership training, productivity programs, and strategic career development across Switzerland and beyond.',
  canonical: `${SITE_URL}/`,
  image: DEFAULT_OG_IMAGE,
  type: 'website',
};

export function absoluteUrl(path) {
  if (!path) return SITE_URL;
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function truncateDescription(text, maxLength = 160) {
  if (!text) return '';
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 3).trimEnd()}...`;
}

export function getArticleDescription(content) {
  const source = content.summary || content.intro?.[0] || content.title;
  return truncateDescription(source);
}

export function buildBlogPostingJsonLd({ title, description, author, datePublished, image, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished,
    image: absoluteUrl(image),
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
  };
}

export function buildBlogIndexJsonLd(articles) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog`,
    description:
      'Practical strategies, thought-provoking insights, and inspiring stories on career development, leadership, productivity, and wellbeing.',
    url: `${SITE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    blogPost: articles.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      url: absoluteUrl(article.href),
      datePublished: article.dateISO,
      image: absoluteUrl(article.image),
    })),
  };
}
