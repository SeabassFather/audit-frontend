import React, { useState } from "react";

export default function InvoiceFinancing() {
  const [form, setForm] = useState({ invoiceAmount: "", businessType: "" });
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
      const res = await fetch("http://localhost:4000/api/invoice-financing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError("Could not fetch invoice financing matches. Is the backend running?");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Invoice Financing Search</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Invoice Amount ($)</label>
          <input
            type="number"
            name="invoiceAmount"
            value={form.invoiceAmount}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Business Type</label>
          <input
            type="text"
            name="businessType"
            value={form.businessType}
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
          {loading ? "Searching..." : "Find Invoice Financing"}
        </button>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      <div className="mt-8">
        {results.length > 0 && (
          <ul className="space-y-4">
            {results.map((offer) => (
              <li key={offer.id} className="border rounded p-4 bg-gray-50">
                <div className="font-bold">{offer.lender}</div>
                <div>
                  <strong>Amount:</strong> ${offer.invoiceMin} - ${offer.invoiceMax}
                </div>
                <div>
                  <strong>Rate:</strong> {offer.rate}
                </div>
                <div>
                  <strong>Requirements:</strong>
                  <ul className="list-disc ml-6">
                    {offer.requirements.map((req, i) => (
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