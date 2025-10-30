import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
const PORT = 5050;

// Mortgage Example
app.get("/api/mortgage", (req, res) => {
  res.json({
    rate: "6.89%",
    type: "30Y Fixed",
    change: "-0.02%",
    history: [
      { date: "May", rate: 6.95 },
      { date: "Jun", rate: 6.90 },
      { date: "Jul", rate: 6.85 },
      { date: "Aug", rate: 6.80 },
      { date: "Sep", rate: 6.89 }
    ]
  });
});

// Markets Example
app.get("/api/markets", (req, res) => {
  res.json({
    index: "S&P 500",
    value: "5,510",
    change: "+12",
    history: [
      { date: "May", value: 4800 },
      { date: "Jun", value: 4900 },
      { date: "Jul", value: 5000 },
      { date: "Aug", value: 5100 },
      { date: "Sep", value: 5450 }
    ]
  });
});

// Avocado MX→US Exports (USDA QuickStats)
app.get("/api/avocado/mx2us", async (req, res) => {
  try {
    const key = process.env.USDA_API_KEY;
    const url = `https://quickstats.nass.usda.gov/api/api_GET/?key=${key}&commodity_desc=AVOCADOS&year__GE=2019&agg_level_desc=NATIONAL&statisticcat_desc=EXPORTS`;
    const response = await axios.get(url);

    const history = (response.data.data || [])
      .filter(item => item.Value && item.year)
      .map(item => ({ year: item.year, value: Number(item.Value.replace(/,/g, "")) }));

    res.json({
      product: "Avocados MX→US",
      latest: history.length ? history[0] : { year: "N/A", value: 0 },
      history
    });
  } catch {
    res.json({ product: "Avocados MX→US", latest: { year: "N/A", value: 0 }, history: [] });
  }
});

// Other Modules
app.get("/api/zadarma", (req, res) => res.json({ status: "Active" }));
app.get("/api/escrow", (req, res) => res.json({ status: "2 Transactions in Progress" }));
app.get("/api/mexico", (req, res) => res.json({ status: "CNBV, SAT, CONDUSEF synced" }));

app.listen(PORT, () => console.log(`AuditDNA Backend on http://localhost:${PORT}`));
