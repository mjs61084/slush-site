(function () {
  const OZ_TO_ML = 29.5735;
  const RHO_WATER = 1.0, RHO_MIXER = 1.0, RHO_LIQUOR = 0.95;
  const TARGET_ABV = 7.0, TARGET_BRIX = 11.8;
  const BRIX_MIN_WITH_ALC = 11.5, BRIX_MAX_WITH_ALC = 12.5;
  const BRIX_MIN_NO_ALC = 10.5, BRIX_MAX_NO_ALC = 11.2;

  function roundToHalf(x) { return Math.round(x * 2) / 2; }
  function roundUpToHalf(x) { return Math.ceil(x * 2) / 2; }
  function trim1(x) { const v = Math.round(x * 10) / 10; return Number.isInteger(v) ? String(v) : v.toFixed(1); }

  window.calculateSimpleLab = function (p) {
    const batchOz = +p.batchOz || 0, liquorABV = +p.liquorABV || 0;
    const servingOz = +p.servingSizeOz || 0, sugarPerServG = +p.sugarPerServingG || 0;
    const includeLiquor = !!p.includeLiquor;

    if (batchOz <= 0 || servingOz <= 0 || sugarPerServG <= 0) {
      return { mixerOz: 0, waterOz: 0, liquorOz: 0, warnings: ["Recipe Error — check inputs."], isValid: false };
    }

    let L = 0;
    if (includeLiquor && liquorABV > 0) {
      L = Math.min(batchOz, (TARGET_ABV / 100 * batchOz) / (liquorABV / 100));
    }

    const sugarConc = sugarPerServG / servingOz; // g/oz
    const massEstimateG = ((batchOz - L) * OZ_TO_ML * RHO_WATER) + (L * OZ_TO_ML * RHO_LIQUOR);
    const targetSugarG = (TARGET_BRIX / 100) * massEstimateG;

    let M = targetSugarG / sugarConc;
    M = Math.min(Math.max(M, 0), batchOz - L);

    let W = roundToHalf(batchOz - (L + M));
    if (W < 0) W = 0;

    // Stats
    const V = L + M + W;
    const totalMass = (L * OZ_TO_ML * RHO_LIQUOR) + (M * OZ_TO_ML * RHO_MIXER) + (W * OZ_TO_ML * RHO_WATER);
    const sugarMass = sugarConc * M;
    const finalBrix = totalMass > 0 ? (sugarMass / totalMass) * 100 : 0;

    const minBrix = includeLiquor ? BRIX_MIN_WITH_ALC : BRIX_MIN_NO_ALC;
    const maxBrix = includeLiquor ? BRIX_MAX_WITH_ALC : BRIX_MAX_NO_ALC;

    // Too sweet — silently auto add water
    if (finalBrix > maxBrix) {
      const addWater = ( (finalBrix - maxBrix) / finalBrix ) * V;
      const addWaterRounded = roundToHalf(addWater);
      if (addWaterRounded > 0) W = roundToHalf(W + addWaterRounded);
    }

    // Too low sugar — show guidance
    const warnings = [];
    if (finalBrix < minBrix && V > 0) {
      const deficit = minBrix - finalBrix;
      const sugarNeeded = (deficit / 100) * totalMass; // g
      if (sugarNeeded >= 0.5) {
        const sugarTbsp = Math.ceil((sugarNeeded / 12.5) * 2) / 2;
        let waterOzNeeded = roundUpToHalf((sugarNeeded / 2) / OZ_TO_ML);
        if (waterOzNeeded < 1) {
          const tsp = Math.max(1, Math.round(waterOzNeeded * 6));
          warnings.push(`Low sugar — dissolve ${trim1(sugarTbsp)} Tbsp sugar in ${tsp} tsp warm water, mix in, then recalc.`);
        } else {
          warnings.push(`Low sugar — dissolve ${trim1(sugarTbsp)} Tbsp sugar in ${trim1(waterOzNeeded)} oz warm water, mix in, then recalc.`);
        }
      }
    }

    return { mixerOz: M, waterOz: W, liquorOz: L, warnings, isValid: true };
  };
})();
