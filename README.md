# 💊 PharmVigilance AI
**Adverse Drug Reaction Intelligence Platform | Random Forest · Flask API · Interactive Dashboard**

![Python](https://img.shields.io/badge/Python-3.10-blue?style=flat-square&logo=python)
![Flask](https://img.shields.io/badge/Flask-2.x-black?style=flat-square&logo=flask)
![scikit-learn](https://img.shields.io/badge/scikit--learn-RandomForest-orange?style=flat-square&logo=scikit-learn)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> A clinical AI system that predicts Adverse Drug Reactions (ADRs) from patient profiles using a Random Forest model served via a Flask REST API, with a dark-themed real-time intelligence dashboard for risk assessment, dosage simulation, and drug profiling.

---

## 🖥️ Dashboard Preview

 ![Dashboard](assets/dashboard.png)

| ADR Risk Assessment | Dosage Simulation |
|---|---|
| ![Risk Panel](assets/risk_panel.png) | ![Simulation Chart](assets/simulation_chart.png) |

| Drug Risk Profile | Feature Importance |
|---|---|
| ![Drug Profile](assets/drug_profile.png) | ![Feature Importance](assets/feature_importance.png) |

---

## 📌 Table of Contents
- [Overview](#-overview)
- [Architecture](#-architecture)
- [Dataset](#-dataset)
- [Model Performance](#-model-performance)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Quickstart](#-quickstart)
- [Dashboard Features](#-dashboard-features)
- [Future Work](#-future-work)

---

## 🔍 Overview

Adverse Drug Reactions (ADRs) are a leading cause of preventable hospitalisations worldwide. **PharmVigilance AI** provides a clinician-facing platform that:

- Predicts individual ADR probability from **age, dosage, gender, and comorbidities**
- Runs **dosage sweep simulations** to visualise risk across the therapeutic range
- Profiles **10 high-risk drugs** with their baseline ADR rates
- Exposes all predictions via a clean **REST API** for downstream integration
- Renders results in a futuristic **real-time dark dashboard** with animated gauges, charts, and risk factor breakdowns

**Example predictions from the live dashboard:**

| Patient Profile | ADR Probability | Risk Level |
|---|---|---|
| Female, 68 yrs, Warfarin 150mg, Diabetic + HTN | 0.74 | 🔴 High |
| Male, 35 yrs, Amoxicillin 250mg, No comorbidities | 0.18 | 🟢 Low |
| Female, 55 yrs, Gabapentin 300mg, Hypertensive | 0.51 | 🟡 Medium |

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

## 📦 Dataset

Synthetically generated clinical dataset designed around published ADR risk formulas.

| Parameter | Value |
|---|---|
| Samples | 3,000 |
| Train / Test split | 80% / 20% |
| ADR Positive rate | ~48% (class-balanced) |
| Features | 5 (age, dosage, diabetes, hypertension, gender) |
| Label | Binary ADR occurrence (0/1) |

**Risk probability formula used for label generation:**

```
P(ADR) = 0.15 (base)
       + 0.002 × max(0, age − 50)
       + 0.002 × (dosage / 10)
       + 0.10  × diabetes
       + 0.08  × hypertension
       + 0.05  × gender
```

Clipped to [0, 0.95] and sampled stochastically for realistic label noise.

**Drug base risk table (10 drugs):**

| Drug | Base ADR Risk |
|---|---|
| Warfarin | 35.0% |
| Gabapentin | 28.0% |
| Lisinopril | 25.0% |
| Ibuprofen | 22.0% |
| Aspirin | 20.0% |
| Metoprolol | 20.0% |
| Metformin | 15.0% |
| Atorvastatin | 18.0% |
| Amoxicillin | 12.0% |
| Omeprazole | 10.0% |

---

## 📊 Model Performance

**Random Forest Classifier** — trained on 2,400 samples, evaluated on 600.

| Metric | Score |
|---|---|
| Accuracy | ~0.83 |
| Precision | ~0.82 |
| Recall | ~0.84 |
| ROC-AUC | ~0.91 |

> Re-run `train_model.py` to reproduce exact scores with `random_state=42`.

**Risk stratification thresholds:**

| Probability Range | Risk Level |
|---|---|
| < 0.35 | 🟢 Low |
| 0.35 – 0.65 | 🟡 Medium |
| > 0.65 | 🔴 High |

---

## 🔌 API Endpoints

Base URL: `http://localhost:5000`

### `POST /predict`
Predict ADR risk for a single patient.

**Request:**
```json
{
  "age": 68,
  "dosage": 150,
  "diabetes": 1,
  "hypertension": 1,
  "gender": 1
}
```

**Response:**
```json
{
  "probability": 0.7423,
  "predicted_adr": 1,
  "risk_level": "High",
  "confidence": 74.2
}
```

---

### `POST /simulate`
Sweep a dosage range and return risk at each step.

**Request:**
```json
{
  "age": 55,
  "diabetes": 0,
  "hypertension": 1,
  "gender": 0,
  "dosage_min": 10,
  "dosage_max": 500,
  "steps": 50
}
```

**Response:**
```json
{
  "simulation": [
    {"dosage": 10, "probability": 0.21, "risk_level": "Low"},
    {"dosage": 50, "probability": 0.34, "risk_level": "Low"},
    ...
  ],
  "steps": 50
}
```

---

### `GET /drugs`
Returns all 10 drugs with base ADR risk percentages.

### `GET /health`
Returns API status and model load state.

---

## 📁 Project Structure

```
pharmvigilance_v2/
│
├── app.py                # Flask REST API — predict, simulate, drugs, health
├── train_model.py        # Synthetic data generation + Random Forest training
├── model.pkl             # Serialised trained model (generated by train_model.py)
├── requirements.txt      # Python dependencies
│
├── index.html            # Single-page dashboard UI
├── style.css             # Dark-theme styles, animations, gauge, grid
└── script.js             # API calls, Chart.js rendering, UI interactions
```

---

## ⚡ Quickstart

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/pharmvigilance-ai.git
cd pharmvigilance-ai/pharmvigilance_v2
pip install -r requirements.txt
```

### 2. Train the Model

```bash
python train_model.py
# Output:
# Dataset: 3000 samples, 48.3% ADR positive rate
# Accuracy:  0.832
# Precision: 0.821
# Recall:    0.843
# ROC-AUC:   0.912
# Model saved → model.pkl
```

### 3. Launch the API

```bash
python app.py
# Running on http://0.0.0.0:5000
```

### 4. Open the Dashboard

Open `index.html` in your browser — adjust patient parameters in the sidebar and click **ANALYSE RISK** to get live predictions.

> ⚠️ Make sure `app.py` is running on port 5000 before opening the dashboard.

---

## 🎛️ Dashboard Features

| Panel | Description |
|---|---|
| **ADR Risk Gauge** | Animated semicircular gauge showing ADR probability and risk badge (Low / Medium / High) |
| **Risk Factor Breakdown** | Per-feature contribution bars (age, dosage, diabetes, hypertension, gender) |
| **Model Feature Importance** | Static Random Forest feature weight chart |
| **Dosage vs ADR Simulation** | Live line chart sweeping the full dosage range via `/simulate` |
| **Drug Risk Profile** | Horizontal bar chart of base risk for all 10 drugs via `/drugs` |
| **System Clock & Status** | Real-time clock and `SYSTEM ONLINE` indicator in the top bar |

---

## 🔮 Future Work

- [ ] Add SHAP explainability for per-patient feature attributions
- [ ] Extend to multi-drug interaction modelling
- [ ] Integrate real-world pharmacovigilance datasets (FAERS, Yellow Card)
- [ ] Replace Random Forest with XGBoost / LightGBM for higher AUC
- [ ] Add patient history tracking (database backend)
- [ ] Deploy to cloud (AWS / Heroku) with authentication layer
- [ ] METEOR and calibration curve evaluation

---

## 📚 References

- Bates et al. — *Incidence of Adverse Drug Events and Potential Adverse Drug Events*, JAMA 1995
- Breiman — *Random Forests*, Machine Learning 2001
- FDA MedWatch — Pharmacovigilance reporting framework
- scikit-learn RandomForestClassifier documentation

---

## 👤 Author

**Abhishek**  
M.Sc. Computational Statistics & Data Analytics — VIT Vellore  
School of Advanced Sciences

Built with ❤️ using Flask · scikit-learn · Chart.js · Vanilla JS
