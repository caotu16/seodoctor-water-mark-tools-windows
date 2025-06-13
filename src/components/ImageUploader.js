const { useState } = React;

function ImageUploader({ onImagesSelected, images, t }) {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => 
      file.type.startsWith('image/')
    );

    if (imageFiles.length > 0) {
      const imageData = await Promise.all(
        imageFiles.map(async (file) => {
          try {
            const info = await window.electronAPI.getImageInfo(file.path);
            return {
              path: file.path,
              name: file.name,
              size: file.size,
              ...info
            };
          } catch (error) {
            console.error(`Failed to get info for ${file.name}:`, error);
            return {
              path: file.path,
              name: file.name,
              size: file.size,
              error: error.message
            };
          }
        })
      );

      onImagesSelected(imageData);
    }
  };

  const selectImages = async () => {
    const selectedPaths = await window.electronAPI.selectImages();
    if (selectedPaths.length > 0) {
      const imageData = await Promise.all(
        selectedPaths.map(async (path) => {
          try {
            const info = await window.electronAPI.getImageInfo(path);
            return {
              path,
              name: path.split(/[\\/]/).pop(),
              ...info
            };
          } catch (error) {
            console.error(`Failed to get info for ${path}:`, error);
            return {
              path,
              name: path.split(/[\\/]/).pop(),
              error: error.message
            };
          }
        })
      );

      onImagesSelected(imageData);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesSelected(newImages);
  };

  const formatFileSize = (bytes) => {
    if (bytes === undefined) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return React.createElement('div', { className: 'section' },
    React.createElement('h3', null, t.imageUpload.title),
    
    React.createElement('div', {
      className: `drop-zone ${dragOver ? 'drag-over' : ''}`,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      onClick: selectImages
    },
      React.createElement('div', { className: 'drop-zone-content' },
        React.createElement('i', { className: 'fas fa-cloud-upload-alt' }),
        React.createElement('p', null, 
          t.imageUpload.dropText + ' ',
          React.createElement('span', { className: 'browse-link' }, t.imageUpload.browseText)
        ),
        React.createElement('p', { className: 'drop-zone-hint' }, 
          'Supported formats: JPG, PNG, BMP, TIFF, WebP'
        )
      )
    ),

    images.length > 0 && React.createElement('div', { className: 'image-list' },
      React.createElement('h4', null, `${images.length} ${t.imageUpload.selectedImages}`),
      images.map((image, index) => 
        React.createElement('div', { key: index, className: 'image-item' },
          React.createElement('div', { className: 'image-info' },
            React.createElement('div', { className: 'image-name' },
              React.createElement('i', { className: 'fas fa-image' }),
              ` ${image.name}`
            ),
            !image.error ? React.createElement('div', { className: 'image-details' },
              `${image.width}×${image.height} • ${formatFileSize(image.size)} • ${image.format?.toUpperCase()}`
            ) : React.createElement('div', { className: 'image-error' },
              React.createElement('i', { className: 'fas fa-exclamation-triangle' }),
              ` ${image.error}`
            )
          ),
          React.createElement('button', {
            className: 'btn btn-danger btn-small',
            onClick: () => removeImage(index)
          },
            React.createElement('i', { className: 'fas fa-times' })
          )
        )
      )
    )
  );
}
