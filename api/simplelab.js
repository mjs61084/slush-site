export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { batchSize, sugarGrams, liquorABV, hasLiquor, unit } = req.body;

  // --- Constants ---
  const ozToMl = 29.57;
  const cupToMl = 236.588;
  const rhoWater = 1.0;

  // Convert batch size to mL
  let batchSizeMl = batchSize;
  if (unit === "oz") batchSizeMl = batchSize * ozToMl;
  if (unit === "cups") batchSizeMl = batchSize * cupToMl;

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
  let divider = 1;
  if (unit === "oz") divider = ozToMl;
  if (unit === "cups") divider = cupToMl;

  res.status(200).json({
    mixer: (mixerMl / divider).toFixed(2),
    water: (waterMl / divider).toFixed(2),
    liquor: (liquorMl / divider).toFixed(2)
  });
}
