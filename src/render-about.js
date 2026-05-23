export function renderAbout(appEl) {
  appEl.className = 'page-main about-main';
  document.body.className = '';

  appEl.innerHTML = `
    <h1 class="page-title">About me</h1>
    <p class="about-lead">
      I’m a product designer focused on clear flows, accessible interfaces, and
      collaboration with engineering and research.
    </p>
    <p>
      I’ve spent the last several years designing for travel and conversational
      products—turning complex journeys into simple, human-centered experiences.
    </p>
    <p>
      When I’m not designing, I’m sketching, exploring cities, and learning what
      makes great products feel effortless.
    </p>
    <p>
      <a href="/">View my work</a>
    </p>
  `;
}
