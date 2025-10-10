const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const loans = [
  {
    id: 1,
    lender: "Moxxi GlobalMortgage",
    minAmount: 50000,
    maxAmount: 1500000,
    currency: "USD",
    regions: ["CDMX", "Cancun", "Tulum", "Los Cabos"],
    rate: "7.5% - 10.0%",
    term: "10-30 years",
    requirements: [
      "Foreign national eligible",
      "Property title insurance",
      "Minimum FICO 680",
    ],
  },
  {
    id: 2,
    lender: "CasaFina MX",
    minAmount: 75000,
    maxAmount: 1000000,
    currency: "USD",
    regions: ["Puerto Vallarta", "Guadalajara", "CDMX"],
    rate: "8.2% - 11.5%",
    term: "15-25 years",
    requirements: ["Mexican residency required", "Income verification"],
  },
];

app.post("/api/mexico-loans", (req, res) => {
  const { amount, region } = req.body;
  const amt = parseInt(amount, 10) || 0;
  const matched = loans.filter(
    (loan) =>
      amt >= loan.minAmount &&
      amt <= loan.maxAmount &&
      loan.regions.includes(region),
  );
  res.json(matched);
});

app.listen(PORT, () =>
  console.log(`Mock Mexico Loan API running on port ${PORT}`),
);
