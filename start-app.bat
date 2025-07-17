@echo off
echo Starting ARMS Application...
echo.

echo Starting Backend Server...
start "Backend" cmd /k "cd /d c:\Users\kumbh\OneDrive\Desktop\ARCP && node app.js"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting Frontend Development Server...
start "Frontend" cmd /k "cd /d c:\Users\kumbh\OneDrive\Desktop\ARCP\client && npm start"

echo.
echo Both servers are starting...
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:3000
echo.
echo Press any key to close this window...
pause >nul
