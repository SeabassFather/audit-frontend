const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ===== USDA Grower / Commodity Lookup =====
app.get("/api/compliance/usda-lookup", async (req, res) => {
  try {
    const { company, country, state, commodity, season } = req.query;
    // Example USDA farmers market directory (public, demo)
    const url = `https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${encodeURIComponent(
      state || "90210",
    )}`;
    const r = await fetch(url);
    const d = await r.json();
    res.json({
      query: { company, country, state, commodity, season },
      results: d,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "USDA lookup failed" });
  }
});

// ===== FDA Firm Recall Lookup =====
app.get("/api/compliance/fda-recalls", async (req, res) => {
  try {
    const { firm, state, product, dateFrom, dateTo } = req.query;
    const url = `https://api.fda.gov/food/enforcement.json?search=${encodeURIComponent(
      firm || product || "salmonella",
    )}&limit=10`;
    const r = await fetch(url);
    const d = await r.json();
    res.json({ query: { firm, state, product, dateFrom, dateTo }, results: d });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "FDA recall lookup failed" });
  }
});

// ===== PACA License Lookup (stub) =====
// Real USDA PACA requires restricted data. This demo just echoes input.
app.get("/api/compliance/paca-lookup", async (req, res) => {
  try {
    const q = req.query.q || "";
    res.json({
      query: q,
      result: {
        licenseNumber: "123456",
        company: "Demo PACA Firm",
        status: "Active",
        issued: "2020-01-01",
      },
    });
  } catch (e) {
    res.status(500).json({ error: "PACA lookup failed" });
  }
});

// ===== Notify endpoint (email/SMS hook) =====
app.post("/api/notify", async (req, res) => {
  try {
    const { topic, channel, meta } = req.body;
    // TODO: integrate with Twilio / SendGrid / SMTP
    console.log("NOTIFY:", { topic, channel, meta });
    res.json({ ok: true, notified: true });
  } catch (e) {
    res.status(500).json({ error: "Notify failed" });
  }
});

// ===== Server start =====
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Compliance backend running on http://127.0.0.1:${PORT}`);
});
