$WshShell = New-Object -ComObject WScript.Shell

# Start shortcut
$Shortcut = $WshShell.CreateShortcut("$env:USERPROFILE\Desktop\🚀 START AuditDNA.lnk")
$Shortcut.TargetPath = "C:\AuditDNA\START_AUDITDNA.bat"
$Shortcut.IconLocation = "shell32.dll,137"
$Shortcut.Description = "Start AuditDNA Dev Servers"
$Shortcut.Save()

# Stop shortcut
$Shortcut = $WshShell.CreateShortcut("$env:USERPROFILE\Desktop\🛑 STOP AuditDNA.lnk")
$Shortcut.TargetPath = "C:\AuditDNA\STOP_AUDITDNA.bat"
$Shortcut.IconLocation = "shell32.dll,131"
$Shortcut.Description = "Stop AuditDNA Dev Servers"
$Shortcut.Save()

Write-Host "✅ Desktop shortcuts created!" -ForegroundColor Green