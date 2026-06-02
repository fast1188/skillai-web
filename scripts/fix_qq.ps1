$baseDir = "C:\Users\Administrator\Documents\Codex\网站管家\dist"
$htmlFiles = Get-ChildItem $baseDir -Filter "*.html" -Recurse
$totalFixed = 0
$qq = [char]0x3F + [char]0x3F

foreach ($f in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $count = 0
    $searchFrom = 0
    while ($true) {
        $idx = $content.IndexOf($qq, $searchFrom)
        if ($idx -lt 0) { break }
        $count++
        $searchFrom = $idx + 1
    }
    
    if ($count -gt 0) {
        $newContent = $content.Replace($qq, [string]::Empty)
        [System.IO.File]::WriteAllText($f.FullName, $newContent, (New-Object System.Text.UTF8Encoding $false))
        Write-Host "FIXED: $($f.Name) ($count removed)"
        $totalFixed += $count
    }
}
Write-Host ""
Write-Host "Total fixed: $totalFixed"

Write-Host ""
Write-Host "Verify remaining:"
$htmlFiles2 = Get-ChildItem $baseDir -Filter "*.html" -Recurse
$remaining = 0
foreach ($f in $htmlFiles2) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $count = 0
    $searchFrom = 0
    while ($true) {
        $idx = $content.IndexOf($qq, $searchFrom)
        if ($idx -lt 0) { break }
        $count++
        $searchFrom = $idx + 1
    }
    if ($count -gt 0) { Write-Host "STILL: $($f.Name) has $count"; $remaining += $count }
}
Write-Host "Remaining: $remaining"