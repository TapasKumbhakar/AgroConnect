@echo off

echo 🚀 Preparing AgroConnect for deployment...

REM Navigate to client directory
cd client

REM Clean previous builds
echo 🧹 Cleaning previous builds...
if exist build rmdir /s /q build
if exist node_modules rmdir /s /q node_modules

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Build the project
echo 🔨 Building the project...
npm run build

echo ✅ Build completed successfully!
echo 📁 Build files are in client/build/

REM Return to root directory
cd ..

echo 🎉 Project is ready for deployment!
echo.
echo Next steps:
echo 1. Push your code to GitHub
echo 2. Connect your GitHub repo to Vercel
echo 3. Set root directory to 'client' in Vercel dashboard
echo 4. Deploy!

pause
