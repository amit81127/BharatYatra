$path = "d:\major project\BharatYatra\bharat-yatra\data\states.js"
try {
    $content = [System.IO.File]::ReadAllText($path)
    if ($content.TrimEnd().EndsWith("];")) {
        $newContent = $content.TrimEnd().Substring(0, $content.TrimEnd().Length - 2) + "]];"
        [System.IO.File]::WriteAllText($path, $newContent)
        Write-Host "Fixed: Replaced ]; with ]];"
    } else {
        Write-Host "File does not end with ];"
    }
} catch {
    Write-Host "Error: $_"
}
