/* ══════════════════════════════════════════════════════
   PHARMVIGILANCE AI — script.js
   All logic: charts, prediction, simulation, animations
   ══════════════════════════════════════════════════════ */

// ── DRUG BASE RISK TABLE ──────────────────────────────
const DRUG_RISK = {
  Warfarin: 0.35, Aspirin: 0.20, Metformin: 0.15,
  Lisinopril: 0.25, Gabapentin: 0.28, Ibuprofen: 0.22,
  Atorvastatin: 0.18, Amoxicillin: 0.12,
  Metoprolol: 0.20, Omeprazole: 0.10
};

const DRUG_RISK_DISPLAY = {
  Warfarin: 35, Aspirin: 20, Metformin: 15,
  Lisinopril: 25, Gabapentin: 28, Ibuprofen: 22,
  Atorvastatin: 18, Amoxicillin: 12,
  Metoprolol: 20, Omeprazole: 10
};

// ── STATE ─────────────────────────────────────────────
let state = {
  diabetes: true,
  hypertension: true,
  featureChart: null,
  simChart: null,
  drugChart: null,
  logEntries: [],
  lastProbability: null,
};

// ── CLOCK ─────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  const el = document.getElementById('clock');
  if (el) el.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// ── COMORBIDITY TOGGLES ───────────────────────────────
function toggleComorbidity(which) {
  if (which === 'diab') {
    state.diabetes = !state.diabetes;
    document.getElementById('diabSwitch').classList.toggle('active', state.diabetes);
    document.getElementById('diabBadge').classList.toggle('active', state.diabetes);
    document.getElementById('diabBadge').textContent = state.diabetes ? 'ON' : 'OFF';
    document.getElementById('diabetes').value = state.diabetes ? 1 : 0;
    document.getElementById('metaDiabVal').textContent = state.diabetes ? 'YES' : 'NO';
  } else {
    state.hypertension = !state.hypertension;
    document.getElementById('htnSwitch').classList.toggle('active', state.hypertension);
    document.getElementById('htnBadge').classList.toggle('active', state.hypertension);
    document.getElementById('htnBadge').textContent = state.hypertension ? 'ON' : 'OFF';
    document.getElementById('hypertension').value = state.hypertension ? 1 : 0;
    document.getElementById('metaHtnVal').textContent = state.hypertension ? 'YES' : 'NO';
  }
}

// ── SLIDER SYNC ───────────────────────────────────────
function initSliders() {
  const ageSl   = document.getElementById('age');
  const doseSl  = document.getElementById('dosage');
  const drugSel = document.getElementById('drug');
  const genRadios = document.querySelectorAll('input[name="gender"]');

  ageSl.addEventListener('input', () => {
    document.getElementById('ageVal').textContent = ageSl.value;
    document.getElementById('metaAgeVal').textContent = ageSl.value + ' yrs';
    updateSliderFill('age', 18, 85);
  });

  doseSl.addEventListener('input', () => {
    document.getElementById('doseVal').textContent = doseSl.value;
    document.getElementById('metaDoseVal').textContent = doseSl.value + ' mg';
    updateSliderFill('dosage', 10, 500);
  });

  drugSel.addEventListener('change', () => {
    document.getElementById('metaDrugVal').textContent = drugSel.value;
    updateDrugChart();
  });

  genRadios.forEach(r => {
    r.addEventListener('change', () => {
      document.getElementById('metaGenderVal').textContent = r.value;
      document.querySelectorAll('.radio-btn').forEach(b => b.classList.remove('active'));
      r.parentElement.classList.add('active');
    });
  });

  updateSliderFill('age', 18, 85);
  updateSliderFill('dosage', 10, 500);
}

function updateSliderFill(id, min, max) {
  const sl = document.getElementById(id);
  const pct = ((sl.value - min) / (max - min)) * 100;
  sl.style.background = `linear-gradient(to right, #dc2626 ${pct}%, #2d2d2d ${pct}%)`;
}

// ── COMPUTE RISK (client-side fallback) ───────────────
function computeRisk(drug, age, gender, dosage, diab, htn) {
  const base     = DRUG_RISK[drug] || 0.20;
  const ageFactor  = 0.003 * Math.max(0, age - 50);
  const doseFactor = 0.002 * (dosage / 10);
  const diabFactor = diab ? 0.10 : 0;
  const htnFactor  = htn  ? 0.08 : 0;
  const genFactor  = (gender === 'Female') ? 0.05 : 0;
  return Math.min(base + ageFactor + doseFactor + diabFactor + htnFactor + genFactor, 0.95);
}

function getRiskLevel(prob) {
  if (prob < 0.35) return 'Low';
  if (prob < 0.65) return 'Medium';
  return 'High';
}

// ── GAUGE UPDATE ──────────────────────────────────────
function updateGauge(prob) {
  const pct = prob * 100;
  const arc = 283;
  const offset = arc - (arc * prob);

  const gaugeArc = document.getElementById('gaugeArc');
  const needle   = document.getElementById('needle');

  // Arc color based on risk
  let arcColor;
  if (prob < 0.35)      arcColor = '#22c55e';
  else if (prob < 0.65) arcColor = '#f59e0b';
  else                  arcColor = '#dc2626';

  gaugeArc.style.stroke = arcColor;
  gaugeArc.setAttribute('stroke-dashoffset', offset.toFixed(2));

  // Needle rotation: -90° = 0%, 90° = 100%
  const angle = -90 + (180 * prob);
  needle.setAttribute('transform', `rotate(${angle.toFixed(1)}, 110, 120)`);

  // Probability text
  document.getElementById('probText').textContent = Math.round(pct) + '%';
}

// ── RISK BADGE & OUTCOME ──────────────────────────────
function updateRiskUI(prob, level) {
  const badge   = document.getElementById('riskBadge');
  const outcome = document.getElementById('riskOutcome');
  const icon    = document.getElementById('outcomeIcon');
  const text    = document.getElementById('outcomeText');

  badge.textContent = level.toUpperCase() + ' RISK';
  badge.className = 'card-badge ' + level.toLowerCase();

  const conf = Math.round((level === 'Low' ? (1 - prob) : prob) * 100);
  document.getElementById('confFill').style.width = conf + '%';
  document.getElementById('confVal').textContent = conf + '%';

  if (level === 'Low') {
    outcome.style.borderColor = 'rgba(34,197,94,0.3)';
    outcome.style.background  = 'rgba(34,197,94,0.06)';
    icon.textContent = '✓';
    icon.style.color = '#22c55e';
    text.textContent = 'No ADR predicted — Low risk profile';
    text.style.color = '#22c55e';
  } else if (level === 'Medium') {
    outcome.style.borderColor = 'rgba(245,158,11,0.3)';
    outcome.style.background  = 'rgba(245,158,11,0.06)';
    icon.textContent = '⚠';
    icon.style.color = '#f59e0b';
    text.textContent = 'Monitor closely — Medium ADR risk';
    text.style.color = '#f59e0b';
  } else {
    outcome.style.borderColor = 'rgba(220,38,38,0.4)';
    outcome.style.background  = 'rgba(220,38,38,0.08)';
    icon.textContent = '✕';
    icon.style.color = '#dc2626';
    text.textContent = 'ADR LIKELY — High risk detected!';
    text.style.color = '#dc2626';
  }
}

// ── FACTOR BREAKDOWN ──────────────────────────────────
function updateFactors(drug, age, gender, dosage, diab, htn) {
  const base     = DRUG_RISK[drug] || 0.20;
  const ageFactor  = 0.003 * Math.max(0, age - 50);
  const doseFactor = 0.002 * (dosage / 10);
  const diabFactor = diab ? 0.10 : 0;
  const htnFactor  = htn  ? 0.08 : 0;
  const genFactor  = (gender === 'Female') ? 0.05 : 0;
  const total = base + ageFactor + doseFactor + diabFactor + htnFactor + genFactor;

  const factors = [
    { id: 'drug',  val: base },
    { id: 'age',   val: ageFactor },
    { id: 'dose',  val: doseFactor },
    { id: 'diab',  val: diabFactor },
    { id: 'htn',   val: htnFactor },
    { id: 'gen',   val: genFactor },
  ];

  factors.forEach(f => {
    const pct = total > 0 ? (f.val / total * 100) : 0;
    document.getElementById(`fb-${f.id}`).style.width = pct.toFixed(1) + '%';
    document.getElementById(`fp-${f.id}`).textContent = Math.round(f.val * 100) + '%';
  });

  const totalRow = document.getElementById('totalRiskRow');
  document.getElementById('totalRiskVal').textContent = Math.round(Math.min(total, 0.95) * 100) + '%';
  totalRow.style.opacity = '1';
}

// ── LOG ───────────────────────────────────────────────
function addLog(drug, dosage, prob, level) {
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  const entry = { drug, dosage, prob, level, time };
  state.logEntries.unshift(entry);
  if (state.logEntries.length > 8) state.logEntries.pop();
  renderLog();
}

function renderLog() {
  const list = document.getElementById('logList');
  if (state.logEntries.length === 0) {
    list.innerHTML = '<div class="log-empty">No analyses run yet</div>';
    return;
  }
  list.innerHTML = state.logEntries.map(e => `
    <div class="log-item">
      <div class="log-dot ${e.level.toLowerCase()}"></div>
      <div class="log-text">${e.drug} · ${e.dosage}mg · ${Math.round(e.prob*100)}%</div>
      <div class="log-time">${e.time}</div>
    </div>
  `).join('');
}

function clearLog() {
  state.logEntries = [];
  renderLog();
}

// ── HIGH RISK ALERT ───────────────────────────────────
function showAlert(prob, level, drug) {
  if (level !== 'High') return;
  document.getElementById('alertTitle').textContent = '⚠ HIGH RISK DETECTED';
  document.getElementById('alertMsg').textContent =
    `${drug} at this dosage shows ${Math.round(prob*100)}% ADR probability.\nImmediate clinical review recommended.`;
  document.getElementById('alertOverlay').style.display = 'flex';
}

function closeAlert() {
  document.getElementById('alertOverlay').style.display = 'none';
}

// ── FEATURE IMPORTANCE CHART ──────────────────────────
function initFeatureChart() {
  const ctx = document.getElementById('featureChart').getContext('2d');
  state.featureChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Dosage', 'Drug', 'Age', 'Hypert.', 'Diabetes', 'Gender'],
      datasets: [{
        data: [0.28, 0.24, 0.21, 0.12, 0.10, 0.05],
        backgroundColor: ['#dc2626','#c41e1e','#a81616','#8b0000','#6b0000','#4a0000'],
        borderColor: ['#ef4444','#dc2626','#c41e1e','#a81616','#8b0000','#6b0000'],
        borderWidth: 1, borderRadius: 3,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#555', font: { size: 10, family: 'DM Mono' } },
          border: { color: '#222' }
        },
        y: {
          beginAtZero: true, max: 0.35,
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: {
            color: '#555', font: { size: 10, family: 'DM Mono' },
            callback: v => Math.round(v * 100) + '%'
          },
          border: { color: '#222' }
        }
      },
      animation: { duration: 1000, easing: 'easeInOutQuart' }
    }
  });
}

// ── DRUG COMPARISON CHART ─────────────────────────────
function initDrugChart() {
  const ctx = document.getElementById('drugChart').getContext('2d');
  const drugs = Object.keys(DRUG_RISK_DISPLAY);
  const vals  = Object.values(DRUG_RISK_DISPLAY);

  state.drugChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: drugs,
      datasets: [{
        data: vals,
        backgroundColor: vals.map(v =>
          v >= 30 ? 'rgba(220,38,38,0.7)' :
          v >= 20 ? 'rgba(245,158,11,0.7)' :
                    'rgba(34,197,94,0.7)'
        ),
        borderColor: vals.map(v =>
          v >= 30 ? '#dc2626' : v >= 20 ? '#f59e0b' : '#22c55e'
        ),
        borderWidth: 1, borderRadius: 3,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#444', font: { size: 9, family: 'DM Mono' }, maxRotation: 45 },
          border: { color: '#222' }
        },
        y: {
          beginAtZero: true, max: 45,
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: {
            color: '#555', font: { size: 10, family: 'DM Mono' },
            callback: v => v + '%'
          },
          border: { color: '#222' }
        }
      },
      animation: { duration: 800 }
    }
  });
}

function updateDrugChart() {
  if (!state.drugChart) return;
  const selectedDrug = document.getElementById('drug').value;
  const drugs  = Object.keys(DRUG_RISK_DISPLAY);
  const vals   = Object.values(DRUG_RISK_DISPLAY);
  state.drugChart.data.datasets[0].backgroundColor = drugs.map((d, i) => {
    const isSelected = d === selectedDrug;
    const v = vals[i];
    if (isSelected) return '#ff1a1a';
    return v >= 30 ? 'rgba(220,38,38,0.5)' : v >= 20 ? 'rgba(245,158,11,0.5)' : 'rgba(34,197,94,0.5)';
  });
  state.drugChart.update();
}

// ── SIMULATION CHART ──────────────────────────────────
function initSimChart() {
  const ctx = document.getElementById('simChart').getContext('2d');
  state.simChart = new Chart(ctx, {
    type: 'line',
    data: { labels: [], datasets: [{
      data: [], borderColor: '#dc2626', borderWidth: 2,
      pointRadius: 0, tension: 0.4, fill: false,
    }]},
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#444', font: { size: 9, family: 'DM Mono' }, maxTicksLimit: 10 },
          border: { color: '#222' },
          title: { display: true, text: 'Dosage (mg)', color: '#444', font: { size: 10, family: 'DM Mono' } }
        },
        y: {
          min: 0, max: 1,
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: {
            color: '#555', font: { size: 10, family: 'DM Mono' },
            callback: v => Math.round(v * 100) + '%'
          },
          border: { color: '#222' },
          title: { display: true, text: 'ADR Risk', color: '#444', font: { size: 10, family: 'DM Mono' } }
        }
      },
      animation: { duration: 800, easing: 'easeInOutQuart' }
    },
    plugins: [{
      id: 'riskBands',
      beforeDraw(chart) {
        const { ctx, chartArea, scales } = chart;
        if (!chartArea) return;
        const yLow   = scales.y.getPixelForValue(0.35);
        const yMed   = scales.y.getPixelForValue(0.65);
        const yTop   = scales.y.getPixelForValue(1.0);
        const yBot   = scales.y.getPixelForValue(0);
        ctx.save();
        ctx.fillStyle = 'rgba(34,197,94,0.06)';
        ctx.fillRect(chartArea.left, yLow, chartArea.right - chartArea.left, yBot - yLow);
        ctx.fillStyle = 'rgba(245,158,11,0.06)';
        ctx.fillRect(chartArea.left, yMed, chartArea.right - chartArea.left, yLow - yMed);
        ctx.fillStyle = 'rgba(220,38,38,0.06)';
        ctx.fillRect(chartArea.left, yTop, chartArea.right - chartArea.left, yMed - yTop);
        ctx.restore();
      }
    }]
  });
}

// ── MAIN PREDICTION ───────────────────────────────────
async function runPrediction() {
  const drug   = document.getElementById('drug').value;
  const age    = parseInt(document.getElementById('age').value);
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const dosage = parseInt(document.getElementById('dosage').value);
  const diab   = state.diabetes;
  const htn    = state.hypertension;

  // Try Flask API first, fall back to client-side calculation
  let prob;
  try {
    const res = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        age, dosage, diabetes: diab ? 1 : 0,
        hypertension: htn ? 1 : 0,
        gender: gender === 'Female' ? 1 : 0
      }),
      signal: AbortSignal.timeout(2000)
    });
    const data = await res.json();
    prob = data.probability;
  } catch {
    // API offline — use client-side model
    prob = computeRisk(drug, age, gender, dosage, diab, htn);
  }

  const level = getRiskLevel(prob);
  state.lastProbability = prob;

  // Update all UI components
  updateGauge(prob);
  updateRiskUI(prob, level);
  updateFactors(drug, age, gender, dosage, diab, htn);
  addLog(drug, dosage, prob, level);

  // Show high-risk alert after brief delay
  if (level === 'High') {
    setTimeout(() => showAlert(prob, level, drug), 800);
  }
}

// ── SIMULATION ────────────────────────────────────────
async function runSimulation() {
  const drug   = document.getElementById('drug').value;
  const age    = parseInt(document.getElementById('age').value);
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const diab   = state.diabetes;
  const htn    = state.hypertension;

  const dosMin = parseInt(document.getElementById('simMin').value) || 10;
  const dosMax = parseInt(document.getElementById('simMax').value) || 500;

  document.getElementById('simLoading').style.display = 'flex';
  document.getElementById('simInsights').style.display = 'none';

  await new Promise(r => setTimeout(r, 400)); // Show loading

  const labels = [], values = [], pointColors = [];
  const steps = 60;

  for (let i = 0; i <= steps; i++) {
    const d = Math.round(dosMin + (dosMax - dosMin) * i / steps);
    const p = computeRisk(drug, age, gender, d, diab, htn);
    labels.push(d);
    values.push(parseFloat(p.toFixed(4)));
    pointColors.push(
      p < 0.35 ? '#22c55e' : p < 0.65 ? '#f59e0b' : '#dc2626'
    );
  }

  state.simChart.data.labels = labels;
  state.simChart.data.datasets[0].data = values;
  state.simChart.data.datasets[0].pointBackgroundColor = pointColors;
  state.simChart.data.datasets[0].pointRadius = values.map((v, i) => i % 5 === 0 ? 4 : 0);
  state.simChart.update();

  // Compute insight thresholds
  let safeMax = null, cautionStart = null, highStart = null;
  for (let i = 0; i < labels.length; i++) {
    const v = values[i];
    if (v < 0.35) safeMax = labels[i];
    if (v >= 0.35 && cautionStart === null) cautionStart = labels[i];
    if (v >= 0.65 && highStart === null) highStart = labels[i];
  }

  document.getElementById('safeThreshold').textContent    = safeMax ? `≤ ${safeMax} mg` : 'N/A';
  document.getElementById('cautionZone').textContent      = cautionStart ? `${cautionStart}+ mg` : 'N/A';
  document.getElementById('highRiskStart').textContent    = highStart ? `${highStart}+ mg` : 'N/A';
  document.getElementById('currentDoseInsight').textContent = document.getElementById('dosage').value + ' mg';

  document.getElementById('simLoading').style.display = 'none';
  document.getElementById('simInsights').style.display = 'flex';
}

// ── RESET ─────────────────────────────────────────────
function resetAll() {
  document.getElementById('age').value = 68;
  document.getElementById('dosage').value = 150;
  document.getElementById('drug').value = 'Warfarin';
  document.getElementById('ageVal').textContent = 68;
  document.getElementById('doseVal').textContent = 150;

  // Reset state
  if (!state.diabetes) toggleComorbidity('diab');
  if (!state.hypertension) toggleComorbidity('htn');

  // Reset gauge
  document.getElementById('gaugeArc').setAttribute('stroke-dashoffset', '283');
  document.getElementById('needle').setAttribute('transform', 'rotate(-90, 110, 120)');
  document.getElementById('probText').textContent = '--';
  document.getElementById('riskBadge').textContent = 'AWAITING';
  document.getElementById('riskBadge').className = 'card-badge';

  // Reset factor bars
  ['drug','age','dose','diab','htn','gen'].forEach(id => {
    document.getElementById(`fb-${id}`).style.width = '0%';
    document.getElementById(`fp-${id}`).textContent = '--';
  });
  document.getElementById('totalRiskRow').style.opacity = '0';

  // Reset outcome
  const out = document.getElementById('riskOutcome');
  out.style.borderColor = '';
  out.style.background = '';
  document.getElementById('outcomeIcon').textContent = '◈';
  document.getElementById('outcomeIcon').style.color = '';
  document.getElementById('outcomeText').textContent = 'Run analysis to see prediction';
  document.getElementById('outcomeText').style.color = '';
  document.getElementById('confFill').style.width = '0%';
  document.getElementById('confVal').textContent = '--%';

  updateSliderFill('age', 18, 85);
  updateSliderFill('dosage', 10, 500);
  document.getElementById('metaDrugVal').textContent = 'Warfarin';
  document.getElementById('metaDoseVal').textContent = '150 mg';
  document.getElementById('metaAgeVal').textContent = '68 yrs';
}

// ── INIT ──────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initSliders();
  initFeatureChart();
  initDrugChart();
  initSimChart();

  // Initial slider fills
  updateSliderFill('age', 18, 85);
  updateSliderFill('dosage', 10, 500);

  // Auto-run prediction on load for demo effect
  setTimeout(runPrediction, 600);
  setTimeout(runSimulation, 1200);
});
