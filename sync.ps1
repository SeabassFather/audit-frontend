param(
    [string]$Branch = "pr-7"
)

function Clean-Junk {
    Write-Host "🧹 Cleaning junk and Vim swap files..."
    Get-ChildItem ".git" -Filter "*.swp" -Recurse | Remove-Item -Force -ErrorAction SilentlyContinue
    Remove-Item -Force "#" , '$Pages' , "'@" , ")" , ")}" , "@'" -ErrorAction SilentlyContinue
}

function Auto-Rebase {
    Write-Host "🔄 Rebase detected, attempting to continue..."
    git add -A
    git rebase --continue --no-edit
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️ Rebase failed, aborting..."
        git rebase --abort
    } else {
        Write-Host "✅ Rebase continued successfully."
    }
}

function Safe-Sync {
    Write-Host "🤝 Performing SAFE sync for $Branch"
    git add -A
    git stash push -m "temp-safe-stash" --keep-index | Out-Null
    git fetch origin $Branch
    git rebase origin/$Branch
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️ Conflicts detected. Resolve them, then run:"
        Write-Host "   git add -A; git rebase --continue"
        return
    }
    if ((git stash list) -match "temp-safe-stash") { git stash pop }
    git push origin $Branch
    Write-Host "✅ Safe sync complete."
}

function Force-Sync {
    Write-Host "🔥 Performing FORCE sync for $Branch"
    git add -A
    git stash push -m "temp-force-stash" --keep-index | Out-Null
    if ((Test-Path ".git\rebase-merge") -or (Test-Path ".git\rebase-apply")) {
        git rebase --abort
    }
    git checkout $Branch
    git push origin $Branch --force
    Write-Host "✅ Force sync complete (remote overwritten)."
}

Clean-Junk

if ((Test-Path ".git\rebase-merge") -or (Test-Path ".git\rebase-apply")) {
    Auto-Rebase
    exit
}

Write-Host "============================================="
Write-Host " 🚀 AuditDNA GitHub Sync Utility"
Write-Host "============================================="
Write-Host "Branch: $Branch"
Write-Host ""
Write-Host "1) Safe Sync   (merge/rebase, preserve history)"
Write-Host "2) Force Sync  (overwrite remote with local)"
Write-Host "3) Clean Only  (remove junk + swap files)"
Write-Host "============================================="
$choice = Read-Host "Choose an option"

switch ($choice) {
    "1" { Clean-Junk; Safe-Sync }
    "2" { Clean-Junk; Force-Sync }
    "3" { Clean-Junk; Write-Host "✅ Cleanup done. No sync performed." }
    default { Write-Host "❌ Invalid choice." }
}
