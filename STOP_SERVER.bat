@echo off
setlocal
set "PID="
for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:":3000 .*LISTENING"') do set "PID=%%P"
if defined PID (
  taskkill /PID %PID% /F >nul 2>&1
  echo Quiz Competition Pro server stopped.
) else echo Quiz Competition Pro server is not running.
timeout /t 2 >nul
