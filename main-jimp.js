const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const Jimp = require('jimp');
const { sanitizeFilename } = require('./src/utils/filenameUtils');

// Disable security warnings for sandbox in development
app.commandLine.appendSwitch('--no-sandbox');
app.commandLine.appendSwitch('--disable-dev-shm-usage');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false
    },
    titleBarStyle: 'default',
    show: false,
    frame: true,
    backgroundColor: '#f3f3f3'
  });

  mainWindow.loadFile('src/index.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers
ipcMain.handle('select-images', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'webp'] }
    ]
  });
  
  if (!result.canceled) {
    return result.filePaths;
  }
  return [];
});

ipcMain.handle('select-logo', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'] }
    ]
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

ipcMain.handle('select-output-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

ipcMain.handle('process-images', async (event, options) => {
  const { 
    imagePaths, 
    logoPath, 
    outputDir, 
    logoPosition, 
    logoSize, 
    compressionEnabled, 
    quality,
    resizeEnabled,
    resizeWidth
  } = options;

  const results = [];

  for (let i = 0; i < imagePaths.length; i++) {
    const imagePath = imagePaths[i];
    
    try {
      // Send progress update
      event.sender.send('processing-progress', {
        current: i + 1,
        total: imagePaths.length,
        filename: path.basename(imagePath)
      });

      const result = await processImage({
        imagePath,
        logoPath,
        outputDir,
        logoPosition,
        logoSize,
        compressionEnabled,
        quality,
        resizeEnabled,
        resizeWidth
      });

      results.push(result);
    } catch (error) {
      results.push({
        success: false,
        originalPath: imagePath,
        error: error.message
      });
    }
  }

  return results;
});

async function processImage(options) {
  const { 
    imagePath, 
    logoPath, 
    outputDir, 
    logoPosition, 
    logoSize, 
    compressionEnabled, 
    quality,
    resizeEnabled,
    resizeWidth
  } = options;

  // Get original filename and sanitize it
  const originalName = path.basename(imagePath, path.extname(imagePath));
  const sanitizedName = sanitizeFilename(originalName);
  const outputPath = path.join(outputDir, `${sanitizedName}.jpg`);

  // Load the main image
  let image = await Jimp.read(imagePath);
  
  // Apply resize if enabled
  if (resizeEnabled && resizeWidth && resizeWidth > 0) {
    image = image.resize(resizeWidth, Jimp.AUTO);
  }

  // Apply logo if provided
  if (logoPath) {
    const logo = await Jimp.read(logoPath);
    
    // Calculate logo size
    const logoWidth = Math.round(image.getWidth() * (logoSize / 100));
    const logoHeight = Math.round(logo.getHeight() * (logoWidth / logo.getWidth()));
    
    // Resize logo
    logo.resize(logoWidth, logoHeight);
    
    // Calculate position
    const { x, y } = getLogoPosition(logoPosition, image.getWidth(), image.getHeight(), logoWidth, logoHeight);
    
    // Apply logo with transparency
    image.composite(logo, x, y, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 0.8,
      opacityDest: 1.0
    });
  }

  // Apply compression if enabled
  if (compressionEnabled && quality) {
    image.quality(quality);
  }

  // Save the result
  await image.writeAsync(outputPath);

  return {
    success: true,
    originalPath: imagePath,
    outputPath: outputPath,
    filename: path.basename(outputPath)
  };
}

function getLogoPosition(position, imageWidth, imageHeight, logoWidth, logoHeight) {
  const margin = 20;
  
  switch (position) {
    case 'top-left':
      return { x: margin, y: margin };
    case 'top-right':
      return { x: imageWidth - logoWidth - margin, y: margin };
    case 'bottom-left':
      return { x: margin, y: imageHeight - logoHeight - margin };
    case 'bottom-right':
      return { x: imageWidth - logoWidth - margin, y: imageHeight - logoHeight - margin };
    case 'center':
      return { 
        x: Math.round((imageWidth - logoWidth) / 2), 
        y: Math.round((imageHeight - logoHeight) / 2) 
      };
    case 'top-center':
      return { 
        x: Math.round((imageWidth - logoWidth) / 2), 
        y: margin 
      };
    case 'bottom-center':
      return { 
        x: Math.round((imageWidth - logoWidth) / 2), 
        y: imageHeight - logoHeight - margin 
      };
    default:
      return { x: margin, y: margin };
  }
}

ipcMain.handle('open-website', async (event, url) => {
  await shell.openExternal(url);
});

// Handle app certificate verification (for development)
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url.startsWith('https://localhost') || url.startsWith('https://127.0.0.1')) {
    event.preventDefault();
    callback(true);
  } else {
    callback(false);
  }
});