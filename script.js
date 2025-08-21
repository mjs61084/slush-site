(function () {
  const $ = (sel) => document.querySelector(sel);

  const elMixer  = $("#out-mixer");
  const elWater  = $("#out-water");
  const elLiquor = $("#out-liquor");
  const elWarns  = $("#warnings");
  const form     = $("#slush-form");
  const resetBtn = $("#resetBtn");

  const hasLiquor = $("#hasLiquor");
  const abvField  = $("#abv-field");
  const abvInput  = $("#abv");

  const uOzBtn = $("#u-oz");
  const uMlBtn = $("#u-ml");
  const unitEls = document.querySelectorAll("[data-unit]");

  // State
  let unit = (localStorage.getItem("unitPref") === "ml") ? "ml" : "oz";
  let lastResult = null; // store oz results from engine so we can re-render in either unit

  // Helpers
  const OZ_TO_ML = 29.5735;

  function toDisplay(valOz) {
    if (!isFinite(valOz)) return NaN;
    return unit === "oz" ? valOz : valOz * OZ_TO_ML;
  }

  function format1(x) {
    if (!isFinite(x)) return "—";
    const v = Math.round(x * 10) / 10;
    return Number.isInteger(v) ? String(v) : v.toFixed(1);
  }

  function applyUnitUI() {
    // toggle button styles + aria
    if (unit === "oz") {
      uOzBtn.classList.add("on"); uOzBtn.setAttribute("aria-selected","true");
      uMlBtn.classList.remove("on"); uMlBtn.setAttribute("aria-selected","false");
    } else {
      uMlBtn.classList.add("on"); uMlBtn.setAttribute("aria-selected","true");
      uOzBtn.classList.remove("on"); uOzBtn.setAttribute("aria-selected","false");
    }
    // update small unit labels on cards
    unitEls.forEach(el => el.textContent = (unit === "oz" ? "oz" : "mL"));
    // re-render outputs in new unit without re-calculating
    if (lastResult) setResults(lastResult.mixerOz, lastResult.waterOz, lastResult.liquorOz);
  }

  function setResults(mixerOz, waterOz, liquorOz) {
    // keep oz internally; convert for display
    elMixer.textContent  = format1(toDisplay(mixerOz));
    elWater.textContent  = format1(toDisplay(waterOz));
    elLiquor.textContent = format1(toDisplay(liquorOz));
    lastResult = { mixerOz, waterOz, liquorOz };
  }
  function clearResults() {
    elMixer.textContent = "—";
    elWater.textContent = "—";
    elLiquor.textContent = "—";
    lastResult = null;
  }

  function renderWarnings(list) {
    elWarns.innerHTML = "";
    if (!list || list.length === 0) {
      elWarns.hidden = true;
      return;
    }
    for (const w of list) {
      const div = document.createElement("div");
      div.className = "item";
      div.textContent = w; // warnings remain in US customary text (matches app)
      elWarns.appendChild(div);
    }
    elWarns.hidden = false;
  }

  function parseNum(id) {
    const v = parseFloat($(id).value);
    return isNaN(v) ? 0 : v;
  }

  function syncLiquorUI() {
    if (hasLiquor.checked) {
      abvField.style.display = "";
      if (!abvInput.value) abvInput.value = "40";
    } else {
      abvField.style.display = "none";
    }
  }
  hasLiquor.addEventListener("change", syncLiquorUI);
  syncLiquorUI();

  // Friendly error if the math engine didn't load
  function ensureEngine() {
    if (typeof window.calculateSimpleLab === "function") return true;
    renderWarnings([
      "Error: math engine not loaded. Ensure simplelab.js is present and the script tag path matches."
    ]);
    clearResults();
    return false;
  }

  // Unit toggle handlers
  uOzBtn.addEventListener("click", () => { unit = "oz"; localStorage.setItem("unitPref","oz"); applyUnitUI(); });
  uMlBtn.addEventListener("click", () => { unit = "ml"; localStorage.setItem("unitPref","ml"); applyUnitUI(); });
  applyUnitUI(); // initialize

  // Submit handler
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!ensureEngine()) return;

    const batchOz   = parseNum("#batch");
    const servingOz = parseNum("#serving");
    const sugarG    = parseNum("#sugar");
    const includeL  = hasLiquor.checked;
    const liquorABV = includeL ? parseNum("#abv") : 0;

    const res = window.calculateSimpleLab({
      batchOz,
      includeLiquor: includeL,
      liquorABV,
      servingSizeOz: servingOz,
      sugarPerServingG: sugarG
    });

    if (!res.isValid) {
      clearResults();
      renderWarnings(res.warnings || ["Recipe Error — check your inputs."]);
      return;
    }

    setResults(res.mixerOz, res.waterOz, res.liquorOz);
    renderWarnings(res.warnings || []);
  });

  // Reset handler
  resetBtn.addEventListener("click", function () {
    form.reset();
    syncLiquorUI();
    clearResults();
    renderWarnings([]);
  });
})();
