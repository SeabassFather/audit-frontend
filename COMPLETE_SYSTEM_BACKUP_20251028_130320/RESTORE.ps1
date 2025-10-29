# AUDITDNA COMPLETE - QUICK RESTORE SCRIPT
# Backup: COMPLETE_SYSTEM_BACKUP_20251028_130320
# Date: 2025-10-28 13:03:32

Write-Host "Restoring AuditDNA Complete from backup..." -ForegroundColor Yellow

cd C:\AuditDNA\AuditDNA_Supreme_Frontend\frontend

if (Test-Path "src") {
    Write-Host "Backing up current src..." -ForegroundColor Cyan
    Move-Item "src" "src_old_$(Get-Date -Format 'yyyyMMddHHmmss')" -Force
}

Write-Host "Restoring from COMPLETE_SYSTEM_BACKUP_20251028_130320..." -ForegroundColor Green
Copy-Item "COMPLETE_SYSTEM_BACKUP_20251028_130320" "src" -Recurse -Force

Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host " RESTORATION COMPLETE!" -ForegroundColor Green
Write-Host "Run 'npm start' to launch the application" -ForegroundColor Cyan
