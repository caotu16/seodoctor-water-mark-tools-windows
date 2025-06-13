@echo off
cls
echo ========================================
echo SEO Doctor: Image Water Mark Tool v3.0
echo Multi-Method Build Script
echo ========================================

echo.
echo [PREP] Cleaning and setup...
if exist dist rmdir /s /q dist
npm install

echo.
echo ========================================
echo METHOD 1: Electron Packager (Portable)
echo ========================================
echo Creating portable application folder...
npx electron-packager . "SEO-Doctor-Image-Tool" --platform=win32 --arch=x64 --out=dist --overwrite --electron-version=30.0.0

if exist "dist\SEO-Doctor-Image-Tool-win32-x64\SEO-Doctor-Image-Tool.exe" (
    echo SUCCESS: Portable app created!
    echo Location: dist\SEO-Doctor-Image-Tool-win32-x64\
    goto SUCCESS
)

echo.
echo ========================================
echo METHOD 2: Electron Builder (Installer)
echo ========================================
echo Creating Windows installer...
npx electron-builder build --win --x64 --publish=never

if exist "dist\*.exe" (
    echo SUCCESS: Installer created!
    dir dist\*.exe /B
    goto SUCCESS
)

echo.
echo ========================================
echo METHOD 3: Manual Electron Run
echo ========================================
echo Testing app functionality...
timeout /t 3 /nobreak
echo Starting Electron app to verify...
start "" npx electron . --no-sandbox
echo App should open in a new window. Close it to continue.
timeout /t 10 /nobreak

echo.
echo ========================================
echo METHOD 4: Simple Copy Method
echo ========================================
mkdir dist\manual-portable 2>nul
echo Copying files for manual distribution...
xcopy main.js dist\manual-portable\ /Y
xcopy preload.js dist\manual-portable\ /Y
xcopy package.json dist\manual-portable\ /Y
xcopy /E /I src dist\manual-portable\src
xcopy /E /I assets dist\manual-portable\assets
xcopy /E /I node_modules dist\manual-portable\node_modules

echo Creating run script...
echo @echo off > dist\manual-portable\run.bat
echo npm start >> dist\manual-portable\run.bat

echo Manual portable created in: dist\manual-portable\
echo Run with: dist\manual-portable\run.bat

:SUCCESS
echo.
echo ========================================
echo BUILD SUMMARY
echo ========================================
echo Checking all possible outputs:

if exist "dist\SEO-Doctor-Image-Tool-win32-x64\SEO-Doctor-Image-Tool.exe" (
    echo [√] Portable App: dist\SEO-Doctor-Image-Tool-win32-x64\
)

if exist "dist\*.exe" (
    echo [√] Installer:
    for %%F in (dist\*.exe) do echo     %%F
)

if exist "dist\manual-portable\run.bat" (
    echo [√] Manual Portable: dist\manual-portable\
)

echo.
echo Choose the version that works best for you!
echo ========================================
pause