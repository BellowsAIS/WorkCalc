import { history } from './history.js';
import concrete   from './calculators/concrete.js';
import lumber     from './calculators/lumber.js';
import masonry    from './calculators/masonry.js';
import roofing    from './calculators/roofing.js';
import paint      from './calculators/paint.js';
import excavation from './calculators/excavation.js';

const MODULES = [concrete, lumber, masonry, roofing, paint, excavation];

const ICONS = {
  concrete:   `<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="13" rx="1"/><polyline points="3,8 12,3 21,8"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="3" y1="8" x2="21" y2="8"/></svg>`,
  lumber:     `<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="5" rx="1"/><rect x="2" y="11" width="20" height="5" rx="1"/><rect x="2" y="18" width="14" height="4" rx="1"/></svg>`,
  masonry:    `<svg viewBox="0 0 24 24"><rect x="2" y="3" width="9" height="5"/><rect x="13" y="3" width="9" height="5"/><rect x="2" y="10" width="20" height="5"/><rect x="2" y="17" width="6" height="5"/><rect x="10" y="17" width="12" height="5"/></svg>`,
  roofing:    `<svg viewBox="0 0 24 24"><path d="M2 12 L12 3 L22 12"/><rect x="4" y="12" width="16" height="9" rx="1"/></svg>`,
  paint:      `<svg viewBox="0 0 24 24"><rect x="2" y="3" width="15" height="8" rx="2"/><line x1="9" y1="11" x2="9" y2="17"/><circle cx="9" cy="19" r="2"/></svg>`,
  excavation: `<svg viewBox="0 0 24 24"><path d="M5 21 L12 5 L19 21"/><line x1="8" y1="14" x2="16" y2="14"/></svg>`,
  history:    `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><polyline points="12,7 12,12 16,15"/></svg>`,
  about:      `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none"/><line x1="12" y1="11" x2="12" y2="16"/></svg>`,
};

let unitSystem = localStorage.getItem('workcalc-units') || 'metric';
let activePanel = 'concrete';

// ── Init ──────────────────────────────────────────────────────────────────────

function init() {
  renderNav();
  renderPanels();
  setUnitLabel();
  showPanel('concrete');

  document.getElementById('unit-toggle').addEventListener('click', toggleUnits);
  document.getElementById('app-nav').addEventListener('click', onNavClick);
  document.getElementById('app-main').addEventListener('input', onInput);
  document.getElementById('app-main').addEventListener('change', onInput);
  document.getElementById('app-main').addEventListener('click', onMainClick);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
  }
}

// ── Nav ───────────────────────────────────────────────────────────────────────

function renderNav() {
  const nav = document.getElementById('app-nav');
  const items = [...MODULES.map(m => ({ id: m.id, label: m.label })), { id: 'history', label: 'History' }, { id: 'about', label: 'About' }];
  nav.innerHTML = items.map(({ id, label }) => `
    <button class="nav-item" role="tab" id="tab-${id}"
      aria-controls="panel-${id}" aria-selected="false" data-panel="${id}">
      ${ICONS[id]}<span>${label}</span>
    </button>`
  ).join('');
}

function onNavClick(e) {
  const btn = e.target.closest('.nav-item');
  if (btn) showPanel(btn.dataset.panel);
}

function showPanel(id) {
  activePanel = id;
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  const panel = document.getElementById(`panel-${id}`);
  const tab   = document.getElementById(`tab-${id}`);
  if (panel) { panel.classList.add('active'); panel.scrollTop = 0; }
  if (tab)   { tab.classList.add('active');   tab.setAttribute('aria-selected', 'true'); }
  if (id === 'history') renderHistory();
}

// ── Panels ────────────────────────────────────────────────────────────────────

function renderPanels() {
  const main = document.getElementById('app-main');

  const calcPanels = MODULES.map(mod => `
    <div id="panel-${mod.id}" class="panel" role="tabpanel" aria-labelledby="tab-${mod.id}">
      <h2 class="panel-title">${mod.label}</h2>
      <div class="calc-form">
        ${mod.inputs.map(input => inputHtml(mod.id, input)).join('')}
        <div class="waste-section">
          <label for="${mod.id}-waste">Waste</label>
          <div class="input-wrap">
            <input type="number" id="${mod.id}-waste" inputmode="decimal"
              value="${mod.defaultWasteFactor}" min="0" max="50"
              data-module="${mod.id}" class="waste-input">
            <span class="unit-label">%</span>
          </div>
        </div>
      </div>
      <div class="result-card" id="result-${mod.id}">
        <div class="result-value"  id="rv-${mod.id}"></div>
        <div class="result-formula" id="rf-${mod.id}"></div>
        <div class="result-waste"  id="rw-${mod.id}" hidden></div>
        <button class="copy-btn" data-copy="${mod.id}">Copy result</button>
        <p class="result-disclaimer">Estimates only — verify before ordering. Use at your own risk.</p>
      </div>
    </div>`
  ).join('');

  const historyPanel = `
    <div id="panel-history" class="panel" role="tabpanel" aria-labelledby="tab-history">
      <div class="history-header">
        <h2 class="panel-title">History</h2>
        <button class="clear-btn" id="clear-history">Clear all</button>
      </div>
      <div id="history-list"></div>
    </div>`;

  const aboutPanel = `
    <div id="panel-about" class="panel" role="tabpanel" aria-labelledby="tab-about">
      <h2 class="panel-title">About WorkCalc</h2>
      <div class="about-section">
        <p class="about-version">Version v01.00.013</p>
        <p>WorkCalc provides quick material and quantity estimates for common construction tasks. It is designed for Canadian tradespeople working in metric and imperial units.</p>
      </div>
      <div class="about-section">
        <h3 class="about-heading">Disclaimer &amp; Limitation of Liability</h3>
        <p>All results produced by WorkCalc are <strong>estimates only</strong>. They are intended as a starting point for planning and ordering — not as a substitute for professional measurement, engineering review, or on-site verification.</p>
        <p>Actual material quantities depend on site conditions, product dimensions, installation methods, and other factors that this app cannot account for. Always verify results before placing orders or beginning work.</p>
        <p>Bellows Applied Intelligence Solutions (BAIS) makes no warranty, express or implied, regarding the accuracy, completeness, or fitness for purpose of any calculation produced by this app. BAIS shall not be liable for any loss, cost, injury, or damage — including excess material purchases, project delays, or structural issues — arising from reliance on results generated by WorkCalc.</p>
        <p>By using WorkCalc, you acknowledge that you assume full responsibility for verifying all estimates and for any decisions made based on them.</p>
      </div>
      <div class="about-section">
        <h3 class="about-heading">Governing Law</h3>
        <p>This disclaimer is governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein.</p>
      </div>
      <div class="about-section">
        <h3 class="about-heading">Contact</h3>
        <p>Bellows Applied Intelligence Solutions (BAIS)<br>Ontario, Canada</p>
      </div>
    </div>`;

  main.innerHTML = calcPanels + historyPanel + aboutPanel;

  document.getElementById('clear-history').addEventListener('click', () => {
    history.clear();
    renderHistory();
  });

  MODULES.forEach(mod => refreshFieldVisibility(mod));
}

function inputHtml(modId, input) {
  const hintId     = `hint-${modId}-${input.id}`;
  const hintToggle = input.hint
    ? `<button class="hint-toggle" aria-label="More information" aria-expanded="false" data-hint-id="${hintId}">ⓘ</button>`
    : '';
  const hintText = input.hint
    ? `<div class="hint-text" id="${hintId}" hidden>${input.hint}</div>`
    : '';
  const labelRow = `
    <div class="label-row">
      <label for="${modId}-${input.id}">${input.label}</label>
      ${hintToggle}
    </div>
    ${hintText}`;

  if (input.type === 'select') {
    const opts = Array.isArray(input.options) ? input.options : (input.options[unitSystem] ?? input.options.metric);
    return `
      <div class="input-group">
        ${labelRow}
        <div class="input-wrap">
          <select id="${modId}-${input.id}" class="calc-input" data-module="${modId}">
            ${opts.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
          </select>
        </div>
      </div>`;
  }

  const metricUnit   = input.unit?.metric   ?? '';
  const imperialUnit = input.unit?.imperial ?? '';
  const displayUnit  = unitSystem === 'metric' ? metricUnit : imperialUnit;

  return `
    <div class="input-group">
      ${labelRow}
      <div class="input-wrap">
        <input type="number" id="${modId}-${input.id}" inputmode="decimal"
          class="calc-input" min="${input.min ?? 0}" step="any" placeholder="0"
          data-module="${modId}" data-metric="${metricUnit}" data-imperial="${imperialUnit}">
        ${displayUnit ? `<span class="unit-label" id="ul-${modId}-${input.id}">${displayUnit}</span>` : ''}
      </div>
    </div>`;
}

// ── Units ─────────────────────────────────────────────────────────────────────

function toggleUnits() {
  unitSystem = unitSystem === 'metric' ? 'imperial' : 'metric';
  localStorage.setItem('workcalc-units', unitSystem);
  setUnitLabel();
  refreshUnitLabels();
  refreshSelectOptions();
  const mod = MODULES.find(m => m.id === activePanel);
  if (mod) runCalc(mod);
}

function refreshSelectOptions() {
  MODULES.forEach(mod => {
    mod.inputs.forEach(input => {
      if (input.type !== 'select' || Array.isArray(input.options)) return;
      const el = document.getElementById(`${mod.id}-${input.id}`);
      if (!el) return;
      const currentVal = el.value;
      const opts = input.options[unitSystem] ?? input.options.metric;
      el.innerHTML = opts.map(o => `<option value="${o.value}"${o.value === currentVal ? ' selected' : ''}>${o.label}</option>`).join('');
    });
  });
}

function setUnitLabel() {
  const btn = document.getElementById('unit-toggle');
  btn.textContent = unitSystem === 'metric' ? 'Metric' : 'Imperial';
  btn.setAttribute('aria-pressed', String(unitSystem === 'imperial'));
}

function refreshUnitLabels() {
  MODULES.forEach(mod => {
    mod.inputs.forEach(input => {
      if (!input.unit || input.type === 'select') return;
      const el = document.getElementById(`ul-${mod.id}-${input.id}`);
      if (el) el.textContent = unitSystem === 'metric' ? (input.unit.metric ?? '') : (input.unit.imperial ?? '');
    });
  });
}

// ── Field visibility ─────────────────────────────────────────────────────────

function refreshFieldVisibility(mod) {
  const hasDeps = mod.inputs.some(inp => inp.visibleWhen);
  if (!hasDeps) return;

  const selectValues = {};
  for (const inp of mod.inputs) {
    if (inp.type === 'select') {
      const el = document.getElementById(`${mod.id}-${inp.id}`);
      if (el) selectValues[inp.id] = el.value;
    }
  }

  for (const inp of mod.inputs) {
    if (!inp.visibleWhen) continue;
    const group = document.getElementById(`${mod.id}-${inp.id}`)?.closest('.input-group');
    if (!group) continue;
    const visible = Object.entries(inp.visibleWhen).every(([key, val]) => {
      const allowed = Array.isArray(val) ? val : [val];
      return allowed.includes(selectValues[key]);
    });
    group.hidden = !visible;
  }
}

// ── Calculation ───────────────────────────────────────────────────────────────

function onInput(e) {
  if (!e.target.matches('.calc-input, .waste-input')) return;
  const mod = MODULES.find(m => m.id === e.target.dataset.module);
  if (mod) {
    refreshFieldVisibility(mod);
    runCalc(mod);
  }
}

function runCalc(mod) {
  const rawInputs = {};
  for (const def of mod.inputs) {
    const el = document.getElementById(`${mod.id}-${def.id}`);
    if (!el) continue;
    rawInputs[def.id] = def.type === 'select' ? el.value : (parseFloat(el.value) || 0);
  }
  rawInputs.waste = parseFloat(document.getElementById(`${mod.id}-waste`)?.value) || 0;

  let result = null;
  try { result = mod.calculate(rawInputs, unitSystem); } catch { /* swallow */ }
  displayResult(mod.id, result);
}

function displayResult(modId, result) {
  const card     = document.getElementById(`result-${modId}`);
  const valueEl  = document.getElementById(`rv-${modId}`);
  const formulaEl = document.getElementById(`rf-${modId}`);
  const wasteEl  = document.getElementById(`rw-${modId}`);

  if (!result) { card.classList.remove('visible'); return; }

  card.classList.add('visible');
  valueEl.textContent   = result.display;
  formulaEl.textContent = result.formula ?? '';

  if (result.wasteAdjusted) {
    wasteEl.textContent = result.wasteAdjusted;
    wasteEl.hidden = false;
  } else {
    wasteEl.hidden = true;
  }
}

// ── Copy ──────────────────────────────────────────────────────────────────────

function onMainClick(e) {
  const copyBtn = e.target.closest('.copy-btn');
  if (copyBtn) { handleCopy(copyBtn.dataset.copy); return; }

  const hintBtn = e.target.closest('.hint-toggle');
  if (hintBtn) {
    const hintEl = document.getElementById(hintBtn.dataset.hintId);
    if (hintEl) {
      hintEl.hidden = !hintEl.hidden;
      hintBtn.setAttribute('aria-expanded', String(!hintEl.hidden));
    }
  }
}

function handleCopy(modId) {
  const mod      = MODULES.find(m => m.id === modId);
  const valueEl  = document.getElementById(`rv-${modId}`);
  const formulaEl = document.getElementById(`rf-${modId}`);
  const wasteEl  = document.getElementById(`rw-${modId}`);

  const lines = [
    `WorkCalc — ${mod?.label ?? modId}`,
    valueEl?.textContent,
    formulaEl?.textContent,
    wasteEl?.hidden === false ? wasteEl?.textContent : null,
  ].filter(Boolean);
  const text = lines.join('\n');

  const finish = () => {
    if (valueEl?.textContent) {
      history.add({
        module: modId,
        label:  mod?.label ?? modId,
        result: valueEl.textContent,
        formula: formulaEl?.textContent ?? '',
      });
    }
    const btn = document.querySelector(`[data-copy="${modId}"]`);
    if (btn) {
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = 'Copy result'; }, 1500);
    }
  };

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(finish).catch(fallbackCopy);
  } else {
    fallbackCopy();
  }

  function fallbackCopy() {
    const ta = Object.assign(document.createElement('textarea'), {
      value: text, style: 'position:fixed;opacity:0',
    });
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    finish();
  }
}

// ── History ───────────────────────────────────────────────────────────────────

function renderHistory() {
  const list = document.getElementById('history-list');
  if (!list) return;

  const entries = history.getAll();
  if (!entries.length) {
    list.innerHTML = '<p class="history-empty">No calculations yet.<br>Tap "Copy result" on any calculator to save an entry.</p>';
    return;
  }

  list.innerHTML = entries.map(e => `
    <div class="history-entry">
      <div class="history-entry-meta">
        <span class="history-entry-module">${e.label}</span>
        <span class="history-entry-time">${fmtTime(e.timestamp)}</span>
      </div>
      <div class="history-entry-result">${e.result}</div>
      ${e.formula ? `<div class="history-entry-formula">${e.formula}</div>` : ''}
    </div>`
  ).join('');
}

function fmtTime(ts) {
  return new Date(ts).toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' });
}

// ── Boot ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', init);
