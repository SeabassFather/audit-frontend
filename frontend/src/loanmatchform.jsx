// src/components/LoanMatchForm.jsx
import React, { useState } from "react";

const productOptions = [
  { value: "purchase", label: "Purchase" },
  { value: "refiRateTerm", label: "Refinance - Rate/Term" },
  { value: "refiCashOut", label: "Refinance - Cash Out" },
  { value: "heloc", label: "HELOC" },
  { value: "secondMortgage", label: "Second Mortgage" },
];

export default function LoanMatchForm({ onSubmit }) {
  const [product, setProduct] = useState("purchase");
  const [creditScore, setCreditScore] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [occupancy, setOccupancy] = useState("primary");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      product,
      creditScore: Number(creditScore || 0),
      loanAmount: Number(loanAmount || 0),
      propertyValue: Number(propertyValue || 0),
      occupancy,
      ltv: calcLTV(propertyValue, loanAmount),
    };
    if (typeof onSubmit === "function") onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="loan-form">
      <label>
        Loan Product
        <select value={product} onChange={(e) => setProduct(e.target.value)}>
          {productOptions.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Credit Score
        <input
          type="number"
          inputMode="numeric"
          value={creditScore}
          onChange={(e) => setCreditScore(e.target.value)}
          placeholder="e.g., 720"
        />
      </label>

      <label>
        Loan Amount
        <input
          type="number"
          inputMode="numeric"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="e.g., 450000"
        />
      </label>

      <label>
        Property Value
        <input
          type="number"
          inputMode="numeric"
          value={propertyValue}
          onChange={(e) => setPropertyValue(e.target.value)}
          placeholder="e.g., 600000"
        />
      </label>

      <fieldset className="fieldset">
        <legend>Occupancy</legend>
        <label>
          <input
            type="radio"
            name="occ"
            value="primary"
            checked={occupancy === "primary"}
            onChange={() => setOccupancy("primary")}
          />
          Primary
        </label>
        <label>
          <input
            type="radio"
            name="occ"
            value="second"
            checked={occupancy === "second"}
            onChange={() => setOccupancy("second")}
          />
          Second
        </label>
        <label>
          <input
            type="radio"
            name="occ"
            value="investment"
            checked={occupancy === "investment"}
            onChange={() => setOccupancy("investment")}
          />
          Investment
        </label>
      </fieldset>

      <button type="submit">Match Lenders</button>
    </form>
  );
}

function calcLTV(propVal, loanAmt) {
  const v = Number(propVal || 0);
  const l = Number(loanAmt || 0);
  if (v <= 0) return 0;
  return Math.round((l / v) * 1000) / 10; // one decimal
}
