/* SimpleLAB math — MixCalculator + RescueAdvisor (web-only, oz units)
   Improvements:
   - Exact water solve to hit max Brix (mass-based)
   - Round UP to nearest 0.5 oz
   - Minimum auto-apply threshold to avoid micro 0.5 oz nudges
*/
(function () {
  const OZ_TO_ML = 29.5735;

  // Densities (g/mL)
  const RHO_WATER  = 1.0;
  const RHO_MIXER  = 1.0;
  const RHO_LIQUOR = 0.95;

  // Math targets (CalcConstants)
  const TARGET_ABV  = 7.0;   // %
  const TARGET_BRIX = 11.8;  // %

  // RescueAdvisor Brix bands
  const BRIX_MIN_WITH_ALC = 11.5;
  const BRIX_MAX_WITH_ALC = 12.5;
  const BRIX_MIN_NO_ALC   = 10.5;
  const BRIX_MAX_NO_ALC   = 11.2;

  // Behavior knobs
  const MIN_AUTO_WATER_OZ = 1.0; // <— change to 0.5 if you want to auto-apply tiny nudges

  function roundToHalf(x)    { return Math.round(x * 2) / 2; }
  function roundUpToHalf(x)  { return Math.ceil(x * 2) / 2; }
  function clamp(x, lo, hi)  { return Math.min(Math.max(x, lo), hi); }
  function trim1(x) {
    if (!isFinite(x)) return "—";
    const v = Math.round(x * 10) / 10;
    return Number.isInteger(v) ? String(v) : v.toFixed(1);
  }

  function calculateSimpleLab(params) {
    const batchOz       = Math.max(0, Number(params.batchOz || 0));
    const includeLiquor = !!params.includeLiquor;
    const liquorABV     = Math.max(0, Number(params.liquorABV || 0));
    const servingOz     = Math.max(0, Number(params.servingSizeOz || 0));
    const sugarPerServG = Math.max(0, Number(params.sugarPerServingG || 0));

    const warnings = [];

    if (batchOz <= 0 || servingOz <= 0 || sugarPerServG <= 0) {
      return {
        mixerOz: 0, waterOz: 0, liquorOz: 0,
        warnings: ["Recipe Error — please enter batch size, serving size (oz), and sugar per serving (g)."],
        isValid: false
      };
    }

    // 1) Liquor targeting
    const targetABVFrac = TARGET_ABV / 100.0;
    const liquorFrac    = liquorABV / 100.0;
    let L = 0; // liquor oz
    if (includeLiquor && liquorFrac > 0) {
      L = Math.min(batchOz, (targetABVFrac * batchOz) / liquorFrac);
    }

    // 2) Sugar concentration from label (g/oz)
    const sugarConc_gPerOz = servingOz > 0 ? (sugarPerServG / servingOz) : 0;

    // 3) Mass estimate (g) of solution at target batch (pre-dilution)
    const massEstimateG =
      ((batchOz - L) * OZ_TO_ML * RHO_WATER) +
      (L * OZ_TO_ML * RHO_LIQUOR);

    // 4) Target sugar (g) for target °Brix
    const targetSugarG = (TARGET_BRIX / 100.0) * massEstimateG;

    // 5) Mixer volume required to supply that sugar
    let M = 0;
    if (sugarConc_gPerOz > 0) {
      M = targetSugarG / sugarConc_gPerOz;
    }
    M = clamp(M, 0, Math.max(0, batchOz - L));

    // 6) Water remainder (rounded to nearest 0.5 oz)
    const rawWater = batchOz - (L + M);
    let W = Math.max(0, roundToHalf(rawWater));

    // 7) Compute final stats for guidance (not displayed)
    const V = L + M + W; // total volume (oz)
    const liqMass   = L * OZ_TO_ML * RHO_LIQUOR;
    const mixMass   = M * OZ_TO_ML * RHO_MIXER;
    const waterMass = W * OZ_TO_ML * RHO_WATER;
    const totalMass = liqMass + mixMass + waterMass;

    const sugarMass = sugarConc_gPerOz * M; // g
    const finalBrix = totalMass > 0 ? (sugarMass / totalMass) * 100.0 : 0;

    // 8) RescueAdvisor logic (exact water solve + threshold)
    const minBrix = includeLiquor ? BRIX_MIN_WITH_ALC : BRIX_MIN_NO_ALC;
    const maxBrix = includeLiquor ? BRIX_MAX_WITH_ALC : BRIX_MAX_NO_ALC;

    // Too sweet → solve exact water to hit maxBrix
    if (finalBrix > maxBrix && finalBrix > 0) {
      const K = OZ_TO_ML * RHO_WATER; // mass added per 1 oz water
      const targetTotalMass = sugarMass * 100.0 / maxBrix; // mass needed at maxBrix
      let addWaterExact = (targetTotalMass - totalMass) / K; // in oz
      if (addWaterExact < 0) addWaterExact = 0;

      const addWaterRounded = roundUpToHalf(addWaterExact);

      if (addWaterRounded >= MIN_AUTO_WATER_OZ) {
        W = roundToHalf(W + addWaterRounded);
        warnings.push(
          `Too sweet — added ${trim1(addWaterRounded)} oz water (rounded to 0.5) to bring sugar into range.`
        );
      } else if (addWaterRounded >= 0.5) {
        // Small nudge: just advise, don’t change outputs
        warnings.push(
          `Slightly sweet — add about ${trim1(addWaterRounded)} oz water (rounded to 0.5), mix well, then recalc.`
        );
      }
      // If < 0.5 oz needed, stay silent to avoid noise.
    }

    // Too low sugar → show “dissolve sugar in water” guidance (do NOT auto-change W)
    if (finalBrix < minBrix && (L + M + W) > 0) {
      const deficit = minBrix - finalBrix;
      // grams sugar needed to reach the band lower bound for current batch
      const sugarGramsNeeded = (deficit / 100.0) * totalMass;

      if (sugarGramsNeeded >= 0.5) {
        // Tbsp sugar: 1 Tbsp ≈ 12.5 g
        const sugarTbspRaw = sugarGramsNeeded / 12.5;
        const sugarTbsp = Math.ceil(sugarTbspRaw * 2) / 2; // nearest 0.5 Tbsp

        // Water for dissolving: ~2 g sugar per 1 mL water
        let waterOzNeeded = (sugarGramsNeeded / 2.0) / OZ_TO_ML;
        waterOzNeeded = roundUpToHalf(waterOzNeeded);

        if (waterOzNeeded < 1) {
          // tsp water (1 oz = 6 tsp)
          const teaspoons = Math.max(1, Math.round(waterOzNeeded * 6));
          warnings.push(
            `Low sugar — dissolve ${trim1(sugarTbsp)} Tbsp sugar in ${teaspoons} tsp warm water, mix in, then recalc.`
          );
        } else {
          warnings.push(
            `Low sugar — dissolve ${trim1(sugarTbsp)} Tbsp sugar in ${trim1(waterOzNeeded)} oz warm water, mix in, then recalc.`
          );
        }
      }
    }

    return {
      mixerOz: M,
      waterOz: W,
      liquorOz: L,
      warnings,
      isValid: isFinite(M) && isFinite(W) && isFinite(L)
    };
  }

  // Expose globally for script.js
  window.calculateSimpleLab = calculateSimpleLab;
})();
