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

  function setResults(mixer, water, liquor) {
    elMixer.textContent  = format1(mixer);
    elWater.textContent  = format1(water);
    elLiquor.textContent = format1(liquor);
  }
  function clearResults() { setResults(NaN, NaN, NaN); }

  function renderWarnings(list) {
    elWarns.innerHTML = "";
    if (!list || list.length === 0) {
      elWarns.hidden = true;
      return;
    }
    for (const w of list) {
      const div = document.createElement("div");
      div.className = "item";
      div.textContent = w;
      elWarns.appendChild(div);
    }
    elWarns.hidden = false;
  }

  function format1(x) {
    if (!isFinite(x)) return "—";
    const v = Math.round(x * 10) / 10;
    return Number.isInteger(v) ? String(v) : v.toFixed(1);
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
      "Error: math engine not loaded. Ensure file is at lib/simplelab.js and the script tag path matches."
    ]);
    clearResults();
    return false;
  }

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
    form.reset();         // resets inputs to initial attributes (ABV -> 40)
    syncLiquorUI();       // ensure ABV field visibility matches toggle
    clearResults();       // set results to dashes
    renderWarnings([]);   // hide warnings
  });
})();
