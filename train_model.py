"""
train_model.py — PharmVigilance AI v2
Generates richer synthetic data and trains an improved Random Forest model.
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, roc_auc_score
import pickle

np.random.seed(42)
N = 3000

# Simulate clinical data
age         = np.random.randint(18, 85, N)
dosage      = np.random.randint(10, 500, N)
diabetes    = np.random.choice([0, 1], N, p=[0.70, 0.30])
hypertension= np.random.choice([0, 1], N, p=[0.60, 0.40])
gender      = np.random.randint(0, 2, N)  # 0=Male, 1=Female

# Clinical probability formula
prob = (
    0.002 * np.maximum(0, age - 50) +
    0.002 * (dosage / 10) +
    0.10  * diabetes +
    0.08  * hypertension +
    0.05  * gender +
    0.15  # base risk
)
prob = np.clip(prob, 0, 0.95)
adr = (np.random.random(N) < prob).astype(int)

print(f"Dataset: {N} samples, {adr.mean():.1%} ADR positive rate")

X = pd.DataFrame({
    "age": age, "dosage": dosage,
    "diabetes": diabetes, "hypertension": hypertension, "gender": gender
})
y = adr

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

model = RandomForestClassifier(
    n_estimators=200, max_depth=10,
    class_weight="balanced", random_state=42, n_jobs=-1
)
model.fit(X_train, y_train)

y_pred  = model.predict(X_test)
y_proba = model.predict_proba(X_test)[:, 1]

print(f"Accuracy:  {accuracy_score(y_test, y_pred):.3f}")
print(f"Precision: {precision_score(y_test, y_pred):.3f}")
print(f"Recall:    {recall_score(y_test, y_pred):.3f}")
print(f"ROC-AUC:   {roc_auc_score(y_test, y_proba):.3f}")

pickle.dump(model, open("model.pkl", "wb"))
print("Model saved → model.pkl")
