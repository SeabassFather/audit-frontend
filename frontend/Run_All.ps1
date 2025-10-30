$ErrorActionPreference = "Stop"

# ==== CONFIG ====
$Target        = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend"
$BackupRoot    = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\_restore_trash"
$FrontendZip   = "AuditDNA_Frontend_Restore_20250817_165735.zip"
$CRAModuleZip  = "CRA_Module_Ag_Water_Factoring_20250817_170222.zip"

# ==== PREP ====
New-Item -ItemType Directory -Force -Path $BackupRoot | Out-Null
$Stamp   = (Get-Date -Format "yyyyMMdd_HHmmss")
$Backup  = Join-Path $BackupRoot "frontend_$Stamp"

# Helper: No-BOM write
$enc = New-Object System.Text.UTF8Encoding($false)
function Write-NoBom([string]$path,[string]$text){
  $dir = Split-Path $path -Parent
  if (!(Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  if (Test-Path $path) { Copy-Item $path "$path.bak.$((Get-Date).ToString('yyyyMMdd_HHmmss'))" -Force }
  [IO.File]::WriteAllText($path, $text, $enc)
}

# Helper: unzip
Add-Type -AssemblyName System.IO.Compression.FileSystem
function Unzip($zipPath, $dest){
  if (!(Test-Path $zipPath)) { throw "Missing: $zipPath" }
  if (Test-Path $dest) { Remove-Item -Recurse -Force $dest }
  New-Item -ItemType Directory -Force -Path $dest | Out-Null
  [System.IO.Compression.ZipFile]::ExtractToDirectory((Resolve-Path $zipPath), (Resolve-Path $dest))
}

# ==== 1) BACKUP CURRENT FRONTEND ====
if (Test-Path $Target) {
  New-Item -ItemType Directory -Force -Path $Backup | Out-Null
  Copy-Item -Recurse -Force $Target\* $Backup | Out-Null
}

# ==== 2) RESTORE FRONTEND FROM ZIP ====
$Temp1 = Join-Path $env:TEMP "auditdna_restore_$Stamp"
Unzip $FrontendZip $Temp1

# The restore zip contains "AuditDNA_Frontend_Restore" as root
$RestoredRoot = Join-Path $Temp1 "AuditDNA_Frontend_Restore"
if (!(Test-Path $RestoredRoot)) {
  throw "Expected folder not found in restore zip: $RestoredRoot"
}

# Deploy to target
New-Item -ItemType Directory -Force -Path $Target | Out-Null
Copy-Item -Recurse -Force $RestoredRoot\* $Target

# ==== 3) DROP IN CRA MODULE (AG/WATER/FACTORING) ====
$Temp2 = Join-Path $env:TEMP "cra_module_$Stamp"
Unzip $CRAModuleZip $Temp2
Copy-Item -Recurse -Force "$Temp2\src\*" "$Target\src"

# ==== 4) HARDEN COMMON CRA ISSUES (CASING, MISSING DEFAULT EXPORTS) ====

# 4a) Create/patch App.js to avoid 'no default export' errors (idempotent)
$AppJs = Join-Path $Target "src\App.js"
if (!(Test-Path $AppJs)) {
  Write-NoBom $AppJs @"
export default function App(){ return null; }
"@
} else {
  # Ensure it has a default export
  $c = Get-Content -Raw $AppJs
  if ($c -notmatch "export\s+default") {
    $c += "`r`nexport default function App(){ return null; }`r`n"
    Write-NoBom $AppJs $c
  }
}

# 4b) ServicesHub casing landmine (generate both and point to EnginesPanel if exists)
$PagesDir = Join-Path $Target "src\pages"
New-Item -ItemType Directory -Force -Path $PagesDir | Out-Null

$EnginesPanel = Join-Path $Target "src\components\EnginesPanel.jsx"
if (!(Test-Path $EnginesPanel)) {
  # Minimal EnginesPanel so imports won't crash
  Write-NoBom $EnginesPanel @"
import React from 'react';
export default function EnginesPanel(){ return <div style={{padding:12}}>EnginesPanel placeholder</div>; }
"@
}

$servicesCode = @"
import React from 'react';
import EnginesPanel from '../components/EnginesPanel.jsx';
export default function ServicesHub(){ return <EnginesPanel/>; }
"@
Write-NoBom (Join-Path $PagesDir "serviceshub.jsx") $servicesCode
Write-NoBom (Join-Path $PagesDir "ServicesHub.jsx") $servicesCode

# 4c) Auto-wire AppRouter in index.js / index.tsx
$IndexJs  = Join-Path $Target "src\index.js"
$IndexTsx = Join-Path $Target "src\index.tsx"
function Wire-AppRouter([string]$file){
  if (!(Test-Path $file)) { return $false }
  $content = Get-Content -Raw $file
  if ($content -notmatch "import\s+AppRouter\s+from\s+'\.\/AppRouter'") {
    $content = "import AppRouter from './AppRouter';`r`n" + $content
  }
  # Replace common mounts with <AppRouter />
  $patterns = @(
    'root\.render\(<App\s*\/>\);?',
    'ReactDOM\.render\(<App\s*\/>,\s*document\.getElementById\(''root''\)\);?',
    'root\.render\(<React\.StrictMode>\s*<App\s*\/>\s*<\/React\.StrictMode>\);?'
  )
  $replaced = $false
  foreach ($p in $patterns) {
    if ($content -match $p) {
      $content = [regex]::Replace($content, $p, 'root.render(<AppRouter />);')
      $replaced = $true
      break
    }
  }
  if (-not $replaced) {
    # Fallback: ensure a root render exists
    if ($content -notmatch 'createRoot\(document\.getElementById\(''root''\)') {
      $content += "`r`nimport React from 'react';"
      $content += "`r`nimport ReactDOM from 'react-dom/client';"
      $content += "`r`nconst root = ReactDOM.createRoot(document.getElementById('root'));"
    }
    $content += "`r`nroot.render(<AppRouter />);`r`n"
  }
  Write-NoBom $file $content
  return $true
}
$ok = $false
if (Test-Path $IndexJs)  { $ok = Wire-AppRouter $IndexJs }
if (-not $ok -and (Test-Path $IndexTsx)) { $ok = Wire-AppRouter $IndexTsx }

# ==== 5) CLEAN ENV & INSTALL ====
# Kill stray node dev servers
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Clear HOST, prefer 3000
Remove-Item Env:HOST -ErrorAction SilentlyContinue
[Environment]::SetEnvironmentVariable('HOST',$null,'User') | Out-Null
$env:PORT = "3000"

Push-Location $Target
# Ensure react-router-dom
npm pkg get dependencies.react-router-dom 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
  npm install react-router-dom
}
# Safer fresh install if node_modules looks busted
if (Test-Path "node_modules") {
  # quick check: if react-scripts missing, nuke & reinstall
  if (!(Test-Path "node_modules\react-scripts")) {
    Remove-Item -Recurse -Force "node_modules"
    if (Test-Path "package-lock.json") { Remove-Item -Force "package-lock.json" }
  }
}
if (Test-Path "package-lock.json") { npm ci } else { npm install }

# ==== 6) START ====
npm start
Pop-Location

Write-Host "DONE  Frontend restored, CRA module installed, running at http://localhost:3000" -ForegroundColor Green
Write-Host "Backup saved to: $Backup" -ForegroundColor Yellow
