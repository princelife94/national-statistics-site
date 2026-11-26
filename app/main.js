// Router and page shell: hash routes, one view at a time, no reloads.
// Routes: #/ overview, #/<topic> for the six topics, #/sources for method.
import { TOPICS } from './data.js';
import { renderOverview, renderTopic, renderSources } from './views.js';

const page = document.getElementById('page');
const nav = document.getElementById('topic-nav');

function buildNav() {
  const links = [{ route: '#/', title: 'Overview' }];
  for (const t of TOPICS) links.push({ route: t.route, title: t.title });
  links.push({ route: '#/sources', title: 'Sources' });
  for (const link of links) {
    const a = document.createElement('a');
    a.href = link.route;
    a.textContent = link.title;
    a.dataset.route = link.route;
    nav.appendChild(a);
  }
}

function route() {
  const hash = window.location.hash || '#/';
  const path = hash.slice(1).replace(/^\/+/, '');
  let view;
  if (!path) view = renderOverview();
  else if (path === 'sources') view = renderSources();
  else {
    const topic = TOPICS.find((t) => t.id === path);
    view = topic ? renderTopic(topic) : renderOverview();
  }
  page.innerHTML = '';
  page.appendChild(view);
  for (const a of nav.querySelectorAll('a')) {
    const on = a.dataset.route === '#/' + path || (path === '' && a.dataset.route === '#/');
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  window.scrollTo(0, 0);
  document.title = 'China in Numbers — ' + (path ? document.querySelector('#page h1').textContent : 'Overview');
}

const menuButton = document.getElementById('menu-button');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

buildNav();
window.addEventListener('hashchange', route);
route();
