import { getProject } from './projects.js';
import { escapeHtml } from './lib/escape-html.js';

export function renderCaseStudy(appEl, slug) {
  appEl.className = 'page-main case-study-main';
  document.body.className = '';

  const project = slug ? getProject(slug) : null;

  if (project) {
    appEl.innerHTML = `
      <p class="back-link">
        <a href="/">← Back to work</a>
      </p>
      <article>
        <p class="case-study-year">${escapeHtml(project.year)}</p>
        <h1 class="page-title">${escapeHtml(project.title)}</h1>
        <p class="case-study-summary">${escapeHtml(project.summary)}</p>
        <div class="case-study-body">
          <p>Case study content coming soon. (${escapeHtml(project.year)})</p>
        </div>
      </article>
    `;
    return {
      title: `${project.title} — Lina Forero`,
      description: project.summary,
    };
  }

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
