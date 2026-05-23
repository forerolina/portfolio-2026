import './style.css';
import { getProject } from './projects.js';

const slug = new URLSearchParams(window.location.search).get('slug');
const project = slug ? getProject(slug) : null;

const titleEl = document.getElementById('case-study-title');
const yearEl = document.getElementById('case-study-year');
const summaryEl = document.getElementById('case-study-summary');
const bodyEl = document.getElementById('case-study-body');

if (project && titleEl && bodyEl) {
  document.title = `${project.title} — Lina Forero`;
  titleEl.textContent = project.title;

  if (yearEl) {
    yearEl.textContent = project.year;
    yearEl.hidden = false;
  }

  if (summaryEl) {
    summaryEl.textContent = project.summary;
    summaryEl.hidden = false;
  }

  bodyEl.innerHTML = `<p>Case study content coming soon. (${escapeHtml(project.year)})</p>`;
} else if (titleEl && bodyEl) {
  document.title = 'Case study not found — Lina Forero';
  titleEl.textContent = 'Case study not found';
  bodyEl.innerHTML =
    '<p class="case-study-not-found">This project does not exist yet. <a href="/">Back to work</a></p>';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
