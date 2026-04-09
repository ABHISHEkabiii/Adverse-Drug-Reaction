"""
app.py — PharmVigilance AI Flask API v2
Upgraded backend with simulation endpoint, drug info, and better error handling.
"""

from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS
import logging
import os

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# ── Load model ────────────────────────────────────────
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")
model = None
try:
    model = pickle.load(open(MODEL_PATH, "rb"))
    logger.info(f"Model loaded from {MODEL_PATH}")
except FileNotFoundError:
    logger.warning("model.pkl not found — run train_model.py first")

# ── Drug base risk table ──────────────────────────────
DRUG_RISK = {
    "Warfarin": 0.35, "Aspirin": 0.20, "Metformin": 0.15,
    "Lisinopril": 0.25, "Gabapentin": 0.28, "Ibuprofen": 0.22,
    "Atorvastatin": 0.18, "Amoxicillin": 0.12,
    "Metoprolol": 0.20, "Omeprazole": 0.10
}


def risk_level(prob):
    if prob < 0.35:  return "Low"
    if prob < 0.65:  return "Medium"
    return "High"


@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "service": "PharmVigilance AI API",
        "version": "2.0",
        "status": "online",
        "model_loaded": model is not None,
        "endpoints": ["/predict", "/simulate", "/drugs", "/health"]
    })


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "model_loaded": model is not None,
        "version": "2.0"
    })


@app.route("/drugs", methods=["GET"])
def drugs():
    return jsonify({
        "drugs": [
            {"name": k, "base_risk_pct": round(v * 100, 1)}
            for k, v in DRUG_RISK.items()
        ]
    })


@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded. Run train_model.py first."}), 503

    data = request.json
    if not data:
        return jsonify({"error": "No JSON body provided"}), 400

    required = ["age", "dosage", "diabetes", "hypertension", "gender"]
    missing  = [f for f in required if f not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {missing}"}), 400

    try:
        features = np.array([[
            float(data["age"]),
            float(data["dosage"]),
            int(data["diabetes"]),
            int(data["hypertension"]),
            int(data["gender"]),
        ]])

        prob      = float(model.predict_proba(features)[0][1])
        predicted = int(model.predict(features)[0])
        level     = risk_level(prob)

        logger.info(f"Prediction: age={data['age']}, dosage={data['dosage']}, prob={prob:.3f}, risk={level}")

        return jsonify({
            "probability":   round(prob, 4),
            "predicted_adr": predicted,
            "risk_level":    level,
            "confidence":    round(max(prob, 1 - prob) * 100, 1)
        })

    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/simulate", methods=["POST"])
def simulate():
    """Sweep dosage range and return ADR risk at each step."""
    if model is None:
        return jsonify({"error": "Model not loaded"}), 503

    data     = request.json or {}
    age      = float(data.get("age", 50))
    diabetes = int(data.get("diabetes", 0))
    htn      = int(data.get("hypertension", 0))
    gender   = int(data.get("gender", 0))
    d_min    = int(data.get("dosage_min", 10))
    d_max    = int(data.get("dosage_max", 500))
    steps    = min(int(data.get("steps", 50)), 200)

    results = []
    dosages = np.linspace(d_min, d_max, steps, dtype=int)

    for dosage in dosages:
        features = np.array([[age, float(dosage), diabetes, htn, gender]])
        prob = float(model.predict_proba(features)[0][1])
        results.append({
            "dosage":      int(dosage),
            "probability": round(prob, 4),
            "risk_level":  risk_level(prob)
        })

    return jsonify({"simulation": results, "steps": steps})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
