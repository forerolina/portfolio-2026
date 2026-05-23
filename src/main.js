import './style.css';
import { projects } from './projects.js';

const PLACEHOLDER_IMAGE =
  'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error';

const accordionEl = document.getElementById('project-accordion');

if (accordionEl) {
  let activeIndex = projects.length - 1;

  accordionEl.innerHTML = '';

  projects.forEach((project, index) => {
    const link = document.createElement('a');
    link.href = `/case-study.html?slug=${encodeURIComponent(project.slug)}`;
    link.className = 'accordion-item';
    link.setAttribute('role', 'listitem');
    link.setAttribute('aria-label', project.title);

    link.innerHTML = `
      <img
        class="accordion-item__image"
        src="${escapeHtml(project.imageUrl)}"
        alt=""
        loading="lazy"
      />
      <span class="accordion-item__overlay" aria-hidden="true"></span>
      <span class="accordion-item__label">${escapeHtml(project.title)}</span>
    `;

    const img = link.querySelector('.accordion-item__image');
    img.addEventListener('error', () => {
      img.onerror = null;
      img.src = PLACEHOLDER_IMAGE;
    });

    link.addEventListener('mouseenter', () => setActiveIndex(index));
    link.addEventListener('focusin', () => setActiveIndex(index));

    accordionEl.appendChild(link);
  });

  setActiveIndex(activeIndex);

  function setActiveIndex(index) {
    activeIndex = index;
    const items = accordionEl.querySelectorAll('.accordion-item');
    items.forEach((item, i) => {
      const isActive = i === activeIndex;
      item.classList.toggle('is-active', isActive);
      if (isActive) {
        item.setAttribute('aria-current', 'true');
      } else {
        item.removeAttribute('aria-current');
      }
    });
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
