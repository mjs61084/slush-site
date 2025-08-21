(function () {
  const $ = (sel) => document.querySelector(sel);

  const elMixer  = $("#out-mixer");
  const elWater  = $("#out-water");
  const elLiquor = $("#out-liquor");
  const elWarns  = $("#warnings");
  const form     = $("#slush-form");

  const hasLiquor = $("#hasLiquor");
  const abvField  = $("#abv-field");
  const abvInput  = $("#abv");

  // UI state
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

  // Liquor toggle behavior
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

  // Submit handler
  form.addEventListener("submit", function (e) {
    e.preventDefault();
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
})();
