// Math constants
const OZ_TO_ML = 29.5735;       // milliliters per fluid ounce
const RHO_WATER = 1.0;          // g/mL, approximation used in SimpleLAB
const SUGAR_PER_OZ_2TO1 = 26.7; // g sugar per oz of 2:1 syrup (by weight)

// DOM elements
const ingredientsBody = document.getElementById('ingredientsBody');
const rowTemplate = document.getElementById('ingredientRowTemplate');
const waterOzOut = document.getElementById('waterOz');

const batchSizeOzEl = document.getElementById('batchSizeOz');
const batchSizeSlider = document.getElementById('batchSizeSlider');
const autoWaterEl = document.getElementById('autoWater');

const finalBrixEl = document.getElementById('finalBrix');
const finalABVEl = document.getElementById('finalABV');
const consistencyEl = document.getElementById('consistency');
const statusBadgeEl = document.getElementById('statusBadge');
const alertsEl = document.getElementById('alerts');

const brixMinNAEl = document.getElementById('brixMinNA');
const brixMaxNAEl = document.getElementById('brixMaxNA');
const brixMinAlcEl = document.getElementById('brixMinAlc');
const brixMaxAlcEl = document.getElementById('brixMaxAlc');
const abvMinEl = document.getElementById('abvMin');
const abvMaxEl = document.getElementById('abvMax');

const resetBtn = document.getElementById('resetBtn');
const calcBtn = document.getElementById('calcBtn');
const addRowBtn = document.getElementById('addRowBtn');

const exportBtn = document.getElementById('exportJson');
const importBtn = document.getElementById('importJson');

// --- Helpers ---
function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

function numberOrZero(v){
  const x = parseFloat(v);
  return Number.isFinite(x) ? x : 0;
}

function fmt(n, digits = 2){
  if (!Number.isFinite(n)) return '—';
  return n.toFixed(digits);
}

function readTargets(finalABV){
  const abvMin = numberOrZero(abvMinEl.value);
  const abvMax = numberOrZero(abvMaxEl.value);
  const brixMinNA = numberOrZero(brixMinNAEl.value);
  const brixMaxNA = numberOrZero(brixMaxNAEl.value);
  const brixMinAlc = numberOrZero(brixMinAlcEl.value);
  const brixMaxAlc = numberOrZero(brixMaxAlcEl.value);

  const alcoholic = finalABV >= 0.5;
  const brixMin = alcoholic ? brixMinAlc : brixMinNA;
  const brixMax = alcoholic ? brixMaxAlc : brixMaxNA;
  return { abvMin, abvMax, brixMin, brixMax, alcoholic };
}

function getRows(){
  return Array.from(ingredientsBody.querySelectorAll('.tr')).map(tr => {
    const name = tr.querySelector('.inp.name')?.value?.trim() || '';
    const oz   = numberOrZero(tr.querySelector('.inp.amount')?.value);
    const sug  = numberOrZero(tr.querySelector('.inp.sugar')?.value);
    const abv  = numberOrZero(tr.querySelector('.inp.abv')?.value);
    return { name, oz, sugarPerOz: sug, abvPct: abv };
  });
}

function saveState(){
  const state = {
    batchSize: numberOrZero(batchSizeOzEl.value),
    autoWater: !!autoWaterEl.checked,
    rows: getRows(),
    targets: {
      brixMinNA: numberOrZero(brixMinNAEl.value),
      brixMaxNA: numberOrZero(brixMaxNAEl.value),
      brixMinAlc: numberOrZero(brixMinAlcEl.value),
      brixMaxAlc: numberOrZero(brixMaxAlcEl.value),
      abvMin: numberOrZero(abvMinEl.value),
      abvMax: numberOrZero(abvMaxEl.value),
    }
  };
  localStorage.setItem('simplelab_state', JSON.stringify(state));
}

function loadState(){
  try{
    const s = JSON.parse(localStorage.getItem('simplelab_state') || '{}');
    if (s.batchSize) {
      batchSizeOzEl.value = s.batchSize;
      batchSizeSlider.value = clamp(s.batchSize, Number(batchSizeSlider.min), Number(batchSizeSlider.max));
    }
    if (typeof s.autoWater === 'boolean') autoWaterEl.checked = s.autoWater;
    if (s.targets){
      brixMinNAEl.value = s.targets.brixMinNA ?? brixMinNAEl.value;
      brixMaxNAEl.value = s.targets.brixMaxNA ?? brixMaxNAEl.value;
      brixMinAlcEl.value = s.targets.brixMinAlc ?? brixMinAlcEl.value;
      brixMaxAlcEl.value = s.targets.brixMaxAlc ?? brixMaxAlcEl.value;
      abvMinEl.value = s.targets.abvMin ?? abvMinEl.value;
      abvMaxEl.value = s.targets.abvMax ?? abvMaxEl.value;
    }
    if (Array.isArray(s.rows) && s.rows.length){
      ingredientsBody.innerHTML = '';
      s.rows.forEach(addRow);
    } else {
      // initial two rows
      ingredientsBody.innerHTML = '';
      addRow({ name: 'Margarita mix', oz: 24, sugarPerOz: 10, abvPct: 0 });
      addRow({ name: 'Tequila', oz: 8, sugarPerOz: 0, abvPct: 40 });
    }
  }catch(e){
    console.warn('load state error', e);
  }
}

function addRow(data){
  const frag = rowTemplate.content.cloneNode(true);
  const tr = frag.querySelector('.tr');

  const nameEl = tr.querySelector('.inp.name');
  const ozEl   = tr.querySelector('.inp.amount');
  const sugEl  = tr.querySelector('.inp.sugar');
  const abvEl  = tr.querySelector('.inp.abv');
  const rmBtn  = tr.querySelector('.icon-btn.remove');

  if (data){
    nameEl.value = data.name ?? '';
    if (Number.isFinite(data.oz)) ozEl.value = data.oz;
    if (Number.isFinite(data.sugarPerOz)) sugEl.value = data.sugarPerOz;
    if (Number.isFinite(data.abvPct)) abvEl.value = data.abvPct;
  }

  rmBtn.addEventListener('click', () => {
    tr.remove();
    saveState();
  });

  [nameEl, ozEl, sugEl, abvEl].forEach(el => el.addEventListener('input', saveState));

  ingredientsBody.appendChild(frag);
}

function clearAlerts(){
  alertsEl.innerHTML = '';
}
function pushAlert(kind, title, msg){
  const div = document.createElement('div');
  div.className = `alert ${kind}`;
  div.innerHTML = `<h3>${title}</h3><p>${msg}</p>`;
  alertsEl.appendChild(div);
}

function calc(){
  clearAlerts();
  const batchSize = numberOrZero(batchSizeOzEl.value);
  const rows = getRows();

  // Sum non-water
  let volOther = 0, sugarG = 0, ethanolOz = 0;
  for (const r of rows){
    volOther += r.oz;
    sugarG   += r.oz * r.sugarPerOz;
    ethanolOz+= r.oz * (r.abvPct/100);
  }

  // Auto water
  let waterOz = 0;
  if (autoWaterEl.checked){
    waterOz = clamp(batchSize - volOther, 0, 10_000);
  }

  const totalVolOz = volOther + waterOz;

  // Guard
  if (totalVolOz <= 0){
    finalBrixEl.textContent = '—';
    finalABVEl.textContent = '—';
    consistencyEl.textContent = '—';
    statusBadgeEl.textContent = 'Add ingredients';
    waterOzOut.textContent = '—';
    pushAlert('warn', 'Nothing to calculate', 'Enter at least one ingredient amount (oz).');
    return;
  }

  // Warnings: overfill / underfill
  if (!autoWaterEl.checked){
    if (Math.abs(totalVolOz - batchSize) > 0.01){
      pushAlert('warn', 'Batch size mismatch',
        `Your ingredients total ${fmt(totalVolOz,1)} oz but batch size is ${fmt(batchSize,1)} oz. Adjust or enable auto-water.`);
    }
  } else {
    if (volOther > batchSize){
      pushAlert('bad', 'Too much liquid',
        `Non-water ingredients are ${fmt(volOther,1)} oz which exceeds the batch size (${fmt(batchSize,1)} oz). Reduce amounts or increase batch size.`);
    }
  }

  // Compute °Brix and ABV%
  // °Brix ≈ (sugar grams / total solution grams) * 100
  const solutionG = totalVolOz * OZ_TO_ML * RHO_WATER;
  const finalBrix = (sugarG / solutionG) * 100;
  const finalABV  = (ethanolOz / totalVolOz) * 100;

  finalBrixEl.textContent = fmt(finalBrix, 2);
  finalABVEl.textContent  = fmt(finalABV, 2);

  // Targets
  const { abvMin, abvMax, brixMin, brixMax, alcoholic } = readTargets(finalABV);

  // Consistency label (simple heuristic)
  let consistency = '—';
  if (finalBrix < brixMin) consistency = 'Too thin';
  else if (finalBrix > brixMax) consistency = 'Too thick';
  else consistency = 'On point';
  consistencyEl.textContent = consistency;

  // Status badge
  let statusClass = 'status-good';
  let statusText  = 'Ready';
  if (finalBrix < brixMin){
    statusClass = 'status-warn'; statusText = 'Low sugar';
  } else if (finalBrix > brixMax){
    statusClass = 'status-warn'; statusText = 'High sugar';
  }
  if (finalABV > abvMax + 0.1){
    statusClass = 'status-bad'; statusText = 'ABV too high';
  }
  statusBadgeEl.className = statusClass;
  statusBadgeEl.textContent = statusText;

  // Update water output
  waterOzOut.textContent = fmt(waterOz, 2);

  // Alerts & lightweight suggestions
  if (finalBrix < brixMin){
    // Suggest oz of 2:1 syrup to reach brixMin
    const a = (brixMin/100) * OZ_TO_ML; // g sugar per oz of solution at target
    const V = totalVolOz;
    const S = sugarG;
    const s = SUGAR_PER_OZ_2TO1;
    const x = Math.max(0, (a*V - S) / (s - a)); // oz of 2:1
    pushAlert('warn', 'Under-sugared',
      `At ${fmt(finalBrix,2)}°Bx (target ${fmt(brixMin,1)}–${fmt(brixMax,1)}), slush may be runny. Add ≈ <strong>${fmt(x,2)} oz</strong> of 2:1 simple syrup, then recalc.`);
  } else if (finalBrix > brixMax){
    // Suggest oz of water to dilute down to brixMax
    const V = totalVolOz, S = sugarG, t = brixMax;
    const Vtarget = (S*100) / (t * OZ_TO_ML);
    const w = Math.max(0, Vtarget - V);
    pushAlert('warn', 'Over-sugared',
      `At ${fmt(finalBrix,2)}°Bx (target ${fmt(brixMin,1)}–${fmt(brixMax,1)}), mix may freeze too hard. Add ≈ <strong>${fmt(w,2)} oz</strong> water, then recalc.`);
  } else {
    pushAlert('good', 'Sugar looks good', `You're within the target °Brix range (${fmt(brixMin,1)}–${fmt(brixMax,1)}).`);
  }

  if (finalABV < abvMin && alcoholic){
    pushAlert('warn', 'Low ABV',
      `ABV is ${fmt(finalABV,2)}% (typical ${fmt(abvMin,1)}–${fmt(abvMax,1)}%). Flavor may be light; consider increasing spirits or reducing batch size.`);
  }
  if (finalABV > abvMax){
    pushAlert('bad', 'ABV too high',
      `ABV is ${fmt(finalABV,2)}% (typical ${fmt(abvMin,1)}–${fmt(abvMax,1)}%). High alcohol can prevent freezing; reduce spirits or increase mix.`);
  }

  // Save state
  saveState();
}

// --- Wire up UI ---
batchSizeOzEl.addEventListener('input', () => {
  batchSizeSlider.value = clamp(numberOrZero(batchSizeOzEl.value), Number(batchSizeSlider.min), Number(batchSizeSlider.max));
  saveState();
});
batchSizeSlider.addEventListener('input', () => {
  batchSizeOzEl.value = batchSizeSlider.value;
  saveState();
});
autoWaterEl.addEventListener('change', saveState);

addRowBtn.addEventListener('click', () => {
  addRow({});
  saveState();
});

resetBtn.addEventListener('click', () => {
  if (!confirm('Reset all inputs?')) return;
  localStorage.removeItem('simplelab_state');
  ingredientsBody.innerHTML = '';
  addRow({ name: 'Margarita mix', oz: 24, sugarPerOz: 10, abvPct: 0 });
  addRow({ name: 'Tequila', oz: 8, sugarPerOz: 0, abvPct: 40 });
  batchSizeOzEl.value = 64;
  batchSizeSlider.value = 64;
  autoWaterEl.checked = true;
  calc();
});

calcBtn.addEventListener('click', calc);

// Export / Import (JSON)
exportBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const data = {
    batchSize: numberOrZero(batchSizeOzEl.value),
    autoWater: !!autoWaterEl.checked,
    rows: getRows(),
    settings: {
      brixMinNA: numberOrZero(brixMinNAEl.value),
      brixMaxNA: numberOrZero(brixMaxNAEl.value),
      brixMinAlc: numberOrZero(brixMinAlcEl.value),
      brixMaxAlc: numberOrZero(brixMaxAlcEl.value),
      abvMin: numberOrZero(abvMinEl.value),
      abvMax: numberOrZero(abvMaxEl.value),
    }
  };
  const blob = new Blob([JSON.stringify(data,null,2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'simplelab-mix.json';
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
});

importBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = 'application/json';
  inp.onchange = async () => {
    const file = inp.files?.[0];
    if (!file) return;
    const txt = await file.text();
    try{
      const data = JSON.parse(txt);
      // basic restore
      batchSizeOzEl.value = data.batchSize ?? batchSizeOzEl.value;
      batchSizeSlider.value = clamp(numberOrZero(batchSizeOzEl.value), Number(batchSizeSlider.min), Number(batchSizeSlider.max));
      autoWaterEl.checked = !!data.autoWater;
      if (Array.isArray(data.rows)){
        ingredientsBody.innerHTML = '';
        data.rows.forEach(addRow);
      }
      if (data.settings){
        brixMinNAEl.value = data.settings.brixMinNA ?? brixMinNAEl.value;
        brixMaxNAEl.value = data.settings.brixMaxNA ?? brixMaxNAEl.value;
        brixMinAlcEl.value = data.settings.brixMinAlc ?? brixMinAlcEl.value;
        brixMaxAlcEl.value = data.settings.brixMaxAlc ?? brixMaxAlcEl.value;
        abvMinEl.value = data.settings.abvMin ?? abvMinEl.value;
        abvMaxEl.value = data.settings.abvMax ?? abvMaxEl.value;
      }
      saveState();
      calc();
    }catch(err){
      alert('Invalid file');
    }
  };
  inp.click();
});

// Initialize
loadState();
calc();
