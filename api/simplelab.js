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

  // Target baseline
  const targetBrix = 12;
  const scale = targetBrix / currentBrix;

  // Mixer & Water
  let mixerMl = batchSizeMl * scale;
  let waterMl = batchSizeMl - mixerMl;
  let liquorMl = 0;

  // Liquor logic
  let finalABV = 0;
  if (hasLiquor && liquorABV > 0) {
    const targetABV = 7; // %
    const liquorFraction = targetABV / liquorABV;
    liquorMl = batchSizeMl * liquorFraction;
    waterMl -= liquorMl;
    finalABV = (liquorMl / batchSizeMl) * liquorABV;
  }

  // Guidance
  let guidance = [];
  if (currentBrix < 11) {
    guidance.push("⚠️ Low sugar: add more mixer.");
  } else if (currentBrix > 13.5) {
    guidance.push("⚠️ High sugar: add more water.");
  } else {
    guidance.push("✅ Sugar level looks good.");
  }

  if (hasLiquor) {
    if (finalABV < 5) {
      guidance.push("⚠️ Low alcohol: add more liquor.");
    } else if (finalABV > 9) {
      guidance.push("⚠️ High alcohol: dilute with water/mixer.");
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
