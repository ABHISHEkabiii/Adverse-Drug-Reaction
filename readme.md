# PharmVigilance AI — How to Run & Use the Project

## Prerequisites

Make sure you have these installed before starting:

- Python 3.8 or higher
- pip (Python package manager)
- A modern web browser (Chrome, Firefox, Edge)

---

## Step 1 — Extract the Project

```bash
unzip pharmvigilance_v2_1.zip
cd pharmvigilance_v2
```

---

## Step 2 — Install Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- `flask` — backend web server
- `flask-cors` — allows the frontend to talk to the API
- `scikit-learn` — machine learning model
- `pandas` — data handling
- `numpy` — numerical computation

---

## Step 3 — Train the Model

> Skip this step if `model.pkl` already exists in the folder.

```bash
python train_model.py
```

**What this does:**
- Generates 3,000 synthetic patient records
- Trains a Random Forest classifier on age, dosage, diabetes, hypertension, and gender
- Saves the trained model as `model.pkl`
- Prints accuracy, precision, recall, and ROC-AUC to the console

**Expected output:**
```
Dataset: 3000 samples, 43.2% ADR positive rate
Accuracy:  0.721
Precision: 0.703
Recall:    0.748
ROC-AUC:   0.789
Model saved → model.pkl
```

---

## Step 4 — Start the Flask API

```bash
python app.py
```

The API will start at: **http://localhost:5000**

**Expected output:**
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

> Keep this terminal open while using the app. The API must be running for the frontend to work.

---

## Step 5 — Open the Frontend

Open `index.html` in your browser. You can do this two ways:

**Option A — Direct open (simplest):**
Just double-click `index.html` in your file explorer.

**Option B — Local server (recommended):**
```bash
# In a second terminal, from inside the project folder:
python -m http.server 8080
```
Then visit: **http://localhost:8080**

---

## Using the Web App

Once both the API and frontend are running:

### 1. Fill in the Patient Profile (left sidebar)
| Field | How to use |
|---|---|
| Drug Selection | Pick a drug from the dropdown |
| Age | Drag the slider (18–85 years) |
| Gender | Click Female or Male |
| Dosage | Drag the slider (10–500 mg) |
| Diabetes | Click the toggle to enable/disable |
| Hypertension | Click the toggle to enable/disable |

### 2. Run a Prediction
Click **"ANALYSE PATIENT"** — the dashboard updates with:
- ADR risk probability (0–100%)
- Risk level badge: `LOW` / `MEDIUM` / `HIGH`
- Confidence score
- Risk factor breakdown bars
- Feature importance chart

### 3. Run a Simulation
Set the **Simulation Range** (min dosage, max dosage, number of steps) in the sidebar, then click **"SIMULATE"** to see how ADR risk changes across the dosage range as a line chart.

### 4. Read the Analysis Log
Every prediction you run is saved in the **Analysis Log** panel with a timestamp — useful for comparing multiple patient profiles in one session.

---

## Calling the API Directly (Optional)

You can also call the API endpoints without the frontend using `curl` or any API client (e.g., Postman, Insomnia).

### Check if the API is running
```bash
curl http://localhost:5000/health
```

### Get all supported drugs
```bash
curl http://localhost:5000/drugs
```

### Predict ADR risk for a patient
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "age": 68,
    "dosage": 150,
    "diabetes": 1,
    "hypertension": 0,
    "gender": 1
  }'
```

**Response:**
```json
{
  "probability": 0.6312,
  "predicted_adr": 1,
  "risk_level": "Medium",
  "confidence": 63.1
}
```

### Simulate dosage sweep
```bash
curl -X POST http://localhost:5000/simulate \
  -H "Content-Type: application/json" \
  -d '{
    "age": 68,
    "diabetes": 1,
    "hypertension": 0,
    "gender": 1,
    "dosage_min": 10,
    "dosage_max": 500,
    "steps": 50
  }'
```

**Response:**
```json
{
  "steps": 50,
  "simulation": [
    { "dosage": 10,  "probability": 0.42, "risk_level": "Medium" },
    { "dosage": 20,  "probability": 0.45, "risk_level": "Medium" }
  ]
}
```

---

## Modifying the Code

### Change the risk thresholds (`app.py`)
```python
def risk_level(prob):
    if prob < 0.35:  return "Low"     # adjust 0.35 to change Low/Medium boundary
    if prob < 0.65:  return "Medium"  # adjust 0.65 to change Medium/High boundary
    return "High"
```

### Add a new drug (`app.py`)
```python
DRUG_RISK = {
    "Warfarin": 0.35,
    "YourNewDrug": 0.30,   # add here with a base risk value between 0 and 1
    ...
}
```
Then add it to the `<select>` dropdown in `index.html` as well.

### Retrain with different parameters (`train_model.py`)
```python
model = RandomForestClassifier(
    n_estimators=200,   # increase for better accuracy, slower training
    max_depth=10,       # increase for more complex model (risk of overfitting)
    class_weight="balanced",
    random_state=42
)
```
After editing, re-run `python train_model.py` to generate a new `model.pkl`.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `model.pkl not found` error on startup | Run `python train_model.py` first |
| Frontend shows no data / blank charts | Make sure `python app.py` is running on port 5000 |
| `ModuleNotFoundError` | Run `pip install -r requirements.txt` again |
| Port 5000 already in use | Change port in `app.py`: `app.run(port=5001)` and update the API URL in `script.js` |
| CORS error in browser console | Ensure `flask-cors` is installed; it's already configured in `app.py` |

---

## File Reference

| File | Purpose |
|---|---|
| `app.py` | Flask API — all backend logic and endpoints |
| `train_model.py` | Run once to train and save the ML model |
| `model.pkl` | Saved trained model — loaded by `app.py` at startup |
| `index.html` | The web app UI |
| `style.css` | All UI styles and animations |
| `script.js` | Frontend logic — API calls, charts, interactivity |
| `requirements.txt` | Python package list |
