// Page renderers: one function per route. Each returns a section element
// that main.js puts into #page. Charts are built by charts.js from data.js.
import { GDP_SERIES, POPULATION_SERIES, SECTORS_2024, TOPICS, INDICATORS, SOURCES } from './data.js';
import { barChart, lineChart, shareBars } from './charts.js';

function section(title, intro) {
  const wrap = document.createElement('section');
  const h = document.createElement('h1');
  h.textContent = title;
  const p = document.createElement('p');
  p.className = 'lede';
  p.textContent = intro;
  wrap.append(h, p);
  return wrap;
}

function kpiCards(kpis) {
  const grid = document.createElement('div');
  grid.className = 'kpis';
  for (const k of kpis) {
    const card = document.createElement('div');
    card.className = 'kpi';
    const v = document.createElement('div');
    v.className = 'kpi-value';
    v.textContent = k.value;
    const l = document.createElement('div');
    l.className = 'kpi-label';
    l.textContent = k.label;
    const n = document.createElement('div');
    n.className = 'kpi-note';
    n.textContent = k.note;
    card.append(v, l, n);
    grid.appendChild(card);
  }
  return grid;
}

function topicLinks(exceptId) {
  const nav = document.createElement('nav');
  nav.className = 'topic-links';
  nav.setAttribute('aria-label', 'More topics');
  const h = document.createElement('h2');
  h.textContent = 'Explore more';
  nav.appendChild(h);
  for (const t of TOPICS) {
    if (t.id === exceptId) continue;
    const a = document.createElement('a');
    a.href = t.route;
    a.textContent = t.icon + ' ' + t.title + ' — ' + t.headline;
    nav.appendChild(a);
  }
  return nav;
}

function sourceLine(source) {
  const p = document.createElement('p');
  p.className = 'source';
  p.textContent = 'Source: ' + source + ', 2024 figures. See Sources for the full citation.';
  return p;
}

function bulletList(items) {
  const ul = document.createElement('ul');
  ul.className = 'facts';
  for (const item of items) {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  }
  return ul;
}

function chartCard(title, hint, node) {
  const card = document.createElement('figure');
  card.className = 'chart-card';
  const cap = document.createElement('figcaption');
  cap.textContent = title;
  const sub = document.createElement('p');
  sub.className = 'chart-hint';
  sub.textContent = hint;
  card.append(cap, sub, node);
  return card;
}

export function renderOverview() {
  const wrap = section('China in Numbers', 'The big figures for China in 2024, in one place — population, output, jobs, prices, trade and energy, each with its source and year.');
  wrap.appendChild(kpiCards([
    { label: 'GDP, 2024', value: '¥134.91tn', note: '+5.0% in real terms' },
    { label: 'Population, end-2024', value: '1,408.28m', note: '−1.39m on 2023' },
    { label: 'Goods trade, 2024', value: '¥43.85tn', note: 'A record year' },
    { label: 'Renewable capacity', value: '56% of total', note: '1.89bn kW installed' },
  ]));
  const chart = barChart(
    GDP_SERIES.map((g) => ({ label: String(g.year), value: g.total, display: (g.total / 1000).toFixed(1) + 'tn' })),
    { label: 'GDP by year', unit: 'GDP, trillion yuan' },
  );
  wrap.appendChild(chartCard('GDP, 2019–2024', 'Every bar is labelled with its value. Growth in 2024 was 5.0% in real terms.', chart));

  const searchTitle = document.createElement('h2');
  searchTitle.textContent = 'Find an indicator';
  const search = document.createElement('input');
  search.type = 'search';
  search.id = 'indicator-search';
  search.placeholder = 'Type to filter, e.g. exports, jobs, prices…';
  search.setAttribute('aria-label', 'Filter indicators');
  const list = document.createElement('ul');
  list.className = 'indicator-list';
  list.id = 'indicator-list';
  const drawList = (query) => {
    list.innerHTML = '';
    const q = query.trim().toLowerCase();
    const hits = INDICATORS.filter((d) => !q || d.name.toLowerCase().includes(q) || d.value.toLowerCase().includes(q) || d.topic.toLowerCase().includes(q));
    if (!hits.length) {
      const li = document.createElement('li');
      li.textContent = 'No indicator matches “' + query + '”. Try “trade”, “jobs” or “prices”.';
      list.appendChild(li);
      return;
    }
    for (const d of hits) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#/' + d.topic;
      const name = document.createElement('strong');
      name.textContent = d.name;
      const val = document.createElement('span');
      val.textContent = ' — ' + d.value + ' (' + d.change + ', 2024)';
      a.append(name, val);
      li.appendChild(a);
      list.appendChild(li);
    }
  };
  search.addEventListener('input', () => drawList(search.value));
  drawList('');
  wrap.append(searchTitle, search, list);
  wrap.appendChild(topicLinks(null));
  wrap.appendChild(sourceLine('National Bureau of Statistics of China (NBS)'));
  return wrap;
}

export function renderTopic(topic) {
  const wrap = section(topic.title, topic.sub);
  wrap.appendChild(kpiCards(topic.kpis));
  if (topic.id === 'population') {
    wrap.appendChild(chartCard('Population at year-end, 2019–2024', 'Millions of people. The line falls after the 2021 peak.', lineChart(
      POPULATION_SERIES.map((p) => ({ label: String(p.year), value: p.total, display: p.total.toFixed(2) })),
      { label: 'Population by year', unit: 'Million people' },
    )));
  }
  if (topic.id === 'economy') {
    wrap.appendChild(chartCard('GDP by sector, 2024', 'Share of the 134,908.4 billion yuan total.', shareBars(
      SECTORS_2024.map((s) => ({ name: s.name + ' (+' + s.growth + '%)', value: s.value, display: '¥' + s.value.toLocaleString('en-US') + 'bn' })),
    )));
    wrap.appendChild(chartCard('GDP, 2019–2024', 'Billion yuan, current prices. Real growth in 2024: 5.0%.', barChart(
      GDP_SERIES.map((g) => ({ label: String(g.year), value: g.total, display: (g.total / 1000).toFixed(1) + 'tn' })),
      { label: 'GDP by year', unit: 'GDP, trillion yuan' },
    )));
  }
  if (topic.id === 'trade') {
    wrap.appendChild(chartCard('Goods trade, 2024', 'Exports minus imports: a surplus of about ¥7.06 trillion.', shareBars([
      { name: 'Exports (+7.1%)', value: 25.45, display: '¥25.45tn' },
      { name: 'Imports (+2.3%)', value: 18.39, display: '¥18.39tn' },
    ])));
  }
  if (topic.id === 'energy') {
    wrap.appendChild(chartCard('Installed power capacity, end-2024', 'Total 3,349 GW. Renewables: solar 887m kW, wind 521m kW, hydro 436m kW.', shareBars([
      { name: 'Solar', value: 887, display: '887m kW' },
      { name: 'Wind', value: 521, display: '521m kW' },
      { name: 'Hydro', value: 436, display: '436m kW' },
      { name: 'Other (thermal, nuclear, biomass)', value: 1505, display: '1,505m kW' },
    ])));
  }
  const h2 = document.createElement('h2');
  h2.textContent = 'What the numbers say';
  wrap.append(h2, bulletList(topic.points));
  wrap.appendChild(sourceLine(topic.source));
  wrap.appendChild(topicLinks(topic.id));
  return wrap;
}

export function renderSources() {
  const wrap = section('Sources & method', 'Every figure on this site names its source and year. Nothing here is estimated by us, and nothing is fetched from the web when you open the site — the numbers are in the site’s own files.');
  const list = document.createElement('dl');
  list.className = 'sources';
  for (const s of SOURCES) {
    const dt = document.createElement('dt');
    dt.textContent = s.short;
    const dd = document.createElement('dd');
    dd.textContent = s.full;
    list.append(dt, dd);
  }
  wrap.appendChild(list);
  const method = document.createElement('h2');
  method.textContent = 'How to read the figures';
  wrap.appendChild(method);
  wrap.appendChild(bulletList([
    '“Real terms” means after removing price changes. GDP grew 5.0% in real terms in 2024; in cash terms it grew about 4.2%.',
    'GDP and sector values are the NBS preliminary estimates of January 2025. The NBS final verification (December 2025) put 2024 GDP at 134,806.6 billion yuan — 101.8 billion lower — and kept growth at 5.0%. The charts keep the preliminary series so every year comes from the same release.',
    'The surveyed unemployment rate covers urban areas and is measured by survey, not by benefit claims. It averaged 5.1% in 2024.',
    'Trade is goods only. Services trade is reported separately by the NBS and is not mixed into the ¥43.85 trillion figure.',
    'Installed capacity is the maximum a plant can generate; it is not the same as the electricity actually generated.',
  ]));
  wrap.appendChild(topicLinks(null));
  return wrap;
}
