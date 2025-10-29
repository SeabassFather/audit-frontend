<#
create_powerpony_minimal.ps1

A small, safe bootstrap PowerShell script to create a minimal AuditDNA dev scaffold.
- Creates minimal backend files needed to start local development and testing:
  - backend/analysis/parser.js
  - backend/analysis/engine.js
  - backend/db/apply_schema.cjs
  - backend/db/schema.sql (if missing)
  - backend/samples/generate_samples.js
  - backend/pki/generate_keys.js
  - backend/tests/run_parser_tests.js
- Optionally patches backend/server.js to mount /pki and /payments routers (backups the original).
- Does NOT commit or push. Keeps changes local so you can review and modify.
- Purpose: quick starting point; we will expand later.

USAGE:
  1) Save this file to your repo root.
  2) Open PowerShell in the repo root.
  3) Run:  ./create_powerpony_minimal.ps1
  4) Follow the short prompts.
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-OK($m){ Write-Host $m -ForegroundColor Green }
function Write-Warn($m){ Write-Host $m -ForegroundColor Yellow }
function Write-Err($m){ Write-Host $m -ForegroundColor Red }

$root = (Get-Location).Path
$backend = Join-Path $root "backend"
$analysis = Join-Path $backend "analysis"
$db = Join-Path $backend "db"
$samples = Join-Path $backend "samples"
$pki = Join-Path $backend "pki"
$tests = Join-Path $backend "tests"

# create folders
foreach ($d in @($backend, $analysis, $db, $samples, $pki, $tests)) {
  if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null; Write-OK "Created: $d" } else { Write-Warn "Exists: $d" }
}

# helper to write file (back up existing)
function SafeWrite($path, $content) {
  $full = Join-Path $root $path
  $dir = Split-Path $full -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  if (Test-Path $full) {
    $bak = "$full.bak_minimal"
    Copy-Item -Path $full -Destination $bak -Force
    Write-Warn "Backed up existing $path -> $bak"
  }
  $content | Out-File -FilePath $full -Encoding UTF8
  Write-OK "Wrote $path"
}

# minimal parser.js
$parser = @'
/**
 * backend/analysis/parser.js
 * Minimal parser for CSV/XLSX/PDF (heuristic).
 * Replace/adapt parser rules to your lab report formats.
 */
const fs = require("fs");
const path = require("path");
let pdf;
try { pdf = require("pdf-parse"); } catch(e) { pdf = null; }
const Papa = require("papaparse");
const xlsx = require("xlsx");

async function parseCsv(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
  return parsed.data.map(r => ({ parameter: r.Parameter || r.Analyte || Object.keys(r)[0], value: parseFloat(r.Result || r.Value || Object.values(r)[1]) || null, unit: r.Unit || "" }));
}

async function parseXlsx(filePath) {
  const wb = xlsx.readFile(filePath);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(ws, { defval: null });
  return rows.map(r => ({ parameter: r.Parameter || r.Analyte || Object.keys(r)[0], value: parseFloat(r.Result || r.Value || Object.values(r)[1]) || null, unit: r.Unit || "" }));
}

async function parsePdf(filePath) {
  if (!pdf) throw new Error("pdf-parse not installed");
  const data = fs.readFileSync(filePath);
  const parsed = await pdf(data);
  const lines = (parsed.text || "").split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const re = /([A-Za-z0-9\.\-\s\(\)\/]+)\s+([0-9\.,]+)\s*(mg\/kg|ppm|cfu\/100g|µg\/kg|ug\/kg|mg\/L)?/i;
  const out = [];
  for (const l of lines) {
    const m = l.match(re);
    if (m) { out.push({ parameter: m[1].trim(), value: parseFloat(m[2].replace(",", ".")), unit: (m[3]||"").trim() }); }
  }
  return out;
}

async function parseLabFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".csv") return parseCsv(filePath);
  if (ext === ".xlsx" || ext === ".xls") return parseXlsx(filePath);
  if (ext === ".pdf") return parsePdf(filePath);
  throw new Error("Unsupported file type: " + ext);
}

module.exports = { parseLabFile, parseCsv, parseXlsx, parsePdf };
'@
SafeWrite "backend/analysis/parser.js" $parser

# minimal engine.js
$engine = @'
/**
 * backend/analysis/engine.js
 * Minimal analysis engine that maps parsed results to simple thresholds.
 */
const parser = require("./parser");

function computeScore(value, limit) {
  if (value == null) return 0.5;
  if (limit == null) return 0.7;
  return (value <= limit) ? 1 : 0;
}

async function runAnalysis({ rawLab, standards = {} }) {
  const parsed = await parser.parseLabFile(rawLab.filePath).catch(()=>[]);
  const results = parsed.map(r => {
    const std = (standards && standards.DEFAULT && standards.DEFAULT[r.parameter]) ? standards.DEFAULT[r.parameter] : null;
    const limit = std ? std.limit : null;
    const score = computeScore(r.value, limit);
    return { parameter: r.parameter, value: r.value, unit: r.unit, limit, score };
  });
  const overall = results.length ? Math.round(results.reduce((s,r)=>s+r.score,0)/results.length * 100) : null;
  return { parsed_results: results, overall_score: overall, metadata: { engine: "minimal" }, valid_until: new Date(Date.now()+1000*60*60*24*180).toISOString() };
}

module.exports = { runAnalysis };
'@
SafeWrite "backend/analysis/engine.js" $engine

# apply_schema.cjs (CommonJS)
$apply = @'
/**
 * backend/db/apply_schema.cjs
 * Apply SQL schema via Node using DATABASE_URL.
 */
const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const schemaPath = path.join(__dirname, "schema.sql");
if (!fs.existsSync(schemaPath)) {
  console.error("schema.sql missing in backend/db - create or copy one there.");
  process.exit(1);
}

const sql = fs.readFileSync(schemaPath, "utf8");
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) { console.error("Set DATABASE_URL env var (e.g. postgres://user:pass@host:5432/db)"); process.exit(1); }

(async () => {
  const pool = new Pool({ connectionString: dbUrl });
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(sql);
    await client.query("COMMIT");
    console.log("Schema applied.");
  } catch (e) {
    await client.query("ROLLBACK").catch(()=>{});
    console.error("Error:", e.message || e);
  } finally {
    client.release();
    await pool.end();
  }
})();
'@
SafeWrite "backend/db/apply_schema.cjs" $apply

# simple schema.sql stub if missing
$schema_stub = @'
-- backend/db/schema.sql (minimal stub)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS growers ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), grower_name TEXT );
CREATE TABLE IF NOT EXISTS verifications ( id SERIAL PRIMARY KEY, verification_id TEXT UNIQUE, grower_id UUID REFERENCES growers(id), analysis_report JSONB, status TEXT, uploaded_at TIMESTAMP );
'@
if (-not (Test-Path (Join-Path $db "schema.sql"))) {
  SafeWrite "backend/db/schema.sql" $schema_stub
} else {
  Write-Warn "backend/db/schema.sql exists; leaving it in place."
}

# sample generator
$samples = @'
/**
 * backend/samples/generate_samples.js
 * Creates small sample CSV/XLSX/PDF for parser testing.
 */
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const xlsx = require("xlsx");

const out = __dirname;
if (!fs.existsSync(out)) fs.mkdirSync(out, { recursive: true });

fs.writeFileSync(path.join(out,"sample_lab.csv"), "Parameter,Result,Unit\nLead (Pb),0.02,mg/kg\nE.coli,12,CFU/100g\n");
const wb = xlsx.utils.book_new();
const ws = xlsx.utils.aoa_to_sheet([["Parameter","Result","Unit"],["Lead (Pb)",0.02,"mg/kg"],["E.coli",12,"CFU/100g"]]);
xlsx.utils.book_append_sheet(wb, ws, "Results");
xlsx.writeFile(wb, path.join(out,"sample_lab.xlsx"));

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream(path.join(out,"sample_lab.pdf")));
doc.text("Lead (Pb)    0.02   mg/kg");
doc.text("E.coli       12     CFU/100g");
doc.end();
console.log("Samples written to", out);
'@
SafeWrite "backend/samples/generate_samples.js" $samples

# minimal PKI key generator
$keygen = @'
/**
 * backend/pki/generate_keys.js
 * Generates RSA keypair into backend/pki/keys
 */
const fs = require("fs");
const path = require("path");
const { generateKeyPairSync } = require("crypto");
const out = path.join(__dirname, "keys");
if (!fs.existsSync(out)) fs.mkdirSync(out, { recursive: true });
const { publicKey, privateKey } = generateKeyPairSync("rsa", { modulusLength: 4096, publicKeyEncoding: { type: "pkcs1", format: "pem" }, privateKeyEncoding: { type: "pkcs1", format: "pem" } });
fs.writeFileSync(path.join(out,"private.pem"), privateKey, { mode: 0o600 });
fs.writeFileSync(path.join(out,"public.pem"), publicKey, { mode: 0o644 });
console.log("Keys written to", out);
'@
SafeWrite "backend/pki/generate_keys.js" $keygen

# simple parser tests
$ptest = @'
/**
 * backend/tests/run_parser_tests.js
 * Quick tests: generate samples then parse them.
 */
const path = require("path");
const parser = require("../analysis/parser");
const gen = require("../samples/generate_samples");
(async () => {
  // generate samples if script present
  try { require("../samples/generate_samples"); } catch(e){}
  const base = path.join(__dirname,"..","samples");
  const resCsv = await parser.parseCsv(path.join(base,"sample_lab.csv"));
  console.log("CSV parse result:", resCsv);
  const resXls = await parser.parseXlsx(path.join(base,"sample_lab.xlsx"));
  console.log("XLSX parse result:", resXls);
  try { const resPdf = await parser.parsePdf(path.join(base,"sample_lab.pdf")); console.log("PDF parse result:", resPdf); } catch(e){ console.warn("PDF parse skipped:", e.message); }
  console.log("Parser tests done.");
})();
'@
SafeWrite "backend/tests/run_parser_tests.js" $ptest

# Attempt safe patch of server.js to mount routers (only if file exists and pattern found)
$server = Join-Path $backend "server.js"
if (Test-Path $server) {
  $s = Get-Content $server -Raw
  if ($s -notmatch "app.use\('/pki'") -and $s -match "const app = express\(\);") {
    $bak = "$server.bak_minimal"
    Copy-Item -Path $server -Destination $bak -Force
    Write-Warn "Backed up server.js -> $bak"
    $insert = @'
//
// Minimal PowerPONY mounts (added by create_powerpony_minimal.ps1)
try {
  const pkiRoutes = require("./pki/routes");
  const stripeRoutes = require("./payments/stripe_webhook");
  app.use("/pki", pkiRoutes);
  app.use("/payments", stripeRoutes);
} catch(e) {
  // If routes not present yet, skip. Add them later.
}
'@
    $new = $s -replace "const app = express\\(\\);", "const app = express();`n$insert"
    $new | Out-File -FilePath $server -Encoding UTF8
    Write-OK "Patched server.js to include minimal mounts (safe try/catch)."
  } else {
    Write-Warn "server.js not patched (either already contains mounts or app init not found)."
  }
} else {
  Write-Warn "backend/server.js not found; skip patch."
}

Write-Host ""
Write-OK "Minimal PowerPONY scaffold created."
Write-Host "Next quick steps (run these in backend folder):" -ForegroundColor Cyan
Write-Host "  npm install pdf-parse papaparse xlsx pdfkit pg --no-audit --no-fund" -ForegroundColor Yellow
Write-Host "  Set DATABASE_URL environment variable for this PowerShell session:" -ForegroundColor Yellow
Write-Host '    $env:DATABASE_URL = "postgres://postgres:postgres@localhost:5432/auditdna"' -ForegroundColor Yellow
Write-Host "  node db/apply_schema.cjs   # applies SQL schema" -ForegroundColor Yellow
Write-Host "  node pki/generate_keys.js  # creates keys" -ForegroundColor Yellow
Write-Host "  node samples/generate_samples.js  # generate sample files" -ForegroundColor Yellow
Write-Host "  node tests/run_parser_tests.js    # run parser tests" -ForegroundColor Yellow
Write-Host ""
Write-OK "You can edit the created files to expand functionality. Tell me which part to extend next (parser, engine, Stripe, PKI routes, mobile)." -ForegroundColor Cyan