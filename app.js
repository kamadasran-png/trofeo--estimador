'use strict';

const SPECIES = {
  ciervo: {
    name: 'Ciervo',
    fields: [
      { id: 'lengthLeft', label: 'Longitud de la cuerna izquierda', unit: 'cm', min: 0, max: 200, step: 0.1, help: 'Mide siguiendo la curva principal de la cuerna.', full: true },
      { id: 'lengthRight', label: 'Longitud de la cuerna derecha', unit: 'cm', min: 0, max: 200, step: 0.1, help: 'Mide siguiendo la curva principal de la cuerna.', full: true },
      { id: 'circBaseLeft', label: 'Perímetro de la base · izquierdo', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Mide alrededor de la base de la cuerna.' },
      { id: 'circBaseRight', label: 'Perímetro de la base · derecho', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Mide alrededor de la base de la cuerna.' },
      { id: 'circBeamLeft', label: 'Perímetro de la cuerna · izquierdo', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Anota el perímetro en un punto definido y repite el mismo criterio en ambos lados.' },
      { id: 'circBeamRight', label: 'Perímetro de la cuerna · derecho', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Anota el perímetro en un punto definido y repite el mismo criterio en ambos lados.' },
      { id: 'pointsLeft', label: 'Número de puntas · izquierdo', unit: 'puntas', min: 0, max: 50, step: 1, help: 'Cuenta las puntas de la cuerna izquierda.' },
      { id: 'pointsRight', label: 'Número de puntas · derecho', unit: 'puntas', min: 0, max: 50, step: 1, help: 'Cuenta las puntas de la cuerna derecha.' },
      { id: 'spread', label: 'Envergadura exterior máxima', unit: 'cm', min: 0, max: 200, step: 0.1, help: 'Dato descriptivo complementario; no se usa como puntuación oficial.', full: true }
    ],
    calculate: v => v.lengthLeft + v.lengthRight + v.circBaseLeft + v.circBaseRight + v.circBeamLeft + v.circBeamRight + v.pointsLeft + v.pointsRight + v.spread,
    category: () => 'Índice experimental · no homologado',
    detail: v => `Longitud cuernas izq./der.: ${v.lengthLeft}/${v.lengthRight} cm · Perímetros de base: ${v.circBaseLeft}/${v.circBaseRight} cm · Perímetros de cuerna: ${v.circBeamLeft}/${v.circBeamRight} cm · Puntas izq./der.: ${v.pointsLeft}/${v.pointsRight} · Envergadura exterior: ${v.spread} cm. Índice experimental por suma simple de las medidas; no es puntuación CIC.`
  },
  jabali: {
    name: 'Jabalí',
    fields: [
      { id: 'lengthLeft', label: 'Longitud del colmillo inferior izquierdo', unit: 'cm', min: 0, max: 30, step: 0.1, help: 'Mide siguiendo la curvatura exterior del colmillo.', full: true },
      { id: 'lengthRight', label: 'Longitud del colmillo inferior derecho', unit: 'cm', min: 0, max: 30, step: 0.1, help: 'Mide siguiendo la curvatura exterior del colmillo.', full: true },
      { id: 'widthLeft', label: 'Anchura del colmillo izquierdo', unit: 'mm', min: 0, max: 50, step: 0.1, help: 'Mide la anchura máxima del colmillo inferior.' },
      { id: 'widthRight', label: 'Anchura del colmillo derecho', unit: 'mm', min: 0, max: 50, step: 0.1, help: 'Mide la anchura máxima del colmillo inferior.' },
      { id: 'upperLengthLeft', label: 'Longitud del canino superior izquierdo', unit: 'cm', min: 0, max: 15, step: 0.1, help: 'Dato descriptivo complementario; no forma parte del índice base.', full: true },
      { id: 'upperLengthRight', label: 'Longitud del canino superior derecho', unit: 'cm', min: 0, max: 15, step: 0.1, help: 'Dato descriptivo complementario; no forma parte del índice base.', full: true }
    ],
    calculate: v => v.lengthLeft + v.lengthRight + (v.widthLeft + v.widthRight) / 10,
    category: () => 'Índice experimental · no homologado',
    detail: v => `Colmillos inferiores: longitud izq./der. ${v.lengthLeft}/${v.lengthRight} cm · Anchura izq./der. ${v.widthLeft}/${v.widthRight} mm · Caninos superiores izq./der.: ${v.upperLengthLeft}/${v.upperLengthRight} cm (dato complementario). Índice experimental: suma de longitudes inferiores más anchuras convertidas a cm; no es puntuación oficial.`
  },
  muflon: {
    name: 'Muflón',
    fields: [
      { id: 'lengthLeft', label: 'Longitud del cuerno izquierdo', unit: 'cm', min: 0, max: 150, step: 0.1, help: 'Sigue la curvatura exterior desde la base hasta la punta.', full: true },
      { id: 'lengthRight', label: 'Longitud del cuerno derecho', unit: 'cm', min: 0, max: 150, step: 0.1, help: 'Sigue la curvatura exterior desde la base hasta la punta.', full: true },
      { id: 'circ1Left', label: 'Perímetro del primer tercio · izquierdo', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Mide la zona más gruesa de ese tercio.' },
      { id: 'circ1Right', label: 'Perímetro del primer tercio · derecho', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Mide la zona más gruesa de ese tercio.' },
      { id: 'circ2Left', label: 'Perímetro del segundo tercio · izquierdo', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Mide la zona más gruesa de ese tercio.' },
      { id: 'circ2Right', label: 'Perímetro del segundo tercio · derecho', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Mide la zona más gruesa de ese tercio.' },
      { id: 'circ3Left', label: 'Perímetro del tercer tercio · izquierdo', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Mide la zona más gruesa de ese tercio.' },
      { id: 'circ3Right', label: 'Perímetro del tercer tercio · derecho', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Mide la zona más gruesa de ese tercio.' },
      { id: 'spread', label: 'Envergadura exterior máxima', unit: 'cm', min: 0, max: 150, step: 0.1, help: 'Dato complementario: distancia exterior máxima, no solo punta a punta.', full: true }
    ],
    calculate: v => v.lengthLeft + v.lengthRight + v.circ1Left + v.circ1Right + v.circ2Left + v.circ2Right + v.circ3Left + v.circ3Right + v.spread,
    category: () => 'Índice experimental · no homologado',
    detail: v => `Longitud cuernos: ${v.lengthLeft} / ${v.lengthRight} cm · Perímetros por tercios (izq./der.): ${v.circ1Left}/${v.circ1Right}, ${v.circ2Left}/${v.circ2Right}, ${v.circ3Left}/${v.circ3Right} cm · Envergadura exterior: ${v.spread} cm. Índice experimental: suma simple de las medidas introducidas; no es una puntuación CIC.`
  },
  gamo: {
    name: 'Gamo',
    fields: [
      { id: 'lengthLeft', label: 'Longitud de la cuerna izquierda', unit: 'cm', min: 0, max: 100, step: 0.1, help: 'Mide la longitud principal siguiendo la curva.', full: true },
      { id: 'lengthRight', label: 'Longitud de la cuerna derecha', unit: 'cm', min: 0, max: 100, step: 0.1, help: 'Mide la longitud principal siguiendo la curva.', full: true },
      { id: 'browLeft', label: 'Longitud de la luchadera izquierda', unit: 'cm', min: 0, max: 40, step: 0.1, help: 'Medida descriptiva de la punta frontal.' },
      { id: 'browRight', label: 'Longitud de la luchadera derecha', unit: 'cm', min: 0, max: 40, step: 0.1, help: 'Medida descriptiva de la punta frontal.' },
      { id: 'palaLengthLeft', label: 'Longitud de la pala izquierda', unit: 'cm', min: 0, max: 80, step: 0.1, help: 'Longitud de la zona ensanchada de la pala.' },
      { id: 'palaLengthRight', label: 'Longitud de la pala derecha', unit: 'cm', min: 0, max: 80, step: 0.1, help: 'Longitud de la zona ensanchada de la pala.' },
      { id: 'palaWidthLeft', label: 'Anchura máxima de la pala izquierda', unit: 'cm', min: 0, max: 40, step: 0.1, help: 'Anchura máxima de la pala.' },
      { id: 'palaWidthRight', label: 'Anchura máxima de la pala derecha', unit: 'cm', min: 0, max: 40, step: 0.1, help: 'Anchura máxima de la pala.' },
      { id: 'beamCircLeft', label: 'Perímetro de la cuerna izquierda', unit: 'cm', min: 0, max: 40, step: 0.1, help: 'Medición descriptiva de la base o tramo indicado.' },
      { id: 'beamCircRight', label: 'Perímetro de la cuerna derecha', unit: 'cm', min: 0, max: 40, step: 0.1, help: 'Medición descriptiva de la base o tramo indicado.' },
      { id: 'dryWeight', label: 'Peso seco de las cuernas (opcional en futuras versiones)', unit: 'g', min: 0, max: 10000, step: 1, help: 'Para esta primera ficha se registra como dato de entrada obligatorio si se introduce; si no se conoce, usa 0.', full: true }
    ],
    calculate: v => v.lengthLeft + v.lengthRight + v.browLeft + v.browRight + v.palaLengthLeft + v.palaLengthRight + v.palaWidthLeft + v.palaWidthRight + v.beamCircLeft + v.beamCircRight + v.dryWeight / 100,
    category: () => 'Índice experimental · no homologado',
    detail: v => `Longitud cuernas: ${v.lengthLeft}/${v.lengthRight} cm · Luchaderas: ${v.browLeft}/${v.browRight} cm · Palas (longitud): ${v.palaLengthLeft}/${v.palaLengthRight} cm · Palas (anchura): ${v.palaWidthLeft}/${v.palaWidthRight} cm · Perímetros: ${v.beamCircLeft}/${v.beamCircRight} cm · Peso seco introducido: ${v.dryWeight} g. Índice experimental por suma de medidas y peso dividido entre 100; no es puntuación CIC.`
  },
  arrui: {
    name: 'Arruí',
    fields: [
      { id: 'lengthLeft', label: 'Longitud del cuerno izquierdo', unit: 'cm', min: 0, max: 120, step: 0.1, help: 'Mide siguiendo la curvatura exterior desde la base hasta la punta.', full: true },
      { id: 'lengthRight', label: 'Longitud del cuerno derecho', unit: 'cm', min: 0, max: 120, step: 0.1, help: 'Mide siguiendo la curvatura exterior desde la base hasta la punta.', full: true },
      { id: 'circBaseLeft', label: 'Perímetro basal izquierdo', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Mide alrededor de la base del cuerno izquierdo.' },
      { id: 'circBaseRight', label: 'Perímetro basal derecho', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Mide alrededor de la base del cuerno derecho.' },
      { id: 'circMidLeft', label: 'Perímetro en zona media · izquierdo', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Medición descriptiva tomada siempre en un punto comparable.' },
      { id: 'circMidRight', label: 'Perímetro en zona media · derecho', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Medición descriptiva tomada siempre en un punto comparable.' },
      { id: 'spread', label: 'Separación exterior máxima de los cuernos', unit: 'cm', min: 0, max: 120, step: 0.1, help: 'Dato complementario descriptivo; no equivale a una medida oficial de puntuación.', full: true }
    ],
    calculate: v => v.lengthLeft + v.lengthRight + v.circBaseLeft + v.circBaseRight + v.circMidLeft + v.circMidRight + v.spread,
    category: () => 'Índice experimental · no homologado',
    detail: v => `Longitud cuernos izq./der.: ${v.lengthLeft}/${v.lengthRight} cm · Perímetros basales: ${v.circBaseLeft}/${v.circBaseRight} cm · Perímetros zona media: ${v.circMidLeft}/${v.circMidRight} cm · Separación exterior máxima: ${v.spread} cm. Índice experimental por suma simple de medidas; no es una puntuación CIC.`
  },
  montes: {
    name: 'Macho montés',
    fields: [
      { id: 'lengthLeft', label: 'Longitud del cuerno izquierdo', unit: 'cm', min: 0, max: 150, step: 0.1, help: 'Mide siguiendo la curvatura exterior.', full: true },
      { id: 'lengthRight', label: 'Longitud del cuerno derecho', unit: 'cm', min: 0, max: 150, step: 0.1, help: 'Mide siguiendo la curvatura exterior.', full: true },
      { id: 'circBaseLeft', label: 'Perímetro basal izquierdo', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Mide alrededor de la base del cuerno.' },
      { id: 'circBaseRight', label: 'Perímetro basal derecho', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Mide alrededor de la base del cuerno.' },
      { id: 'circMidLeft', label: 'Perímetro en zona media · izquierdo', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Toma la medida en un punto definido y usa el mismo criterio en ambos cuernos.' },
      { id: 'circMidRight', label: 'Perímetro en zona media · derecho', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Toma la medida en un punto definido y usa el mismo criterio en ambos cuernos.' },
      { id: 'spread', label: 'Separación exterior máxima', unit: 'cm', min: 0, max: 150, step: 0.1, help: 'Dato descriptivo complementario, no una puntuación oficial.', full: true }
    ],
    calculate: v => v.lengthLeft + v.lengthRight + v.circBaseLeft + v.circBaseRight + v.circMidLeft + v.circMidRight + v.spread,
    category: () => 'Índice experimental · no homologado',
    detail: v => `Longitud cuernos izq./der.: ${v.lengthLeft}/${v.lengthRight} cm · Perímetros basales: ${v.circBaseLeft}/${v.circBaseRight} cm · Perímetros zona media: ${v.circMidLeft}/${v.circMidRight} cm · Separación exterior máxima: ${v.spread} cm. Índice experimental por suma simple de medidas; no es puntuación CIC.`
  }
};

const $ = id => document.getElementById(id);
let latestResult = null;
const STORAGE_KEY = 'jh-trofeo-estimador-records-v1';

function renderFields() {
  const species = SPECIES[$('species').value];
  $('dynamicFields').innerHTML = species.fields.map(field => {
    const cls = `field-group${field.full ? ' full' : ''}`;
    if (field.type === 'select') {
      return `<div class="${cls}"><label class="field-label" for="${field.id}">${field.label}</label><select class="control" id="${field.id}" name="${field.id}" required>${field.options.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}</select><p class="hint">${field.help}</p></div>`;
    }
    return `<div class="${cls}"><label class="field-label" for="${field.id}">${field.label} (${field.unit})</label><input class="control" id="${field.id}" name="${field.id}" type="number" inputmode="decimal" min="${field.min}" max="${field.max}" step="${field.step}" required placeholder="Ej. ${field.step === 1 ? '12' : '42,5'}"><p class="hint">${field.help}</p></div>`;
  }).join('');
  $('result').hidden = true;
  latestResult = null;
}

function readValues() {
  const spec = SPECIES[$('species').value];
  const values = {};
  for (const field of spec.fields) {
    const input = $(field.id);
    if (!input || input.value.trim() === '') throw new Error(`Completa el campo «${field.label}».`);
    const n = Number(input.value);
    if (!Number.isFinite(n) || n < field.min || n > field.max) throw new Error(`Revisa «${field.label}»: introduce un valor entre ${field.min} y ${field.max} ${field.unit || ''}.`);
    if (field.step === 1 && !Number.isInteger(n)) throw new Error(`«${field.label}» debe ser un número entero.`);
    values[field.id] = n;
  }
  return values;
}

function calculate(event) {
  event.preventDefault();
  try {
    const key = $('species').value;
    const spec = SPECIES[key];
    const values = readValues();
    const raw = spec.calculate(values);
    const adjustment = Number($('adjustment').value);
    const score = raw * (1 - adjustment / 100);
    latestResult = { speciesKey: key, species: spec.name, values, raw, adjustment, score, category: spec.category(score), detail: spec.detail(values), createdAt: new Date().toISOString() };
    $('resultSpecies').textContent = spec.name;
    $('resultCategory').textContent = latestResult.category;
    $('resultScore').innerHTML = `${score.toFixed(1).replace('.', ',')} <span>puntos estimados</span>`;
    $('resultDetails').textContent = `${latestResult.detail} Modelo antes del ajuste: ${raw.toFixed(1).replace('.', ',')} puntos. Ajuste aplicado: ${adjustment} %.`;
    $('result').hidden = false;
    $('result').scrollIntoView({behavior:'smooth', block:'nearest'});
  } catch (error) {
    window.alert(error.message);
  }
}

function getRecords() {
  try { const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); return Array.isArray(value) ? value : []; }
  catch { return []; }
}
function setRecords(records) { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); }
function formatDate(iso) { return new Date(iso).toLocaleString('es-ES', {dateStyle:'medium', timeStyle:'short'}); }
function renderRecords() {
  const records = getRecords();
  if (!records.length) { $('recordsList').innerHTML = '<p class="empty-state">Todavía no has guardado ninguna ficha.</p>'; return; }
  $('recordsList').innerHTML = records.slice().reverse().map(record => `<article class="record"><div><strong>${escapeHTML(record.species)} · ${escapeHTML(record.category)}</strong><small>${escapeHTML(formatDate(record.createdAt))}</small><small>${escapeHTML(record.detail)}</small></div><div class="record-actions"><span class="record-score">${Number(record.score).toFixed(1).replace('.', ',')} pts</span><button class="delete-record" type="button" data-delete="${record.id}" aria-label="Eliminar ficha">Eliminar</button></div></article>`).join('');
}
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }
function saveRecord() {
  if (!latestResult) return;
  const records = getRecords();
  records.push({...latestResult, id: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`});
  try { setRecords(records); renderRecords(); $('saveRecord').textContent = 'Ficha guardada'; }
  catch { window.alert('No se ha podido guardar la ficha. Comprueba el espacio disponible en el dispositivo.'); }
}
function exportRecords() {
  const records = getRecords();
  const blob = new Blob([JSON.stringify(records, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a'); link.href = url; link.download = `trofeos-hunters-${new Date().toISOString().slice(0,10)}.json`; link.click();
  URL.revokeObjectURL(url);
}

function syncSpeciesCards() {
  const selected = $('species').value;
  document.querySelectorAll('.species-card').forEach(card => {
    const active = card.dataset.species === selected;
    card.classList.toggle('is-selected', active);
    card.setAttribute('aria-pressed', String(active));
  });
}
$('speciesCards').addEventListener('click', event => {
  const card = event.target.closest('[data-species]');
  if (!card) return;
  $('species').value = card.dataset.species;
  renderFields();
  syncSpeciesCards();
  $('estimatorForm').scrollIntoView({behavior:'smooth', block:'start'});
  const firstField = $('dynamicFields').querySelector('input, select');
  if (firstField) window.setTimeout(() => firstField.focus({preventScroll:true}), 350);
});
$('species').addEventListener('change', () => { renderFields(); syncSpeciesCards(); });
$('estimatorForm').addEventListener('submit', calculate);
$('saveRecord').addEventListener('click', saveRecord);
$('exportRecords').addEventListener('click', exportRecords);
$('recordsList').addEventListener('click', event => {
  const button = event.target.closest('[data-delete]'); if (!button) return;
  if (!window.confirm('¿Eliminar esta ficha guardada en este dispositivo?')) return;
  setRecords(getRecords().filter(record => record.id !== button.dataset.delete)); renderRecords();
});
function updateConnectionState() { $('connectionState').textContent = navigator.onLine ? 'En línea' : 'Sin conexión'; }
window.addEventListener('online', updateConnectionState); window.addEventListener('offline', updateConnectionState);
renderFields(); syncSpeciesCards(); renderRecords(); updateConnectionState();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
