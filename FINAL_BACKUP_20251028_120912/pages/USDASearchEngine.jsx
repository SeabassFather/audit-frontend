import React, { useState } from "react";

// Optionally replace with your real API endpoint
const API_URL = "/api/usda/search";

export default function USDASearchEngine() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      // Replace below with your real API call if needed
      const resp = await fetch(`${API_URL}?q=${encodeURIComponent(query)}`);
      if (!resp.ok) throw new Error("API request failed");
      const data = await resp.json();
      setResults(data && Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unknown error");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">USDA/FDA/Organic Search</h1>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Company, certificate ID, or keyword"
        />
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div>
        {results.length === 0 && !loading && !error && (
          <div className="text-gray-500">Enter a search term above.</div>
        )}
        {results.length > 0 && (
          <table className="w-full table-auto border mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Certification</th>
                <th className="p-2 border">ID</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-2 border">{row.name}</td>
                  <td className="p-2 border">{row.location}</td>
                  <td className="p-2 border">{row.certification}</td>
                  <td className="p-2 border">{row.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}