<#
PowerPONY bootstrap script
- Creates backend parser, Stripe & webhook endpoints, updated scheduler
- Creates an Expo React Native mobile app skeleton for field uploads/offline queue
- Use: Run in repo root (e.g., C:\AuditDNA)
- After running: npm install in backend and mobile folders, configure env vars, run servers
#>

# === CONFIG ===
$root = (Get-Location).Path
Write-Host "PowerPONY starting in: $root"

$backend = Join-Path $root "backend"
$analysisDir = Join-Path $backend "analysis"
$paymentsDir = Join-Path $backend "payments"
$jobsDir = Join-Path $backend "jobs"

$mobileDir = Join-Path $root "mobile"

# Create directories
New-Item -ItemType Directory -Force -Path $backend,$analysisDir,$paymentsDir,$jobsDir,$mobileDir | Out-Null

# --------------------------
# backend/analysis/parser.js
# --------------------------
$parser = @'
/**
 * backend/analysis/parser.js
 * Lab report parsing utilities - PDF / CSV / XLSX / OCR stub
 *
 * Dependencies (install in backend):
 *   npm i pdf-parse papaparse xlsx node-tesseract-ocr axios form-data
 *
 * Notes:
 *  - replace OCR config with your environment's tesseract path if needed
 *  - add lab-specific parsing rules (table coordinates, header names)
 */

const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const Papa = require('papaparse');
const xlsx = require('xlsx');
const tesseract = require('node-tesseract-ocr');

const OCR_CONFIG = {
  lang: "eng",
  oem: 1,
  psm: 3
};

// Basic parser dispatcher
async function parseLabFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.pdf') return parsePdf(filePath);
  if (ext === '.csv') return parseCsv(filePath);
  if (ext === '.xlsx' || ext === '.xls') return parseXlsx(filePath);
  if (['.png', '.jpg', '.jpeg', '.tiff'].includes(ext)) return parseImage(filePath);
  throw new Error('Unsupported file type: ' + ext);
}

async function parsePdf(filePath) {
  const data = fs.readFileSync(filePath);
  const parsed = await pdf(data);
  // naive: try to extract CSV-like lines from text and parse; replace with table extraction lib as needed
  const text = parsed.text || '';
  const rows = text.split(/\r?\n/).map(r => r.trim()).filter(r => r.length > 0);
  // TODO: implement robust table extraction (tabula-java / camelot via service) for structured PDFs
  // Heuristic parser: look for lines that contain parameter and numeric value
  const results = [];
  const re = /([A-Za-z0-9\.\s\-\(\)\/]+)\s+([0-9\.,]+)\s*(mg\/kg|ppm|ppb|cfu\/100g|cfu\/g|µg\/kg|ug\/kg|ng\/g)?/i;
  for (const line of rows) {
    const m = line.match(re);
    if (m) {
      const param = m[1].trim();
      let value = parseFloat(m[2].replace(',', '.'));
      let unit = (m[3] || '').trim();
      results.push({ parameter: param, value, unit, raw_line: line });
    }
  }
  return results;
}

async function parseCsv(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
  // Expect columns like Parameter, Result, Unit
  const results = parsed.data.map(row => {
    return {
      parameter: row['Parameter'] || row['Analyte'] || row['PARAM'] || Object.values(row)[0],
      value: parseFloat(row['Result'] || row['Value'] || Object.values(row)[1]) || null,
      unit: row['Unit'] || row['Units'] || ''
    };
  });
  return results;
}

async function parseXlsx(filePath) {
  const wb = xlsx.readFile(filePath);
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  // convert to json
  const data = xlsx.utils.sheet_to_json(ws, { defval: null });
  const results = data.map(row => ({
    parameter: row['Parameter'] || row['Analyte'] || Object.keys(row)[0],
    value: parseFloat(row['Result'] || row['Value'] || Object.values(row)[1]) || null,
    unit: row['Unit'] || ''
  }));
  return results;
}

async function parseImage(filePath) {
  // OCR fallback
  const text = await tesseract.recognize(filePath, OCR_CONFIG);
  // reuse pdf heuristics
  const rows = text.split(/\r?\n/).map(r => r.trim()).filter(r => r.length > 0);
  const results = [];
  const re = /([A-Za-z0-9\.\s\-\(\)\/]+)\s+([0-9\.,]+)\s*(mg\/kg|ppm|ppb|cfu\/100g|cfu\/g|µg\/kg|ug\/kg|ng\/g)?/i;
  for (const line of rows) {
    const m = line.match(re);
    if (m) {
      const param = m[1].trim();
      let value = parseFloat(m[2].replace(',', '.'));
      let unit = (m[3] || '').trim();
      results.push({ parameter: param, value, unit, raw_line: line });
    }
  }
  return results;
}

module.exports = {
  parseLabFile,
  parsePdf,
  parseCsv,
  parseXlsx,
  parseImage
};
'@

$parserPath = Join-Path $analysisDir "parser.js"
$parser | Out-File -FilePath $parserPath -Encoding UTF8
Write-Host "Written: $parserPath"

# --------------------------
# backend/payments/stripe.js
# --------------------------
$stripe = @'
/**
 * backend/payments/stripe.js
 * Stripe integration for one-off analysis and subscription management
 *
 * Install:
 *   npm i stripe body-parser express
 *
 * ENV:
 *   STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, REACT_APP_API_URL
 *
 * Exposes:
 *   POST /payments/create-checkout - create one-off payment (analysis)
 *   POST /payments/create-subscription - create subscription checkout
 *   POST /payments/webhook - Stripe webhook to handle successful payments
 */

const express = require("express");
const Stripe = require("stripe");
const bodyParser = require("body-parser");

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_replace");

router.use(bodyParser.raw({ type: "application/json" }));

// Create Checkout Session for one-off analysis
router.post("/create-checkout", async (req, res) => {
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
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Create Checkout Session for subscription - simple example
router.post("/create-subscription", async (req, res) => {
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
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Webhook
router.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const event = webhookSecret ? stripe.webhooks.constructEvent(req.body, sig, webhookSecret) : JSON.parse(req.body);
    console.log("Stripe event:", event.type);
    // Handle checkout.session.completed and invoice.payment_succeeded
    switch (event.type) {
      case "checkout.session.completed":
        // mark verification/payment as paid using metadata
        const session = event.data.object;
        console.log("Checkout completed:", session.metadata);
        break;
      case "invoice.payment_succeeded":
        console.log("Subscription payment succeeded", event.data.object);
        break;
      default:
        console.log("Unhandled event type:", event.type);
    }
    res.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

module.exports = router;
'@

$stripePath = Join-Path $paymentsDir "stripe.js"
$stripe | Out-File -FilePath $stripePath -Encoding UTF8
Write-Host "Written: $stripePath"

# --------------------------
# backend/server.stripe.js (example mount)
# --------------------------
$serverStripe = @'
/*
  backend/server.stripe.js
  Add to your main server.js:
    const stripeRoutes = require("./payments/stripe");
    app.use("/payments", stripeRoutes);
  Ensure bodyParser.raw is used for /payments/webhook (stripe expects raw body)
*/
'@

$ssPath = Join-Path $backend "server.stripe.js"
$serverStripe | Out-File -FilePath $ssPath -Encoding UTF8
Write-Host "Written: $ssPath"

# --------------------------
# backend/jobs/updatedScheduler.js
# --------------------------
$scheduler = @'
/**
 * backend/jobs/updatedScheduler.js
 * Notification scheduler implementing:
 * - First 6 months: aggressive cadence (per subscription)
 * - After 6 months: enforce schedule (Gold monthly, Silver quarter, Bronze semi-annual)
 * - Special rule: Water supply tests monthly after first 6 months (if intended for export)
 *
 * Install: npm i node-cron pg
 *
 * Start this worker with: node backend/jobs/updatedScheduler.js
 */

const cron = require("node-cron");
const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/auditdna" });

async function scheduleChecks() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT id, verification_id, grower_id, analysis_date, subscription_tier, product_name, destination_country FROM verifications WHERE status='verified'");
    const rows = res.rows;
    const now = new Date();
    for (const r of rows) {
      const analysisDate = r.analysis_date ? new Date(r.analysis_date) : now;
      const monthsSince = (now.getFullYear() - analysisDate.getFullYear()) * 12 + (now.getMonth() - analysisDate.getMonth());
      // Determine cadenceDays
      let cadenceDays = 90; // default
      if (monthsSince < 6) {
        // ramping period
        cadenceDays = (r.subscription_tier === "gold") ? 30 : (r.subscription_tier === "silver") ? 60 : 90;
      } else {
        // long-term
        // Special water rule: if product or destination requires water monthly, set to 30
        if ((r.product_name && r.product_name.toLowerCase().includes("water")) || (r.destination_country === "EU" && r.product_name && r.product_name.toLowerCase().includes("avocado"))) {
          cadenceDays = 30;
        } else {
          cadenceDays = (r.subscription_tier === "gold") ? 30 : (r.subscription_tier === "silver") ? 90 : 180;
        }
      }
      // check last notification
      const last = await client.query("SELECT created_at FROM notifications WHERE verification_id=$1 ORDER BY created_at DESC LIMIT 1", [r.id]);
      const lastDate = last.rowCount ? new Date(last.rows[0].created_at) : null;
      const daysSinceLast = lastDate ? Math.floor((now - lastDate) / (1000*3600*24)) : 9999;
      if (daysSinceLast >= cadenceDays) {
        await client.query(
          "INSERT INTO notifications (grower_id, verification_id, type, message, payload, created_at) VALUES ($1,$2,$3,$4,$5,$6)",
          [r.grower_id, r.id, "recurrence_reminder", `Time to upload new tests for ${r.product_name}`, JSON.stringify({ cadenceDays }), now]
        );
        console.log(`Created reminder for verification ${r.verification_id} cadenceDays=${cadenceDays}`);
      }
    }
  } catch (e) {
    console.error("Scheduler error:", e);
  } finally {
    client.release();
  }
}

// run every day at 02:30 UTC
cron.schedule("30 2 * * *", () => {
  console.log("Running updatedScheduler", new Date().toISOString());
  scheduleChecks().catch(e => console.error(e));
});

// also run at startup
scheduleChecks().catch(e => console.error(e));
'@

$schedulerPath = Join-Path $jobsDir "updatedScheduler.js"
$scheduler | Out-File -FilePath $schedulerPath -Encoding UTF8
Write-Host "Written: $schedulerPath"

# --------------------------
# mobile/App.js (React Native Expo)
# --------------------------
$mobileApp = @'
/**
 * mobile/App.js
 * Minimal Expo app for field capture: photo + GPS + offline queue
 *
 * Install: inside mobile/ run:
 *   npm install expo expo-camera expo-permissions expo-file-system @react-native-async-storage/async-storage
 * Start: expo start
 */

import React, { useState, useEffect } from "react";
import { Text, View, Button, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Camera permission required!");
        }
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({ quality: 0.6 });
    if (!result.cancelled) {
      setImage(result.uri);
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    }
  };

  const queueUpload = async () => {
    const payload = { uri: image, gps: location, createdAt: new Date().toISOString() };
    const queue = JSON.parse(await AsyncStorage.getItem("uploadQueue") || "[]");
    queue.push(payload);
    await AsyncStorage.setItem("uploadQueue", JSON.stringify(queue));
    alert("Saved to queue. Will upload when 'Upload Now' pressed or when online.");
    setImage(null);
  };

  const uploadNow = async () => {
    const queue = JSON.parse(await AsyncStorage.getItem("uploadQueue") || "[]");
    if (!queue.length) { alert("No queued items."); return; }
    // naive uploader: fetch multipart to API endpoint /api/chain-of-custody
    for (const item of queue) {
      const form = new FormData();
      form.append("verification_id", "TBD_VERIFY_ID");
      form.append("step_name", "field_photo");
      form.append("actor", "Field Worker");
      form.append("notes", "Mobile upload");
      form.append("gps", `${item.gps.latitude},${item.gps.longitude}`);
      // add image file (expo uri)
      const file = { uri: item.uri, name: "photo.jpg", type: "image/jpeg" };
      form.append("photos", file);
      try {
        await fetch((process.env.REACT_APP_API_URL || "http://localhost:4000") + "/api/chain-of-custody", {
          method: "POST",
          body: form
        });
      } catch (e) {
        console.error("Upload failed", e);
        alert("Upload failed for one item - will keep in queue");
        return;
      }
    }
    // if all succeeded
    await AsyncStorage.removeItem("uploadQueue");
    alert("All queued items uploaded");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>AuditDNA Field Capture</Text>
      <Button title="Take Photo" onPress={takePhoto} />
      {image && <Image source={{ uri: image }} style={{ width: 240, height: 160, marginTop: 12 }} />}
      {location && <Text>GPS: {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}</Text>}
      <View style={{ height: 12 }} />
      <Button title="Save to Queue" onPress={queueUpload} />
      <View style={{ height: 12 }} />
      <Button title="Upload Now" onPress={uploadNow} />
    </View>
  );
}
'@

$mobileAppPath = Join-Path $mobileDir "App.js"
$mobileApp | Out-File -FilePath $mobileAppPath -Encoding UTF8
Write-Host "Written: $mobileAppPath"

# --------------------------
# mobile/package.json
# --------------------------
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
Write-Host "Written: $mobilePkgPath"

# --------------------------
# mobile/README_MOBILE.md
# --------------------------
$mobileReadme = @'
# AuditDNA Mobile - Expo Field App

Quick start:
1. cd mobile
2. npm install
3. expo start
4. Use the Expo Go app on your phone to open the project
5. Configure REACT_APP_API_URL in your device or the app code for API endpoint

Features:
- Take photos in the field
- Capture GPS automatically
- Save to offline queue and upload when online
- Uses /api/chain-of-custody for uploads
'@

$mobileReadmePath = Join-Path $mobileDir "README_MOBILE.md"
$mobileReadme | Out-File -FilePath $mobileReadmePath -Encoding UTF8
Write-Host "Written: $mobileReadmePath"

# --------------------------
# backend/README_PAYMENTS.md
# --------------------------
$payReadme = @'
# AuditDNA Stripe Integration

1) Set environment variables:
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   REACT_APP_FRONTEND=http://localhost:3000
2) Install dependencies in backend:
   npm install stripe express body-parser
3) Mount router in server.js:
   const stripeRoutes = require("./payments/stripe");
   app.use("/payments", stripeRoutes);
4) Configure webhook in Stripe Dashboard to point to:
   https://yourdomain.com/payments/webhook
   and set the webhook secret in STRIPE_WEBHOOK_SECRET.
'@

$payReadmePath = Join-Path $paymentsDir "README_PAYMENTS.md"
$payReadme | Out-File -FilePath $payReadmePath -Encoding UTF8
Write-Host "Written: $payReadmePath"

# Final message and run instructions
Write-Host ""
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "PowerPONY created files for A (parser), B (Stripe), C (mobile)!" -ForegroundColor Green
Write-Host "What to do next (quick):" -ForegroundColor Yellow
Write-Host "1) cd backend && npm install pdf-parse papaparse xlsx node-tesseract-ocr stripe express body-parser node-cron pg" -ForegroundColor White
Write-Host "2) Set env vars: DATABASE_URL, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, REACT_APP_FRONTEND, REACT_APP_API_URL" -ForegroundColor White
Write-Host "3) Start updated scheduler worker: node backend/jobs/updatedScheduler.js" -ForegroundColor White
Write-Host "4) Start backend server (ensure you mount payments router) and test /payments/create-checkout" -ForegroundColor White
Write-Host "5) cd mobile && npm install && expo start (run app on device)" -ForegroundColor White
Write-Host ""
Write-Host "If you want, I will now:" -ForegroundColor Cyan
Write-Host "  • add sample parsing unit tests" -ForegroundColor White
Write-Host "  • generate curl examples to test Stripe & uploads" -ForegroundColor White
Write-Host "  • create a single-run installer that also runs npm install automatically (requires user confirmation)" -ForegroundColor White
Write-Host "======================================================" -ForegroundColor Cyan
'@

Write-Host "PowerPONY done. Files written to:"
Write-Host " - $parserPath"
Write-Host " - $stripePath"
Write-Host " - $schedulerPath"
Write-Host " - $mobileAppPath"
Write-Host " - $mobilePkgPath"
Write-Host ""
Write-Host "Run the steps above to install dependencies and start servers."