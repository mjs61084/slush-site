export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { batchSize, sugarGrams, liquorABV, hasLiquor } = req.body;

  // --- Constants ---
  const ozToMl = 29.57;
  const rhoWater = 1.0;

  // --- Convert batch size to mL ---
  const totalVolumeMl = batchSize * ozToMl;

  // --- Calculate current °Brix ---
  const totalSugar = sugarGrams;
  const currentBrix = (totalSugar / (totalVolumeMl * rhoWater)) * 100;

  // --- Target baseline (same as app) ---
  const targetBrix = 12;
  const scale = targetBrix / currentBrix;

  // --- Mixer & Water ---
  let mixer = batchSize * scale;
  let water = batchSize - mixer;
  let liquor = 0;

  // --- Liquor logic with ABV dial ---
  if (hasLiquor && liquorABV > 0) {
    // target ~7% ABV by volume, scaled by actual ABV %
    // stronger liquor → use less, weaker liquor → use more
    const targetABV = 7; // %
    const liquorFraction = targetABV / liquorABV;
    liquor = batchSize * liquorFraction;
    water -= liquor;
  }

  res.status(200).json({
    mixer: mixer.toFixed(2),
    water: water.toFixed(2),
    liquor: liquor.toFixed(2)
  });
}
