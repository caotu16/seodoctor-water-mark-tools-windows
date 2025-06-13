function ResizeControls({ enabled, width, onEnabledChange, onWidthChange, t }) {
  return React.createElement('div', { className: 'section' },
    React.createElement('h3', null, t.resize.title),
    
    React.createElement('div', { className: 'control-group' },
      React.createElement('label', { className: 'checkbox-label' },
        React.createElement('input', {
          type: 'checkbox',
          checked: enabled,
          onChange: (e) => onEnabledChange(e.target.checked)
        }),
        React.createElement('span', { className: 'checkbox-text' }, t.resize.enable)
      )
    ),
    
    enabled && React.createElement('div', { className: 'control-group' },
      React.createElement('label', { className: 'slider-label' },
        React.createElement('span', null, t.resize.width),
        React.createElement('input', {
          type: 'number',
          min: '100',
          max: '5000',
          step: '10',
          value: width,
          onChange: (e) => onWidthChange(parseInt(e.target.value) || 1000),
          className: 'number-input'
        })
      ),
      React.createElement('div', { className: 'help-text' }, t.resize.note)
    )
  );
}

window.ResizeControls = ResizeControls;