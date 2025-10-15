param (
    [string]$Path = "C:\audit-frontend",
    [string]$OutFile = "audit-frontend-filetree.txt"
)

function Write-Tree {
    param ($Folder, $Prefix = "")
    $items = Get-ChildItem $Folder | Sort-Object -Property PSIsContainer, Name
    $count = $items.Count
    for ($i = 0; $i -lt $count; $i++) {
        $item = $items[$i]
        $isLast = ($i -eq $count - 1)
        if ($isLast) {
            $char = "`--"
            $newPrefix = "$Prefix   "
        } else {
            $char = "|--"
            $newPrefix = "$Prefix|   "
        }
        $line = "$Prefix$char $($item.Name)"
        Write-Output $line
        if ($item.PSIsContainer) {
            Write-Tree $item.FullName $newPrefix
        }
    }
}

"." | Out-File $OutFile
Write-Tree $Path | Out-File $OutFile -Append
Write-Host "File tree written to $OutFile"