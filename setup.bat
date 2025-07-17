@echo off
echo 🌾 Setting up Agricultural Resource Management System (ARMS)
echo ============================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo 📦 Installing backend dependencies...
call npm install

echo 📦 Installing frontend dependencies...
cd client
call npm install
cd ..

echo 🎉 Setup complete!
echo.
echo 🚀 To start the application:
echo    1. Start the backend: npm start
echo    2. In another terminal, start the frontend: cd client ^&^& npm start
echo.
echo 🌐 Access the application:
echo    - React Frontend: http://localhost:3000
echo    - Legacy Frontend: http://localhost:5000
echo    - API: http://localhost:5000/api
echo.
echo 📚 Don't forget to configure your .env/.env file with your MongoDB connection string!
pause
