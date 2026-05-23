import './style.css';
import { projects } from './projects.js';

const listEl = document.getElementById('project-list');

if (listEl) {
  listEl.innerHTML = '';

  projects.forEach((project) => {
    const link = document.createElement('a');
    link.href = `/case-study.html?slug=${encodeURIComponent(project.slug)}`;
    link.className = 'project-card';

    link.innerHTML = `
      <h3 class="project-card-title">${escapeHtml(project.title)}</h3>
      <p class="project-card-summary">${escapeHtml(project.summary)}</p>
      <p class="project-card-year">${escapeHtml(project.year)}</p>
    `;

    listEl.appendChild(link);
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
