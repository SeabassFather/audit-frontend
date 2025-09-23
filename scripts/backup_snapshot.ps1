$root = 'C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend'
$snap = Join-Path $root '..\_snapshots'
New-Item -ItemType Directory -Force -Path $snap | Out-Null
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = Join-Path $snap ('frontend-' + (Get-Date -Format 'yyyyMMdd-HHmmss') + '.zip')
[System.IO.Compression.ZipFile]::CreateFromDirectory($root, $zip)
