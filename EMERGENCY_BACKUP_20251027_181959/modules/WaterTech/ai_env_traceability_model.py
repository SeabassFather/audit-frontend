from flask import Flask, request, jsonify
from ai_env_traceability_model import AuditDNAEnvAI

app = Flask(__name__)
ai = AuditDNAEnvAI()

@app.route("/api/ai/analyze", methods=["POST"])
def analyze():
    data = request.json
    water = data.get("water", {})
    soil = data.get("soil", {})
    fert = data.get("fertilizer", {})
    env = data.get("environment", {})
    result = ai.analyze(water, soil, fert, env)
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)