@echo off
setlocal
cd /d "%~dp0"
set "ROOT=%~dp0"
set "LOG=%ROOT%server.log"

REM Install all root dependencies once.
if not exist "%ROOT%node_modules\express" (
  echo Installing dependencies...
  call npm install --silent >> "%LOG%" 2>&1
  if errorlevel 1 (
    echo Dependency installation failed. See server.log
    start "" notepad.exe "%LOG%"
    exit /b 1
  )
)

REM If port 3000 is already listening, just open the application.
set "PID="
for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:":3000 .*LISTENING"') do set "PID=%%P"
if defined PID (
  start "" "http://localhost:3000"
  exit /b 0
)

REM Start Node hidden; no terminal window needs to remain open.
powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -Command "$p=Start-Process -FilePath 'node.exe' -ArgumentList 'backend\server.js' -WorkingDirectory '%ROOT%' -WindowStyle Hidden -RedirectStandardOutput '%LOG%' -RedirectStandardError '%ROOT%\server-error.log' -PassThru; Start-Sleep -Seconds 2; if ($p.HasExited) { Start-Process 'notepad.exe' '%ROOT%\server-error.log'; exit 1 }; Start-Process 'http://localhost:3000'"
exit /b 0
