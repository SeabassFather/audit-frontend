$backendPath = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\backend"
$frontendPath = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend"

Start-Process -NoNewWindow -WorkingDirectory $backendPath -FilePath "node" -ArgumentList "env_ai_model_api.cjs"
Start-Sleep -Seconds 3
Start-Process -NoNewWindow -WorkingDirectory $frontendPath -FilePath "npm" -ArgumentList "start"
Start-Sleep -Seconds 8
Start-Process "http://localhost:3000"