import React, { useState } from "react";

export default function TradeFinance() {
  const [form, setForm] = useState({ type: "", amount: "" });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setResults([]);
    try {
      // Dummy API endpoint for demo purposes:
      // Replace with your backend or mock data
      const res = await fetch("http://localhost:4000/api/trade-finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError("Could not fetch trade finance deals. Is the backend running?");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Trade Finance Search</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">-- Select Type --</option>
            <option value="Letter of Credit">Letter of Credit</option>
            <option value="Invoice Financing">Invoice Financing</option>
            <option value="Receivables Purchase">Receivables Purchase</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Amount ($)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Searching..." : "Find Finance Deals"}
        </button>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      <div className="mt-8">
        {results.length > 0 && (
          <ul className="space-y-4">
            {results.map((deal) => (
              <li key={deal.id} className="border rounded p-4 bg-gray-50">
                <div className="font-bold">{deal.type}</div>
                <div>
                  <strong>Amount:</strong> ${deal.amount}
                </div>
                <div>
                  <strong>Lender:</strong> {deal.lender}
                </div>
                <div>
                  <strong>Rate:</strong> {deal.rate}
                </div>
                <div>
                  <strong>Term:</strong> {deal.term}
                </div>
                <div>
                  <strong>Requirements:</strong>
                  <ul className="list-disc ml-6">
                    {deal.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}