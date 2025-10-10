require("dotenv").config();
const path = require("path");
const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: f }) => f(...args));
const app = express();
const PORT = process.env.PORT || 4000;

/** ---------- USDA mapping ----------
 * Replace this with your preferred USDA dataset. For now we expose:
 *  GET /api/usda/list                 -> ["Tomatoes","Avocado",...]
 *  GET /api/usda/market/avg?commodity=Tomatoes
 * and return a clean {weeks, series:[{name, values}]} shape.
 */
const DEMO = {
  Tomatoes: [
    18, 19, 19, 20, 19, 20, 21, 20, 19, 18, 17, 16, 17, 18, 19, 20, 19, 18, 18,
    19, 20, 21, 22, 21, 22, 23,
  ],
  Avocado: [
    25, 24, 24, 23, 23, 22, 22, 21, 21, 20, 19, 18, 18, 18, 18, 19, 20, 21, 21,
    22, 23, 23, 24, 25, 26, 27,
  ],
  Strawberries: [
    14, 14, 15, 15, 14, 14, 13, 13, 12, 12, 12, 12, 13, 13, 14, 14, 15, 15, 15,
    16, 16, 17, 17, 18, 18, 19,
  ],
  Pineapple: [
    7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 10, 10,
    10,
  ],
  Papaya: [
    9, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9,
    9,
  ],
  "Roma Tomato": [
    13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 15, 16, 16, 16, 16,
    16, 17, 17, 17, 17, 18, 18,
  ],
  Apples: [
    12, 12, 12, 13, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 17, 18, 18, 18, 19,
    19, 19, 20, 20, 21, 21, 22,
  ],
  Lettuce: [
    8, 8, 8, 8, 8, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13,
    13, 13, 14, 14, 14,
  ],
  Blueberries: [
    20, 21, 22, 22, 21, 21, 20, 19, 18, 17, 17, 16, 16, 17, 17, 18, 18, 19, 19,
    20, 20, 21, 21, 22, 23, 24,
  ],
  Corn: [
    5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10,
    10,
  ],
  Beef: [
    40, 40, 39, 39, 41, 41, 42, 42, 43, 43, 42, 42, 41, 41, 40, 40, 41, 41, 42,
    42, 43, 43, 44, 44, 45, 45,
  ],
};
const COMMODITIES = Object.keys(DEMO).sort();

// List endpoint
app.get("/api/usda/list", (req, res) => res.json({ list: COMMODITIES }));

// Weekly averages endpoint (replace with real USDA call when ready)
app.get("/api/usda/market/avg", async (req, res) => {
  const name = String(req.query.commodity || "Tomatoes");
  // TODO: Implement real USDA fetch/transform here.
  const vals = DEMO[name] || DEMO["Tomatoes"];
  const weeks = Array.from({ length: 26 }, (_, i) => `W${i + 1}`);
  res.json({ weeks, series: [{ name, values: vals }] });
});

/** Existing endpoints (FRED/FX/PACA) preserved if already present.
 * If this file replaces your server/index.js entirely, you may want to
 * re-merge FRED/FX/PACA routes. For safety we include minimal FX & PACA.
 */
app.get("/api/fx/latest", async (req, res) => {
  try {
    const base = encodeURIComponent(req.query.base || "USD");
    const symbols = encodeURIComponent(req.query.symbols || "MXN,EUR,JPY");
    const url = `https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`;
    const r = await fetch(url);
    res.json(await r.json());
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.get("/api/paca", async (req, res) => {
  const license = String(req.query.license || "");
  const active = license.replace(/\D/g, "").length >= 6;
  res.json(
    active
      ? {
          license,
          status: "Active",
          firm: "Demo Produce Co.",
          issued: "2019-04-12",
          expires: "2026-04-12",
        }
      : { license, status: "Not Found" },
  );
});

const PORT_ENV = process.env.PORT || 4000;
app.listen(PORT_ENV, () =>
  console.log("[server] API proxy on http://127.0.0.1:" + PORT_ENV),
);
// ---- Static build & SPA fallback ----
const buildDir = path.join(__dirname, "..", "build");
app.use(express.static(buildDir));

// Serve index.html for any non-API route (SPA)
app.get(
  ["/", "/elite", "/programs", "/loan-match", "/market", "/services", "/*"],
  (req, res) => {
    if (req.path.startsWith("/api/")) return res.status(404).end(); // never hijack API
    res.sendFile(path.join(buildDir, "index.html"));
  },
);
