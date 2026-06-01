# 此脚本以管理员身份运行，创建定时任务
$scriptPath = "C:\Users\Administrator\Documents\Codex\网站管家\scripts\site_inspect.ps1"

# 创建 XML 任务定义
$taskXml = @"
<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.3" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
  <RegistrationInfo>
    <Description>skillai.top site hourly inspect</Description>
    <URI>\SkillAI_SiteInspect</URI>
  </RegistrationInfo>
  <Triggers>
    <CalendarTrigger>
      <StartBoundary>$(Get-Date -Format 'yyyy-MM-ddTHH:00:00+08:00')</StartBoundary>
      <Enabled>true</Enabled>
      <Repetition>
        <Interval>PT1H</Interval>
        <Duration>P365D</Duration>
      </Repetition>
      <ScheduleByDay>
        <DaysInterval>1</DaysInterval>
      </ScheduleByDay>
    </CalendarTrigger>
  </Triggers>
  <Principals>
    <Principal id="Author">
      <UserId>Administrator</UserId>
      <LogonType>InteractiveToken</LogonType>
      <RunLevel>HighestAvailable</RunLevel>
    </Principal>
  </Principals>
  <Settings>
    <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
    <DisallowStartIfOnBatteries>false</DisallowStartIfOnBatteries>
    <StopIfGoingOnBatteries>false</StopIfGoingOnBatteries>
    <StartWhenAvailable>true</StartWhenAvailable>
    <ExecutionTimeLimit>PT30M</ExecutionTimeLimit>
    <Priority>7</Priority>
  </Settings>
  <Actions>
    <Exec>
      <Command>powershell.exe</Command>
      <Arguments>-ExecutionPolicy Bypass -WindowStyle Hidden -File "$scriptPath"</Arguments>
    </Exec>
  </Actions>
</Task>
"@

$xmlPath = "$env:TEMP\skillai_task.xml"
$taskXml | Out-File -FilePath $xmlPath -Encoding Unicode -NoNewline

# 先删除旧任务
schtasks /delete /tn "SkillAI_SiteInspect" /f 2>$null

# 创建新任务
schtasks /create /tn "SkillAI_SiteInspect" /xml "$xmlPath" /f
Write-Output "Task created successfully"