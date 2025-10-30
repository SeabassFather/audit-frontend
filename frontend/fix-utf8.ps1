# ==============================================
# AuditDNA UTF-8 Encoding Repair Script
# Fixes corrupted emojis/labels (ðŸ) by resaving
# all source files as UTF-8 (no BOM).
# ==============================================

$root = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend\src"

Write-Host "=== Repairing file encodings in $root ===" -ForegroundColor Cyan

# Target all JS, JSX, JSON files in src/
Get-ChildItem $root -Recurse -Include *.js,*.jsx,*.json | ForEach-Object {
    try {
        $content = Get-Content $_.FullName -Raw
        Set-Content -Path $_.FullName -Value $content -Encoding utf8
        Write-Host "Fixed: $($_.FullName)" -ForegroundColor Green
    } catch {
        Write-Host "Failed: $($_.FullName) -- $_" -ForegroundColor Red
    }
}

Write-Host "=== Encoding Repair Complete ===" -ForegroundColor Yellow
Write-Host "Now run: Stop-Process -Name node -Force ; npm start" -ForegroundColor Cyan
