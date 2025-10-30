@echo off
echo ============================================
echo AUDITDNA - FORCE REBUILD
echo ============================================
echo.

cd C:\AuditDNA\AuditDNA_Supreme_Frontend\frontend

echo Clearing all caches...
rmdir /s /q node_modules\.cache 2>nul
rmdir /s /q .cache 2>nul
rmdir /s /q build 2>nul
echo Cache cleared!
echo.

echo Starting clean build...
echo.
npm start

pause
