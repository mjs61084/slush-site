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

  let liquorMl = 0;
  let finalABV = 0;

  if (hasLiquor && liquorABV > 0) {
    const targetABV = 7;
    const liquorFraction = targetABV / liquorABV;
    liquorMl = batchSizeMl * liquorFraction;
    finalABV = (liquorMl / batchSizeMl) * liquorABV;
  }

  // Guidance
  let guidance = [];

  // Sugar corrections
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

  // Alcohol corrections
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

  res.status(200).json({
    mixer: (batchSizeMl / (unit === "oz" ? ozToMl : 1)).toFixed(2),
    water: "0.00", // base water calc left simple
    liquor: (liquorMl / (unit === "oz" ? ozToMl : 1)).toFixed(2),
    brix: currentBrix.toFixed(1),
    abv: finalABV.toFixed(1),
    guidance
  });
}
