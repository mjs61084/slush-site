export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { batchSize, sugarGrams, liquorABV, hasLiquor, unit } = req.body;

  // --- Constants ---
  const ozToMl = 29.57;
  const rhoWater = 1.0;

  // Convert input batch to mL
  let batchSizeMl = unit === "oz" ? batchSize * ozToMl : batchSize;

  // --- Current °Brix ---
  const currentBrix = (sugarGrams / (batchSizeMl * rhoWater)) * 100;

  // --- Target baselines ---
  let targetBrix = 12; // alcoholic baseline
  let targetABV = 7;
  if (!hasLiquor) {
    targetBrix = 13.5; // non-alcoholic requires more sugar
    targetABV = 0;
  }

  const scale = targetBrix / currentBrix;

  // --- Base outputs ---
  let mixerMl = batchSizeMl * scale;
  let waterMl = batchSizeMl - mixerMl;
  let liquorMl = 0;

  // --- Alcohol calc ---
  let finalABV = 0;
  if (hasLiquor && liquorABV > 0) {
    const liquorFraction = targetABV / liquorABV;
    liquorMl = batchSizeMl * liquorFraction;
    waterMl -= liquorMl;
    finalABV = (liquorMl / batchSizeMl) * liquorABV;
  }

  // --- Guidance messages ---
  let guidance = [];

  // Sugar guidance
  if (!hasLiquor) {
    // non-alcoholic ranges
    if (currentBrix < 13) {
      guidance.push("⚠️ Low sugar: add more mixer to help the mix freeze properly.");
    } else if (currentBrix > 14.5) {
      guidance.push("⚠️ High sugar: add water so it won’t freeze solid.");
    } else {
      guidance.push("✅ Sugar level looks good for freeze stability.");
    }
  } else {
    // alcoholic ranges
    if (currentBrix < 11) {
      const requiredSugar = (targetBrix / 100) * (batchSizeMl * rhoWater);
      const sugarDiff = requiredSugar - sugarGrams;
      const mixerAddMl = sugarDiff;
      const addAmount = unit === "oz"
        ? (mixerAddMl / ozToMl).toFixed(2) + " oz"
        : mixerAddMl.toFixed(1) + " mL";
      guidance.push(`⚠️ Low sugar: add about ${addAmount} mixer to improve freeze stability.`);
    } else if (currentBrix > 13.5) {
      const desiredTotalMl = (sugarGrams / targetBrix) * 100;
      const waterAddMl = desiredTotalMl - batchSizeMl;
      const addAmount = unit === "oz"
        ? (waterAddMl / ozToMl).toFixed(2) + " oz"
        : waterAddMl.toFixed(1) + " mL";
      guidance.push(`⚠️ High sugar: add about ${addAmount} water to balance the mix.`);
    } else {
      guidance.push("✅ Sugar level looks balanced.");
    }
  }

  // Alcohol guidance
  if (hasLiquor) {
    if (finalABV < 5) {
      const liquorAddMl = (targetABV / liquorABV) * batchSizeMl - liquorMl;
      const addAmount = unit === "oz"
        ? (liquorAddMl / ozToMl).toFixed(2) + " oz"
        : liquorAddMl.toFixed(1) + " mL";
      guidance.push(`⚠️ Low alcohol: add about ${addAmount} liquor to reach balance.`);
    } else if (finalABV > 9) {
      const desiredTotalMl = (liquorMl * liquorABV) / targetABV;
      const waterAddMl = desiredTotalMl - batchSizeMl;
      const addAmount = unit === "oz"
        ? (waterAddMl / ozToMl).toFixed(2) + " oz"
        : waterAddMl.toFixed(1) + " mL";
      guidance.push(`⚠️ High alcohol: add about ${addAmount} water/mixer to dilute.`);
    } else {
      guidance.push("✅ Alcohol level looks balanced.");
    }
  }

  // --- Unit conversion for return ---
  let divider = unit === "oz" ? ozToMl : 1;

  res.status(200).json({
    mixer: (mixerMl / divider).toFixed(2),
    water: (waterMl / divider).toFixed(2),
    liquor: (liquorMl / divider).toFixed(2),
    brix: currentBrix.toFixed(1),
    abv: finalABV.toFixed(1),
    guidance
  });
}
