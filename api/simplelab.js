export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { batchSize, sugarGrams, liquorABV, hasLiquor } = req.body;

  // --- SimpleLab core logic (ported from your Swift math) ---
  const ozToMl = 29.57;
  const rhoWater = 1.0;

  // Volume in mL
  const totalVolumeMl = batchSize * ozToMl;

  // Current °Brix
  const currentBrix = (sugarGrams / (totalVolumeMl * rhoWater)) * 100;

  // Target range: ~12 °Brix baseline
  const targetBrix = 12;
  const scale = targetBrix / currentBrix;

  // Mixer & Water calculation
  let mixer = batchSize * scale;
  let water = batchSize - mixer;
  let liquor = 0;

  if (hasLiquor) {
    // Approximate ABV dial logic (7% target by volume)
    liquor = (batchSize * 0.07);
    water -= liquor;
  }

  res.status(200).json({
    mixer: mixer.toFixed(2),
    water: water.toFixed(2),
    liquor: liquor.toFixed(2)
  });
}
