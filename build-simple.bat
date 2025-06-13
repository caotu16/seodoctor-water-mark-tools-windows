@echo off
echo ========================================
echo SEO Doctor: Image Water Mark Tool v3.0
echo Build Script (Jimp Version - No Compilation Issues)
echo ========================================

echo.
echo [1/4] Cleaning previous builds...
if exist dist rmdir /s /q dist

echo.
echo [2/4] Installing dependencies...
npm install

echo.
echo [3/5] Verifying Jimp installation...
npm list jimp

echo.
echo [4/5] Installing electron-builder globally...
npm install -g electron-builder

echo.
echo [5/5] Building application...
call npx electron-builder --win --x64

echo.
echo ========================================
if exist dist\*.exe (
    echo SUCCESS! Build completed successfully!
    echo File location: dist\
    dir dist\*.exe
) else (
    echo ERROR! Build failed - no .exe file found
)
echo ========================================
pause