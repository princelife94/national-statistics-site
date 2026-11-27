// Page renderers: one function per route. Each returns a section element
// that main.js puts into #page. Charts are built by charts.js from data.js.
// Every chart names its source and unit; KPI cards carry a trend and a
// five-year sparkline so a single number never stands alone.
import {
  GDP_SERIES, POPULATION_SERIES, SECTORS_2024, TOPICS, INDICATORS, SOURCES,
  TRADE_SERIES, RENEWABLE_SERIES, POP_AGE_2024, URBAN_RURAL_2024,
  TRADE_PARTNERS_2024, TRADE_PRODUCTS_2024, ENERGY_GENERATION_2024,
  ENERGY_CAPACITY_2024,
} from './data.js';
import { barChart, lineChart, shareBars, sparkline } from './charts.js';

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

// kpis: [{label, value, note, trend?, trendDir?, spark?, sparkTip?}]
// trend is a short string like "+5.0% on 2023"; spark is [numbers].
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
    if (k.trend) {
      const t = document.createElement('div');
      t.className = 'kpi-trend ' + (k.trendDir || '');
      t.textContent = (k.trendDir === 'up' ? '▲ ' : k.trendDir === 'down' ? '▼ ' : '') + k.trend;
      card.appendChild(t);
    }
    if (k.spark) {
      const s = sparkline(k.spark, { label: k.label + ', trend 2019–2024', tip: k.sparkTip || '' });
      card.appendChild(s);
    }
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

// opts: {source, context} — a compact source line and a one-line
// annotation that uses the chart's empty space to compare, not decorate.
function chartCard(title, hint, node, opts) {
  const card = document.createElement('figure');
  card.className = 'chart-card';
  const cap = document.createElement('figcaption');
  cap.textContent = title;
  const sub = document.createElement('p');
  sub.className = 'chart-hint';
  sub.textContent = hint;
  card.append(cap, sub, node);
  if (opts && opts.context) {
    const ctx = document.createElement('p');
    ctx.className = 'chart-context';
    ctx.textContent = 'In context: ' + opts.context;
    card.appendChild(ctx);
  }
  if (opts && opts.source) {
    const src = document.createElement('p');
    src.className = 'chart-source';
    src.textContent = 'Source: ' + opts.source;
    card.appendChild(src);
  }
  return card;
}

const gdpTips = GDP_SERIES.map((g) => g.year + ': ¥' + g.total.toLocaleString('en-US') + 'bn, real growth +' + g.growth.toFixed(1) + '% (NBS, preliminary series)');
const gdpGrowth = GDP_SERIES.map((g) => '+' + g.growth.toFixed(1) + '%');

export function renderOverview() {
  const wrap = section('China in Numbers', 'The big figures for China in 2024, in one place — population, output, jobs, prices, trade and energy, each with its source and year.');
  wrap.appendChild(kpiCards([
    { label: 'GDP, 2024', value: '¥134.91tn', note: 'Nominal, current prices', trend: '+5.0% real on 2023', trendDir: 'up', spark: GDP_SERIES.map((g) => g.total), sparkTip: 'GDP 2019–2024: ¥100.59tn → ¥134.91tn' },
    { label: 'Population, end-2024', value: '1,408.28m', note: 'Mainland, year-end', trend: '−1.39m on 2023', trendDir: 'down', spark: POPULATION_SERIES.map((p) => p.total), sparkTip: 'Population 2019–2024: 1,410.08m → 1,408.28m' },
    { label: 'Goods trade, 2024', value: '¥43.85tn', note: 'Exports + imports, goods only', trend: '+5.0% on 2023', trendDir: 'up', spark: TRADE_SERIES.map((t) => t.total), sparkTip: 'Goods trade 2019–2024: ¥31.54tn → ¥43.85tn' },
    { label: 'Renewable capacity', value: '56% of total', note: '1.89bn kW installed', trend: '+24.7% on 2023', trendDir: 'up', spark: RENEWABLE_SERIES.map((r) => r.total), sparkTip: 'Renewable capacity 2019–2024: 794 GW → 1,890 GW' },
  ]));
  const chart = barChart(
    GDP_SERIES.map((g) => ({ label: String(g.year), value: g.total, display: (g.total / 1000).toFixed(1) + 'tn' })),
    { label: 'GDP by year', unit: 'GDP, trillion yuan (nominal)', growth: gdpGrowth, tips: gdpTips, format: (v) => (v / 1000) + 'tn', height: 240 },
  );
  wrap.appendChild(chartCard('GDP, 2019–2024', 'Nominal GDP in trillion yuan; the green figures under each bar are real growth on the year before. Hover a bar for the exact value.', chart, {
    context: 'GDP is 34% larger than in 2019 (¥100.59tn), and real growth has stayed between 2.2% and 8.6% a year — the 2020 dip and 2021 rebound are the pandemic years.',
    source: 'NBS, preliminary series, January 2025. Nominal (current-price) values; growth is in real terms.',
  }));

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
    wrap.appendChild(chartCard('Population at year-end, 2019–2024', 'Millions of people. The line falls after the 2021 peak. Hover a dot for the exact figure.', lineChart(
      POPULATION_SERIES.map((p) => ({ label: String(p.year), value: p.total, display: p.total.toFixed(2) })),
      { label: 'Population by year', unit: 'Million people', tips: POPULATION_SERIES.map((p) => p.year + ': ' + p.total.toFixed(2) + ' million people (NBS)'), height: 240 },
    ), {
      context: 'The fall is small but steady: −1.39 million in 2024, after −2.08 million in 2023. Births rose, but deaths still outnumbered them.',
      source: 'NBS, Statistical Communiqué, 28 February 2025.',
    }));
    wrap.appendChild(chartCard('Who the population is, end-2024', 'Shares of the 1,408.28 million total. The 65+ group sits inside the 60+ group.', shareBars(
      POP_AGE_2024.map((a) => ({ name: a.name, value: a.value, display: a.display, note: a.note, tip: a.name + ': ' + a.display + ' — ' + a.note })),
    ), {
      context: 'For every 100 people, about 61 are of working age (16–59) and 22 are 60 or older — the ageing trend the pension debate turns on.',
      source: 'NBS, Statistical Communiqué, Table 1, 28 February 2025.',
    }));
    wrap.appendChild(chartCard('Where people live, end-2024', 'Permanent residents, by where they live — not by household registration.', shareBars(
      URBAN_RURAL_2024.map((a) => ({ name: a.name, value: a.value, display: a.display, note: a.note, tip: a.name + ': ' + a.display + ' — ' + a.note })),
    ), {
      context: 'The urbanisation rate rose 0.84 points in a year, to 67.0%. Two in three people now live in towns and cities.',
      source: 'NBS, Statistical Communiqué, 28 February 2025.',
    }));
  }
  if (topic.id === 'economy') {
    wrap.appendChild(chartCard('GDP by sector, 2024', 'Share of the 134,908.4 billion yuan total. Each sector’s real growth is in brackets.', shareBars(
      SECTORS_2024.map((s) => ({ name: s.name + ' (+' + s.growth + '%)', value: s.value, display: '¥' + s.value.toLocaleString('en-US') + 'bn', note: s.what, tip: s.name + ': ¥' + s.value.toLocaleString('en-US') + 'bn, +' + s.growth + '% real — ' + s.what })),
    ), {
      context: 'Services passed half of GDP years ago and now stand at 56.8%; farming is 6.8% and industry and construction 36.5%.',
      source: 'NBS, preliminary estimates, January 2025. Nominal values; growth in real terms.',
    }));
    wrap.appendChild(chartCard('GDP, 2019–2024', 'Nominal GDP in trillion yuan; the green figures under each bar are real growth on the year before.', barChart(
      GDP_SERIES.map((g) => ({ label: String(g.year), value: g.total, display: (g.total / 1000).toFixed(1) + 'tn' })),
      { label: 'GDP by year', unit: 'GDP, trillion yuan (nominal)', growth: gdpGrowth, tips: gdpTips, format: (v) => (v / 1000) + 'tn', height: 240 },
    ), {
      context: 'GDP is 34% larger than in 2019. The final NBS verification (December 2025) put 2024 GDP slightly lower, at 134,806.6 billion yuan, with growth unchanged at 5.0%.',
      source: 'NBS, preliminary series, January 2025. Nominal (current-price) values.',
    }));
  }
  if (topic.id === 'trade') {
    wrap.appendChild(chartCard('Goods trade, 2019–2024', 'Exports plus imports, trillion yuan. Trade dipped in 2023, then set a record in 2024.', barChart(
      TRADE_SERIES.map((t) => ({ label: String(t.year), value: t.total, display: t.total.toFixed(2) + 'tn' })),
      { label: 'Goods trade by year', unit: 'Trillion yuan', tips: TRADE_SERIES.map((t) => t.year + ': ¥' + t.total.toFixed(2) + ' trillion of goods trade (GACC)'), height: 240 },
    ), {
      context: 'Total trade grew 39% in five years, from ¥31.54tn in 2019 to ¥43.85tn in 2024.',
      source: 'General Administration of Customs of China (GACC), annual figures, January 2025.',
    }));
    wrap.appendChild(chartCard('Trade by partner, 2024', 'Two-way goods trade. Shares are of the ¥43.85 trillion total; Belt and Road partners overlap the three above.', shareBars(
      TRADE_PARTNERS_2024.map((p) => ({ name: p.name, value: p.value, display: p.display, note: p.note, tip: p.name + ': ' + p.display + ' — ' + p.note })),
      { total: 43.85 },
    ), {
      context: 'ASEAN has been the largest partner for five years running. Trade with Belt and Road partners passed half of all goods trade for the first time.',
      source: 'GACC, briefing on imports and exports in 2024, 13 January 2025.',
    }));
    wrap.appendChild(chartCard('What China sold, 2024', 'Exports of ¥25.45 trillion, split by product type.', shareBars(
      TRADE_PRODUCTS_2024.map((p) => ({ name: p.name, value: p.value, display: p.display, note: p.note, tip: p.name + ': ' + p.display + ' — ' + p.note })),
    ), {
      context: 'Mechanical and electrical products — machinery, electronics, vehicles — are nearly three-fifths of everything China exports.',
      source: 'GACC, briefing on imports and exports in 2024, 13 January 2025.',
    }));
  }
  if (topic.id === 'energy') {
    wrap.appendChild(chartCard('Installed power capacity, end-2024', 'Total 3,349 GW. “Capacity” is the maximum a plant can generate — not what it did generate.', shareBars(
      ENERGY_CAPACITY_2024.map((e) => ({ name: e.name, value: e.value, display: e.display, note: e.note, tip: e.name + ': ' + e.display + ' installed — ' + e.note })),
    ), {
      context: 'Renewables (solar, wind, hydro) are 56% of all capacity. Solar alone added 277 GW in 2024 — 65% of everything new.',
      source: 'National Energy Administration, January 2025.',
    }));
    wrap.appendChild(chartCard('Electricity actually generated, 2024', 'Total 10,087 billion kWh. Compare with capacity above: the mix is very different.', shareBars(
      ENERGY_GENERATION_2024.map((e) => ({ name: e.name, value: e.value, display: e.display, note: e.note, tip: e.name + ': ' + e.display + ' generated — ' + e.note })),
    ), {
      context: 'Thermal plants are 43% of capacity but produced 63% of electricity; solar is 26% of capacity but produced 8% — panels only run in daylight.',
      source: 'NEA, via the China Energy Data Report 2025 (June 2025).',
    }));
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
    'Trade partner values are two-way goods trade (exports plus imports). The US yuan value is implied by the reported +4.9% growth on the 2023 value of ¥4.67 trillion; ASEAN (¥6.99tn) and EU (¥5.59tn) are as reported by GACC.',
    'Renewable capacity covers hydro, wind, solar, biomass and pumped storage. The 2023 figure (1,516 GW) is from the China Renewable Energy Engineering Institute; the 2024 figure (1,890 GW) is from the NEA.',
  ]));
  wrap.appendChild(topicLinks(null));
  return wrap;
}
