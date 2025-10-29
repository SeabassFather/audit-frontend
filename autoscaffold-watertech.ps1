$modRoot = "frontend\src\modules\WaterTech"
$traceRoot = "$modRoot\Traceability"

$files = @(
    "$modRoot\WaterTechDashboard.jsx",
    "$modRoot\WaterSearch.jsx",
    "$modRoot\WaterLabUploadForm.jsx",
    "$modRoot\WaterRightsRegistry.jsx",
    "$modRoot\WaterZoneMap.jsx",
    "$traceRoot\TraceabilityDashboard.jsx"
)

# Create folders if missing
foreach ($folder in @($modRoot, $traceRoot)) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Force -Path $folder | Out-Null
    }
}

# Create files with minimal React code
foreach ($file in $files) {
    if (!(Test-Path $file)) {
        New-Item -ItemType File -Path $file | Out-Null
        $component = [System.IO.Path]::GetFileNameWithoutExtension($file)
        Set-Content -Path $file -Value "import React from 'react'; export default function $component() { return <div>$component loaded</div>; }"
    }
}

Write-Host "`nAll missing WaterTech and Traceability module files created and ready. Plug in your logic. Build Supreme, no errors!`n"