# Site Health Inspector - skillai.top
# Auto-fix enabled, runs hourly

$ErrorActionPreference = "Continue"
$distPath = "C:\Users\Administrator\Documents\Codex\网站管家\dist"
$backupPath = "C:\Users\Administrator\Documents\Codex\网站管家\dist_backup_good"
$logFile = "C:\Users\Administrator\Documents\Codex\网站管家\scripts\inspect_log.txt"
$baseUrl = "https://skillai.top"

function Write-Log {
    param([string]$msg)
    $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $line = "[$ts] $msg"
    Add-Content -Path $logFile -Value $line -Encoding UTF8
}

function Test-PageHealth {
    param([string]$url, [string]$name)
    try {
        $r = Invoke-WebRequest -Uri $url -TimeoutSec 15 -UseBasicParsing -ErrorAction Stop
        $title = [regex]::Match($r.Content, '<title>([^<]+)</title>').Groups[1].Value
        $hasGarbled = $title -match '\?{3,}'
        return @{ Name=$name; Status=$r.StatusCode; Title=$title; HasGarbled=$hasGarbled; OK=($r.StatusCode -eq 200 -and -not $hasGarbled) }
    } catch {
        return @{ Name=$name; Status="FAIL"; Title=""; HasGarbled=$false; OK=$false }
    }
}

function Remove-BOM {
    param([string]$fp)
    $b = [System.IO.File]::ReadAllBytes($fp)
    if ($b.Length -ge 3 -and $b[0] -eq 0xEF -and $b[1] -eq 0xBB -and $b[2] -eq 0xBF) {
        $nb = New-Object byte[] ($b.Length - 3)
        [Array]::Copy($b, 3, $nb, 0, $b.Length - 3)
        [System.IO.File]::WriteAllBytes($fp, $nb)
        return $true
    }
    return $false
}

function Fix-BOM {
    $fixed = 0
    Get-ChildItem $distPath -Recurse -File -Include "*.html","*.xml","*.txt","*.json","*.css","*.js" | ForEach-Object {
        if (Remove-BOM $_.FullName) { $fixed++ }
    }
    return $fixed
}

function Restore-Backup {
    param([string]$fn)
    $dst = Join-Path $distPath $fn
    # Try good backup first
    $src = Join-Path $backupPath $fn
    if (Test-Path $src) {
        Copy-Item $src $dst -Force
        Remove-BOM $dst
        Write-Log "RESTORED from backup: $fn"
        return $true
    }
    # Try D drive
    $dSrc = "D:\Codex Main总指挥\04_网站管家\dist\$fn"
    if (Test-Path $dSrc) {
        Copy-Item $dSrc $dst -Force
        Remove-BOM $dst
        Write-Log "RESTORED from D drive: $fn"
        return $true
    }
    return $false
}

# === MAIN ===
Write-Log "=== INSPECTION START ==="
$issues = @()
$fixes = @()
$needDeploy = $false

# 1. Check core pages
$pages = @(
    @{P="/"; N="Home"},
    @{P="/about.html"; N="About"},
    @{P="/skills.html"; N="Skills"},
    @{P="/download.html"; N="Download"},
    @{P="/community.html"; N="Community"},
    @{P="/top-models.html"; N="TopModels"},
    @{P="/top-agents.html"; N="TopAgents"},
    @{P="/contact/"; N="Contact"},
    @{P="/blog/"; N="Blog"},
    @{P="/cooperation/"; N="Cooperation"},
    @{P="/tutorial/"; N="Tutorial"},
    @{P="/news/"; N="News"},
    @{P="/guide/"; N="Guide"},
    @{P="/agreement/"; N="Agreement"}
)

foreach ($pg in $pages) {
    $r = Test-PageHealth -url "$baseUrl$($pg.P)" -name $pg.N
    if ($r.OK) {
        Write-Log "OK: $($pg.N) $($r.Status)"
    } else {
        $issues += "$($pg.N) $($pg.P) status=$($r.Status) garbled=$($r.HasGarbled)"
        Write-Log "ISSUE: $($pg.N) -> $($r.Status) title=$($r.Title)"
        # Auto-fix garbled pages
        if ($r.HasGarbled) {
            $fn = $pg.P.TrimStart('/')
            if ($fn -eq "") { $fn = "index.html" }
            elseif (-not $fn.EndsWith(".html")) { $fn = "$fn/index.html" }
            if (Restore-Backup $fn) {
                $fixes += "Restored $($pg.N)"
                $needDeploy = $true
            }
        }
    }
}

# 2. Check SEO files
foreach ($sf in @("robots.txt", "sitemap.xml")) {
    try {
        $r = Invoke-WebRequest -Uri "$baseUrl/$sf" -TimeoutSec 10 -UseBasicParsing -ErrorAction Stop
        if ($r.StatusCode -ne 200) {
            $issues += "SEO missing: $sf"
            Write-Log "ISSUE: $sf -> $($r.StatusCode)"
        } else {
            Write-Log "OK: $sf 200"
        }
    } catch {
        $issues += "SEO broken: $sf"
        Write-Log "ISSUE: $sf -> FAIL"
    }
}

# 3. Check downloads
foreach ($d in @("/downloads/OpenClaw-Windows-Setup.bat", "/downloads/OpenClaw-macOS-Setup.sh", "/downloads/OpenClaw-Linux-Setup.sh")) {
    try {
        $r = Invoke-WebRequest -Uri "$baseUrl$d" -TimeoutSec 10 -UseBasicParsing -ErrorAction Stop
        Write-Log "OK: $d $($r.StatusCode)"
    } catch {
        $issues += "Download broken: $d"
        Write-Log "ISSUE: $d -> FAIL"
    }
}

# 4. Check canonical
foreach ($cp in @("skills.html", "community.html", "about.html", "top-models.html", "top-agents.html", "download.html")) {
    try {
        $r = Invoke-WebRequest -Uri "$baseUrl/$cp" -TimeoutSec 10 -UseBasicParsing -ErrorAction Stop
        $c = [regex]::Match($r.Content, 'rel="canonical"\s*href="([^"]*)"').Groups[1].Value
        $exp = "$baseUrl/$cp"
        if ($c -ne "" -and $c -ne $exp) {
            $issues += "Canonical wrong: $cp -> $c"
            Write-Log "ISSUE: $cp canonical=$c"
        } else {
            Write-Log "OK: $cp canonical=$c"
        }
    } catch {
        Write-Log "WARN: cannot check $cp"
    }
}

# 5. Fix BOM
$bomFixed = Fix-BOM
if ($bomFixed -gt 0) {
    $fixes += "Fixed $bomFixed BOM files"
    $needDeploy = $true
    Write-Log "FIXED: $bomFixed BOM files"
}

# 6. Deploy if needed
if ($needDeploy) {
    Write-Log "Deploying fixes..."
    Push-Location $distPath
    $out = vercel --prod --yes 2>&1
    Pop-Location
    $outStr = $out -join "`n"
    if ($outStr -match '"status":\s*"ok"') {
        Write-Log "DEPLOY OK"
        $fixes += "Deploy OK"
    } else {
        Write-Log "DEPLOY FAIL"
    }
}

# 7. Report
$report = "Inspect $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') | Issues=$($issues.Count) Fixes=$($fixes.Count)"
if ($issues.Count -gt 0) { $report += "`nIssues: $($issues -join '; ')" }
if ($fixes.Count -gt 0) { $report += "`nFixes: $($fixes -join '; ')" }
$report | Out-File "C:\Users\Administrator\Documents\Codex\网站管家\scripts\last_report.txt" -Encoding UTF8 -NoNewline

Write-Log "=== INSPECTION DONE | Issues=$($issues.Count) Fixes=$($fixes.Count) ==="