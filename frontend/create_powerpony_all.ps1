<#
PowerPONY: create_powerpony_all.ps1
One-shot PowerShell installer/bootstrapper for the full AuditDNA stack:
- Creates backend skeleton files (parser, engine, PKI, Stripe webhook, scheduler, standards, DB schema)
- Creates sample lab files + extended samples
- Creates parser unit tests and E2E test
- Creates mobile Expo skeleton (App.js + package.json)
- Optionally installs npm deps for backend & mobile
- Optionally generates RSA keypair for PKI signing
- Optionally runs sample generation and parser tests

USAGE:
1) Save this script to the repo root (e.g., C:\AuditDNA\create_powerpony_all.ps1)
2) Open PowerShell as Administrator (recommended) and run:
   ./create_powerpony_all.ps1
3) Follow the prompts (install deps? generate keys? run tests?).

REQUIRES:
- Node.js & npm in PATH
- Git (optional)
- psql (for DB schema application) if you want to auto-apply schema
- (Optional) tesseract if you plan to run OCR parsing

This script will NOT overwrite your existing server.js without backing it up.
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-OK($m){ Write-Host $m -ForegroundColor Green }
function Write-Warn($m){ Write-Host $m -ForegroundColor Yellow }
function Write-Err($m){ Write-Host $m -ForegroundColor Red }

$root = (Get-Location).Path
Write-Host "PowerPONY ALL starting in: $root" -ForegroundColor Cyan

# Paths
$backend = Join-Path $root "backend"
$analysisDir = Join-Path $backend "analysis"
$paymentsDir = Join-Path $backend "payments"
$jobsDir = Join-Path $backend "jobs"
$pkiDir = Join-Path $backend "pki"
$samplesDir = Join-Path $backend "samples"
$testsDir = Join-Path $backend "tests"
$dbDir = Join-Path $backend "db"
$mobileDir = Join-Path $root "mobile"

# Create directories
$dirs = @($backend, $analysisDir, $paymentsDir, $jobsDir, $pkiDir, $samplesDir, $testsDir, $dbDir, $mobileDir)
foreach ($d in $dirs) { if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null; Write-Host "Created: $d" } else { Write-Warn "Exists: $d" } }

# ---------- backend/analysis/parser.js ----------
$parserJs = @'
/**
 * backend/analysis/parser.js
 * Basic lab file parser: PDF, CSV, XLSX, Image(OCR)
 * Requires: pdf-parse, papaparse, xlsx, node-tesseract-ocr (optional)
 */
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const Papa = require("papaparse");
const xlsx = require("xlsx");
let tesseract;
try { tesseract = require("node-tesseract-ocr"); } catch(e){ tesseract = null; }

const OCR_CONFIG = { lang: "eng", oem: 1, psm: 3 };

async function parseLabFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".pdf") return parsePdf(filePath);
  if (ext === ".csv") return parseCsv(filePath);
  if (ext === ".xlsx" || ext === ".xls") return parseXlsx(filePath);
  if ([".png", ".jpg", ".jpeg", ".tiff"].includes(ext)) return parseImage(filePath);
  throw new Error("Unsupported file type: " + ext);
}

async function parsePdf(filePath) {
  const data = fs.readFileSync(filePath);
  const parsed = await pdf(data);
  const text = parsed.text || "";
  return extractRowsFromText(text);
}

async function parseCsv(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
  const results = parsed.data.map(row => ({
    parameter: row["Parameter"] || row["Analyte"] || Object.keys(row)[0],
    value: parseFloat(row["Result"] || row["ResultValue"] || row["Value"] || Object.values(row)[1]) || null,
    unit: row["Unit"] || row["Units"] || ""
  }));
  return results;
}

async function parseXlsx(filePath) {
  const wb = xlsx.readFile(filePath);
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(ws, { defval: null });
  const results = data.map(row => ({
    parameter: row["Parameter"] || row["Analyte"] || Object.keys(row)[0],
    value: parseFloat(row["Result"] || row["Value"] || Object.values(row)[1]) || null,
    unit: row["Unit"] || ""
  }));
  return results;
}

async function parseImage(filePath) {
  if (!tesseract) throw new Error("OCR not available (node-tesseract-ocr not installed)");
  const text = await tesseract.recognize(filePath, OCR_CONFIG);
  return extractRowsFromText(text);
}

function extractRowsFromText(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  const results = [];
  const re = /([A-Za-z0-9\.\-\s\(\)\/]+)\s+([0-9\.,]+)\s*(mg\/kg|ppm|ppb|cfu\/100g|cfu\/g|µg\/kg|ug\/kg|ng\/g|mg\/L)?/i;
  for (const line of lines) {
    const m = line.match(re);
    if (m) {
      const param = m[1].trim();
      const val = parseFloat(m[2].replace(",", "."));
      const unit = (m[3] || "").trim();
      results.push({ parameter: param, value: val, unit, raw: line });
    }
  }
  return results;
}

module.exports = { parseLabFile, parsePdf, parseCsv, parseXlsx, parseImage, extractRowsFromText };
'@
$parserPath = Join-Path $analysisDir "parser.js"
$parserJs | Out-File -FilePath $parserPath -Encoding UTF8
Write-OK "Wrote $parserPath"

# ---------- backend/analysis/engine.js ----------
$engineJs = @'
/**
 * backend/analysis/engine.js
 * Simple analysis engine: parse -> normalize -> map to standards -> score -> report
 * Replace scoring logic with advanced AI model as needed.
 */
const parser = require("./parser");

function normalizeValue(value, unit) {
  if (value == null) return null;
  const v = Number(value);
  if (isNaN(v)) return null;
  // basic unit normalization stub
  if (!unit) return v;
  const u = unit.toLowerCase();
  if (u === "ug/kg") return v / 1000;
  if (u === "µg/kg") return v / 1000;
  return v;
}

function computeParamScore(value, threshold, uncertainty = 0) {
  if (value == null) return 0.5;
  if (threshold === null || threshold === undefined) return 0.7;
  if (value <= threshold) return 1.0;
  const exceed = (value - threshold) / (Math.max(threshold, 1));
  if (exceed < 0.1) return 0.7;
  if (exceed < 0.3) return 0.4;
  return 0.0;
}

function aggregate(paramResults) {
  const categories = {};
  let totalSum = 0, totalCount = 0;
  for (const p of paramResults) {
    const cat = p.category || "misc";
    if (!categories[cat]) categories[cat] = { sum:0, count:0 };
    categories[cat].sum += p.score;
    categories[cat].count += 1;
    totalSum += p.score;
    totalCount += 1;
  }
  const catScores = {};
  for (const k of Object.keys(categories)) {
    catScores[k] = categories[k].count ? Math.round((categories[k].sum / categories[k].count) * 100) : null;
  }
  const overall = totalCount ? Math.round((totalSum/totalCount) * 100) : null;
  return { category_scores: catScores, overall_score: overall };
}

async function runAnalysis({ grower_id, product, lot_number, destination_country, rawLab, standards }) {
  // rawLab: { filePath, originalname }
  let parsed = [];
  try {
    parsed = await parser.parseLabFile(rawLab.filePath);
  } catch (e) {
    parsed = [];
  }
  const paramResults = [];
  const stdMap = (standards && standards[destination_country]) ? (standards[destination_country][product] || standards[destination_country].DEFAULT || standards.DEFAULT.DEFAULT) : (standards && standards.DEFAULT ? standards.DEFAULT.DEFAULT : {});
  for (const row of parsed) {
    const norm = normalizeValue(row.value, row.unit);
    const std = stdMap && stdMap[row.parameter] ? stdMap[row.parameter] : null;
    const threshold = std ? std.limit : null;
    const score = computeParamScore(norm, threshold, std ? std.uncertainty : 0);
    paramResults.push({
      parameter: row.parameter,
      value: norm,
      unit: row.unit,
      threshold,
      score,
      method: row.method || null,
      lab_name: row.lab_name || null,
      raw: row.raw || null
    });
  }
  const agg = aggregate(paramResults);
  const probPass = agg.overall_score ? agg.overall_score : 0;
  const report = {
    grower_id, product, lot_number, destination_country,
    parsed_results: paramResults,
    category_scores: agg.category_scores,
    overall_score: agg.overall_score,
    pass_probability: probPass,
    recommendations: paramResults.filter(p => p.score < 1).map(p => `Review ${p.parameter}: ${p.value}${p.unit} vs limit ${p.threshold}`),
    metadata: { engine_version: "0.1" },
    valid_until: (function(){
      const d = new Date(); d.setMonth(d.getMonth() + 6); return d.toISOString();
    })()
  };
  return report;
}

module.exports = { runAnalysis };
'@
$enginePath = Join-Path $analysisDir "engine.js"
$engineJs | Out-File -FilePath $enginePath -Encoding UTF8
Write-OK "Wrote $enginePath"

# ---------- backend/standards/standards.json ----------
$standardsJson = @'
{
  "DEFAULT": {
    "DEFAULT": {
      "Lead (Pb)": { "limit": 0.1, "unit": "mg/kg", "uncertainty": 0.05 },
      "E.coli": { "limit": 100, "unit": "CFU/100g", "uncertainty": 10 },
      "Glyphosate": { "limit": 0.1, "unit": "mg/kg", "uncertainty": 0.02 }
    }
  },
  "USA": {
    "Avocados": {
      "Lead (Pb)": { "limit": 0.1, "unit": "mg/kg", "uncertainty": 0.05 },
      "E.coli": { "limit": 100, "unit": "CFU/100g", "uncertainty": 10 },
      "Glyphosate": { "limit": 0.05, "unit": "mg/kg", "uncertainty": 0.01 }
    },
    "DEFAULT": {
      "Lead (Pb)": { "limit": 0.2, "unit": "mg/kg" },
      "E.coli": { "limit": 100, "unit": "CFU/100g" }
    }
  }
}
'@
$standardsPath = Join-Path $backend "standards.json"
$standardsJson | Out-File -FilePath $standardsPath -Encoding UTF8
Write-OK "Wrote $standardsPath"

# ---------- backend/db/schema.sql ----------
$schemaSql = @'
-- backend/db/schema.sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS growers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grower_name TEXT,
  farm_name TEXT,
  country TEXT,
  gps_point TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  subscription_tier TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS verifications (
  id SERIAL PRIMARY KEY,
  verification_id TEXT UNIQUE,
  grower_id UUID REFERENCES growers(id),
  product_name TEXT,
  lot_number TEXT,
  status TEXT,
  uploaded_at TIMESTAMP,
  file_path TEXT,
  file_hash TEXT,
  intent TEXT,
  destination_country TEXT,
  subscription_tier TEXT,
  analysis_report JSONB,
  analysis_date TIMESTAMP,
  valid_until TIMESTAMP,
  digital_signature TEXT,
  analysis_signed_at TIMESTAMP,
  payment_status TEXT,
  payment_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lab_results (
  id SERIAL PRIMARY KEY,
  verification_id INTEGER REFERENCES verifications(id),
  test_type TEXT,
  parameter TEXT,
  result_value NUMERIC,
  result_unit TEXT,
  detection_limit NUMERIC,
  method TEXT,
  lab_name TEXT,
  test_date DATE
);

CREATE TABLE IF NOT EXISTS chain_of_custody (
  id SERIAL PRIMARY KEY,
  verification_id TEXT,
  step_name TEXT,
  actor TEXT,
  notes TEXT,
  photos TEXT[],
  gps TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS attestations (
  id SERIAL PRIMARY KEY,
  verification_id TEXT,
  buyer_id TEXT,
  importer_name TEXT,
  rating INTEGER,
  comments TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  grower_id UUID,
  verification_id INTEGER,
  type TEXT,
  message TEXT,
  payload JSONB,
  delivered BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS standards_mapping (
  id SERIAL PRIMARY KEY,
  country TEXT,
  commodity TEXT,
  mapping JSONB,
  version TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_verification_verification_id ON verifications(verification_id);
'@
$schemaPath = Join-Path $dbDir "schema.sql"
$schemaSql | Out-File -FilePath $schemaPath -Encoding UTF8
Write-OK "Wrote $schemaPath"

# ---------- backend/jobs/updatedScheduler.js ----------
$schedulerJs = @'
/**
 * backend/jobs/updatedScheduler.js
 * Notification scheduler implementing cadence rules and special water rule.
 */
const cron = require("node-cron");
const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/auditdna" });

async function scheduleChecks() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT id, verification_id, grower_id, analysis_date, subscription_tier, product_name, destination_country FROM verifications WHERE status=$1", ["verified"]);
    const rows = res.rows;
    const now = new Date();
    for (const r of rows) {
      const analysisDate = r.analysis_date ? new Date(r.analysis_date) : now;
      const monthsSince = (now.getFullYear() - analysisDate.getFullYear()) * 12 + (now.getMonth() - analysisDate.getMonth());
      let cadenceDays = 90;
      if (monthsSince < 6) {
        cadenceDays = (r.subscription_tier === "gold") ? 30 : (r.subscription_tier === "silver") ? 60 : 90;
      } else {
        if ((r.product_name && r.product_name.toLowerCase().includes("water")) || (r.destination_country === "EU" && r.product_name && r.product_name.toLowerCase().includes("avocado"))) {
          cadenceDays = 30;
        } else {
          cadenceDays = (r.subscription_tier === "gold") ? 30 : (r.subscription_tier === "silver") ? 90 : 180;
        }
      }
      const last = await client.query("SELECT created_at FROM notifications WHERE verification_id=$1 ORDER BY created_at DESC LIMIT 1", [r.id]);
      const lastDate = last.rowCount ? new Date(last.rows[0].created_at) : null;
      const daysSinceLast = lastDate ? Math.floor((now - lastDate) / (1000*3600*24)) : 9999;
      if (daysSinceLast >= cadenceDays) {
        await client.query("INSERT INTO notifications (grower_id, verification_id, type, message, payload, created_at) VALUES ($1,$2,$3,$4,$5,$6)",
          [r.grower_id, r.id, "recurrence_reminder", `Time to upload new tests for ${r.product_name}`, JSON.stringify({ cadenceDays }), now]);
        console.log(`Reminder created for ${r.verification_id} cadenceDays=${cadenceDays}`);
      }
    }
  } catch (e) {
    console.error("Scheduler error:", e);
  } finally {
    client.release();
  }
}

cron.schedule("30 2 * * *", () => {
  console.log("Running updatedScheduler", new Date().toISOString());
  scheduleChecks().catch(e => console.error(e));
});

scheduleChecks().catch(e => console.error(e));
'@
$schedulerPath = Join-Path $jobsDir "updatedScheduler.js"
$schedulerJs | Out-File -FilePath $schedulerPath -Encoding UTF8
Write-OK "Wrote $schedulerPath"

# ---------- backend/payments/stripe_webhook.js ----------
$stripeJs = @'
/**
 * backend/payments/stripe_webhook.js
 * Stripe webhook + checkout session routes. Verifies events and marks verifications paid.
 */
const express = require("express");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const analysis = require("../analysis/engine");

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_replace");
const pool = new Pool({ connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/auditdna" });

router.post("/webhook", bodyParser.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      event = JSON.parse(req.body.toString());
    }
  } catch (e) {
    console.error("Stripe webhook signature verification failed:", e.message);
    return res.status(400).send(`Webhook Error: ${e.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const metadata = session.metadata || {};
        const verificationId = metadata.verification_id || metadata.verificationId || metadata.verification;
        if (verificationId) {
          const client = await pool.connect();
          try {
            await client.query("UPDATE verifications SET status=$1, payment_status=$2, payment_date=$3 WHERE verification_id=$4",
              ["paid", "paid", new Date(), verificationId]);
            const q = await client.query("SELECT id, grower_id, product_name, lot_number, destination_country, file_path FROM verifications WHERE verification_id=$1", [verificationId]);
            if (q.rowCount) {
              const v = q.rows[0];
              process.nextTick(async () => {
                try {
                  const report = await analysis.runAnalysis({ grower_id: v.grower_id, product: v.product_name, lot_number: v.lot_number, destination_country: v.destination_country, rawLab: { filePath: v.file_path }, standards: require("../standards.json") });
                  await client.query("UPDATE verifications SET analysis_report=$1, analysis_date=$2, status=$3 WHERE verification_id=$4", [report, new Date(), "verified", verificationId]);
                } catch (err) {
                  console.error("analysis trigger error:", err);
                  await client.query("UPDATE verifications SET status='error' WHERE verification_id=$1", [verificationId]);
                }
              });
            }
          } finally {
            client.release();
          }
        }
        break;
      }
      case "invoice.payment_succeeded": {
        console.log("Invoice payment succeeded");
        break;
      }
      default:
        console.log("Unhandled stripe event:", event.type);
    }
    res.json({ received: true });
  } catch (err) {
    console.error("Webhook processing error:", err);
    res.status(500).send("internal error");
  }
});

router.post("/create-checkout", express.json(), async (req, res) => {
  try {
    const { amount_cents = 17900, currency = "usd", grower_id, verification_id } = req.body;
    const success_url = `${process.env.REACT_APP_FRONTEND || "http://localhost:3000"}/orders?session_id={CHECKOUT_SESSION_ID}`;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{ price_data: { currency, product_data: { name: "AuditDNA Analysis" }, unit_amount: amount_cents }, quantity: 1 }],
      metadata: { grower_id, verification_id },
      success_url,
      cancel_url: `${process.env.REACT_APP_FRONTEND || "http://localhost:3000"}/cart`
    });
    res.json({ sessionId: session.id, url: session.url });
  } catch (e) {
    console.error("create-checkout error:", e);
    res.status(500).json({ error: e.message });
  }
});

router.post("/create-subscription", express.json(), async (req, res) => {
  try {
    const { price_id, customer_email } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: price_id, quantity: 1 }],
      customer_email,
      success_url: `${process.env.REACT_APP_FRONTEND || "http://localhost:3000"}/account?sub=success`,
      cancel_url: `${process.env.REACT_APP_FRONTEND || "http://localhost:3000"}/account?sub=cancel`
    });
    res.json({ sessionId: session.id, url: session.url });
  } catch (e) {
    console.error("create-subscription error:", e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
'@
$stripePath = Join-Path $paymentsDir "stripe_webhook.js"
$stripeJs | Out-File -FilePath $stripePath -Encoding UTF8
Write-OK "Wrote $stripePath"

# ---------- backend/pki/generate_keys.js ----------
$genKeysJs = @'
/**
 * backend/pki/generate_keys.js
 * Generate RSA 4096 keypair and save to backend/pki/keys
 */
const fs = require("fs");
const path = require("path");
const { generateKeyPairSync } = require("crypto");
const outDir = path.join(__dirname, "keys");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
console.log("Generating RSA 4096 keypair...");
const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 4096,
  publicKeyEncoding: { type: "pkcs1", format: "pem" },
  privateKeyEncoding: { type: "pkcs1", format: "pem" }
});
fs.writeFileSync(path.join(outDir, "private.pem"), privateKey, { mode: 0o600 });
fs.writeFileSync(path.join(outDir, "public.pem"), publicKey, { mode: 0o644 });
console.log("Keys written to:", outDir);
'@
$genKeysPath = Join-Path $pkiDir "generate_keys.js"
$genKeysJs | Out-File -FilePath $genKeysPath -Encoding UTF8
Write-OK "Wrote $genKeysPath"

# ---------- backend/pki/signing.js ----------
$signingJs = @'
/**
 * backend/pki/signing.js
 * Canonical JSON + RSA-SHA256 signing utilities
 */
const crypto = require("crypto");
function stableStringify(obj) {
  if (obj === null || obj === undefined) return "null";
  if (typeof obj !== "object") return JSON.stringify(obj);
  if (Array.isArray(obj)) return "[" + obj.map(stableStringify).join(",") + "]";
  const keys = Object.keys(obj).sort();
  return "{" + keys.map(k => JSON.stringify(k) + ":" + stableStringify(obj[k])).join(",") + "}";
}
function signObject(obj, privateKeyPem) {
  const canonical = stableStringify(obj);
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(canonical);
  sign.end();
  return sign.sign(privateKeyPem, "base64");
}
function verifyObject(obj, signatureBase64, publicKeyPem) {
  const canonical = stableStringify(obj);
  const verify = crypto.createVerify("RSA-SHA256");
  verify.update(canonical);
  verify.end();
  try { return verify.verify(publicKeyPem, signatureBase64, "base64"); } catch (e) { return false; }
}
module.exports = { stableStringify, signObject, verifyObject };
'@
$signingPath = Join-Path $pkiDir "signing.js"
$signingJs | Out-File -FilePath $signingPath -Encoding UTF8
Write-OK "Wrote $signingPath"

# ---------- backend/pki/routes.js ----------
$pkiRoutesJs = @'
/**
 * backend/pki/routes.js
 * Exposes PKI endpoints: public-key, sign, verify
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
const { signObject, verifyObject } = require("./signing");
const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/auditdna" });
const keysDir = path.join(__dirname, "keys");
const privPath = path.join(keysDir, "private.pem");
const pubPath = path.join(keysDir, "public.pem");
function loadPrivate() { if (!fs.existsSync(privPath)) throw new Error("Private key missing"); return fs.readFileSync(privPath,"utf8"); }
function loadPublic() { if (!fs.existsSync(pubPath)) throw new Error("Public key missing"); return fs.readFileSync(pubPath,"utf8"); }
router.get("/public-key", (req, res) => {
  try { res.type("text/plain").send(loadPublic()); } catch (e) { res.status(500).json({ error: e.message }); }
});
router.post("/sign/:verification_id", async (req, res) => {
  const vid = req.params.verification_id;
  const client = await pool.connect();
  try {
    const q = await client.query("SELECT id, analysis_report FROM verifications WHERE verification_id=$1", [vid]);
    if (!q.rowCount) return res.status(404).json({ error: "verification_not_found" });
    const row = q.rows[0];
    if (!row.analysis_report) return res.status(400).json({ error: "no_analysis_report" });
    const privatePem = loadPrivate();
    const sig = signObject(row.analysis_report, privatePem);
    await client.query("UPDATE verifications SET digital_signature=$1, analysis_signed_at=$2 WHERE id=$3", [sig, new Date(), row.id]);
    res.json({ ok:true, verification_id: vid, signature: sig });
  } catch (e) {
    console.error(e); res.status(500).json({ error: e.message });
  } finally { client.release(); }
});
router.get("/verify/:verification_id", async (req, res) => {
  const vid = req.params.verification_id;
  const client = await pool.connect();
  try {
    const q = await client.query("SELECT analysis_report, digital_signature FROM verifications WHERE verification_id=$1", [vid]);
    if (!q.rowCount) return res.status(404).json({ error: "verification_not_found" });
    const { analysis_report, digital_signature } = q.rows[0];
    if (!analysis_report || !digital_signature) return res.status(400).json({ error: "missing_report_or_signature" });
    const publicPem = loadPublic();
    const ok = verifyObject(analysis_report, digital_signature, publicPem);
    res.json({ ok, verification_id: vid });
  } catch (e) { console.error(e); res.status(500).json({ error: e.message }); } finally { client.release(); }
});
module.exports = router;
'@
$pkiRoutesPath = Join-Path $pkiDir "routes.js"
$pkiRoutesJs | Out-File -FilePath $pkiRoutesPath -Encoding UTF8
Write-OK "Wrote $pkiRoutesPath"

# ---------- backend/samples/generate_samples.js ----------
$samplesGen = @'
/**
 * backend/samples/generate_samples.js
 * Creates sample_lab.csv, sample_lab.xlsx, sample_lab.pdf
 */
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const xlsx = require("xlsx");
const outDir = __dirname;
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const csvPath = path.join(outDir, "sample_lab.csv");
const csvLines = ["Parameter,Result,Unit,Method,Lab","Lead (Pb),0.02,mg/kg,EPA 200.8,AcmeLab","E.coli,12,CFU/100g,ISO 16649,AcmeLab","Glyphosate,0.04,mg/kg,QuEChERS,AcmeLab"];
fs.writeFileSync(csvPath, csvLines.join("\n"), "utf8");
const xlsxPath = path.join(outDir, "sample_lab.xlsx");
const sheetData = [["Parameter","Result","Unit","Method","Lab"],["Lead (Pb)",0.02,"mg/kg","EPA 200.8","AcmeLab"],["E.coli",12,"CFU/100g","ISO 16649","AcmeLab"],["Glyphosate",0.04,"mg/kg","QuEChERS","AcmeLab"]];
const wb = xlsx.utils.book_new();
const ws = xlsx.utils.aoa_to_sheet(sheetData);
xlsx.utils.book_append_sheet(wb, ws, "Results");
xlsx.writeFile(wb, xlsxPath);
const pdfPath = path.join(outDir, "sample_lab.pdf");
const doc = new PDFDocument({ size: "A4", margin: 50 });
doc.pipe(fs.createWriteStream(pdfPath));
doc.fontSize(16).text("AcmeLab - Sample Report", { align: "center" }).moveDown();
const pdfLines = ["Lead (Pb)                      0.02   mg/kg   EPA 200.8","E.coli                         12     CFU/100g  ISO 16649","Glyphosate                     0.04   mg/kg   QuEChERS"];
pdfLines.forEach(l => { doc.text(l); doc.moveDown(0.2); });
doc.end();
console.log("Sample files created in", outDir);
'@
$samplesGenPath = Join-Path $samplesDir "generate_samples.js"
$samplesGen | Out-File -FilePath $samplesGenPath -Encoding UTF8
Write-OK "Wrote $samplesGenPath"

# ---------- backend/samples/generate_extended_samples.js ----------
$extGen = @'
/**
 * backend/samples/generate_extended_samples.js
 * Creates extended sample_lab_complex files for parser testing.
 */
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const xlsx = require("xlsx");
const outDir = __dirname;
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
// CSV
const csvPath = path.join(outDir, "sample_lab_complex.csv");
const csvLines = ["SampleID,Parameter,Result,Unit,LOD,Method,Lab,Notes","SAMP-EXT-001,Lead (Pb),0.018,mg/kg,0.001,EPA 200.8,AcmeLab,\"ok\"","SAMP-EXT-001,E.coli,5,CFU/100g,1,ISO 16649,AcmeLab,\"ok\"","SAMP-EXT-001,Glyphosate,0.035,mg/kg,0.005,QuEChERS,AcmeLab,\"ok\""];
fs.writeFileSync(csvPath, csvLines.join("\n"), "utf8");
// XLSX
const xlsxPath = path.join(outDir, "sample_lab_complex.xlsx");
const sheetData = [["SampleID","Parameter","Result","Unit","LOD","Method","Lab"],["SAMP-EXT-001","Lead (Pb)",0.018,"mg/kg",0.001,"EPA 200.8","AcmeLab"],["SAMP-EXT-001","E.coli",5,"CFU/100g",1,"ISO 16649","AcmeLab"],["SAMP-EXT-001","Glyphosate",0.035,"mg/kg",0.005,"QuEChERS","AcmeLab"]];
const wb = xlsx.utils.book_new();
const ws = xlsx.utils.aoa_to_sheet(sheetData);
xlsx.utils.book_append_sheet(wb, ws, "Results");
xlsx.writeFile(wb, xlsxPath);
// PDF
const pdfPath = path.join(outDir, "sample_lab_complex.pdf");
const doc = new PDFDocument({ size: "A4", margin: 50 });
doc.pipe(fs.createWriteStream(pdfPath));
doc.fontSize(16).text("AcmeLab - Extended Report", { align: "center" }).moveDown();
const chem = ["Parameter   Result   Unit   LOD   Method","Lead (Pb)   0.018   mg/kg   0.001   EPA 200.8","Glyphosate  0.035   mg/kg   0.005   QuEChERS"];
chem.forEach(l => { doc.text(l); doc.moveDown(0.2); });
doc.end();
console.log("Extended sample files created in", outDir);
'@
$extGenPath = Join-Path $samplesDir "generate_extended_samples.js"
$extGen | Out-File -FilePath $extGenPath -Encoding UTF8
Write-OK "Wrote $extGenPath"

# ---------- backend/tests/run_parser_tests.js ----------
$testRunner = @'
/**
 * backend/tests/run_parser_tests.js
 * Lightweight parser tests for generated sample files.
 */
const assert = require("assert");
const path = require("path");
const parser = require("../analysis/parser");
(async function(){
  const base = path.join(__dirname, "..", "samples");
  const csv = path.join(base, "sample_lab.csv");
  const xlsx = path.join(base, "sample_lab.xlsx");
  const pdf = path.join(base, "sample_lab.pdf");
  console.log("Testing CSV:", csv);
  const csvRes = await parser.parseCsv(csv);
  assert(Array.isArray(csvRes) && csvRes.length>0, "CSV parse");
  console.log("CSV parse OK");
  console.log("Testing XLSX:", xlsx);
  const xlsRes = await parser.parseXlsx(xlsx);
  assert(Array.isArray(xlsRes) && xlsRes.length>0, "XLSX parse");
  console.log("XLSX parse OK");
  console.log("Testing PDF:", pdf);
  const pdfRes = await parser.parsePdf(pdf);
  assert(Array.isArray(pdfRes) && pdfRes.length>0, "PDF parse");
  console.log("PDF parse OK");
  console.log("All parser tests passed ✅");
})();
'@
$testRunnerPath = Join-Path $testsDir "run_parser_tests.js"
$testRunner | Out-File -FilePath $testRunnerPath -Encoding UTF8
Write-OK "Wrote $testRunnerPath"

# ---------- backend/tests/e2e_run_and_verify.js ----------
$e2eJs = @'
/**
 * backend/tests/e2e_run_and_verify.js
 * Uploads sample file and polls the report until analysis finishes.
 */
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const API_BASE = process.env.API_BASE || process.env.REACT_APP_API_URL || "http://localhost:4000";
const GROWER_ID = process.env.GROWER_ID || "00000000-0000-0000-0000-000000000000";
const SAMPLE = path.join(__dirname, "..", "samples", "sample_lab_complex.pdf");
async function upload() {
  const form = new FormData();
  form.append("file", fs.createReadStream(SAMPLE));
  form.append("grower_id", GROWER_ID);
  form.append("product", "Avocados");
  const res = await axios.post(`${API_BASE}/api/verify/upload`, form, { headers: form.getHeaders() });
  return res.data;
}
async function poll(id) {
  const start = Date.now(); const timeout = 2*60*1000;
  while (Date.now()-start < timeout) {
    try {
      const r = await axios.get(`${API_BASE}/api/verify/report/${encodeURIComponent(id)}`);
      const v = r.data.verification;
      console.log("Status:", v.status, "overall:", v.analysis_report?.overall_score);
      if (v.status && v.status !== "pending") return v;
    } catch(e){ console.error("poll error", e.message); }
    await new Promise(r=>setTimeout(r,5000));
  }
  throw new Error("Timeout");
}
(async function(){
  try {
    const up = await upload();
    console.log("Upload result:", up);
    const id = up.verification_id || up.id;
    if (!id) throw new Error("no verification id");
    const report = await poll(id);
    console.log("Final report:", JSON.stringify(report,null,2));
  } catch(e) { console.error("E2E failed:", e); process.exit(1); }
})();
'@
$e2ePath = Join-Path $testsDir "e2e_run_and_verify.js"
$e2eJs | Out-File -FilePath $e2ePath -Encoding UTF8
Write-OK "Wrote $e2ePath"

# ---------- mobile/App.js ----------
$mobileAppJs = @'
/**
 * mobile/App.js - Expo field capture skeleton
 */
import React, { useState, useEffect } from "react";
import { Text, View, Button, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [image, setImage] = useState(null);
  const [loc, setLoc] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const pic = await ImagePicker.requestCameraPermissionsAsync();
        if (pic.status !== "granted") alert("Camera perms required");
        const locPerm = await Location.requestForegroundPermissionsAsync();
        if (locPerm.status !== "granted") alert("Location perms required");
      }
    })();
  }, []);

  const takePhoto = async () => {
    const res = await ImagePicker.launchCameraAsync({ quality: 0.6 });
    if (!res.cancelled) {
      setImage(res.uri);
      const l = await Location.getCurrentPositionAsync({});
      setLoc(l.coords);
    }
  };

  const saveQueue = async () => {
    const q = JSON.parse(await AsyncStorage.getItem("uploadQueue") || "[]");
    q.push({ uri: image, gps: loc, createdAt: new Date().toISOString() });
    await AsyncStorage.setItem("uploadQueue", JSON.stringify(q));
    alert("Saved to queue");
    setImage(null);
  };

  const uploadNow = async () => {
    const q = JSON.parse(await AsyncStorage.getItem("uploadQueue") || "[]");
    if (!q.length) return alert("Empty queue");
    for (const item of q) {
      const form = new FormData();
      form.append("verification_id", "TBD");
      form.append("step_name", "field_photo");
      form.append("actor", "field_user");
      form.append("gps", `${item.gps.latitude},${item.gps.longitude}`);
      form.append("photos", { uri: item.uri, name: "photo.jpg", type: "image/jpeg" });
      try { await fetch((process.env.REACT_APP_API_URL || "http://localhost:4000") + "/api/chain-of-custody", { method: "POST", body: form }); }
      catch(e){ console.error(e); alert("Upload failed"); return; }
    }
    await AsyncStorage.removeItem("uploadQueue");
    alert("Uploaded all");
  };

  return (
    <View style={{ flex:1, alignItems:"center", justifyContent:"center", padding:16 }}>
      <Text style={{ fontSize:18, marginBottom:12 }}>AuditDNA Field Capture</Text>
      <Button title="Take Photo" onPress={takePhoto} />
      {image && <Image source={{ uri:image }} style={{ width:240, height:160, marginTop:12 }} />}
      {loc && <Text>GPS: {loc.latitude.toFixed(5)}, {loc.longitude.toFixed(5)}</Text>}
      <View style={{ height:12 }} />
      <Button title="Save to Queue" onPress={saveQueue} />
      <View style={{ height:12 }} />
      <Button title="Upload Now" onPress={uploadNow} />
    </View>
  );
}
'@
$mobileAppPath = Join-Path $mobileDir "App.js"
$mobileAppJs | Out-File -FilePath $mobileAppPath -Encoding UTF8
Write-OK "Wrote $mobileAppPath"

# ---------- mobile/package.json ----------
$mobilePkg = @'
{
  "name": "auditdna-mobile",
  "version": "0.1.0",
  "private": true,
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~48.0.0",
    "expo-image-picker": "~14.0.0",
    "expo-location": "~15.0.0",
    "@react-native-async-storage/async-storage": "^1.17.11",
    "react": "18.2.0",
    "react-native": "0.71.8"
  }
}
'@
$mobilePkgPath = Join-Path $mobileDir "package.json"
$mobilePkg | Out-File -FilePath $mobilePkgPath -Encoding UTF8
Write-OK "Wrote $mobilePkgPath"

# ---------- safe patch server.js to mount routes ----------
$serverFile = Join-Path $backend "server.js"
if (Test-Path $serverFile) {
  $serverContent = Get-Content $serverFile -Raw
  if ($serverContent -notmatch "app.use\('/pki'") -or $serverContent -notmatch "app.use\('/payments'") {
    $backup = $serverFile + ".bak_powerpony"
    Copy-Item -Path $serverFile -Destination $backup -Force
    Write-Warn "Backed up original server.js to $backup"

    $insert = @"
//
// PowerPONY: PKI and Stripe mounts
const pkiRoutes = require('./pki/routes');
const stripeWebhook = require('./payments/stripe_webhook');
app.use('/pki', pkiRoutes);
app.use('/payments', stripeWebhook);
// End PowerPONY
"@

    # Try to insert after const app = express();
    if ($serverContent -match "const app = express\(\);") {
      $new = $serverContent -replace "const app = express\(\);", "const app = express();`n$insert"
      $new | Out-File -FilePath $serverFile -Encoding UTF8
      Write-OK "Patched server.js to mount /pki and /payments routes."
    } else {
      Write-Warn "Could not auto-patch server.js (pattern not found). Please add the following after app initialization:"
      Write-Host $insert
    }
  } else {
    Write-OK "server.js already contains PKI/Stripe mounts. No patch applied."
  }
} else {
  Write-Warn "server.js not found in backend. Ensure you mount /pki and /payments routers manually in your server."
}

# ---------- prompt to install npm deps ----------
$install = Read-Host "Install npm dependencies for backend and mobile now? (y/N)"
if ($install -eq "y" -or $install -eq "Y") {
  Write-Host "Installing backend deps..." -ForegroundColor Cyan
  Push-Location $backend
  npm install pdf-parse papaparse xlsx node-tesseract-ocr stripe express body-parser node-cron pg pdfkit axios form-data --no-audit --no-fund
  Pop-Location
  if (Test-Path $mobileDir) {
    Write-Host "Installing mobile deps..." -ForegroundColor Cyan
    Push-Location $mobileDir
    npm install --no-audit --no-fund
    Pop-Location
  }
  Write-OK "npm installs completed (or attempted)."
} else {
  Write-Warn "Skipped npm installs. You can run them later manually."
}

# ---------- prompt to generate RSA keys ----------
$gen = Read-Host "Generate RSA keypair now for PKI (recommended)? (y/N)"
if ($gen -eq "y" -or $gen -eq "Y") {
  Push-Location $pkiDir
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Err "Node not found in PATH. Cannot generate keys with Node. Install Node.js first."
  } else {
    node generate_keys.js
    Write-OK "RSA keys generated under backend/pki/keys"
  }
  Pop-Location
} else {
  Write-Warn "Skipping RSA key generation. Run 'node backend/pki/generate_keys.js' later."
}

# ---------- generate sample files ----------
$runSamples = Read-Host "Generate sample lab files now? (y/N)"
if ($runSamples -eq "y" -or $runSamples -eq "Y") {
  Push-Location $samplesDir
  if (Get-Command node -ErrorAction SilentlyContinue) {
    node generate_samples.js
    node generate_extended_samples.js
    Write-OK "Sample files generated."
  } else {
    Write-Err "Node not found; cannot run sample generation."
  }
  Pop-Location
} else {
  Write-Warn "Skipped sample generation."
}

# ---------- run parser tests ----------
$runTests = Read-Host "Run parser unit tests now? (y/N)"
if ($runTests -eq "y" -or $runTests -eq "Y") {
  Push-Location $backend
  if (Get-Command node -ErrorAction SilentlyContinue) {
    node tests/run_parser_tests.js
    if ($LASTEXITCODE -eq 0) { Write-OK "Parser tests passed." } else { Write-Err "Parser tests failed (exit code $LASTEXITCODE)." }
  } else {
    Write-Err "Node not found; cannot run tests."
  }
  Pop-Location
} else {
  Write-Warn "Skipped parser tests."
}

# ---------- final notes ----------
Write-Host ""
Write-OK "PowerPONY ALL bootstrap complete."
Write-Host ""
Write-Host "Next recommended commands:" -ForegroundColor Cyan
Write-Host " 1) Ensure env vars: DATABASE_URL, PORT, REACT_APP_API_URL, REACT_APP_FRONTEND, STRIPE_SECRET_KEY (opt), STRIPE_WEBHOOK_SECRET (opt)" -ForegroundColor White
Write-Host " 2) Apply DB schema (once):" -ForegroundColor White
Write-Host "    psql <your-connection-string> -f backend/db/schema.sql" -ForegroundColor Yellow
Write-Host " 3) Start backend server:" -ForegroundColor White
Write-Host "    cd backend" -ForegroundColor Yellow
Write-Host "    node server.js" -ForegroundColor Yellow
Write-Host " 4) Start scheduler worker (separate terminal):" -ForegroundColor White
Write-Host "    node backend/jobs/updatedScheduler.js" -ForegroundColor Yellow
Write-Host " 5) Start mobile app (optional):" -ForegroundColor White
Write-Host "    cd mobile; expo start" -ForegroundColor Yellow
Write-Host ""
Write-OK "If you want, run backend/tests/e2e_run_and_verify.js once the server is running to validate upload -> analysis -> report." 
Write-Host ""
Write-Host "PowerPONY ALL finished. Go Powershell it! 💥" -ForegroundColor Magenta