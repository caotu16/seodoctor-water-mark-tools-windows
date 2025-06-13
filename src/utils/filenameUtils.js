// Filename sanitization utilities
function sanitizeFilename(filename) {
  // Remove accents and special characters
  let sanitized = filename
    // Remove Vietnamese accents
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Convert to lowercase
    .toLowerCase()
    // Replace spaces and special characters with hyphens
    .replace(/[^a-z0-9]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Remove consecutive hyphens
    .replace(/-+/g, '-');

  // Ensure filename is not empty
  if (!sanitized) {
    sanitized = 'processed-image';
  }

  // Limit length to 100 characters
  if (sanitized.length > 100) {
    sanitized = sanitized.substring(0, 100).replace(/-[^-]*$/, '');
  }

  return sanitized;
}

// Additional utility functions
function isValidFilename(filename) {
  // Check if filename contains only URL-friendly characters
  return /^[a-z0-9-]+$/.test(filename);
}

function generateUniqueFilename(baseName, existingFiles = []) {
  let counter = 1;
  let newName = baseName;
  
  while (existingFiles.includes(newName + '.jpg')) {
    newName = `${baseName}-${counter}`;
    counter++;
  }
  
  return newName;
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    sanitizeFilename,
    isValidFilename,
    generateUniqueFilename
  };
} else {
  // Browser environment
  window.FilenameUtils = {
    sanitizeFilename,
    isValidFilename,
    generateUniqueFilename
  };
}
