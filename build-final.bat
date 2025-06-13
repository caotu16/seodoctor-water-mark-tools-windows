@echo off
cls
echo ========================================
echo SEO Doctor: Image Water Mark Tool v3.0
echo Final Build Script (Fixed)
echo ========================================

echo.
echo [1/6] Cleaning previous builds...
if exist dist rmdir /s /q dist
if exist node_modules rmdir /s /q node_modules

echo.
echo [2/6] Installing dependencies...
npm install

echo.
echo [3/6] Installing development dependencies...
npm install --save-dev electron@30.0.0 electron-builder@24.13.3

echo.
echo [4/6] Verifying installations...
echo Checking Jimp:
npm list jimp
echo.
echo Checking Electron:
npm list electron

echo.
echo [5/6] Building Windows executable...
echo Starting electron-builder...
npx electron-builder build --win --x64 --publish=never

echo.
echo [6/6] Checking build results...
echo ========================================
if exist "dist\*.exe" (
    echo SUCCESS! Build completed successfully!
    echo.
    echo Files created:
    dir dist\*.exe /B
    echo.
    echo File size:
    for %%F in (dist\*.exe) do echo %%~zF bytes
) else (
    echo ERROR! No .exe file found in dist folder
    echo.
    echo Contents of dist folder:
    if exist dist (
        dir dist /B
    ) else (
        echo dist folder does not exist
    )
)
echo ========================================
echo.
echo Build process completed. Press any key to exit.
pause