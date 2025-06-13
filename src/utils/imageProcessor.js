// This file would contain image processing utilities
// For now, the processing is handled in the main process
// This can be extended for client-side preview functionality

const ImageProcessor = {
  // Generate preview of logo positioning
  generatePreview: (imageData, logoData, position, size) => {
    // This would be implemented for client-side preview
    // Currently handled by the main process
    return null;
  },

  // Validate image format
  isValidImageFormat: (file) => {
    const validTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/bmp',
      'image/tiff',
      'image/webp'
    ];
    
    return validTypes.includes(file.type);
  },

  // Get image dimensions from file
  getImageDimensions: (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight
        });
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }
};

// Export for use in components
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ImageProcessor;
}
