@echo off
cls
echo ========================================
echo SEO Doctor: Image Water Mark Tool v3.0
echo Portable Build Script
echo ========================================

echo.
echo [1/4] Cleaning previous builds...
if exist dist rmdir /s /q dist

echo.
echo [2/4] Installing dependencies...
npm install

echo.
echo [3/4] Creating portable build...
npx electron-packager . "SEO Doctor Image Water Mark Tool" --platform=win32 --arch=x64 --out=dist --overwrite --electron-version=30.0.0

echo.
echo [4/4] Checking results...
echo ========================================
if exist "dist\SEO Doctor Image Water Mark Tool-win32-x64" (
    echo SUCCESS! Portable app created successfully!
    echo.
    echo Location: dist\SEO Doctor Image Water Mark Tool-win32-x64\
    echo.
    echo Files:
    dir "dist\SEO Doctor Image Water Mark Tool-win32-x64" /B
    echo.
    echo To run: Double-click "SEO Doctor Image Water Mark Tool.exe" in the folder above
) else (
    echo ERROR! Build failed
    if exist dist (
        echo Contents of dist:
        dir dist /B
    )
)
echo ========================================
pause