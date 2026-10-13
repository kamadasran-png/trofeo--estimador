'use strict';

const SPECIES = {
  ciervo: {
    name: 'Ciervo',
    fields: [
      { id: 'length', label: 'Longitud media de las cuernas', unit: 'cm', min: 1, max: 200, step: 0.1, help: 'Introduce la media en centímetros.', full: true },
      { id: 'points', label: 'Número total de puntas', unit: 'puntas', min: 0, max: 100, step: 1, help: 'Cuenta las puntas según el criterio provisional de esta app.' },
      { id: 'thickness', label: 'Grosor visual estimado', type: 'select', options: [{value:'15',label:'Delgado (15)'},{value:'18',label:'Medio (18)'},{value:'22',label:'Grueso (22)'}], help: 'Valor experimental definido para este MVP.' }
    ],
    calculate: v => v.length * 0.6 + v.points * 1.5 + v.thickness,
    category: s => s < 165 ? 'Sin medalla' : s < 173 ? 'Bronce orientativo' : s < 181 ? 'Plata orientativa' : 'Oro orientativo',
    detail: v => `Longitud media: ${v.length} cm · Puntas: ${v.points} · Grosor: ${v.thickness} puntos de modelo.`
  },
  jabali: {
    name: 'Jabalí',
    fields: [
      { id: 'length', label: 'Longitud del colmillo más largo', unit: 'cm', min: 0, max: 30, step: 0.1, help: 'Medida aproximada por la curvatura exterior.', full: true },
      { id: 'width', label: 'Anchura del colmillo', unit: 'mm', min: 0, max: 50, step: 0.1, help: 'Introduce la anchura aproximada en milímetros.', full: true }
    ],
    calculate: v => v.length * 4.5 + v.width * 3,
    category: s => s < 100 ? 'Sin medalla' : s < 105 ? 'Bronce orientativo' : s < 110 ? 'Plata orientativa' : 'Oro orientativo',
    detail: v => `Longitud: ${v.length} cm · Anchura: ${v.width} mm.`
  },
  montes: {
    name: 'Macho montés',
    fields: [
      { id: 'length', label: 'Longitud media de los cuernos', unit: 'cm', min: 0, max: 150, step: 0.1, help: 'Medida aproximada siguiendo la curva exterior.', full: true },
      { id: 'perimeter', label: 'Perímetro medio de las bases', unit: 'cm', min: 0, max: 60, step: 0.1, help: 'Medida alrededor de la base de cada cuerno.', full: true }
    ],
    calculate: v => v.length * 1.2 + v.perimeter * 2.5,
    category: s => s < 205 ? 'Sin medalla' : s < 215 ? 'Bronce orientativo' : s < 225 ? 'Plata orientativa' : 'Oro orientativo',
    detail: v => `Longitud media: ${v.length} cm · Perímetro medio: ${v.perimeter} cm.`
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

$('species').addEventListener('change', renderFields);
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
renderFields(); renderRecords(); updateConnectionState();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
