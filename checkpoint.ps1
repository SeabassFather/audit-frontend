# checkpoint.ps1 - zip + init git + commit
$ErrorActionPreference = "Stop"
$root = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend"
Set-Location $root
$tag = Get-Date -Format "yyyyMMdd-HHmmss"
$zip = Join-Path ".." ("frontend-backup-" + $tag + ".zip")
Compress-Archive -Path . -DestinationPath $zip -Force
Write-Host " Created backup: $zip"

# init git if not present
if (!(Test-Path (Join-Path $root ".git"))) {
  git init | Out-Null
  Write-Host " Initialized git repository"
}

git add . 2>$null
git commit -m ("Checkpoint: " + $tag) 2>$null
Write-Host " Committed checkpoint: $tag"