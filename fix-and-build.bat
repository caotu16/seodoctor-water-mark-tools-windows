@echo off
echo ========================================
echo SEO Doctor: Image Water Mark Tool
echo Fix Native Modules and Build Process
echo ========================================

echo.
echo [1/6] Cleaning previous builds...
if exist dist rmdir /s /q dist
if exist node_modules\sharp rmdir /s /q node_modules\sharp

echo.
echo [2/6] Installing dependencies...
npm install

echo.
echo [3/6] Installing electron-builder globally...
npm install -g electron-builder

echo.
echo [4/6] Rebuilding Sharp for Electron...
npm install --save-exact sharp@0.33.4
npm rebuild sharp --runtime=electron --target=30.0.0 --disturl=https://electronjs.org/headers --build-from-source --cache=/tmp/.npm

echo.
echo [5/6] Cleaning npm cache...
npm cache clean --force

echo.
echo [6/6] Building application...
npx electron-builder --win --x64

echo.
echo ========================================
echo Build completed! Check dist folder.
echo ========================================
pause