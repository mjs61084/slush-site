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

  // Results
  document.getElementById('mixerOut').innerText = `${data.mixer} ${unit}`;
  document.getElementById('waterOut').innerText = `${data.water} ${unit}`;
  document.getElementById('liquorOut').innerText = `${data.liquor} ${unit}`;

  if (hasLiquor) {
    document.getElementById('liquorCard').style.display = "block";
  } else {
    document.getElementById('liquorCard').style.display = "none";
  }

  // Guidance messages
  const guidanceBox = document.getElementById('guidance');
  guidanceBox.innerHTML = "";
  data.guidance.forEach(msg => {
    const p = document.createElement("p");
    p.innerText = msg;
    guidanceBox.appendChild(p);
  });
}

function resetForm() {
  document.getElementById('batchSize').value = 16;
  document.getElementById('unitSelect').value = "oz";
  document.getElementById('sugarGrams').value = 21;
  document.getElementById('liquorABV').value = 40;
  document.getElementById('hasLiquor').checked = false;

  document.getElementById('mixerOut').innerText = "0";
  document.getElementById('waterOut').innerText = "0";
  document.getElementById('liquorOut').innerText = "0";
  document.getElementById('liquorCard').style.display = "none";
  document.getElementById('guidance').innerHTML = "";
}

document.getElementById("calcBtn").addEventListener("click", calculate);
document.getElementById("resetBtn").addEventListener("click", resetForm);
