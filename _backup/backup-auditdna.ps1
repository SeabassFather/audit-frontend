# ===============================
# AuditDNA Backup + Git Push Script
# ===============================

$ErrorActionPreference = "Stop"
$root = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend"
$backupDir = Join-Path $root "dist\backups"

# Make sure backup dir exists
if (!(Test-Path $backupDir)) {
    New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
}

# Create timestamped ZIP file
Add-Type -AssemblyName System.IO.Compression.FileSystem
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$zipFile = Join-Path $backupDir ("frontend-" + $timestamp + ".zip")

[System.IO.Compression.ZipFile]::CreateFromDirectory($root, $zipFile)

Write-Host "✅ Backup created at: $zipFile"

# ===============================
# Git commit & push
# ===============================
Set-Location $root

# Stage everything
git add .

# Commit with timestamp
git commit -m "Automated backup $timestamp" --allow-empty

# Push to GitHub main branch
git push origin main

Write-Host "✅ Git push complete."

# ===============================
# Keep server running (optional)
# ===============================
if (-Not (Get-Process -Name "node" -ErrorAction SilentlyContinue)) {
    Write-Host "🚀 Starting React dev server on port 3000..."
    Start-Process "npm" "start" -WorkingDirectory $root
} else {
    Write-Host "ℹ️ Dev server already running."
}
