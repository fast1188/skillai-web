@echo off
chcp 65001 >nul 2>&1
set "SKILLAI_DIST=C:\Users\Administrator\Documents\Codex\????\dist"
set "SKILLAI_BACKUP=C:\Users\Administrator\Documents\Codex\????\dist_backup_good"
set "SKILLAI_SCRIPTS=C:\Users\Administrator\Documents\Codex\????\scripts"
powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0site_inspect_v2.ps1"