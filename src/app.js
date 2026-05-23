import './style.css';
import { initSiteHeader } from './site-header.js';
import { startRouter } from './router.js';

initSiteHeader();

const appEl = document.getElementById('app');
if (appEl) {
  startRouter(appEl);
}
