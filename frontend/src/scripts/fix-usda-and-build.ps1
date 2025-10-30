Param(
  [Parameter(Mandatory=$false)][string]$RepoPath = (Get-Location).Path,
  [Parameter(Mandatory=$false)][switch]$StartDev = $false,
  [Parameter(Mandatory=$false)][int]$Port = 3000
)

$ErrorActionPreference = "Stop"

function Write-Step($m){ Write-Host "`n==> $m" -ForegroundColor Cyan }
function Write-OK($m){ Write-Host "✔ $m" -ForegroundColor Green }
function Write-Warn($m){ Write-Warning $m }
function Write-Fail($m){ Write-Host "✘ $m" -ForegroundColor Red }

Set-Location $RepoPath

$usdaMain = Join-Path $RepoPath "src\pages\USDA.jsx"
$usdaDup  = Join-Path $RepoPath "src\data\USDA.jsx"

if (!(Test-Path $usdaMain)) { Write-Fail "Missing: $usdaMain"; exit 1 }

# 1) Remove duplicate USDA.jsx under data (if present)
Write-Step "Removing duplicate USDA.jsx under src\data (if any)"
if (Test-Path $usdaDup) {
  Remove-Item -Force $usdaDup
  Write-OK "Removed $usdaDup"
} else {
  Write-OK "No duplicate detected"
}

# 2) Ensure Awards and FileText are imported in src/pages/USDA.jsx
Write-Step "Patching lucide-react import (add Award and FileText if missing)"
$content = Get-Content $usdaMain -Raw
$importPattern = 'import\s*\{([^}]*)\}\s*from\s*["'']lucide-react["''];'

if ($content -match $importPattern) {
  $importFull = $matches[0]
  $iconList   = $matches[1].Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' }

  if ($iconList -notcontains 'Award')   { $iconList += 'Award' }
  if ($iconList -notcontains 'FileText'){ $iconList += 'FileText' }

  # Ensure CheckCircle exists because we may fallback to it
  if ($iconList -notcontains 'CheckCircle'){ $iconList += 'CheckCircle' }

  $iconList = $iconList | Select-Object -Unique
  $newImport = "import { " + ($iconList -join ', ') + " } from 'lucide-react';"
  $patched = [regex]::Replace($content, $importPattern, [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $newImport })

  if ($patched -ne $content) {
    Set-Content -Path $usdaMain -Value $patched -Encoding UTF8
    Write-OK "Updated lucide-react import in src/pages/USDA.jsx"
  } else {
    Write-OK "Import already contains Award, FileText, and CheckCircle"
  }
} else {
  # No lucide-react import found; insert a safe one under React import
  Write-Warn "No lucide-react import found; inserting a safe import line"
  $patched = $content -replace "^(import\s+React[^\n]*\n)", "`$1import { Search, Upload, DollarSign, TrendingUp, FileText, Shield, MapPin, Calendar, Package, CheckCircle, X, ShoppingCart, Bell, BarChart3, Award, Calculator } from 'lucide-react';`n"
  Set-Content -Path $usdaMain -Value $patched -Encoding UTF8
  Write-OK "Inserted lucide-react import with required icons"
}

# Utility: run build and return success
function Invoke-Build {
  Write-Step "Running production build (npm run build)"
  $p = Start-Process -FilePath "npm" -ArgumentList "run","build","--silent" -NoNewWindow -PassThru
  $p.WaitForExit()
  if ($p.ExitCode -eq 0) {
    Write-OK "Build succeeded"
    return $true
  } else {
    Write-Fail "Build failed (exit $($p.ExitCode))"
    return $false
  }
}

# 3) First build attempt
$ok = Invoke-Build

# 4) If build failed with Award undefined, fallback: replace <Award /> with <CheckCircle />
if (-not $ok) {
  Write-Step "Applying fallback: replace <Award .../> with <CheckCircle .../>"
  $text = Get-Content $usdaMain -Raw
  $replaced = $text -replace '<\s*Award(\s+[^>]*)?\/>', '<CheckCircle$1/>'
  if ($replaced -ne $text) {
    Set-Content -Path $usdaMain -Value $replaced -Encoding UTF8
    Write-OK "Replaced Award usages with CheckCircle"
  } else {
    Write-Warn "No Award usages found to replace (skipping fallback)"
  }

  # Ensure CheckCircle is imported
  $txt = Get-Content $usdaMain -Raw
  if ($txt -match $importPattern) {
    $importFull = $matches[0]
    $iconList   = $matches[1].Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' }
    if ($iconList -notcontains 'CheckCircle') {
      $iconList += 'CheckCircle'
      $iconList = $iconList | Select-Object -Unique
      $newImport = "import { " + ($iconList -join ', ') + " } from 'lucide-react';"
      $txt = [regex]::Replace($txt, $importPattern, [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $newImport })
      Set-Content -Path $usdaMain -Value $txt -Encoding UTF8
      Write-OK "Ensured CheckCircle is imported"
    }
  }

  # Retry build
  $ok = Invoke-Build
}

# 5) Optional: start dev to visually verify
if ($ok -and $StartDev) {
  Write-Step "Starting dev server on http://localhost:$Port (Ctrl+C to stop)"
  Start-Process -FilePath "npm" -ArgumentList "start" -NoNewWindow
}

Write-Host "`nSummary:" -ForegroundColor Cyan
Write-Host "- Duplicate USDA.jsx removed from src\data (if present)" -ForegroundColor Green
Write-Host "- Imports patched in src\pages\USDA.jsx" -ForegroundColor Green
if ($ok) {
  Write-Host "- Production build: SUCCESS" -ForegroundColor Green
} else {
  Write-Host "- Production build: FAILED" -ForegroundColor Red
  Write-Host "Check build output in your terminal for the first ESLint error after this script." -ForegroundColor Yellow
}