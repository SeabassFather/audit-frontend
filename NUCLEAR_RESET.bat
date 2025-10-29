@echo off
echo ================================
echo NUCLEAR RESET - Clear Everything
echo ================================
echo.

cd /d C:\AuditDNA\AuditDNA_Supreme_Frontend\frontend

echo [1/4] Stopping any running servers...
taskkill /F /IM node.exe 2>nul

echo [2/4] Clearing cache...
if exist node_modules\.cache rmdir /s /q node_modules\.cache
if exist .eslintcache del .eslintcache

echo [3/4] Clearing build...
if exist build rmdir /s /q build

echo [4/4] Restarting server...
start "Frontend Server" cmd /k "npm start"

echo.
echo ================================
echo Done! Wait 10 seconds for compile
echo ================================
pause
