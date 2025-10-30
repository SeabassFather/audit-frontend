# create_pki_stripe.ps1
# PowerPONY installer: creates PKI signing code + Stripe webhook automation and patches server.js
# Usage: Run from repo root in PowerShell:
#   ./create_pki_stripe.ps1
Set-StrictMode -Version Latest

$root = (Get-Location).Path
$backend = Join-Path $root "backend"
$pkiDir = Join-Path $backend "pki"
$paymentsDir = Join-Path $backend "payments"
$serverFile = Join-Path $backend "server.js"

if (-not (Test-Path $backend)) {
  Write-Host "ERROR: backend folder not found in repo root ($backend)." -ForegroundColor Red
  exit 1
}

# create directories
New-Item -ItemType Directory -Force -Path $pkiDir | Out-Null
New-Item -ItemType Directory -Force -Path $paymentsDir | Out-Null

# ------------------------
# backend/pki/generate_keys.js
# ------------------------
$generateKeys = @'
/**
 * backend/pki/generate_keys.js
 * Generate RSA keypair (4096) and save to backend/pki/keys
 *
 * Usage:
 *   node generate_keys.js
 *
 * Outputs:
 *   backend/pki/keys/private.pem
 *   backend/pki/keys/public.pem
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
console.log("private.pem (keep secure), public.pem (distribute as needed)");
'@
$pathGen = Join-Path $pkiDir "generate_keys.js"
$generateKeys | Out-File -FilePath $pathGen -Encoding UTF8
Write-Host "Wrote: $pathGen"

# ------------------------
# backend/pki/signing.js
# ------------------------
$signing = @'
/**
 * backend/pki/signing.js
 * Canonical JSON + RSA-SHA256 signing and verification utilities
 *
 * Exports:
 *  - signObject(obj, privateKeyPem) => base64 signature
 *  - verifyObject(obj, signatureBase64, publicKeyPem) => boolean
 *
 * Usage:
 *   const signing = require("./pki/signing");
 *   const sig = signing.signObject(report, fs.readFileSync("backend/pki/keys/private.pem","utf8"));
 *   const ok  = signing.verifyObject(report, sig, fs.readFileSync("backend/pki/keys/public.pem","utf8"));
 */
const crypto = require("crypto");

function stableStringify(obj) {
  if (obj === null || obj === undefined) return "null";
  if (typeof obj !== "object") return JSON.stringify(obj);
  if (Array.isArray(obj)) {
    return "[" + obj.map(stableStringify).join(",") + "]";
  }
  // object - sort keys
  const keys = Object.keys(obj).sort();
  const parts = keys.map(k => {
    return JSON.stringify(k) + ":" + stableStringify(obj[k]);
  });
  return "{" + parts.join(",") + "}";
}

function signObject(obj, privateKeyPem) {
  const canonical = stableStringify(obj);
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(canonical);
  sign.end();
  const signature = sign.sign(privateKeyPem, "base64");
  return signature;
}

function verifyObject(obj, signatureBase64, publicKeyPem) {
  const canonical = stableStringify(obj);
  const verify = crypto.createVerify("RSA-SHA256");
  verify.update(canonical);
  verify.end();
  try {
    return verify.verify(publicKeyPem, signatureBase64, "base64");
  } catch (e) {
    return false;
  }
}

module.exports = { stableStringify, signObject, verifyObject };
'@
$pathSigning = Join-Path $pkiDir "signing.js"
$signing | Out-File -FilePath $pathSigning -Encoding UTF8
Write-Host "Wrote: $pathSigning"

# ------------------------
# backend/pki/routes.js
# ------------------------
$pkiRoutes = @'
/**
 * backend/pki/routes.js
 * Express router exposing:
 *  - GET  /pki/public-key          -> returns public key PEM
 *  - POST /pki/sign/:verification_id -> signs stored report and saves signature DB
 *  - GET  /pki/verify/:verification_id -> verifies stored signature
 *
 * Requires:
 *  - process.env.DATABASE_URL pointing to Postgres with verifications table
 *  - backend/pki/keys/private.pem and public.pem generated
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

function loadPrivate() {
  if (!fs.existsSync(privPath)) throw new Error("Private key missing: " + privPath);
  return fs.readFileSync(privPath, "utf8");
}
function loadPublic() {
  if (!fs.existsSync(pubPath)) throw new Error("Public key missing: " + pubPath);
  return fs.readFileSync(pubPath, "utf8");
}

// expose public key for verification consumers
router.get("/public-key", (req, res) => {
  try {
    const pub = loadPublic();
    res.type("text/plain").send(pub);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// sign report endpoint - signs existing analysis_report JSON stored in verifications.analysis_report
router.post("/sign/:verification_id", async (req, res) => {
  const vid = req.params.verification_id;
  const client = await pool.connect();
  try {
    const q = await client.query("SELECT id, verification_id, analysis_report FROM verifications WHERE verification_id=$1", [vid]);
    if (!q.rowCount) return res.status(404).json({ error: "verification_not_found" });
    const row = q.rows[0];
    if (!row.analysis_report) return res.status(400).json({ error: "no_analysis_report" });

    const privatePem = loadPrivate();
    // sign the analysis_report JSON (object)
    const sig = signObject(row.analysis_report, privatePem);

    // persist digital signature and signature metadata
    await client.query("UPDATE verifications SET digital_signature=$1, analysis_signed_at=$2 WHERE id=$3", [sig, new Date(), row.id]);

    res.json({ ok: true, verification_id: vid, signature: sig });
  } catch (e) {
    console.error("PKI sign error:", e);
    res.status(500).json({ error: e.message });
  } finally {
    client.release();
  }
});

// verify stored signature
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
  } catch (e) {
    console.error("PKI verify error:", e);
    res.status(500).json({ error: e.message });
  } finally {
    client.release();
  }
});

module.exports = router;
'@
$pathPkiRoutes = Join-Path $pkiDir "routes.js"
$pkiRoutes | Out-File -FilePath $pathPkiRoutes -Encoding UTF8
Write-Host "Wrote: $pathPkiRoutes"

# ------------------------
# backend/payments/stripe_webhook.js
# ------------------------
$stripeWebhook = @'
/**
 * backend/payments/stripe_webhook.js
 * Enhanced Stripe router:
 *  - /create-checkout : create one-off payment session (same as before)
 *  - /create-subscription : create subscription session
 *  - /webhook : verifies stripe signature and processes events
 *
 * On successful checkout.session.completed with metadata.verification_id:
 *  - marks verifications.payment_status = paid, payment_date
 *  - updates verifications.status to "paid"
 *  - optionally triggers immediate analysis by calling analysis engine
 */
const express = require("express");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const analysis = require("../analysis/engine");

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_replace");
const pool = new Pool({ connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/auditdna" });

// IMPORTANT: webhook requires raw body. Mount this router BEFORE any bodyParser.json() in server or ensure raw is applied here.
router.post("/webhook", bodyParser.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      // insecure fallback for local testing (no signature verification)
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
        // update DB if verificationId present
        if (verificationId) {
          const client = await pool.connect();
          try {
            // set paid and payment_date; mark status 'paid'
            await client.query("UPDATE verifications SET status=$1, payment_status=$2, payment_date=$3 WHERE verification_id=$4",
              ["paid", "paid", new Date(), verificationId]);
            // fetch row to trigger analysis
            const q = await client.query("SELECT id, grower_id, product_name, lot_number, destination_country, file_path FROM verifications WHERE verification_id=$1", [verificationId]);
            if (q.rowCount) {
              const v = q.rows[0];
              // Trigger analysis asynchronously at higher priority
              process.nextTick(async () => {
                try {
                  const report = await analysis.runAnalysis({ grower_id: v.grower_id, product: v.product_name, lot_number: v.lot_number, destination_country: v.destination_country, rawLab: { filePath: v.file_path }, standards: require("../standards/standards.json") });
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
        // handle subscription renewals if needed
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

// Create checkout (wrap existing creation logic)
router.post("/create-checkout", express.json(), async (req, res) => {
  try {
    const { amount_cents = 17900, currency = "usd", grower_id, verification_id } = req.body;
    const success_url = `${process.env.REACT_APP_FRONTEND || "http://localhost:3000"}/orders?session_id={CHECKOUT_SESSION_ID}`;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
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

// keep create-subscription route for convenience
router.post("/create-subscription", express.json(), async (req, res) => {
  try {
    const { price_id, customer_email } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
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
$pathStripeWebhook = Join-Path $paymentsDir "stripe_webhook.js"
$stripeWebhook | Out-File -FilePath $pathStripeWebhook -Encoding UTF8
Write-Host "Wrote: $pathStripeWebhook"

# ------------------------
# Patch backend/server.js to mount routes (safe append)
# ------------------------
if (Test-Path $serverFile) {
  $serverContent = Get-Content $serverFile -Raw
  $needPatch = $false

  if ($serverContent -notmatch "require\(.+\/pki\/routes") {
    $needPatch = $true
  }
  if ($serverContent -notmatch "require\(.+\/payments\/stripe_webhook") {
    $needPatch = $true
  }

  if ($needPatch) {
    # Insert after "const app = express();" line
    $pattern = "const app = express();"
    if ($serverContent -match [regex]::Escape($pattern)) {
      $insert = "`n// Mounted by PowerPONY: PKI & Stripe webhook routes`nconst pkiRoutes = require('./pki/routes');`nconst stripeWebhook = require('./payments/stripe_webhook');`napp.use('/pki', pkiRoutes);`napp.use('/payments', stripeWebhook);`n"
      $newContent = $serverContent -replace [regex]::Escape($pattern), ($pattern + $insert)
      $backup = $serverFile + ".bak_PowerPONY"
      Copy-Item -Path $serverFile -Destination $backup -Force
      $newContent | Out-File -FilePath $serverFile -Encoding UTF8
      Write-Host "Patched server.js and backed up original to $backup" -ForegroundColor Green
    } else {
      Write-Host "Could not find app initialization line; not patching server.js. Please add the following manually after express app init:" -ForegroundColor Yellow
      Write-Host "const pkiRoutes = require('./pki/routes');" -ForegroundColor Cyan
      Write-Host "const stripeWebhook = require('./payments/stripe_webhook');" -ForegroundColor Cyan
      Write-Host "app.use('/pki', pkiRoutes);" -ForegroundColor Cyan
      Write-Host "app.use('/payments', stripeWebhook);" -ForegroundColor Cyan
    }
  } else {
    Write-Host "server.js already appears to have PKI/Stripe mounts; skipping patch." -ForegroundColor Yellow
  }
} else {
  Write-Host "server.js not found; please mount generated routers in your server when you run the backend." -ForegroundColor Yellow
}

# ------------------------
# Install required npm deps (stripe, pg already likely installed, ensure crypto built-in)
# ------------------------
Write-Host "Installing new npm dependencies in backend (stripe, pg, pdfkit if missing)..." -ForegroundColor Cyan
Push-Location $backend
# add dependencies: stripe (if not installed), pdfkit used for sample generation earlier
npm install stripe pg pdfkit --no-audit --no-fund
Pop-Location
Write-Host "Dependencies installed (backend)." -ForegroundColor Green

# Run key generation automatically if requested
$genChoice = Read-Host "Generate RSA keypair now? (recommended) (y/N)"
if ($genChoice -eq "y" -or $genChoice -eq "Y") {
  Push-Location $pkiDir
  node generate_keys.js
  Pop-Location
  Write-Host "RSA keypair generated under backend/pki/keys" -ForegroundColor Green
} else {
  Write-Host "Skipping key generation. Run 'node backend/pki/generate_keys.js' later to generate keys." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "PowerPONY PKI+Stripe setup complete." -ForegroundColor Magenta
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host " 1) Ensure process.env.DATABASE_URL is set and DB schema applied (backend/db/schema.sql)" -ForegroundColor White
Write-Host " 2) Start backend: cd backend && node server.js" -ForegroundColor White
Write-Host " 3) If using Stripe webhooks in production, set STRIPE_WEBHOOK_SECRET and configure webhook endpoint to /payments/webhook" -ForegroundColor White
Write-Host " 4) Use POST /pki/sign/:verification_id to sign verified reports and GET /pki/verify/:verification_id to verify" -ForegroundColor White
Write-Host ""
Write-Host "If you want, I can also create a small curl-based test script to exercise sign -> verify -> stripe webhook flows." -ForegroundColor Cyan
'@

Write-Host "Installer script created. Run ./create_pki_stripe.ps1 from repo root to write files and optionally generate keys." -ForegroundColor Green