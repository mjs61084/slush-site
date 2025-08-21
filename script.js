async function calculate() {
  const batchSize = parseFloat(document.getElementById('batchSize').value) || 0;
  const sugarGrams = parseFloat(document.getElementById('sugarGrams').value) || 0;
  const liquorABV = parseFloat(document.getElementById('liquorABV').value) || 0;
  const hasLiquor = document.getElementById('hasLiquor').checked;
  const unit = document.getElementById('unitSelect').value;

  const response = await fetch('/api/simplelab', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ batchSize, sugarGrams, liquorABV, hasLiquor, unit })
  });

  const data = await response.json();

  document.getElementById('mixerOut').innerText = `${data.mixer} ${unit}`;
  document.getElementById('waterOut').innerText = `${data.water} ${unit}`;

  if (hasLiquor) {
    document.getElementById('liquorCard').style.display = "block";
    document.getElementById('liquorOut').innerText = `${data.liquor} ${unit}`;
  } else {
    document.getElementById('liquorCard').style.display = "none";
  }
}

document.querySelectorAll("input, select").forEach(input => {
  input.addEventListener("input", calculate);
});

calculate();

