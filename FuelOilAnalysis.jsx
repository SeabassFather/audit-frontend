import React, { useState } from "react";
import axios from "axios";

export default function FuelOilAnalysis() {
  const [inputs, setInputs] = useState({
    fuel: {
      type: "",
      usageRate: "",
      totalUsed: "",
      engineHours: "",
      co2Emissions: "",
      temperature: ""
    },
    oil: {
      viscosity: "",
      tbn: "",
      tan: "",
      waterContent: "",
      fuelDilution: "",
      wearMetals: "",
      sootLevel: "",
      sampleDate: ""
    }
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e, category, field) => {
    setInputs({
      ...inputs,
      [category]: { ...inputs[category], [field]: e.target.value }
    });
  };

  const analyzeData = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await axios.post("http://localhost:8001/api/ai/fuel-oil", inputs);
      setResult(res.data);
    } catch (err) {
      setError(err.message || "API error");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Fuel & Oil Analysis
      </h2>

      {/* FUEL SECTION */}
      <fieldset className="border border-gray-300 rounded-xl p-5 mb-6">
        <legend className="font-semibold text-lg text-blue-700 px-2">Fuel Data</legend>

        <div className="grid grid-cols-2 gap-4">
          <label>Fuel Type:
            <input type="text" value={inputs.fuel.type} onChange={e => handleInputChange(e, "fuel", "type")}
              className="w-full border p-2 rounded" />
          </label>

          <label>Usage Rate (L/hr):
            <input type="number" value={inputs.fuel.usageRate} onChange={e => handleInputChange(e, "fuel", "usageRate")}
              className="w-full border p-2 rounded" />
          </label>

          <label>Total Used (L):
            <input type="number" value={inputs.fuel.totalUsed} onChange={e => handleInputChange(e, "fuel", "totalUsed")}
              className="w-full border p-2 rounded" />
          </label>

          <label>Engine Hours:
            <input type="number" value={inputs.fuel.engineHours} onChange={e => handleInputChange(e, "fuel", "engineHours")}
              className="w-full border p-2 rounded" />
          </label>

          <label>CO₂ Emissions (kg):
            <input type="number" value={inputs.fuel.co2Emissions} onChange={e => handleInputChange(e, "fuel", "co2Emissions")}
              className="w-full border p-2 rounded" />
          </label>

          <label>Fuel Temperature (°C):
            <input type="number" value={inputs.fuel.temperature} onChange={e => handleInputChange(e, "fuel", "temperature")}
              className="w-full border p-2 rounded" />
          </label>
        </div>
      </fieldset>

      {/* OIL SECTION */}
      <fieldset className="border border-gray-300 rounded-xl p-5 mb-6">
        <legend className="font-semibold text-lg text-green-700 px-2">Oil Data</legend>

        <div className="grid grid-cols-2 gap-4">
          <label>Viscosity (cSt):
            <input type="number" value={inputs.oil.viscosity} onChange={e => handleInputChange(e, "oil", "viscosity")}
              className="w-full border p-2 rounded" />
          </label>

          <label>Total Base Number (TBN):
            <input type="number" value={inputs.oil.tbn} onChange={e => handleInputChange(e, "oil", "tbn")}
              className="w-full border p-2 rounded" />
          </label>

          <label>Total Acid Number (TAN):
            <input type="number" value={inputs.oil.tan} onChange={e => handleInputChange(e, "oil", "tan")}
              className="w-full border p-2 rounded" />
          </label>

          <label>Water Content (%):
            <input type="number" value={inputs.oil.waterContent} onChange={e => handleInputChange(e, "oil", "waterContent")}
              className="w-full border p-2 rounded" />
          </label>

          <label>Fuel Dilution (%):
            <input type="number" value={inputs.oil.fuelDilution} onChange={e => handleInputChange(e, "oil", "fuelDilution")}
              className="w-full border p-2 rounded" />
          </label>

          <label>Wear Metals (ppm):
            <input type="number" value={inputs.oil.wearMetals} onChange={e => handleInputChange(e, "oil", "wearMetals")}
              className="w-full border p-2 rounded" />
          </label>

          <label>Soot Level (%):
            <input type="number" value={inputs.oil.sootLevel} onChange={e => handleInputChange(e, "oil", "sootLevel")}
              className="w-full border p-2 rounded" />
          </label>

          <label>Sample Date:
            <input type="date" value={inputs.oil.sampleDate} onChange={e => handleInputChange(e, "oil", "sampleDate")}
              className="w-full border p-2 rounded" />
          </label>
        </div>
      </fieldset>

      <div className="flex justify-center">
        <button onClick={analyzeData} disabled={loading}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg font-semibold hover:opacity-90">
          {loading ? "Analyzing..." : "Run Analysis"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">Error: {error}</p>}

      {result && (
        <div className="mt-8 p-5 bg-gray-50 border rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Analysis Result</h3>
          <pre className="text-sm bg-white p-3 rounded-lg border">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
