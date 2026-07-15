import { useEffect } from 'react';
import { defaultSeo } from './seoConfig';

const MANAGED_JSON_LD_ID = 'page-json-ld';

function upsertMeta(attribute, key, content) {
  if (!content) return;

  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;

  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  if (!data) return;

  let element = document.getElementById(id);
  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

function removeJsonLd(id) {
  document.getElementById(id)?.remove();
}

export default function SeoHead({
  title = defaultSeo.title,
  description = defaultSeo.description,
  canonical = defaultSeo.canonical,
  image = defaultSeo.image,
  type = defaultSeo.type,
  publishedTime,
  author,
  jsonLd,
}) {
  useEffect(() => {
    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:locale', 'en_CH');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);
    upsertLink('canonical', canonical);

    if (publishedTime) {
      upsertMeta('property', 'article:published_time', publishedTime);
    } else {
      document.querySelector('meta[property="article:published_time"]')?.remove();
    }

    if (author) {
      upsertMeta('property', 'article:author', author);
    } else {
      document.querySelector('meta[property="article:author"]')?.remove();
    }

    upsertJsonLd(MANAGED_JSON_LD_ID, jsonLd);

    return () => {
      removeJsonLd(MANAGED_JSON_LD_ID);
    };
  }, [title, description, canonical, image, type, publishedTime, author, jsonLd]);

  return null;
}
