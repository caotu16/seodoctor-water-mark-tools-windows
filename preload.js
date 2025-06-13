const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selectImages: () => ipcRenderer.invoke('select-images'),
  selectLogo: () => ipcRenderer.invoke('select-logo'),
  selectOutputFolder: () => ipcRenderer.invoke('select-output-folder'),
  processImages: (options) => ipcRenderer.invoke('process-images', options),
  getImageInfo: (imagePath) => ipcRenderer.invoke('get-image-info', imagePath),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  
  // Settings management
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
  loadSettings: () => ipcRenderer.invoke('load-settings'),
  
  // Event listeners
  onProcessingProgress: (callback) => {
    ipcRenderer.on('processing-progress', callback);
  },
  
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  }
});
