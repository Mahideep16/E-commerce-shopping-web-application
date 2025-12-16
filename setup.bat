@echo off
REM ShopHub - Quick Start Script for Windows

echo.
echo ========================================
echo    ShopHub E-Commerce Platform
echo    Setup & Launch Script
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo ✓ Node.js is installed
echo ✓ npm version:
npm --version

echo.
echo Installing dependencies...
echo.

REM Install dependencies
call npm run setup

if errorlevel 1 (
    echo.
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ========================================
echo    Dependencies Installed Successfully!
echo ========================================
echo.

echo.
echo IMPORTANT NEXT STEPS:
echo.
echo 1. Configure MongoDB:
echo    - Install MongoDB locally, OR
echo    - Create MongoDB Atlas account (free at https://mongodb.com/cloud/atlas)
echo.
echo 2. Create/Update 'server/.env' file with:
echo    MONGODB_URI=mongodb://localhost:27017/ecommerce
echo    PORT=5000
echo    JWT_SECRET=your_secret_key_here
echo    NODE_ENV=development
echo.
echo 3. Make sure MongoDB is running:
echo    - Open Command Prompt
echo    - Run: mongod
echo.
echo 4. Start the application:
echo    - Run: npm run dev
echo    - Or run client and server separately
echo.
echo    Frontend will open at: http://localhost:3000
echo    Backend API at: http://localhost:5000
echo.
echo ========================================
echo.
echo For detailed instructions, see:
echo - QUICKSTART.md (5 minute quick start)
echo - SETUP.md (detailed installation guide)
echo - README.md (complete documentation)
echo.

pause
