@echo off
cd /d "%~dp0"
echo Starting DigiKhata at http://127.0.0.1:3000
echo Demo link: http://localhost:3000
start "" cmd /c "timeout /t 6 >nul && start "" http://localhost:3000"
npm.cmd run dev
pause
