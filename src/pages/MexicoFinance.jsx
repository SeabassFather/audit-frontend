import { useState } from "react";

export default function MexicoFinance() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/mexico-finance?state=${state}&city=${city}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Mexico Mortgage & Real Estate Finance</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          value={state}
          onChange={e => setState(e.target.value)}
          placeholder="State (e.g., Baja California)"
          className="border p-2 rounded"
        />
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="City (e.g., Cabo San Lucas)"
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search Properties
      </button>

      <div className="mt-6">
        {results.length === 0 ? (
          <p>No Data Available</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Property</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Appraisal Value</th>
                <th className="p-2 border">Regulatory Recording</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td className="p-2 border">{r.name}</td>
                  <td className="p-2 border">{r.city}, {r.state}</td>
                  <td className="p-2 border">${r.appraisal}</td>
                  <td className="p-2 border">{r.agency || "Registro Público"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
