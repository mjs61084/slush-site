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

  // --- Sugar (Brix) calculation ---
  const currentBrix = (sugarGrams / (batchSizeMl * rhoWater)) * 100;
  const targetBrix = 12; // SimpleLab baseline
  const scale = targetBrix / currentBrix;

  // Base mixer & water
  let mixerMl = batchSizeMl * scale;
  let waterMl = batchSizeMl - mixerMl;
  let liquorMl = 0;

  // --- Liquor logic ---
  let finalABV = 0;
  if (hasLiquor && liquorABV > 0) {
    // Target ~7% ABV
    const targetABV = 7;
    const liquorFraction = targetABV / liquorABV;
    liquorMl = batchSizeMl * liquorFraction;
    waterMl -= liquorMl;

    finalABV = (liquorMl / batchSizeMl) * liquorABV;
  }

  // --- Guidance messages ---
  let guidance = [];

  // Sugar checks
  if (currentBrix < 11) {
    const requiredSugar = (targetBrix / 100) * (batchSizeMl * rhoWater);
    const sugarDiff = requiredSugar - sugarGrams;
    const mixerAddMl = sugarDiff;
    const addAmount = unit === "oz" ? (mixerAddMl / ozToMl).toFixed(2) + " oz" : mixerAddMl.toFixed(1) + " mL";
    guidance.push(`⚠️ Low sugar: add about ${addAmount} mixer.`);
  } else if (currentBrix > 13.5) {
    const desiredTotalMl = (sugarGrams / targetBrix) * 100;
    const waterAddMl = desiredTotalMl - batchSizeMl;
    const addAmount = unit === "oz" ? (waterAddMl / ozToMl).toFixed(2) + " oz" : waterAddMl.toFixed(1) + " mL";
    guidance.push(`⚠️ High sugar: add about ${addAmount} water.`);
  } else {
    guidance.push("✅ Sugar level looks good.");
  }

  // Alcohol checks
  if (hasLiquor) {
    if (finalABV < 5) {
      const targetABV = 7;
      const liquorAddMl = (targetABV / liquorABV) * batchSizeMl - liquorMl;
      const addAmount = unit === "oz" ? (liquorAddMl / ozToMl).toFixed(2) + " oz" : liquorAddMl.toFixed(1) + " mL";
      guidance.push(`⚠️ Low alcohol: add about ${addAmount} liquor.`);
    } else if (finalABV > 9) {
      const targetABV = 7;
      const desiredTotalMl = (liquorMl * liquorABV) / targetABV;
      const waterAddMl = desiredTotalMl - batchSizeMl;
      const addAmount = unit === "oz" ? (waterAddMl / ozToMl).toFixed(2) + " oz" : waterAddMl.toFixed(1) + " mL";
      guidance.push(`⚠️ High alcohol: add about ${addAmount} water/mixer.`);
    } else {
      guidance.push("✅ Alcohol level looks good.");
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
