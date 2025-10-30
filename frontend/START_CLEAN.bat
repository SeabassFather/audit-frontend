@echo off
cls
echo ============================================
echo AUDITDNA - CLEAN STARTUP
echo ============================================
echo.
echo Date: 2025-10-28 08:30:39 UTC
echo User: SeabassFather
echo.

cd C:\AuditDNA\AuditDNA_Supreme_Frontend\frontend

echo [1/3] Setting environment...
set GENERATE_SOURCEMAP=false
set FAST_REFRESH=true
echo Done!
echo.

echo [2/3] Starting React dev server...
echo Please wait 30 seconds for compilation...
echo.
npm start

echo.
echo ============================================
echo Server should be running on PORT 3000
echo ============================================
echo.
pause
