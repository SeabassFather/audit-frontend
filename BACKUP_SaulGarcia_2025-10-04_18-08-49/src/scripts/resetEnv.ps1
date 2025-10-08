# Reset Environment Script
# Nukes node_modules, reinstalls dependencies, and restarts server

Write-Host "🔄 Resetting AuditDNA Backend Environment..." -ForegroundColor Cyan

# Stop any running node processes
Write-Host "`n🛑 Stopping running Node processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Remove node_modules
if (Test-Path "node_modules") {
    Write-Host "🗑️  Removing node_modules..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "node_modules"
}

# Remove package-lock.json
if (Test-Path "package-lock.json") {
    Write-Host "🗑️  Removing package-lock.json..." -ForegroundColor Yellow
    Remove-Item -Force "package-lock.json"
}

# Clear npm cache
Write-Host "🧹 Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

# Install dependencies
Write-Host "`n📦 Installing dependencies..." -ForegroundColor Cyan
npm install

# Check if install was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Environment reset complete!" -ForegroundColor Green
    Write-Host "`nRun 'npm run dev' to start the server" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Installation failed!" -ForegroundColor Red
    exit 1
}