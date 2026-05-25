import { projects, getProject, getProjectPath } from './projects.js';
import { getCaseStudyContent } from './content/load-case-study.js';
import { escapeHtml } from './lib/escape-html.js';
import {
  renderInlineContent,
  renderLabel,
  renderSectionContent,
  renderSubsectionContent,
} from './lib/render-rich-content.js';

const IPHONE_FRAME = '/case-studies/iphone-frame.png';

export function renderCaseStudy(appEl, slug) {
  const project = slug ? getProject(slug) : null;

  if (project) {
    const content = getCaseStudyContent(slug);
    appEl.className = 'page-main page-main--case-study case-study-main';
    document.body.className = 'page-case-study';

    if (content) {
      appEl.innerHTML = renderCaseStudyTemplate(content, slug);
    } else {
      appEl.innerHTML = renderComingSoon(project, slug);
    }

    return {
      title: `${project.title} — Lina Forero`,
      description: project.summary,
    };
  }

  appEl.className = 'page-main case-study-main';
  document.body.className = '';

  appEl.innerHTML = `
    <p class="back-link">
      <a href="/">← Back to work</a>
    </p>
    <article>
      <h1 class="page-title">Case study not found</h1>
      <div class="case-study-body">
        <p class="case-study-not-found">This project does not exist yet. <a href="/">Back to work</a></p>
      </div>
    </article>
  `;
  return {
    title: 'Case study not found — Lina Forero',
    description: 'Case study — Lina Forero',
  };
}

function renderCaseStudyTemplate(content, slug) {
  return `
    <article class="case-study">
      ${renderHero(content)}
      <div class="case-study__sections">
        ${content.sections.map(renderSection).join('')}
      </div>
      ${renderCaseStudyFooter(slug)}
    </article>
  `;
}

function renderComingSoon(project, slug) {
  return `
    <article class="case-study case-study--coming-soon">
      <header class="case-study-coming-soon">
        <p class="case-study-year">${escapeHtml(project.year)}</p>
        <h1 class="page-title">${escapeHtml(project.title)}</h1>
        <p class="case-study-summary">${escapeHtml(project.summary)}</p>
        <p class="case-study-body">Case study content coming soon.</p>
      </header>
      ${renderCaseStudyFooter(slug)}
    </article>
  `;
}

function renderHero(content) {
  const phones = content.heroPhones ?? [];
  const hasPhones = phones.length > 0;
  const heroImage = content.heroImage ?? null;
  const hasHeroImage = Boolean(heroImage?.src);
  const hasSplit = hasPhones || hasHeroImage;
  const { leadMetadata, pairedMetadata } = splitMetadata(
    content.metadata,
    hasHeroImage ? heroImage.alignWithLabel : null
  );
  const hasAlignedSplit = hasHeroImage && pairedMetadata.length > 0 && leadMetadata.length > 0;

  const titleBlock = content.title
    ? `
      <header class="case-study-hero__intro">
        <h1 class="case-study-hero__title">${escapeHtml(content.title)}</h1>
        ${
          content.subtitle
            ? `<p class="case-study-hero__subtitle">${escapeHtml(content.subtitle)}</p>`
            : ''
        }
      </header>
    `
    : '';

  const heroClassNames = [
    'case-study-hero',
    hasSplit ? 'case-study-hero--split' : '',
    hasAlignedSplit ? 'case-study-hero--split-aligned' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return `
    <section class="${heroClassNames}" aria-label="Overview">
      ${titleBlock}
      ${
        hasAlignedSplit
          ? `
        <div class="case-study-hero__meta-lead">
          ${renderMetadata(leadMetadata)}
        </div>
        <div class="case-study-hero__meta case-study-hero__meta--paired">
          ${renderMetadata(pairedMetadata)}
        </div>
      `
          : `
        <div class="case-study-hero__meta">
          ${renderMetadata(content.metadata)}
        </div>
      `
      }
      ${
        hasHeroImage
          ? renderHeroImage(heroImage)
          : hasPhones
            ? `
        <div class="case-study-hero__phones">
          ${phones.map((phone, index) => renderPhoneMockup(phone, index === 0 ? 'case-study-phone--back' : 'case-study-phone--front')).join('')}
        </div>
      `
            : ''
      }
    </section>
  `;
}

function splitMetadata(metadata, alignLabel) {
  if (!metadata?.length || !alignLabel) {
    return { leadMetadata: [], pairedMetadata: metadata ?? [] };
  }

  const splitIndex = metadata.findIndex((item) => item.label === alignLabel);
  if (splitIndex <= 0) {
    return { leadMetadata: [], pairedMetadata: metadata };
  }

  return {
    leadMetadata: metadata.slice(0, splitIndex),
    pairedMetadata: metadata.slice(splitIndex),
  };
}

function renderHeroImage(heroImage) {
  return `
    <figure class="case-study-hero__visual" aria-hidden="true">
      <img
        class="case-study-hero__image"
        src="${escapeHtml(heroImage.src)}"
        alt="${escapeHtml(heroImage.alt ?? '')}"
        loading="lazy"
      />
    </figure>
  `;
}

function renderMetadata(metadata) {
  if (!metadata?.length) return '';

  return `
    <dl class="case-study-meta">
      ${metadata
        .map(
          (item) => `
        <div class="case-study-meta__item">
          <dt class="case-study-meta__label">${escapeHtml(item.label)}</dt>
          <dd class="case-study-meta__value">${renderMetadataValue(item)}</dd>
        </div>
      `
        )
        .join('')}
    </dl>
  `;
}

function renderMetadataValue(item) {
  if (item.content) {
    return renderInlineContent(item.content);
  }

  return escapeHtml(item.value ?? '');
}

function renderPhoneMockup(phone, extraClass = '') {
  return `
    <figure class="case-study-phone ${extraClass}">
      <div class="case-study-phone__screen">
        <img
          class="case-study-phone__screen-img"
          src="${escapeHtml(phone.screen)}"
          alt="${escapeHtml(phone.alt)}"
          loading="lazy"
        />
      </div>
      <img
        class="case-study-phone__frame"
        src="${IPHONE_FRAME}"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
    </figure>
  `;
}

function renderSection(section) {
  const hasGallery = section.gallery?.length > 0;

  return `
    <section class="case-study-block">
      <div class="case-study-block__inner">
        <h2 class="case-study-block__title">${escapeHtml(section.title)}</h2>
        <div class="case-study-block__content">
          ${renderSectionContent(section)}
          ${section.subsections?.map(renderSubsection).join('') ?? ''}
        </div>
      </div>
      ${hasGallery ? renderGallery(section.gallery) : ''}
    </section>
  `;
}

function renderSubsection(subsection) {
  const videoHtml = subsection.video ? renderSubsectionVideo(subsection.video) : '';
  const imageHtml = subsection.image ? renderSubsectionImage(subsection.image) : '';

  return `
    ${videoHtml}
    <div class="case-study-subsection">
      <h3 class="case-study-subsection__label">${renderLabel(subsection.label)}</h3>
      ${renderSubsectionContent(subsection)}
    </div>
    ${imageHtml}
  `;
}

function renderSubsectionVideo(video) {
  return `
    <div class="case-study-video">
      <video
        class="case-study-video__player"
        src="${escapeHtml(video.src)}"
        controls
        playsinline
        preload="metadata"
      ></video>
    </div>
  `;
}

function renderSubsectionImage(image) {
  return `
    <figure class="case-study-subsection-image" aria-hidden="${image.alt ? 'false' : 'true'}">
      <img
        class="case-study-subsection-image__img"
        src="${escapeHtml(image.src)}"
        alt="${escapeHtml(image.alt ?? '')}"
        loading="lazy"
      />
    </figure>
  `;
}

function renderGallery(phones) {
  return `
    <div class="case-study-gallery" aria-label="Design screens">
      <div class="case-study-gallery__track">
        ${phones.map((phone) => renderPhoneMockup(phone, 'case-study-phone--gallery')).join('')}
      </div>
    </div>
  `;
}

function renderCaseStudyFooter(slug) {
  const { prev, next } = getAdjacentProjects(slug);

  return `
    <footer class="case-study-footer">
      <nav class="case-study-nav" aria-label="Project navigation">
        ${
          prev
            ? `
          <a class="case-study-nav__link case-study-nav__link--prev" href="${escapeHtml(getProjectPath(prev))}">
            ${chevronIcon('left')}
            <span class="case-study-nav__text">
              <span class="case-study-nav__eyebrow">Prev</span>
              <span class="case-study-nav__title">${escapeHtml(prev.title)}</span>
            </span>
          </a>
        `
            : '<span class="case-study-nav__spacer"></span>'
        }
        ${
          next
            ? `
          <a class="case-study-nav__link case-study-nav__link--next" href="${escapeHtml(getProjectPath(next))}">
            <span class="case-study-nav__text">
              <span class="case-study-nav__eyebrow">Next</span>
              <span class="case-study-nav__title">${escapeHtml(next.title)}</span>
            </span>
            ${chevronIcon('right')}
          </a>
        `
            : '<span class="case-study-nav__spacer"></span>'
        }
      </nav>

      <div class="case-study-cta">
        <p class="case-study-cta__heading">
          Thanks for stopping by.<br />
          Let's chat 👋
        </p>
        <div class="case-study-contact">
          <p class="case-study-contact__label">Contact me</p>
          <div class="case-study-contact__icons">
            <a href="#" class="case-study-contact__icon" aria-label="Email">
              ${mailIcon()}
              <span class="case-study-contact__tooltip">email me</span>
            </a>
            <a href="#" class="case-study-contact__icon" aria-label="LinkedIn">
              ${linkedinIcon()}
              <span class="case-study-contact__tooltip">ping me on LinkedIn</span>
            </a>
            <a href="#" class="case-study-contact__icon" aria-label="Download CV">
              ${downloadIcon()}
              <span class="case-study-contact__tooltip">download cv</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function getAdjacentProjects(slug) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return { prev, next };
}

function chevronIcon(direction) {
  const path =
    direction === 'left'
      ? 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'
      : 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z';
  return `<svg class="case-study-nav__chevron" width="44" height="44" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${path}"/></svg>`;
}

function mailIcon() {
  return `<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>`;
}

function linkedinIcon() {
  return `<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`;
}

function downloadIcon() {
  return `<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>`;
}
