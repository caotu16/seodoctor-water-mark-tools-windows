#!/bin/bash
echo "Building Image Watermark Tool installer..."
echo

# Install dependencies if needed
echo "Installing dependencies..."
npm install

# Build the application
echo "Building application..."
npx electron-builder --config electron-builder.config.js --linux

echo
echo "Build completed! Check the 'dist' folder for the installer file."
echo