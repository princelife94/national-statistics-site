// Small SVG chart builders. No library, no network: every chart is drawn
// from the numbers passed in, so the page works from local files alone.
// Every bar and line chart carries a labelled y-axis with light gridlines;
// bars and dots carry <title> tooltips with the exact value, the year-on-year
// change and the source, so hovering explains each number.

const NS = 'http://www.w3.org/2000/svg';

function el(name, attrs) {
  const node = document.createElementNS(NS, name);
  for (const key of Object.keys(attrs)) node.setAttribute(key, attrs[key]);
  return node;
}

function text(x, y, value, cls) {
  const node = el('text', { x, y, class: cls || 'chart-label' });
  node.textContent = value;
  return node;
}

function title(textContent) {
  const node = document.createElementNS(NS, 'title');
  node.textContent = textContent;
  return node;
}

// Round axis steps: 1, 2, 2.5, 5 or 10 times a power of ten.
function niceTicks(max, count) {
  const raw = max / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = norm <= 1 ? mag : norm <= 2 ? 2 * mag : norm <= 2.5 ? 2.5 * mag : norm <= 5 ? 5 * mag : 10 * mag;
  const ticks = [];
  for (let v = 0; v <= max + step * 0.001; v += step) ticks.push(Math.round(v / step) * step);
  return ticks;
}

// Shared axes: horizontal gridlines with a value label at the left and a
// baseline. Returns { yAt } for a value range [0, max] inside the plot area.
function axes(svg, width, height, padL, padT, padB, max, format) {
  const ticks = niceTicks(max, 4);
  const yAt = (v) => padT + ((max - v) / max) * (height - padT - padB);
  for (const t of ticks) {
    const y = yAt(t);
    svg.appendChild(el('line', { x1: padL, x2: width - 12, y1: y.toFixed(1), y2: y.toFixed(1), class: 'chart-grid' }));
    const lab = text(padL - 6, y + 4, format(t), 'chart-tick');
    lab.setAttribute('text-anchor', 'end');
    svg.appendChild(lab);
  }
  svg.appendChild(el('line', { x1: padL, x2: width - 12, y1: (height - padB).toFixed(1), y2: (height - padB).toFixed(1), class: 'chart-axis' }));
  return yAt;
}

// A bar chart with a value label on each bar. values: [{label, value}].
// opts: unit, label, width, height, growth: [strings shown under each bar],
// tips: [hover text per bar], format: tick formatter for the y-axis.
export function barChart(values, opts) {
  const width = (opts && opts.width) || 640;
  const height = (opts && opts.height) || 300;
  const padL = 58, padB = 34, padT = 26;
  const max = Math.max.apply(null, values.map((v) => v.value));
  const svg = el('svg', {
    viewBox: '0 0 ' + width + ' ' + height, role: 'img',
    'aria-label': (opts && opts.label) || 'Bar chart',
  });
  const fmt = (opts && opts.format) || ((v) => String(v));
  const yAt = axes(svg, width, height, padL, padT, padB, max * 1.05, fmt);
  const bw = (width - padL - 16) / values.length;
  values.forEach((v, i) => {
    const h = Math.max(2, ((height - padT - padB) * v.value) / (max * 1.05));
    const x = padL + i * bw + 6;
    const y = height - padB - h;
    const bar = el('rect', {
      x: x.toFixed(1), y: y.toFixed(1), width: (bw - 12).toFixed(1),
      height: h.toFixed(1), rx: 3, class: 'bar',
    });
    if (opts && opts.tips && opts.tips[i]) bar.appendChild(title(opts.tips[i]));
    svg.appendChild(bar);
    svg.appendChild(text(x + (bw - 12) / 2, y - 6, v.display || String(v.value), 'chart-value'));
    if (opts && opts.growth && opts.growth[i]) {
      const g = text(x + (bw - 12) / 2, height - 22, opts.growth[i], 'chart-growth');
      g.setAttribute('text-anchor', 'middle');
      svg.appendChild(g);
    }
    const lab = text(x + (bw - 12) / 2, height - 8, v.label, 'chart-label');
    lab.setAttribute('text-anchor', 'middle');
    svg.appendChild(lab);
  });
  svg.appendChild(text(8, 18, (opts && opts.unit) || '', 'chart-unit'));
  return svg;
}

// A line chart. points: [{label, value}], with a dot per year.
// opts: unit, label, width, height, tips: [hover text per point], format.
export function lineChart(points, opts) {
  const width = (opts && opts.width) || 640;
  const height = (opts && opts.height) || 300;
  const padL = 58, padB = 34, padT = 26;
  const vals = points.map((p) => p.value);
  const min = Math.min.apply(null, vals);
  const max = Math.max.apply(null, vals);
  const span = (max - min) || 1;
  const floor = Math.max(0, min - span * 0.25);
  const top = max + span * 0.15;
  const svg = el('svg', {
    viewBox: '0 0 ' + width + ' ' + height, role: 'img',
    'aria-label': (opts && opts.label) || 'Line chart',
  });
  const fmt = (opts && opts.format) || ((v) => String(v));
  // Gridlines across the plotted range, labelled on the axis.
  const ticks = niceTicks(top - floor, 4).map((t) => t + floor).filter((t) => t <= top);
  const yAt = (v) => padT + ((top - v) / (top - floor)) * (height - padT - padB);
  for (const t of ticks) {
    const y = yAt(t);
    svg.appendChild(el('line', { x1: padL, x2: width - 12, y1: y.toFixed(1), y2: y.toFixed(1), class: 'chart-grid' }));
    const lab = text(padL - 6, y + 4, fmt(Math.round(t)), 'chart-tick');
    lab.setAttribute('text-anchor', 'end');
    svg.appendChild(lab);
  }
  svg.appendChild(el('line', { x1: padL, x2: width - 12, y1: (height - padB).toFixed(1), y2: (height - padB).toFixed(1), class: 'chart-axis' }));
  const xAt = (i) => padL + (i * (width - padL - 24)) / (points.length - 1);
  const line = points.map((p, i) => (i ? 'L' : 'M') + xAt(i).toFixed(1) + ' ' + yAt(p.value).toFixed(1)).join(' ');
  svg.appendChild(el('path', { d: line, class: 'line', fill: 'none' }));
  points.forEach((p, i) => {
    const dot = el('circle', { cx: xAt(i).toFixed(1), cy: yAt(p.value).toFixed(1), r: 4.5, class: 'dot' });
    if (opts && opts.tips && opts.tips[i]) dot.appendChild(title(opts.tips[i]));
    svg.appendChild(dot);
    const val = text(xAt(i), yAt(p.value) - 10, p.display || String(p.value), 'chart-value');
    val.setAttribute('text-anchor', 'middle');
    svg.appendChild(val);
    const lab = text(xAt(i), height - 12, p.label, 'chart-label');
    lab.setAttribute('text-anchor', 'middle');
    svg.appendChild(lab);
  });
  svg.appendChild(text(8, 18, (opts && opts.unit) || '', 'chart-unit'));
  return svg;
}

// A five-year trend sparkline for a KPI card. values: [numbers].
export function sparkline(values, opts) {
  const width = 120, height = 36;
  const min = Math.min.apply(null, values);
  const max = Math.max.apply(null, values);
  const span = (max - min) || 1;
  const svg = el('svg', {
    viewBox: '0 0 ' + width + ' ' + height, role: 'img',
    'aria-label': (opts && opts.label) || 'Trend, last five years',
    class: 'spark',
  });
  const xAt = (i) => 4 + (i * (width - 8)) / (values.length - 1);
  const yAt = (v) => 4 + ((max - v) / span) * (height - 8);
  const line = values.map((v, i) => (i ? 'L' : 'M') + xAt(i).toFixed(1) + ' ' + yAt(v).toFixed(1)).join(' ');
  svg.appendChild(el('path', { d: line, class: 'spark-line', fill: 'none' }));
  svg.appendChild(el('circle', { cx: xAt(values.length - 1).toFixed(1), cy: yAt(values[values.length - 1]).toFixed(1), r: 3, class: 'spark-dot' }));
  if (opts && opts.tip) svg.appendChild(title(opts.tip));
  return svg;
}

// A horizontal share bar: one row per part, sized by share of the total.
// Each part: {name, value, display, note?}. Set opts.total to size shares
// against a different total (e.g. a chart where parts overlap).
export function shareBars(parts, opts) {
  const total = (opts && opts.total) || parts.reduce((sum, p) => sum + p.value, 0);
  const wrap = document.createElement('div');
  wrap.className = 'share-bars';
  parts.forEach((p) => {
    const row = document.createElement('div');
    row.className = 'share-row';
    const share = ((100 * p.value) / total).toFixed(1);
    const name = document.createElement('span');
    name.className = 'share-name';
    name.textContent = p.name + ' — ' + share + '%';
    const track = document.createElement('div');
    track.className = 'share-track';
    const fill = document.createElement('div');
    fill.className = 'share-fill';
    fill.style.width = share + '%';
    if (p.tip) fill.title = p.tip;
    track.appendChild(fill);
    const val = document.createElement('span');
    val.className = 'share-value';
    val.textContent = p.display;
    row.append(name, track, val);
    if (p.note) {
      const note = document.createElement('span');
      note.className = 'share-note';
      note.textContent = p.note;
      row.appendChild(note);
    }
    wrap.appendChild(row);
  });
  return wrap;
}
