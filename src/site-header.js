export function initSiteHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  header.innerHTML = `
    <a href="/" class="logo" aria-label="Home">
      <span class="logo-slash">/</span> Lina Forero
    </a>
    <nav class="site-nav" aria-label="Main">
      <a href="/" data-nav="home">Home</a>
      <a href="/about" data-nav="about">About</a>
    </nav>
  `;

  updateSiteHeader();
}

export function updateSiteHeader() {
  const pathname = window.location.pathname;
  const isHome = pathname === '/' || pathname === '';
  const isAbout = pathname === '/about';

  const homeLink = document.querySelector('[data-nav="home"]');
  const aboutLink = document.querySelector('[data-nav="about"]');

  if (homeLink) {
    if (isHome) {
      homeLink.setAttribute('aria-current', 'page');
    } else {
      homeLink.removeAttribute('aria-current');
    }
  }

  if (aboutLink) {
    if (isAbout) {
      aboutLink.setAttribute('aria-current', 'page');
    } else {
      aboutLink.removeAttribute('aria-current');
    }
  }
}
