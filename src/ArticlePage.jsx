import React from 'react';
import { Link } from 'react-router-dom';

function getBlogCardPreview(summary) {
  if (!summary) return '';
  return summary
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join('\n');
}

function renderRichText(text) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      match[2].startsWith('/')
        ? (
          <Link key={match.index} to={match[2]}>
            {match[1]}
          </Link>
        )
        : (
          <a key={match.index} href={match[2]} target="_blank" rel="noreferrer">
            {match[1]}
          </a>
        ),
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts;
}

function renderFigure(image) {
  return (
    <figure key={image.src} className="article-figure">
      <img
        src={image.src}
        alt={image.alt || image.caption || ''}
        className="article-figure-image"
        loading="lazy"
        decoding="async"
      />
      {image.caption && (
        <figcaption className="article-figure-caption">{image.caption}</figcaption>
      )}
    </figure>
  );
}

function renderSubsection(subsection) {
  return (
    <div key={subsection.title} className="article-subsection">
      <h3>{subsection.title}</h3>
      {subsection.body && <p>{renderRichText(subsection.body)}</p>}
      {subsection.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{renderRichText(paragraph)}</p>
      ))}
      {subsection.list && (
        <ul>
          {subsection.list.map((item) => (
            <li key={item}>{renderRichText(item)}</li>
          ))}
        </ul>
      )}
      {subsection.image && renderFigure(subsection.image)}
      {subsection.paragraphsAfterList?.map((paragraph) => (
        <p key={paragraph}>{renderRichText(paragraph)}</p>
      ))}
    </div>
  );
}

function renderList(items, ordered = false) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag>
      {items.map((item) => (
        <li key={item}>{renderRichText(item)}</li>
      ))}
    </Tag>
  );
}

function renderSection(section, index) {
  const quoteAtStart = section.quotePosition === 'start';
  const quoteAfterIntro = section.quotePosition === 'afterIntro';
  const quoteAtEnd = !quoteAtStart && !quoteAfterIntro;

  return (
    <section key={section.title || index} className="article-section">
      {section.title && <h2>{section.title}</h2>}
      {section.heading3 && <h3>{section.heading3}</h3>}

      {quoteAtStart && section.quote && (
        <blockquote className="article-quote">{section.quote}</blockquote>
      )}

      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{renderRichText(paragraph)}</p>
      ))}

      {quoteAfterIntro && section.quote && (
        <blockquote className="article-quote">{section.quote}</blockquote>
      )}

      {section.paragraphsAfterQuote?.map((paragraph) => (
        <p key={paragraph}>{renderRichText(paragraph)}</p>
      ))}

      {!section.imageAfterList && section.image && renderFigure(section.image)}

      {section.paragraphsAfterImage?.map((paragraph) => (
        <p key={paragraph}>{renderRichText(paragraph)}</p>
      ))}

      {section.list && renderList(section.list, section.orderedList)}

      {section.paragraphsAfterList?.map((paragraph) => (
        <p key={paragraph}>{renderRichText(paragraph)}</p>
      ))}

      {section.imageAfterList && section.image && renderFigure(section.image)}

      {section.callout && (
        <div className="article-callout">
          {section.callout.map((line) => (
            <p key={line}>{renderRichText(line)}</p>
          ))}
        </div>
      )}

      {section.subsections?.map(renderSubsection)}

      {section.paragraphsAfterSubsections?.map((paragraph) => (
        <p key={paragraph}>{renderRichText(paragraph)}</p>
      ))}

      {quoteAtEnd && section.quote && (
        <blockquote className="article-quote">{section.quote}</blockquote>
      )}

      {section.images?.map((image) => renderFigure(image))}

      {section.examples?.map((example) => (
        <div key={example.title} className="article-subsection">
          <h3>{example.title}</h3>
          <p>{example.body}</p>
        </div>
      ))}
    </section>
  );
}

export default function ArticlePage({ content }) {
  return (
    <main>
      <section className="section blog-section article-page">
        <div className="container article-container">
          <Link to="/blog" className="article-back-link">← Back to Blog</Link>
          <span className="section-tag">{content.category}</span>
          <h1 className="article-title">{content.title}</h1>
          <div className="article-meta">
            <div className="article-author">{content.author}</div>
            <div className="article-role">{content.role}</div>
            {content.date && (
              <div className="article-role" style={{ marginTop: '0.5rem' }}>{content.date}</div>
            )}
          </div>

          {content.summary && (
            <div className="article-callout">
              <p><strong>Summary</strong></p>
              <p className="article-summary-text">{getBlogCardPreview(content.summary)}</p>
            </div>
          )}

          {content.intro && !content.summary && (
            <div className={`article-intro${content.summary ? '' : ''}`} style={content.summary ? { marginTop: '2rem' } : undefined}>
              {content.intro.map((paragraph) => (
                <p key={paragraph}>{renderRichText(paragraph)}</p>
              ))}
            </div>
          )}

          <article className="article-body" style={{ marginTop: content.summary || content.intro ? '2rem' : undefined }}>
            {content.sections.map(renderSection)}
          </article>
        </div>
      </section>
    </main>
  );
}
