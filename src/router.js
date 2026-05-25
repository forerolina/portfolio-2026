import { renderHome } from './render-home.js';
import { renderAbout } from './render-about.js';
import { renderCaseStudy } from './render-case-study.js';
import { updateSiteHeader } from './site-header.js';
import { getProject, getProjectByPath } from './projects.js';

const DEFAULT_TITLE = 'Lina Forero — Product Designer';
const DEFAULT_DESCRIPTION = 'Lina Forero — Product Designer portfolio';

const LEGACY_SLUG_REDIRECTS = {
  'conversational-booking': 'voice-assistant',
};

let appEl = null;

export function startRouter(rootEl) {
  appEl = rootEl;
  window.addEventListener('popstate', handleRoute);
  document.addEventListener('click', onDocumentClick);
  handleRoute();
}

export function navigate(path) {
  const url = new URL(path, window.location.origin);
  history.pushState(null, '', url.pathname + url.search);
  handleRoute();
}

function onDocumentClick(event) {
  const link = event.target.closest('a[href]');
  if (!link || link.target === '_blank') return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const url = new URL(link.href, window.location.origin);
  if (url.origin !== window.location.origin) return;

  event.preventDefault();
  navigate(url.pathname + url.search);
}

function resolveLegacySlug(slug) {
  if (!slug) return null;
  if (LEGACY_SLUG_REDIRECTS[slug]) return LEGACY_SLUG_REDIRECTS[slug];
  return getProject(slug) ? slug : null;
}

function handleRoute() {
  if (!appEl) return;

  const { pathname, search } = window.location;

  if (pathname === '/about.html') {
    navigate('/about');
    return;
  }

  if (pathname === '/case-study.html') {
    navigate(`/case-study${search}`);
    return;
  }

  if (pathname === '/index.html') {
    navigate('/');
    return;
  }

  if (pathname === '/about') {
    renderAbout(appEl);
    setPageMeta('About — Lina Forero', 'About Lina Forero — Product Designer');
    updateSiteHeader();
    return;
  }

  if (pathname === '/case-study') {
    const slug = resolveLegacySlug(new URLSearchParams(search).get('slug'));
    navigate(slug ? `/${slug}` : '/');
    return;
  }

  const project = getProjectByPath(pathname);
  if (project) {
    const meta = renderCaseStudy(appEl, project.slug);
    setPageMeta(meta.title, meta.description);
    updateSiteHeader();
    return;
  }

  if (pathname === '/' || pathname === '') {
    renderHome(appEl);
    setPageMeta(DEFAULT_TITLE, DEFAULT_DESCRIPTION);
    updateSiteHeader();
    return;
  }

  navigate('/');
}

function setPageMeta(title, description) {
  document.title = title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', description);
}
