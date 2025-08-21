export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { batchSize, sugarGrams, liquorABV, hasLiquor, unit } = req.body;

  const ozToMl = 29.57;
  const rhoWater = 1.0;

  // Convert batch size to mL
  let batchSizeMl = unit === "oz" ? batchSize * ozToMl : batchSize;

  // Current °Brix
  const currentBrix = (sugarGrams / (batchSizeMl * rhoWater)) * 100;
  const targetBrix = 12;

  // Mixer & Water
  let mixerMl = batchSizeMl; // assume initial = batch size
  let waterMl = 0;
  let liquorMl = 0;

  // Alcohol calc
  let finalABV = 0;
  if (hasLiquor && liquorABV > 0) {
    finalABV = (liquorMl / batchSizeMl) * liquorABV;
  }

  // Guidance
  let guidance = [];

  // Sugar corrections
  if (currentBrix < 11) {
    // how much sugar (grams) to reach targetBrix?
    const requiredSugar = (targetBrix / 100) * (batchSizeMl * rhoWater);
    const sugarDiff = requiredSugar - sugarGrams;

    // convert to mixer equivalent (assuming 1 g sugar ≈ 1 mL mixer)
    const mixerAddMl = sugarDiff; 
    const addAmount = unit === "oz" ? (mixerAddMl / ozToMl).toFixed(2) + " oz" : mixerAddMl.toFixed(1) + " mL";

    guidance.push(`⚠️ Low sugar: add about ${addAmount} mixer.`);
  } else if (currentBrix > 13.5) {
    // how much water to dilute down to 12?
    const desiredTotalMl = (sugarGrams / targetBrix) * 100;
    const waterAddMl = desiredTotalMl - batchSizeMl;

    const addAmount = unit === "oz" ? (waterAddMl / ozToMl).toFixed(2) + " oz" : waterAddMl.toFixed(1) + " mL";

    guidance.push(`⚠️ High sugar: add about ${addAmount} water.`);
  } else {
    guidance.push("✅ Sugar level looks good.");
  }

  // Alcohol corrections
  if (hasLiquor) {
    const targetABV = 7;

    if (finalABV < 5) {
      // how much liquor needed?
      const liquorAddMl = (targetABV / liquorABV) * batchSizeMl - liquorMl;
      const addAmount = unit === "oz" ? (liquorAddMl / ozToMl).toFixed(2) + " oz" : liquorAddMl.toFixed(1) + " mL";
      guidance.push(`⚠️ Low alcohol: add about ${addAmount} liquor.`);
    } else if (finalABV > 9) {
      // how much water to dilute?
      const desiredTotalMl = (liquorMl * liquorABV) / targetABV;
      const waterAddMl = desiredTotalMl - batchSizeMl;
      const addAmount = unit === "oz" ? (waterAddMl / ozToMl).toFixed(2) + " oz" : waterAddMl.toFixed(1) + " mL";
      guidance.push(`⚠️ High alcohol: add about ${addAmount} water/mixer.`);
    } else {
      guidance.push("✅ Alcohol level looks good.");
    }
  }

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
