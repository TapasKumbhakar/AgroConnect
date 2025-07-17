@echo off
echo Starting Agricultural Resource Management System...
echo.
echo Make sure MongoDB is running before starting the server.
echo.
echo Installing dependencies...
npm install
echo.
echo Starting the server...
node app.js
pause
