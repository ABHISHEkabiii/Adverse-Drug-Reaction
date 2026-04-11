<div align="center">

<!-- ✅ 3D ANIMATED TABLET BANNER — dashboard-matched colors -->
<svg width="900" height="200" viewBox="0 0 900 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Deep void background matching dashboard -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a"/>
      <stop offset="50%" style="stop-color:#111111"/>
      <stop offset="100%" style="stop-color:#0d0d0d"/>
    </linearGradient>
    <!-- Red accent gradient matching dashboard header -->
    <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#cc0000"/>
      <stop offset="100%" style="stop-color:#880000"/>
    </linearGradient>
    <!-- Tablet body gradient -->
    <linearGradient id="tabletGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e"/>
      <stop offset="40%" style="stop-color:#16213e"/>
      <stop offset="100%" style="stop-color:#0f3460"/>
    </linearGradient>
    <!-- Tablet screen red glow -->
    <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a0000"/>
      <stop offset="100%" style="stop-color:#0a0a0a"/>
    </linearGradient>
    <!-- Red glow filter -->
    <filter id="redGlow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <!-- Amber glow -->
    <filter id="amberGlow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="900" height="200" fill="url(#bgGrad)"/>

  <!-- Scanline overlay effect -->
  <rect width="900" height="200" fill="url(#bgGrad)" opacity="0.3"/>
  
  <!-- Grid lines subtle -->
  <line x1="0" y1="100" x2="900" y2="100" stroke="#ff000015" stroke-width="1"/>
  <line x1="450" y1="0" x2="450" y2="200" stroke="#ff000015" stroke-width="1"/>

  <!-- ═══ 3D TABLET — LEFT SIDE ═══ -->
  <!-- Tablet shadow/depth -->
  <ellipse cx="135" cy="185" rx="45" ry="8" fill="#cc000022"/>
  
  <!-- Tablet body (3D perspective) — back face -->
  <path d="M 90 165 L 90 35 Q 90 25 100 25 L 170 25 Q 180 25 180 35 L 180 165 Q 180 175 170 175 L 100 175 Q 90 175 90 165 Z" fill="#0f3460" stroke="#cc000044" stroke-width="1"/>
  
  <!-- 3D side depth (right) -->
  <path d="M 180 35 L 186 29 L 186 159 L 180 165 Z" fill="#0a1f3d"/>
  <!-- 3D bottom depth -->
  <path d="M 90 165 L 96 171 L 186 159 L 180 165 Z" fill="#08162e"/>
  <!-- 3D top highlight -->
  <path d="M 90 35 L 96 29 L 186 29 L 180 35 Z" fill="#1a4080"/>

  <!-- Tablet screen -->
  <rect x="95" y="32" width="80" height="137" rx="4" fill="url(#screenGrad)" stroke="#cc000066" stroke-width="0.5"/>
  
  <!-- Screen content — mini ADR gauge -->
  <text x="135" y="48" font-family="monospace" font-size="5" fill="#cc0000" text-anchor="middle">PHARMVIGILANCE AI</text>
  <line x1="100" y1="51" x2="170" y2="51" stroke="#cc000066" stroke-width="0.5"/>
  
  <!-- Mini gauge arc -->
  <path d="M 110 105 A 25 25 0 0 1 160 105" fill="none" stroke="#1a1a1a" stroke-width="6"/>
  <path d="M 110 105 A 25 25 0 0 1 148 80" fill="none" stroke="#f5a623" stroke-width="6" stroke-linecap="round">
    <animate attributeName="stroke-dasharray" values="0,50;39,11;39,11" dur="2s" begin="0.5s" fill="freeze"/>
    <animate attributeName="stroke" values="#cc0000;#f5a623;#f5a623" dur="2s" begin="0.5s" fill="freeze"/>
  </path>
  
  <!-- Gauge needle -->
  <line x1="135" y1="105" x2="148" y2="83" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" from="-90 135 105" to="0 135 105" dur="2s" begin="0.5s" fill="freeze"/>
  </line>
  <circle cx="135" cy="105" r="3" fill="#cc0000"/>
  
  <!-- Gauge text -->
  <text x="135" y="120" font-family="monospace" font-size="7" fill="#f5a623" text-anchor="middle" font-weight="bold">48%</text>
  <text x="135" y="128" font-family="monospace" font-size="4" fill="#666" text-anchor="middle">MEDIUM RISK</text>
  
  <!-- Mini bars -->
  <rect x="102" y="138" width="30" height="3" rx="1" fill="#1a1a1a"/>
  <rect x="102" y="138" width="22" height="3" rx="1" fill="#cc0000">
    <animate attributeName="width" from="0" to="22" dur="1.5s" begin="1s" fill="freeze"/>
  </rect>
  <text x="102" y="136" font-family="monospace" font-size="3.5" fill="#888">Drug Risk</text>
  
  <rect x="102" y="148" width="30" height="3" rx="1" fill="#1a1a1a"/>
  <rect x="102" y="148" width="18" height="3" rx="1" fill="#f5a623">
    <animate attributeName="width" from="0" to="18" dur="1.5s" begin="1.2s" fill="freeze"/>
  </rect>
  <text x="102" y="146" font-family="monospace" font-size="3.5" fill="#888">Age Factor</text>

  <!-- Tablet home button -->
  <circle cx="135" cy="172" r="3" fill="none" stroke="#cc000088" stroke-width="0.8"/>
  
  <!-- Red glow around tablet -->
  <rect x="88" y="23" width="102" height="156" rx="12" fill="none" stroke="#cc0000" stroke-width="0.5" opacity="0.4" filter="url(#softGlow)">
    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
  </rect>

  <!-- ═══ TITLE TEXT — CENTER/RIGHT ═══ -->
  <!-- Main title -->
  <text x="230" y="68" font-family="'Courier New', monospace" font-size="38" font-weight="900" fill="#cc0000" filter="url(#redGlow)" letter-spacing="2">
    PHARM
  </text>
  <text x="230" y="68" font-family="'Courier New', monospace" font-size="38" font-weight="900" fill="#ffffff" letter-spacing="2" dx="120">
    VIGILANCE
  </text>
  
  <!-- Subtitle line -->
  <text x="232" y="90" font-family="'Courier New', monospace" font-size="13" fill="#cc0000" letter-spacing="8" font-weight="bold">
    AI  •  ADVANCED DRUG REACTION INTELLIGENCE
  </text>
  
  <!-- Divider line -->
  <line x1="230" y1="100" x2="870" y2="100" stroke="#cc0000" stroke-width="1" opacity="0.6"/>
  <line x1="230" y1="102" x2="870" y2="102" stroke="#cc000033" stroke-width="0.5"/>

  <!-- Metrics row -->
  <!-- AUC badge -->
  <rect x="232" y="112" width="90" height="22" rx="3" fill="#1a0000" stroke="#cc0000" stroke-width="1"/>
  <text x="237" y="121" font-family="monospace" font-size="6" fill="#888888">ROC-AUC</text>
  <text x="237" y="131" font-family="monospace" font-size="9" fill="#cc0000" font-weight="bold">0.912</text>

  <!-- Accuracy badge -->
  <rect x="332" y="112" width="90" height="22" rx="3" fill="#001a00" stroke="#22cc22" stroke-width="1"/>
  <text x="337" y="121" font-family="monospace" font-size="6" fill="#888888">ACCURACY</text>
  <text x="337" y="131" font-family="monospace" font-size="9" fill="#22cc22" font-weight="bold">83.2%</text>

  <!-- Samples badge -->
  <rect x="432" y="112" width="90" height="22" rx="3" fill="#1a1000" stroke="#f5a623" stroke-width="1"/>
  <text x="437" y="121" font-family="monospace" font-size="6" fill="#888888">SAMPLES</text>
  <text x="437" y="131" font-family="monospace" font-size="9" fill="#f5a623" font-weight="bold">3,000</text>

  <!-- Model badge -->
  <rect x="532" y="112" width="120" height="22" rx="3" fill="#0a0a1a" stroke="#4466ff" stroke-width="1"/>
  <text x="537" y="121" font-family="monospace" font-size="6" fill="#888888">MODEL</text>
  <text x="537" y="131" font-family="monospace" font-size="9" fill="#4466ff" font-weight="bold">RANDOM FOREST</text>

  <!-- Status indicator -->
  <circle cx="680" cy="118" r="4" fill="#00ff44">
    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
  </circle>
  <text x="690" y="122" font-family="monospace" font-size="8" fill="#00ff44">SYSTEM ONLINE</text>
  
  <!-- Tagline -->
  <text x="232" y="158" font-family="'Courier New', monospace" font-size="11" fill="#555555" letter-spacing="1">
    Predict Adverse Drug Reactions Before They Happen
  </text>
  
  <!-- Tech pills -->
  <rect x="232" y="166" width="55" height="14" rx="7" fill="#cc000022" stroke="#cc000066" stroke-width="0.8"/>
  <text x="260" y="176" font-family="monospace" font-size="7" fill="#cc0000" text-anchor="middle">Python 3.10</text>
  
  <rect x="295" y="166" width="40" height="14" rx="7" fill="#cc000022" stroke="#cc000066" stroke-width="0.8"/>
  <text x="315" y="176" font-family="monospace" font-size="7" fill="#cc0000" text-anchor="middle">Flask</text>
  
  <rect x="343" y="166" width="65" height="14" rx="7" fill="#cc000022" stroke="#cc000066" stroke-width="0.8"/>
  <text x="376" y="176" font-family="monospace" font-size="7" fill="#cc0000" text-anchor="middle">scikit-learn</text>
  
  <rect x="416" y="166" width="55" height="14" rx="7" fill="#cc000022" stroke="#cc000066" stroke-width="0.8"/>
  <text x="444" y="176" font-family="monospace" font-size="7" fill="#cc0000" text-anchor="middle">Chart.js</text>

  <rect x="479" y="166" width="55" height="14" rx="7" fill="#cc000022" stroke="#cc000066" stroke-width="0.8"/>
  <text x="507" y="176" font-family="monospace" font-size="7" fill="#cc0000" text-anchor="middle">REST API</text>
  
  <!-- Floating particles -->
  <circle cx="820" cy="40" r="2" fill="#cc0000" opacity="0.6">
    <animate attributeName="cy" values="40;30;40" dur="4s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite"/>
  </circle>
  <circle cx="850" cy="60" r="1.5" fill="#f5a623" opacity="0.5">
    <animate attributeName="cy" values="60;50;60" dur="3s" repeatCount="indefinite"/>
  </circle>
  <circle cx="800" cy="80" r="1" fill="#cc0000" opacity="0.4">
    <animate attributeName="cy" values="80;70;80" dur="5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="870" cy="150" r="2" fill="#cc0000" opacity="0.3">
    <animate attributeName="cy" values="150;140;150" dur="3.5s" repeatCount="indefinite"/>
  </circle>
</svg>

<br/>

<!-- BADGES — dashboard red/amber/green palette -->
![Python](https://img.shields.io/badge/Python-3.10-cc0000?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-2.x-880000?style=for-the-badge&logo=flask&logoColor=white)
![RandomForest](https://img.shields.io/badge/Random_Forest-Classifier-f5a623?style=for-the-badge&logo=scikit-learn&logoColor=black)
![scikit-learn](https://img.shields.io/badge/scikit--learn-ML-f5a623?style=for-the-badge&logo=scikit-learn&logoColor=black)

![Status](https://img.shields.io/badge/Status-ONLINE-00ff44?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-cc0000?style=flat-square)
![ROC-AUC](https://img.shields.io/badge/ROC--AUC-0.912-cc0000?style=flat-square)
![Accuracy](https://img.shields.io/badge/Accuracy-83.2%25-f5a623?style=flat-square)
![Samples](https://img.shields.io/badge/Samples-3000-444444?style=flat-square)
![Drugs](https://img.shields.io/badge/Drugs-10_Profiled-880000?style=flat-square)

</div>

---

## 🔍 What is PharmVigilance AI?

> A clinical AI system that predicts **Adverse Drug Reactions (ADRs)** from patient profiles using a Random Forest model served via a Flask REST API — with a dark-themed real-time intelligence dashboard for risk assessment, dosage simulation, and drug profiling.

Adverse Drug Reactions are a leading cause of preventable hospitalisations worldwide. PharmVigilance AI gives clinicians a **proactive, explainable AI platform** that doesn't just flag risk — it shows exactly which patient factors are driving it, and simulates how risk evolves across the entire dosage range.

---

## 🎯 Problem → Solution

```
❌ BEFORE PharmVigilance AI                  ✅ AFTER PharmVigilance AI
──────────────────────────────────────────   ─────────────────────────────────────────
ADRs detected after hospitalisation    →     Risk scored BEFORE medication is given
No insight into WHY a reaction occurs  →     Per-feature risk breakdown shown live
Static dosage protocols                →     Full dosage sweep simulation (10–500mg)
10 drugs with unknown relative risk    →     All 10 profiled with baseline ADR rates
No API — isolated clinical tools       →     REST API ready for EHR integration
```

---

## 🖥️ Dashboard Preview

<div align="center">

> ⚡ **Real-time dashboard — open `index.html` with `app.py` running on port 5000**

**Full Dashboard Overview**
<img src="./assets/dashboard.png" width="100%" alt="Dashboard Overview"/>

<br/>

**ADR Risk Assessment Panel**
<img src="./assets/risk_panel.png" width="100%" alt="ADR Risk Panel"/>

<br/>

**Dosage Simulation Chart**
<img src="./assets/simulation_chart.png" width="100%" alt="Dosage Simulation"/>

<br/>

**Drug Risk Profile**
<img src="./assets/drug_profile.png" width="100%" alt="Drug Risk Profile"/>

<br/>

**Feature Importance Chart**
<img src="./assets/feature_importance.png" width="100%" alt="Feature Importance"/>

</div>

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     FRONTEND  (index.html)                       │
│   Patient Profile Sidebar  ──►  POST /predict  ──►  Risk Gauge   │
│   Simulation Range         ──►  POST /simulate ──►  Line Chart   │
│   Drug Selector            ──►  GET  /drugs    ──►  Bar Chart    │
└──────────────────────────┬───────────────────────────────────────┘
                           │  REST (JSON)
┌──────────────────────────▼───────────────────────────────────────┐
│                     FLASK API  (app.py)                          │
│   /predict   →  feature vector  →  model.predict_proba()         │
│   /simulate  →  dosage sweep    →  batch predict_proba()         │
│   /drugs     →  static drug risk table                           │
│   /health    →  service status                                   │
└──────────────────────────┬───────────────────────────────────────┘
                           │  pickle.load()
┌──────────────────────────▼───────────────────────────────────────┐
│              RANDOM FOREST MODEL  (model.pkl)                    │
│   Features: age · dosage · diabetes · hypertension · gender      │
│   n_estimators=200 · max_depth=10 · class_weight=balanced        │
└──────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|-------|-----------|---------|
| 🤖 **ML Model** | Random Forest (sklearn) | ADR probability classifier |
| 🌐 **API** | Flask 2.x | REST endpoints for predict / simulate / drugs |
| 📊 **Frontend** | Vanilla JS + Chart.js | Real-time gauges, charts, simulation plots |
| 🎨 **UI** | Dark CSS + Animations | Futuristic clinical dashboard |
| 💾 **Serialisation** | pickle | Model persistence and reload |
| 📐 **Data** | pandas + NumPy | Synthetic ADR dataset generation |

</div>

---

## 📦 Dataset

Synthetically generated clinical dataset modelled on published ADR risk formulas.

| Parameter | Value |
|-----------|-------|
| Total Samples | 3,000 |
| Train / Test Split | 80% / 20% |
| ADR Positive Rate | ~48% (class-balanced) |
| Features | 5 — age, dosage, diabetes, hypertension, gender |
| Label | Binary ADR occurrence (0 = no reaction, 1 = reaction) |

**Risk probability formula for label generation:**

```python
P(ADR) = 0.15                          # base rate
       + 0.002 × max(0, age − 50)      # age penalty above 50
       + 0.002 × (dosage / 10)         # dosage scaling
       + 0.10  × diabetes              # comorbidity factor
       + 0.08  × hypertension          # comorbidity factor
       + 0.05  × gender                # demographic factor
# Clipped to [0, 0.95], sampled stochastically for realistic label noise
```

---

## 📊 Model Performance

**Random Forest Classifier** — trained on 2,400 samples, evaluated on 600.

| Metric | Score |
|--------|-------|
| Accuracy | ~0.832 |
| Precision | ~0.821 |
| Recall | ~0.843 |
| **ROC-AUC** | **~0.912** |

**Risk stratification thresholds:**

| Probability | Risk Level |
|-------------|-----------|
| < 0.35 | 🟢 Low |
| 0.35 – 0.65 | 🟡 Medium |
| > 0.65 | 🔴 High |

**Example predictions:**

| Patient Profile | ADR Probability | Risk |
|----------------|----------------|------|
| Female, 68 yrs, Warfarin 150mg, Diabetic + HTN | 0.74 | 🔴 High |
| Male, 35 yrs, Amoxicillin 250mg, No comorbidities | 0.18 | 🟢 Low |
| Female, 55 yrs, Gabapentin 300mg, Hypertensive | 0.51 | 🟡 Medium |

---

## 🔌 API Endpoints

Base URL: `http://localhost:5000`

### `POST /predict` — Single patient ADR risk

```json
// Request
{ "age": 68, "dosage": 150, "diabetes": 1, "hypertension": 1, "gender": 1 }

// Response
{ "probability": 0.7423, "predicted_adr": 1, "risk_level": "High", "confidence": 74.2 }
```

### `POST /simulate` — Dosage sweep simulation

```json
// Request
{ "age": 55, "diabetes": 0, "hypertension": 1, "gender": 0,
  "dosage_min": 10, "dosage_max": 500, "steps": 50 }

// Response
{ "simulation": [
    { "dosage": 10,  "probability": 0.21, "risk_level": "Low" },
    { "dosage": 50,  "probability": 0.34, "risk_level": "Low" },
    { "dosage": 200, "probability": 0.61, "risk_level": "Medium" }
  ], "steps": 50 }
```

### `GET /drugs` — Drug risk profiles

Returns all 10 drugs with base ADR risk percentages.

### `GET /health` — API status + model load state

---

## 💊 Drug Risk Profile

| Drug | Base ADR Risk |
|------|-------------|
| Warfarin | 🔴 35.0% |
| Gabapentin | 🔴 28.0% |
| Lisinopril | 🟡 25.0% |
| Ibuprofen | 🟡 22.0% |
| Aspirin | 🟡 20.0% |
| Metoprolol | 🟡 20.0% |
| Atorvastatin | 🟡 18.0% |
| Metformin | 🟢 15.0% |
| Amoxicillin | 🟢 12.0% |
| Omeprazole | 🟢 10.0% |

---

## 🚀 Quickstart

```bash
# 1. Clone
git clone https://github.com/yourusername/pharmvigilance-ai.git
cd pharmvigilance-ai/pharmvigilance_v2

# 2. Install
pip install -r requirements.txt

# 3. Train model
python train_model.py
# → Accuracy: 0.832 | ROC-AUC: 0.912 | Saved → model.pkl

# 4. Launch API
python app.py
# → Running on http://0.0.0.0:5000

# 5. Open dashboard
open index.html   # make sure app.py is running first
```

---

## 📁 Project Structure

```
pharmvigilance_v2/
│
├── 🐍 app.py              ← Flask REST API (predict · simulate · drugs · health)
├── 🧠 train_model.py      ← Synthetic data generation + Random Forest training
├── 📦 model.pkl           ← Serialised trained model
├── 📋 requirements.txt    ← Python dependencies
│
├── 🖥️  index.html          ← Single-page dark dashboard UI
├── 🎨 style.css           ← Dark theme · animations · gauge · grid
└── ⚡ script.js           ← API calls · Chart.js · UI interactions
```

---

## 🎛️ Dashboard Features

| Panel | Description |
|-------|-------------|
| **ADR Risk Gauge** | Animated semicircular gauge — ADR probability + Low/Medium/High badge |
| **Risk Factor Breakdown** | Per-feature contribution bars (age, dosage, diabetes, hypertension, gender) |
| **Feature Importance** | Static Random Forest global feature weight chart |
| **Dosage Simulation** | Live line chart sweeping 10–500mg via `/simulate` |
| **Drug Risk Profile** | Horizontal bar chart of 10 drugs with base ADR rates via `/drugs` |
| **System Status** | Real-time clock + `SYSTEM ONLINE` indicator in top bar |

---

## 🛣️ Roadmap

- [ ] 🔍 SHAP explainability for per-patient feature attributions
- [ ] 💊 Multi-drug interaction modelling
- [ ] 🌍 Real-world data integration (FAERS, Yellow Card)
- [ ] ⚡ XGBoost / LightGBM upgrade for higher AUC
- [ ] 🗄️ Patient history tracking with database backend
- [ ] ☁️ Cloud deployment (AWS / Heroku) with auth layer
- [ ] 📈 Calibration curves + METEOR evaluation metrics

---

## 📚 References

- Bates et al. — *Incidence of Adverse Drug Events*, JAMA 1995
- Breiman — *Random Forests*, Machine Learning 2001
- FDA MedWatch — Pharmacovigilance reporting framework
- scikit-learn RandomForestClassifier documentation

---

## 👤 Author

**Abhishek**  
M.Sc. Computational Statistics & Data Analytics — VIT Vellore, School of Advanced Sciences

---

<div align="center">

<!-- FOOTER SVG — matching dashboard colors -->
<svg width="900" height="60" viewBox="0 0 900 60" xmlns="http://www.w3.org/2000/svg">
  <rect width="900" height="60" fill="#0a0a0a"/>
  <line x1="0" y1="1" x2="900" y2="1" stroke="#cc0000" stroke-width="1.5"/>
  <line x1="0" y1="3" x2="900" y2="3" stroke="#cc000033" stroke-width="0.5"/>
  
  <!-- Pulse dots -->
  <circle cx="50" cy="30" r="3" fill="#cc0000">
    <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="850" cy="30" r="3" fill="#cc0000">
    <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" begin="0.75s" repeatCount="indefinite"/>
  </circle>
  
  <text x="450" y="22" font-family="monospace" font-size="9" fill="#cc0000" text-anchor="middle" letter-spacing="3">PHARMVIGILANCE AI</text>
  <text x="450" y="38" font-family="monospace" font-size="7" fill="#555555" text-anchor="middle">Built with Flask · scikit-learn · Chart.js · Vanilla JS</text>
  <text x="450" y="52" font-family="monospace" font-size="6" fill="#333333" text-anchor="middle">Keeping patients safe through predictive AI</text>
</svg>

<br/>

![Made with Python](https://img.shields.io/badge/Made_with-Python-cc0000?style=flat-square&logo=python&logoColor=white)
![Powered by RF](https://img.shields.io/badge/Powered_by-Random_Forest_+_Flask-880000?style=flat-square)
![For Clinical AI](https://img.shields.io/badge/For-Clinical_AI_Innovation-f5a623?style=flat-square)

<sub>Built with ❤️ by Abhishek · PharmVigilance AI · Keeping patients safe</sub>

</div>
