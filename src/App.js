const { useState, useEffect } = React;

function App() {
  const [images, setImages] = useState([]);
  const [logoPath, setLogoPath] = useState('');
  const [logoPosition, setLogoPosition] = useState('bottom-right');
  const [logoSize, setLogoSize] = useState(20);
  const [compressionEnabled, setCompressionEnabled] = useState(true);
  const [quality, setQuality] = useState(85);
  const [resizeEnabled, setResizeEnabled] = useState(true);
  const [resizeWidth, setResizeWidth] = useState(1000);
  const [language, setLanguage] = useState('vi');
  const [outputDir, setOutputDir] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState({ current: 0, total: 0, filename: '' });
  const [results, setResults] = useState([]);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const t = window.useTranslation(language);

  // Load settings on app start
  useEffect(() => {
    const loadUserSettings = async () => {
      try {
        const savedSettings = await window.electronAPI.loadSettings();
        if (savedSettings) {
          setLogoPath(savedSettings.logoPath || '');
          setLogoPosition(savedSettings.logoPosition || 'bottom-right');
          setLogoSize(savedSettings.logoSize || 20);
          setCompressionEnabled(savedSettings.compressionEnabled !== undefined ? savedSettings.compressionEnabled : true);
          setQuality(savedSettings.quality || 85);
          setResizeEnabled(savedSettings.resizeEnabled !== undefined ? savedSettings.resizeEnabled : true);
          setResizeWidth(savedSettings.resizeWidth || 1000);
          setLanguage(savedSettings.language || 'vi');
          setOutputDir(savedSettings.outputDir || '');
        }
      } catch (error) {
        console.log('No previous settings found, using defaults');
      }
    };

    loadUserSettings();

    const handleProgress = (event, progress) => {
      setProcessingProgress(progress);
    };

    window.electronAPI.onProcessingProgress(handleProgress);

    return () => {
      window.electronAPI.removeAllListeners('processing-progress');
    };
  }, []);

  // Save settings whenever they change
  useEffect(() => {
    const saveUserSettings = async () => {
      const settings = {
        logoPath,
        logoPosition,
        logoSize,
        compressionEnabled,
        quality,
        resizeEnabled,
        resizeWidth,
        language,
        outputDir
      };
      
      try {
        await window.electronAPI.saveSettings(settings);
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 2000); // Hide after 2 seconds
      } catch (error) {
        console.log('Could not save settings');
      }
    };

    // Only save if we have some user interaction (not initial load)
    if (logoPath || logoPosition !== 'bottom-right' || logoSize !== 20) {
      saveUserSettings();
    }
  }, [logoPath, logoPosition, logoSize, compressionEnabled, quality, resizeEnabled, resizeWidth, language, outputDir]);

  const handleImagesSelected = (selectedImages) => {
    setImages(selectedImages);
  };

  const handleLogoSelected = (path) => {
    setLogoPath(path);
  };

  const selectOutputFolder = async () => {
    const folder = await window.electronAPI.selectOutputFolder();
    if (folder) {
      setOutputDir(folder);
    }
  };

  const processImages = async () => {
    if (images.length === 0) {
      alert(t.messages.selectImages);
      return;
    }

    if (!outputDir) {
      alert(t.messages.selectOutput);
      return;
    }

    setIsProcessing(true);
    setResults([]);

    try {
      console.log('Processing with settings:', {
        logoPath,
        logoPosition, 
        logoSize,
        compressionEnabled,
        quality,
        resizeEnabled,
        resizeWidth
      });
      
      const processingResults = await window.electronAPI.processImages({
        imagePaths: images.map(img => img.path),
        logoPath: logoPath || '',
        outputDir,
        logoPosition,
        logoSize,
        compressionEnabled,
        quality,
        resizeEnabled,
        resizeWidth
      });

      setResults(processingResults);
    } catch (error) {
      alert(`Processing failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
      setProcessingProgress({ current: 0, total: 0, filename: '' });
    }
  };

  return React.createElement('div', { className: 'app' },
    React.createElement(window.Header, {
      language,
      onLanguageChange: setLanguage,
      t
    }),

    // Settings saved notification
    settingsSaved && React.createElement('div', { 
      className: 'settings-notification',
      style: {
        position: 'fixed',
        top: '70px',
        right: '20px',
        backgroundColor: '#28a745',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        animation: 'slideIn 0.3s ease-out'
      }
    }, `✓ ${t.messages.settingsSaved}`),

    React.createElement('main', { className: 'app-main' },
      React.createElement('div', { className: 'panels-container' },
        React.createElement('div', { className: 'left-panel' },
          React.createElement(ImageUploader, { 
            onImagesSelected: handleImagesSelected,
            images,
            t
          }),
          
          React.createElement(LogoUploader, { 
            onLogoSelected: handleLogoSelected,
            logoPath,
            t
          }),

          React.createElement('div', { className: 'output-section' },
            React.createElement('h3', null, t.output.title),
            React.createElement('button', {
              className: 'btn btn-secondary',
              onClick: selectOutputFolder
            }, 
              React.createElement('i', { className: 'fas fa-folder' }),
              ' ', t.output.select
            ),
            outputDir && React.createElement('div', { className: 'selected-folder' },
              React.createElement('i', { className: 'fas fa-check-circle' }),
              ` ${outputDir}`
            )
          )
        ),

        React.createElement('div', { className: 'right-panel' },
          logoPath && React.createElement(PositionControls, {
            position: logoPosition,
            size: logoSize,
            onPositionChange: setLogoPosition,
            onSizeChange: setLogoSize,
            t
          }),

          React.createElement(window.ResizeControls, {
            enabled: resizeEnabled,
            width: resizeWidth,
            onEnabledChange: setResizeEnabled,
            onWidthChange: setResizeWidth,
            t
          }),

          React.createElement(CompressionControls, {
            enabled: compressionEnabled,
            quality,
            onEnabledChange: setCompressionEnabled,
            onQualityChange: setQuality,
            t
          }),

          React.createElement(ProcessingPanel, {
            onProcess: processImages,
            isProcessing,
            progress: processingProgress,
            results,
            canProcess: images.length > 0 && outputDir,
            t
          })
        )
      )
    ),

    React.createElement(window.Footer, { t })
  );
}
