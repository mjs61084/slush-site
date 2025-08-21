export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { batchSize, sugarGrams, liquorABV, hasLiquor, unit } = req.body;

  const ozToMl = 29.57;
  const rhoWater = 1.0;

  let batchSizeMl = unit === "oz" ? batchSize * ozToMl : batchSize;

  const currentBrix = (sugarGrams / (batchSizeMl * rhoWater)) * 100;
  const targetBrix = 12;
  const scale = targetBrix / currentBrix;

  let mixerMl = batchSizeMl * scale;
  let waterMl = batchSizeMl - mixerMl;
  let liquorMl = 0;

  if (hasLiquor && liquorABV > 0) {
    const targetABV = 7;
    const liquorFraction = targetABV / liquorABV;
    liquorMl = batchSizeMl * liquorFraction;
    waterMl -= liquorMl;
  }

  let divider = unit === "oz" ? ozToMl : 1;

  res.status(200).json({
    mixer: (mixerMl / divider).toFixed(2),
    water: (waterMl / divider).toFixed(2),
    liquor: (liquorMl / divider).toFixed(2)
  });
}
