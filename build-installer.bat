@echo off
echo Building Image Watermark Tool installer...
echo.

REM Install dependencies if needed
echo Installing dependencies...
npm install

REM Build the application
echo Building application...
npx electron-builder --config electron-builder.config.js --win

echo.
echo Build completed! Check the 'dist' folder for the installer file.
echo.
pause