param(
    [string]$Label = "UI_Snapshot"
)

$root = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend"
$ts = Get-Date -Format "yyyyMMdd-HHmmss"
$zipName = "${Label}_$ts.zip"
$zipPath = Join-Path $root $zipName

Write-Host "📦 Creating snapshot: $zipPath"

$include = @(
    "$root\src",
    "$root\public",
    "$root\dist",
    "$root\package.json",
    "$root\package-lock.json",
    "$root\vite.config.js",
    "$root\tailwind.config.js",
    "$root\postcss.config.js",
    "$root\netlify.toml",
    "$root\sync.ps1"
)

if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
Compress-Archive -Path $include -DestinationPath $zipPath

Write-Host "✅ Snapshot created at $zipPath"
