@echo off
set BACKEND_PATH=C:\AuditDNA\AUDIT_DNA_Frontend_Final\backend
set FRONTEND_PATH=C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend

echo Starting AuditDNA Node backend on port 8001...
start "Node Backend" cmd /k "cd /d %BACKEND_PATH% && node env_ai_model_api.cjs"

timeout /t 3

echo Starting React frontend (port 3000)...
start "React Frontend" cmd /k "cd /d %FRONTEND_PATH% && npm start"

timeout /t 8

echo Opening AuditDNA Dashboard in browser...
start "" http://localhost:3000

exit