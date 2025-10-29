# Find the process using TCP port 3000 and kill it
$port = 3000
$procIds = Get-NetTCPConnection -LocalPort $port -State Listen | Select-Object -ExpandProperty OwningProcess
foreach ($processId in $procIds) {
    Write-Host "Killing process on port $port with PID $processId"
    Stop-Process -Id $processId -Force
}