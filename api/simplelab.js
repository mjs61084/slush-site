export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { batchSize, sugarGrams, liquorABV, hasLiquor, unit } = req.body;

  // --- Constants ---
  const ozToMl = 29.57;
  const rhoWater = 1.0;

  // Convert batch size to mL
  let batchSizeMl = unit === "oz" ? batchSize * ozToMl : batchSize;

  // --- Calculate current °Brix ---
  const currentBrix = (sugarGrams / (batchSizeMl * rhoWater)) * 100;

  // --- Target baseline (12 °Brix like app) ---
  const targetBrix = 12;
  const scale = targetBrix / currentBrix;

  // --- Mixer & Water in mL ---
  let mixerMl = batchSizeMl * scale;
  let waterMl = batchSizeMl - mixerMl;
  let liquorMl = 0;

  // --- Liquor logic with ABV dial ---
  if (hasLiquor && liquorABV > 0) {
    const targetABV = 7; // %
    const liquorFraction = targetABV / liquorABV;
    liquorMl = batchSizeMl * liquorFraction;
    waterMl -= liquorMl;
  }

  // Convert back to selected unit
  let divider = unit === "oz" ? ozToMl : 1;

  res.status(200).json({
    mixer: (mixerMl / divider).toFixed(2),
    water: (waterMl / divider).toFixed(2),
    liquor: (liquorMl / divider).toFixed(2)
  });
}
