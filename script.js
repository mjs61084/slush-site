(function () {
  const $ = (sel) => document.querySelector(sel);
  const elMixer = $("#out-mixer"), elWater = $("#out-water"), elLiquor = $("#out-liquor");
  const elWarns = $("#warnings"), form = $("#slush-form"), resetBtn = $("#resetBtn");
  const hasLiquor = $("#hasLiquor"), abvField = $("#abv-field"), abvInput = $("#abv");
  const uOzBtn = $("#u-oz"), uMlBtn = $("#u-ml"), unitEls = document.querySelectorAll("[data-unit]");

  const OZ_TO_ML = 29.5735;
  let unit = localStorage.getItem("unitPref") === "ml" ? "ml" : "oz";
  let lastRes = null;

  function toDisplay(vOz) { return unit === "oz" ? vOz : vOz * OZ_TO_ML; }
  function fmt(x) { if (!isFinite(x)) return "—"; const v=Math.round(x*10)/10; return Number.isInteger(v)?String(v):v.toFixed(1); }

  function renderResults(m, w, l) {
    elMixer.textContent = fmt(toDisplay(m));
    elWater.textContent = fmt(toDisplay(w));
    elLiquor.textContent = fmt(toDisplay(l));
    lastRes = {m,w,l};
  }
  function clearResults() { elMixer.textContent=elWater.textContent=elLiquor.textContent="—"; lastRes=null; }

  function renderWarnings(list) {
    elWarns.innerHTML=""; if(!list||!list.length){elWarns.hidden=true;return;}
    list.forEach(w=>{const d=document.createElement("div");d.className="item";d.textContent=w;elWarns.appendChild(d);});
    elWarns.hidden=false;
  }

  function syncLiquorUI() { abvField.style.display=hasLiquor.checked?"":"none"; if(hasLiquor.checked&&!abvInput.value) abvInput.value="40"; }
  hasLiquor.addEventListener("change", syncLiquorUI); syncLiquorUI();

  // Unit toggle
  function applyUnitUI(){
    if(unit==="oz"){uOzBtn.classList.add("on");uMlBtn.classList.remove("on");}
    else {uMlBtn.classList.add("on");uOzBtn.classList.remove("on");}
    unitEls.forEach(e=>e.textContent=unit);
    if(lastRes) renderResults(lastRes.m,lastRes.w,lastRes.l);
  }
  uOzBtn.addEventListener("click",()=>{unit="oz";localStorage.setItem("unitPref","oz");applyUnitUI();});
  uMlBtn.addEventListener("click",()=>{unit="ml";localStorage.setItem("unitPref","ml");applyUnitUI();});
  applyUnitUI();

  form.addEventListener("submit", e=>{
    e.preventDefault();
    if(typeof window.calculateSimpleLab!=="function"){renderWarnings(["Math engine missing"]);clearResults();return;}
    const res=window.calculateSimpleLab({
      batchOz:+$("#batch").value||0,
      includeLiquor:hasLiquor.checked,
      liquorABV:+$("#abv").value||0,
      servingSizeOz:+$("#serving").value||0,
      sugarPerServingG:+$("#sugar").value||0
    });
    if(!res.isValid){clearResults();renderWarnings(res.warnings);return;}
    renderResults(res.mixerOz,res.waterOz,res.liquorOz);renderWarnings(res.warnings);
  });

  resetBtn.addEventListener("click",()=>{form.reset();syncLiquorUI();clearResults();renderWarnings([]);});
})();
