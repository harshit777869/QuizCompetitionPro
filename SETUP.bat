@echo off
cd /d "%~dp0"
echo Installing Quiz Competition Pro dependencies...
call npm install
if errorlevel 1 (
 echo Installation failed.
 pause
 exit /b 1
)
echo Setup complete.
pause
