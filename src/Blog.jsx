import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowRight, Heart, Briefcase, Check, Trophy, Zap } from 'lucide-react';
import SiteNavbar from './SiteNavbar';
import ArticlePage from './ArticlePage';
import SeoHead from './SeoHead';
import { articleContents } from './blogArticles';
import {
  blogArticles as articles,
  getBlogArticleById,
  resolveArticleSlug,
} from './blogIndex';
import {
  SITE_NAME,
  absoluteUrl,
  buildBlogIndexJsonLd,
  buildBlogPostingJsonLd,
  getArticleDescription,
} from './seoConfig';
import './index.css';

const categoryMeta = [
  {
    key: 'all',
    label: 'All Articles',
    shortLabel: 'All',
    icon: Check,
    description: 'Explore practical strategies, thought-provoking insights, and inspiring stories to help you unlock your full potential.',
  },
  {
    key: 'career',
    label: 'Career Development',
    shortLabel: 'Career',
    icon: Briefcase,
    description: 'Guidance on career planning, goal setting, and building a future aligned with your ambitions.',
  },
  {
    key: 'leadership',
    label: 'Leadership',
    shortLabel: 'Leadership',
    icon: Trophy,
    description: 'Insights on communication, feedback, bias awareness, and leading with intention.',
  },
  {
    key: 'productivity',
    label: 'Productivity',
    shortLabel: 'Productivity',
    icon: Zap,
    description: 'Frameworks and habits for focus, structure, and sustainable high performance.',
  },
  {
    key: 'wellbeing',
    label: 'Wellbeing',
    shortLabel: 'Wellbeing',
    icon: Heart,
    description: 'Perspectives on confidence, fear, self-appreciation, and mental clarity.',
  },
];

function getArticlesForCategory(categoryKey) {
  const filtered = categoryKey === 'all'
    ? articles
    : articles.filter((article) => article.categories.includes(categoryKey));
  return filtered.sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO));
}

function getCategoryMeta(categoryKey) {
  return categoryMeta.find((cat) => cat.key === categoryKey) ?? categoryMeta[0];
}

function getCategoryLabel(categoryKey) {
  return getCategoryMeta(categoryKey).label;
}

function getCategoryCount(categoryKey) {
  return getArticlesForCategory(categoryKey).length;
}

function ArticleLink({ article, className, children, ...props }) {
  if (article.external) {
    return (
      <a href={article.href} target="_blank" rel="noreferrer" className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to={article.href} className={className} {...props}>
      {children}
    </Link>
  );
}

function getBlogCardPreview(summary) {
  if (!summary) return '';
  return summary
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join('\n');
}

function BlogCard({ article }) {
  const imageCategory = article.categories[0];
  const summary = getBlogCardPreview(articleContents[article.id]?.summary);

  return (
    <article className="blog-card">
      <ArticleLink
        className="blog-card-image-link"
        article={article}
        aria-label={`Read article: ${article.title}`}
      >
        <div className="blog-card-image-wrap">
          {article.image ? (
            <img
              src={article.image}
              alt={article.imageAlt || article.title}
              className="blog-card-image"
              style={article.imagePosition ? { objectPosition: article.imagePosition } : undefined}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className={`blog-card-image blog-card-image--${imageCategory}`} aria-hidden="true" />
          )}
        </div>
      </ArticleLink>

      <div className="blog-card-body">
        <div className="blog-card-chips">
          {article.categories.map((categoryKey) => (
            <span key={categoryKey} className="blog-card-chip">
              {getCategoryLabel(categoryKey)}
            </span>
          ))}
        </div>

        <h3 className="blog-card-title">
          <ArticleLink article={article}>{article.title}</ArticleLink>
        </h3>

        <p className="blog-card-meta">
          <time dateTime={article.dateISO}>{article.date}</time>
          <span className="blog-card-meta-divider" aria-hidden="true">·</span>
          <span>{article.readTime} min read</span>
        </p>

        {summary && <p className="blog-card-summary">{summary}</p>}

        <ArticleLink className="blog-card-read-more" article={article}>
          Read more
          <ArrowRight size={16} aria-hidden="true" />
        </ArticleLink>
      </div>
    </article>
  );
}

function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-bottom-bar">
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

export default function Blog() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const resolvedSlug = slug ? resolveArticleSlug(slug) : null;
  const articleContent = resolvedSlug ? articleContents[resolvedSlug] : null;
  const articleListing = resolvedSlug ? getBlogArticleById(resolvedSlug) : null;
  const initialCategory = categoryMeta.some((cat) => cat.key === categoryFromUrl)
    ? categoryFromUrl
    : 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const visibleArticles = getArticlesForCategory(activeCategory);
  const activeMeta = getCategoryMeta(activeCategory);

  useEffect(() => {
    if (categoryFromUrl && categoryMeta.some((cat) => cat.key === categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const blogIndexSeo = useMemo(() => ({
    title: `Blog | ${SITE_NAME}`,
    description:
      'Explore practical strategies, thought-provoking insights, and inspiring stories on career development, leadership, productivity, and wellbeing.',
    canonical: absoluteUrl('/blog'),
    image: absoluteUrl('/images/hero.png'),
    type: 'website',
    jsonLd: buildBlogIndexJsonLd(articles),
  }), []);

  const articleSeo = useMemo(() => {
    if (!articleContent || !articleListing) return null;

    const description = getArticleDescription(articleContent);
    const canonical = absoluteUrl(articleListing.href);

    return {
      title: `${articleContent.title} | ${SITE_NAME}`,
      description,
      canonical,
      image: absoluteUrl(articleListing.image),
      type: 'article',
      publishedTime: articleListing.dateISO,
      author: articleContent.author,
      jsonLd: buildBlogPostingJsonLd({
        title: articleContent.title,
        description,
        author: articleContent.author,
        datePublished: articleListing.dateISO,
        image: articleListing.image,
        url: canonical,
      }),
    };
  }, [articleContent, articleListing]);

  if (articleContent) {
    return (
      <div className="layout">
        {articleSeo && <SeoHead {...articleSeo} />}
        <SiteNavbar />
        <ArticlePage content={articleContent} />
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="layout">
      <SeoHead {...blogIndexSeo} />
      <SiteNavbar />

      <main>
        <section className="blog-hero">
          <div className="container">
            <div className="blog-hero-inner">
              <span className="section-tag blog-hero-tag">Insights</span>
              <h1 className="blog-hero-title">
                {activeCategory === 'all' ? 'Blog' : activeMeta.label}
              </h1>
              <p className="blog-hero-description">{activeMeta.description}</p>
              <p className="blog-hero-count">
                {visibleArticles.length} {visibleArticles.length === 1 ? 'article' : 'articles'}
              </p>
            </div>
          </div>
        </section>

        <section className="blog-category-bar">
          <div className="container">
            <nav className="blog-category-nav" aria-label="Browse by category">
              {categoryMeta.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.key;
                const count = getCategoryCount(cat.key);

                return (
                  <button
                    key={cat.key}
                    type="button"
                    className={`blog-category-tab${isActive ? ' active' : ''}`}
                    onClick={() => setActiveCategory(cat.key)}
                    aria-pressed={isActive}
                  >
                    <Icon size={17} aria-hidden="true" />
                    <span>{cat.label}</span>
                    <span className="blog-category-tab-count">{count}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </section>

        <section className="blog-index">
          <div className="container">
            <div className="blog-cards-grid" role="feed" aria-label={`${activeMeta.label} articles`}>
              {visibleArticles.length > 0 ? (
                visibleArticles.map((article) => (
                  <BlogCard key={`${article.id}-${activeCategory}`} article={article} />
                ))
              ) : (
                <p className="blog-list-empty">Articles coming soon in this category.</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
