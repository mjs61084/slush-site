export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { servingSize, sugarGrams, liquorABV, hasLiquor } = req.body;

  // --- Your secret math goes here ---
  const ozToMl = 29.57;
  const servingMl = servingSize * ozToMl;
  const targetBrix = 12;

  const currentBrix = (sugarGrams / servingMl) * 100;
  const scale = targetBrix / currentBrix;

  let mixer = servingSize * scale;
  let water = servingSize - mixer;
  let liquor = 0;

  if (hasLiquor) {
    liquor = servingSize * 0.07; // ~7% ABV target
    water -= liquor;
  }

  res.status(200).json({
    mixer: mixer.toFixed(2),
    water: water.toFixed(2),
    liquor: liquor.toFixed(2)
  });
}
