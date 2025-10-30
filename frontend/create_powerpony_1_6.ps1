<#
create_powerpony_1_6.ps1

PowerPONY Step 1-6 bootstrapper (one-shot)
- Purpose: automate steps 1–6 so you can get dev-ready quickly:
  1) Install npm dependencies needed by the backend scaffold
  2) Set DATABASE_URL env for this session (or use existing)
  3) Apply DB schema (node db/apply_schema.cjs)
  4) Generate RSA keys for PKI (node pki/generate_keys.js)
  5) Generate sample lab files (node samples/generate_samples.js && extended)
  6) Run parser unit tests (node tests/run_parser_tests.js)

Usage (from backend folder):
  # interactive (recommended)
  ./create_powerpony_1_6.ps1

  # non-interactive with defaults:
  ./create_powerpony_1_6.ps1 -NonInteractive

  # specify a custom DB url:
  ./create_powerpony_1_6.ps1 -DatabaseUrl "postgres://postgres:myPass@localhost:5432/auditdna" -NonInteractive

Notes:
- This script runs commands in the current PowerShell session and sets $env:DATABASE_URL for that session.
- It will NOT start the server or scheduler. Those should be started separately (node server.js and node jobs/updatedScheduler.js).
- If Postgres is not reachable on the provided DATABASE_URL, the script will warn and allow you to skip the schema step.
- Make sure you run this from the backend directory (C:\AuditDNA\AUDIT_DNA_Frontend_Final\backend)
#>

param(
  [string]$DatabaseUrl = $env:DATABASE_URL,
  [switch]$InstallDeps = $true,
  [switch]$RunApplySchema = $true,
  [switch]$RunKeygen = $true,
  [switch]$RunSamples = $true,
  [switch]$RunTests = $true,
  [switch]$NonInteractive = $false
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-OK($m){ Write-Host $m -ForegroundColor Green }
function Write-Warn($m){ Write-Host $m -ForegroundColor Yellow }
function Write-Err($m){ Write-Host $m -ForegroundColor Red }

# Verify running folder contains expected files
if (-not (Test-Path ".\db\apply_schema.cjs")) {
  Write-Warn "Warning: db\apply_schema.cjs not found in current directory. Ensure you run this script from the backend folder."
}
if (-not (Test-Path ".\pki\generate_keys.js")) {
  Write-Warn "Warning: pki\generate_keys.js not found. Keygen step will fail unless file exists."
}
if (-not (Test-Path ".\samples\generate_samples.js")) {
  Write-Warn "Warning: samples\generate_samples.js not found. Sample generation will fail unless file exists."
}
if (-not (Test-Path ".\tests\run_parser_tests.js")) {
  Write-Warn "Warning: tests\run_parser_tests.js not found. Test step will fail unless file exists."
}

# Confirm Node & npm
try {
  $nodeVersion = node -v 2>$null
  $npmVersion = npm -v 2>$null
  Write-OK "Node: $nodeVersion   npm: $npmVersion"
} catch {
  Write-Err "Node or npm not found in PATH. Install Node.js (v16+) and re-run."
  exit 1
}

# Prompt for Database URL if not provided
if (-not $DatabaseUrl) {
  if ($NonInteractive) {
    Write-Warn "No DATABASE_URL provided and NonInteractive set. Using default: postgres://postgres:postgres@localhost:5432/auditdna"
    $DatabaseUrl = "postgres://postgres:postgres@localhost:5432/auditdna"
  } else {
    $inp = Read-Host "Enter DATABASE_URL (or press Enter to use postgres://postgres:postgres@localhost:5432/auditdna)"
    if ([string]::IsNullOrWhiteSpace($inp)) {
      $DatabaseUrl = "postgres://postgres:postgres@localhost:5432/auditdna"
    } else {
      $DatabaseUrl = $inp
    }
  }
}

Write-OK "Using DATABASE_URL = $DatabaseUrl"
# Set for this session
$env:DATABASE_URL = $DatabaseUrl

# Check Postgres connectivity quickly
function Test-DbConnection {
  param([string]$url)
  # Parse host and port from URL if possible
  try {
    $u = [System.Uri]$url
    $host = $u.Host
    $port = $u.Port
    $res = Test-NetConnection -ComputerName $host -Port $port -InformationLevel Quiet
    return $res
  } catch {
    return $false
  }
}

$canConnect = Test-DbConnection -url $DatabaseUrl
if (-not $canConnect) {
  Write-Warn "Warning: cannot reach database at $DatabaseUrl (TCP test failed)."
  if ($RunApplySchema) {
    if ($NonInteractive) {
      Write-Warn "NonInteractive: skipping schema apply because DB is not reachable."
      $RunApplySchema = $false
    } else {
      $choice = Read-Host "Database not reachable. Continue and SKIP applying schema? (y/N)"
      if ($choice -ne 'y' -and $choice -ne 'Y') {
        Write-Err "Aborted by user because DB is not reachable. Start Postgres or provide a reachable DATABASE_URL then re-run."
        exit 2
      } else {
        Write-Warn "User chose to skip applying schema."
        $RunApplySchema = $false
      }
    }
  }
} else {
  Write-OK "Database reachable at $DatabaseUrl"
}

# Step 1: Install dependencies
if ($InstallDeps) {
  Write-Host ""
  Write-OK "Step 1: Installing npm dependencies (this may take a minute)..."
  try {
    # Use npm install and ensure required packages are present
    npm install --no-audit --no-fund
    npm install pdf-parse papaparse xlsx node-tesseract-ocr stripe express body-parser node-cron pg pdfkit axios form-data --no-audit --no-fund
    Write-OK "npm packages installed."
  } catch {
    Write-Err "npm install failed: $_. Exception.Message"
    exit 3
  }
} else {
  Write-Warn "Skipping dependency installation (InstallDeps = false)"
}

# Step 2+3: Apply DB schema
if ($RunApplySchema) {
  Write-Host ""
  Write-OK "Step 2 & 3: Applying DB schema via node db/apply_schema.cjs"
  if (-not (Test-Path ".\db\apply_schema.cjs")) {
    Write-Err "db/apply_schema.cjs missing. Cannot apply schema."
  } else {
    try {
      node .\db\apply_schema.cjs
      Write-OK "Schema apply step finished (check output for success)."
    } catch {
      Write-Err "Schema apply failed: $_. Exception.Message"
      if ($NonInteractive) { exit 4 } else {
        $cont = Read-Host "Schema apply failed. Continue with remaining steps anyway? (y/N)"
        if ($cont -ne 'y' -and $cont -ne 'Y') { exit 4 } else { Write-Warn "Continuing despite schema apply failure." }
      }
    }
  }
} else {
  Write-Warn "Skipping DB schema apply (RunApplySchema = false)"
}

# Step 4: Generate RSA keys
if ($RunKeygen) {
  Write-Host ""
  Write-OK "Step 4: Generating RSA keys (pki/generate_keys.js)"
  if (-not (Test-Path ".\pki\generate_keys.js")) {
    Write-Err "pki/generate_keys.js not found. Skipping key generation."
  } else {
    try {
      node .\pki\generate_keys.js
      Write-OK "RSA keypair generated (backend/pki/keys/private.pem & public.pem)."
    } catch {
      Write-Err "Key generation failed: $_. Exception.Message"
      if (-not $NonInteractive) {
        $r = Read-Host "Continue despite keygen failure? (y/N)"
        if ($r -ne 'y' -and $r -ne 'Y') { exit 5 }
      }
    }
  }
} else {
  Write-Warn "Skipping key generation (RunKeygen = false)"
}

# Step 5: Generate sample files
if ($RunSamples) {
  Write-Host ""
  Write-OK "Step 5: Generating sample lab files"
  if (Test-Path ".\samples\generate_samples.js") {
    try {
      node .\samples\generate_samples.js
      Write-OK "Generated samples/sample_lab.(csv,xlsx,pdf)"
    } catch {
      Write-Warn "generate_samples.js failed: $_. Exception.Message"
    }
  } else {
    Write-Warn "samples/generate_samples.js not found; skipping."
  }

  if (Test-Path ".\samples\generate_extended_samples.js") {
    try {
      node .\samples\generate_extended_samples.js
      Write-OK "Generated extended sample files (sample_lab_complex.*)"
    } catch {
      Write-Warn "generate_extended_samples.js failed: $_. Exception.Message"
    }
  } else {
    Write-Warn "samples/generate_extended_samples.js not found; skipping."
  }
} else {
  Write-Warn "Skipping samples generation (RunSamples = false)"
}

# Step 6: Run parser tests
if ($RunTests) {
  Write-Host ""
  Write-OK "Step 6: Running parser unit tests (tests/run_parser_tests.js)"
  if (-not (Test-Path ".\tests\run_parser_tests.js")) {
    Write-Warn "tests/run_parser_tests.js not found; skipping tests."
  } else {
    try {
      node .\tests\run_parser_tests.js
      Write-OK "Parser tests finished. Check output above for PASS/FAIL."
    } catch {
      Write-Err "Parser tests failed: $_. Exception.Message"
      if (-not $NonInteractive) {
        $r = Read-Host "Parser tests failed. Continue anyway? (y/N)"
        if ($r -ne 'y' -and $r -ne 'Y') { exit 6 }
      }
    }
  }
} else {
  Write-Warn "Skipping parser tests (RunTests = false)"
}

Write-Host ""
Write-OK "PowerPONY steps 1–6 completed (or attempted)."
Write-Host "Next recommended manual steps:"
Write-Host "  - Start the backend server: node server.js"
Write-Host "  - Start scheduler (in separate terminal): node jobs/updatedScheduler.js"
Write-Host "  - Run E2E test: node tests/e2e_run_and_verify.js (after server is running)"
Write-Host ""
Write-OK "If any step failed, copy the error output here and I'll help fix it."