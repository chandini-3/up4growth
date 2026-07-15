function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function upsertMeta(html, attribute, key, content) {
  const tag = `<meta ${attribute}="${key}" content="${escapeAttr(content)}" />`;
  const pattern = new RegExp(`<meta ${attribute}="${key}" content="[^"]*"\\s*/?>`, 'i');

  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function upsertCanonical(html, href) {
  const tag = `<link rel="canonical" href="${escapeAttr(href)}" />`;
  const pattern = /<link rel="canonical" href="[^"]*"\s*\/?>/i;

  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function upsertJsonLd(html, data) {
  const jsonLd = JSON.stringify(data, null, 2).replace(/^/gm, '    ');
  const block = `<script type="application/ld+json">\n${jsonLd}\n    </script>`;
  const pattern = /<script type="application\/ld\+json">[\s\S]*?<\/script>/i;

  if (pattern.test(html)) {
    return html.replace(pattern, block);
  }

  return html.replace('</head>', `    ${block}\n  </head>`);
}

function removeMeta(html, attribute, key) {
  const pattern = new RegExp(`\\s*<meta ${attribute}="${key}" content="[^"]*"\\s*/?>`, 'i');
  return html.replace(pattern, '');
}

export function injectSeo(html, seo) {
  let result = html.replace(/<title>.*?<\/title>/s, `<title>${escapeAttr(seo.title)}</title>`);

  result = upsertMeta(result, 'name', 'description', seo.description);
  result = upsertMeta(result, 'property', 'og:title', seo.title);
  result = upsertMeta(result, 'property', 'og:description', seo.description);
  result = upsertMeta(result, 'property', 'og:type', seo.type || 'website');
  result = upsertMeta(result, 'property', 'og:url', seo.canonical);
  result = upsertMeta(result, 'property', 'og:image', seo.image);
  result = upsertMeta(result, 'property', 'og:locale', 'en_CH');
  result = upsertMeta(result, 'name', 'twitter:card', 'summary_large_image');
  result = upsertMeta(result, 'name', 'twitter:title', seo.title);
  result = upsertMeta(result, 'name', 'twitter:description', seo.description);
  result = upsertMeta(result, 'name', 'twitter:image', seo.image);
  result = upsertCanonical(result, seo.canonical);

  if (seo.publishedTime) {
    result = upsertMeta(result, 'property', 'article:published_time', seo.publishedTime);
  } else {
    result = removeMeta(result, 'property', 'article:published_time');
  }

  if (seo.author) {
    result = upsertMeta(result, 'property', 'article:author', seo.author);
  } else {
    result = removeMeta(result, 'property', 'article:author');
  }

  if (seo.jsonLd) {
    result = upsertJsonLd(result, seo.jsonLd);
  }

  return result;
}
