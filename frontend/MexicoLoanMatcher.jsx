<<<<<<< HEAD
import React, { useState } from "react";

export default function MexicoLoanMatcher() {
  const [form, setForm] = useState({ amount: "", region: "" });
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
      const res = await fetch("http://localhost:4000/api/mexico-loans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError("Could not fetch loan matches. Is the backend running?");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Mexico Loan Matcher</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Loan Amount (USD)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Region</label>
          <select
            name="region"
            value={form.region}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">-- Select Region --</option>
            <option value="CDMX">CDMX</option>
            <option value="Cancun">Cancun</option>
            <option value="Tulum">Tulum</option>
            <option value="Los Cabos">Los Cabos</option>
            <option value="Puerto Vallarta">Puerto Vallarta</option>
            <option value="Guadalajara">Guadalajara</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Searching..." : "Find Loans"}
        </button>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      <div className="mt-8">
        {results.length > 0 && (
          <ul className="space-y-4">
            {results.map((loan) => (
              <li key={loan.id} className="border rounded p-4 bg-gray-50">
                <div className="font-bold">{loan.lender}</div>
                <div>
                  <strong>Amount:</strong> ${loan.minAmount.toLocaleString()} -
                  ${loan.maxAmount.toLocaleString()} {loan.currency}
                </div>
                <div>
                  <strong>Regions:</strong> {loan.regions.join(", ")}
                </div>
                <div>
                  <strong>Rate:</strong> {loan.rate}
                </div>
                <div>
                  <strong>Term:</strong> {loan.term}
                </div>
                <div>
                  <strong>Requirements:</strong>
                  <ul className="list-disc ml-6">
                    {loan.requirements.map((req, i) => (
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
=======
﻿import React from "react";
export default function MexicoLoanMatcher() {
  return <div className='p-8 text-3xl font-bold'>MexicoLoanMatcher Module Coming Soon!</div>;
>>>>>>> my/push-branch
}
