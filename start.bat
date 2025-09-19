@echo off
REM Quick start script for Windows

echo 🚀 Starting Newline to Comma Converter Tool...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected: 
node --version

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

echo 🔧 Building project...
npm run build

echo 🌐 Starting development server...
echo 📱 Access the tool at: http://localhost:5173/
echo ⚡ Hot reload enabled - changes will auto-refresh
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the development server
npm run dev