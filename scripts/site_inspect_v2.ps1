# Site Inspector v2 - no Chinese paths in source
$distPath = $env:SKILLAI_DIST
$backupPath = $env:SKILLAI_BACKUP
$scriptsPath = $env:SKILLAI_SCRIPTS
$baseUrl = "https://skillai.top"

if (-not $distPath) { $distPath = "C:\Users\Administrator\Documents\Codex" }
if (-not $backupPath) { $backupPath = "$distPath" }
if (-not $scriptsPath) { $scriptsPath = "$distPath" }

# Resolve actual paths
$distPath = (Resolve-Path $distPath -ErrorAction SilentlyContinue).Path
$backupPath = (Resolve-Path $backupPath -ErrorAction SilentlyContinue).Path
$scriptsPath = (Resolve-Path $scriptsPath -ErrorAction SilentlyContinue).Path

$logFile = Join-Path $scriptsPath "inspect_log.txt"
$reportFile = Join-Path $scriptsPath "last_report.txt"

function Write-Log {
    param([string]$msg)
    $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $line = "[$ts] $msg"
    try { Add-Content -Path $logFile -Value $line -Encoding UTF8 } catch {}
}

function Test-Page {
    param([string]$url, [string]$name)
    try {
        $r = Invoke-WebRequest -Uri $url -TimeoutSec 15 -UseBasicParsing -ErrorAction Stop
        $t = [regex]::Match($r.Content, '<title>([^<]+)</title>').Groups[1].Value
        $bad = $t -match '\?{3,}'
        return @{N=$name;S=$r.StatusCode;OK=($r.StatusCode -eq 200 -and -not $bad);Garbled=$bad}
    } catch {
        return @{N=$name;S="FAIL";OK=$false;Garbled=$false}
    }
}

function Fix-BOM {
    $fixed = 0
    Get-ChildItem $distPath -Recurse -File -Include "*.html","*.xml","*.txt","*.json","*.css","*.js" | ForEach-Object {
        $b = [System.IO.File]::ReadAllBytes($_.FullName)
        if ($b.Length -ge 3 -and $b[0] -eq 0xEF -and $b[1] -eq 0xBB -and $b[2] -eq 0xBF) {
            $nb = New-Object byte[] ($b.Length - 3)
            [Array]::Copy($b, 3, $nb, 0, $b.Length - 3)
            [System.IO.File]::WriteAllBytes($_.FullName, $nb)
            $fixed++
        }
    }
    return $fixed
}

function Restore-File {
    param([string]$fn)
    $dst = Join-Path $distPath $fn
    $src = Join-Path $backupPath $fn
    if (Test-Path $src) { Copy-Item $src $dst -Force; return $true }
    $dSrc = "D:\Codex Main总指挥\04_网站管家\dist\$fn"
    if (Test-Path $dSrc) { Copy-Item $dSrc $dst -Force; return $true }
    return $false
}

# === MAIN ===
Write-Log "=== INSPECT START ==="
$issues = 0
$fixes = 0
$deploy = $false

$pages = @(
    @{P="/";N="Home"},@{P="/about.html";N="About"},@{P="/skills.html";N="Skills"},
    @{P="/download.html";N="Download"},@{P="/community.html";N="Community"},
    @{P="/top-models.html";N="TopModels"},@{P="/top-agents.html";N="TopAgents"},
    @{P="/contact/";N="Contact"},@{P="/blog/";N="Blog"},@{P="/cooperation/";N="Coop"},
    @{P="/tutorial/";N="Tutorial"},@{P="/news/";N="News"},@{P="/guide/";N="Guide"},
    @{P="/agreement/";N="Agreement"}
)

foreach ($pg in $pages) {
    $r = Test-Page -url "$baseUrl$($pg.P)" -name $pg.N
    if ($r.OK) { Write-Log "OK: $($pg.N)" }
    else {
        $issues++
        Write-Log "FAIL: $($pg.N) S=$($r.S) G=$($r.Garbled)"
        if ($r.Garbled) {
            $fn = $pg.P.TrimStart('/')
            if ($fn -eq "") { $fn = "index.html" }
            elseif (-not $fn.EndsWith(".html")) { $fn = "$fn/index.html" }
            if (Restore-File $fn) { $fixes++; $deploy = $true; Write-Log "RESTORED: $fn" }
        }
    }
}

foreach ($sf in @("robots.txt","sitemap.xml")) {
    try { $r = Invoke-WebRequest "$baseUrl/$sf" -TimeoutSec 10 -UseBasicParsing -ErrorAction Stop; Write-Log "OK: $sf" }
    catch { $issues++; Write-Log "FAIL: $sf" }
}

foreach ($d in @("/downloads/OpenClaw-Windows-Setup.bat","/downloads/OpenClaw-macOS-Setup.sh","/downloads/OpenClaw-Linux-Setup.sh")) {
    try { Invoke-WebRequest "$baseUrl$d" -TimeoutSec 10 -UseBasicParsing -ErrorAction Stop | Out-Null; Write-Log "OK: $d" }
    catch { $issues++; Write-Log "FAIL: $d" }
}

foreach ($cp in @("skills.html","community.html","about.html","top-models.html","top-agents.html","download.html")) {
    try {
        $r = Invoke-WebRequest "$baseUrl/$cp" -TimeoutSec 10 -UseBasicParsing -ErrorAction Stop
        $c = [regex]::Match($r.Content, 'rel="canonical"\s*href="([^"]*)"').Groups[1].Value
        $exp = "$baseUrl/$cp"
        if ($c -ne "" -and $c -ne $exp) { $issues++; Write-Log "CANON WRONG: $cp -> $c" }
        else { Write-Log "OK: $cp canonical" }
    } catch {}
}

$bom = Fix-BOM
if ($bom -gt 0) { $fixes += $bom; $deploy = $true; Write-Log "FIXED: $bom BOM" }

if ($deploy) {
    Write-Log "DEPLOYING..."
    Push-Location $distPath
    $out = vercel --prod --yes 2>&1
    Pop-Location
    if (($out -join " ") -match '"status":\s*"ok"') { $fixes++; Write-Log "DEPLOY OK" }
    else { Write-Log "DEPLOY FAIL" }
}

"Inspect $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') | Issues=$issues Fixes=$fixes" | Out-File $reportFile -Encoding UTF8 -NoNewline
Write-Log "=== INSPECT DONE | I=$issues F=$fixes ==="