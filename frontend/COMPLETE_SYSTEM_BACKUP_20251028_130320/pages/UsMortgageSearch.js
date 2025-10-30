import React, { useState } from 'react';

export default function UsMortgageSearch() {
  const [state, setState] = useState('');
  const [fico, setFico] = useState('');
  const [amount, setAmount] = useState('');
  const [results, setResults] = useState([]);

  // TODO: Integrate with real US mortgage data API.
  function handleSearch(e) {
    e.preventDefault();
    setResults([]); // No mock data. Replace with real API call.
  }

  return (
    <section>
      <h2>US Mortgage Search</h2>
      <form className="search-form" onSubmit={handleSearch}>
        <label>
          State:
          <input value={state} onChange={e => setState(e.target.value.toUpperCase())} placeholder="CA, TX, FL..." />
        </label>
        <label>
          Min FICO:
          <input type="number" value={fico} onChange={e => setFico(e.target.value)} />
        </label>
        <label>
          Loan Amount:
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        </label>
        <button className="button-primary" type="submit">Search</button>
      </form>
      <table className="results-table">
        <thead>
          <tr>
            <th>Lender</th><th>Product</th><th>Rate (%)</th><th>Min FICO</th><th>Max LTV</th><th>State</th><th>Amt Range</th>
          </tr>
        </thead>
        <tbody>
          {results.length === 0 && <tr><td colSpan={7}>No results. Data source integration required.</td></tr>}
        </tbody>
      </table>
    </section>
  );
}