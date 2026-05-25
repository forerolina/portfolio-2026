import { projects, getProjectPath } from './projects.js';
import { escapeHtml } from './lib/escape-html.js';

const PLACEHOLDER_IMAGE =
  'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error';

export function renderHome(appEl) {
  appEl.className = 'page-main page-main--home';
  document.body.className = 'page-home';

  appEl.innerHTML = `
    <section class="landing" aria-label="Introduction">
      <div class="landing__copy">
        <p class="hero-eyebrow">Product Designer</p>
        <h1 class="hero-title">Lina Forero</h1>
        <p class="hero-subtitle">
          Senior Product designer &amp; Conversational designer @eDreams
        </p>
        <a href="/about" class="landing-cta">Get in touch</a>
      </div>
      <div class="landing__accordion">
        <div id="project-accordion" class="accordion" role="list" aria-label="Selected work"></div>
      </div>
    </section>
  `;

  const accordionEl = document.getElementById('project-accordion');
  if (!accordionEl) return;

  let activeIndex = projects.length - 1;

  projects.forEach((project, index) => {
    const link = document.createElement('a');
    link.href = getProjectPath(project);
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
