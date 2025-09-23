import React, { useState } from "react";
import { FaSearch, FaBuilding, FaPercent } from "react-icons/fa";

const MOCK_RESULTS = [
  {
    lender: "Wells Fargo",
    product: "Agency Fixed",
    rate: 7.2,
    minFico: 700,
    maxLTV: 80,
    state: "CA",
    minAmt: 100000,
    maxAmt: 2000000,
  },
  // ...more
];

export default function SearchUsMortgage() {
  const [state, setState] = useState("");
  const [fico, setFico] = useState("");
  const [amount, setAmount] = useState("");
  const [results, setResults] = useState([]);

  function handleSearch(e) {
    e.preventDefault();
    const filtered = MOCK_RESULTS.filter(
      (row) =>
        (!state || row.state === state) &&
        (!fico || row.minFico <= Number(fico)) &&
        (!amount ||
          (row.minAmt <= Number(amount) && row.maxAmt >= Number(amount))),
    );
    setResults(filtered);
  }

  return (
    <section className="max-w-3xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-brand-blue flex items-center gap-2 mb-4">
        <FaSearch className="text-brand-green" /> US Mortgage Search
      </h2>
      <form className="flex flex-wrap gap-4 mb-6" onSubmit={handleSearch}>
        <input
          className="input input-bordered"
          value={state}
          onChange={(e) => setState(e.target.value.toUpperCase())}
          placeholder="State (CA, TX, FL...)"
        />
        <input
          className="input input-bordered"
          type="number"
          value={fico}
          onChange={(e) => setFico(e.target.value)}
          placeholder="Min FICO"
        />
        <input
          className="input input-bordered"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Loan Amount"
        />
        <button className="btn btn-primary" type="submit">
          <FaSearch /> Search
        </button>
      </form>
      <table className="w-full table-auto text-sm mb-4">
        <thead>
          <tr className="bg-brand-blue/10">
            <th>Lender</th>
            <th>Product</th>
            <th>Rate (%)</th>
            <th>Min FICO</th>
            <th>Max LTV</th>
            <th>State</th>
            <th>Amt Range</th>
          </tr>
        </thead>
        <tbody>
          {results.length === 0 && (
            <tr>
              <td colSpan={7} className="py-6 text-gray-400">
                No results. Try different search criteria.
              </td>
            </tr>
          )}
          {results.map((r, i) => (
            <tr key={i} className="hover:bg-brand-yellow/20">
              <td>{r.lender}</td>
              <td>{r.product}</td>
              <td>{r.rate}</td>
              <td>{r.minFico}</td>
              <td>{r.maxLTV}%</td>
              <td>{r.state}</td>
              <td>
                ${r.minAmt.toLocaleString()} - ${r.maxAmt.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
