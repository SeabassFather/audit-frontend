Continue = "Stop"
 = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend"

while (True) {
    try {
        Write-Host "🚀 Starting CRA dev server (localhost:3000)" -ForegroundColor Green
        npm start
    } catch {
        Write-Host "⚠️ Dev server crashed, restarting in 5s..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
    }
}
