function CompressionControls({ enabled, quality, onEnabledChange, onQualityChange, t }) {
  return React.createElement('div', { className: 'section' },
    React.createElement('h3', null, t.compression.title),
    
    React.createElement('div', { className: 'compression-toggle' },
      React.createElement('label', { className: 'toggle-label' },
        React.createElement('input', {
          type: 'checkbox',
          checked: enabled,
          onChange: (e) => onEnabledChange(e.target.checked)
        }),
        React.createElement('span', { className: 'toggle-slider' }),
        t.compression.enable
      )
    ),

    enabled && React.createElement('div', { className: 'quality-control' },
      React.createElement('label', null, 
        t.compression.quality + ': ', quality, '%'
      ),
      React.createElement('input', {
        type: 'range',
        min: '70',
        max: '100',
        step: '1',
        value: quality,
        onChange: (e) => onQualityChange(parseInt(e.target.value)),
        className: 'slider'
      }),
      React.createElement('div', { className: 'quality-hint' },
        quality >= 90 ? 'High Quality' : 
        quality >= 80 ? 'Good Quality' : 'Optimized Size'
      )
    )
  );
}
