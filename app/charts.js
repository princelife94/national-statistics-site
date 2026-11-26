// Small SVG chart builders. No library, no network: every chart is drawn
// from the numbers passed in, so the page works from local files alone.

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

// A bar chart with a value label on each bar. values: [{label, value}].
export function barChart(values, opts) {
  const width = (opts && opts.width) || 640;
  const height = (opts && opts.height) || 300;
  const padL = 58, padB = 34, padT = 26;
  const max = Math.max.apply(null, values.map((v) => v.value));
  const svg = el('svg', {
    viewBox: '0 0 ' + width + ' ' + height, role: 'img',
    'aria-label': (opts && opts.label) || 'Bar chart',
  });
  const bw = (width - padL - 16) / values.length;
  values.forEach((v, i) => {
    const h = Math.max(2, ((height - padT - padB) * v.value) / max);
    const x = padL + i * bw + 6;
    const y = height - padB - h;
    svg.appendChild(el('rect', {
      x: x.toFixed(1), y: y.toFixed(1), width: (bw - 12).toFixed(1),
      height: h.toFixed(1), rx: 3, class: 'bar',
    }));
    svg.appendChild(text(x + (bw - 12) / 2, y - 6, v.display || String(v.value), 'chart-value'));
    const lab = text(x + (bw - 12) / 2, height - 12, v.label, 'chart-label');
    lab.setAttribute('text-anchor', 'middle');
    svg.appendChild(lab);
  });
  svg.appendChild(text(8, 18, (opts && opts.unit) || '', 'chart-unit'));
  return svg;
}

// A line chart. points: [{label, value}], with a dot per year.
export function lineChart(points, opts) {
  const width = (opts && opts.width) || 640;
  const height = (opts && opts.height) || 300;
  const padL = 58, padB = 34, padT = 26;
  const vals = points.map((p) => p.value);
  const min = Math.min.apply(null, vals);
  const max = Math.max.apply(null, vals);
  const span = (max - min) || 1;
  const floor = min - span * 0.25;
  const top = max + span * 0.15;
  const svg = el('svg', {
    viewBox: '0 0 ' + width + ' ' + height, role: 'img',
    'aria-label': (opts && opts.label) || 'Line chart',
  });
  const xAt = (i) => padL + (i * (width - padL - 24)) / (points.length - 1);
  const yAt = (v) => padT + ((top - v) / (top - floor)) * (height - padT - padB);
  const line = points.map((p, i) => (i ? 'L' : 'M') + xAt(i).toFixed(1) + ' ' + yAt(p.value).toFixed(1)).join(' ');
  svg.appendChild(el('path', { d: line, class: 'line', fill: 'none' }));
  points.forEach((p, i) => {
    svg.appendChild(el('circle', { cx: xAt(i).toFixed(1), cy: yAt(p.value).toFixed(1), r: 4.5, class: 'dot' }));
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

// A horizontal share bar: one row per part, sized by share of the total.
export function shareBars(parts) {
  const total = parts.reduce((sum, p) => sum + p.value, 0);
  const wrap = document.createElement('div');
  wrap.className = 'share-bars';
  parts.forEach((p) => {
    const row = document.createElement('div');
    row.className = 'share-row';
    const share = ((100 * p.value) / total).toFixed(1);
    row.innerHTML = '';
    const name = document.createElement('span');
    name.className = 'share-name';
    name.textContent = p.name + ' — ' + share + '%';
    const track = document.createElement('div');
    track.className = 'share-track';
    const fill = document.createElement('div');
    fill.className = 'share-fill';
    fill.style.width = share + '%';
    track.appendChild(fill);
    const val = document.createElement('span');
    val.className = 'share-value';
    val.textContent = p.display;
    row.append(name, track, val);
    wrap.appendChild(row);
  });
  return wrap;
}
