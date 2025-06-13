function PositionControls({ position, size, onPositionChange, onSizeChange, t }) {
  const positions = [
    { value: 'top-left', label: t.position.topLeft, icon: 'fas fa-arrow-up' },
    { value: 'top-right', label: t.position.topRight, icon: 'fas fa-arrow-up' },
    { value: 'bottom-left', label: t.position.bottomLeft, icon: 'fas fa-arrow-down' },
    { value: 'bottom-right', label: t.position.bottomRight, icon: 'fas fa-arrow-down' },
    { value: 'center', label: t.position.center, icon: 'fas fa-crosshairs' }
  ];

  return React.createElement('div', { className: 'section' },
    React.createElement('h3', null, t.position.title),
    
    React.createElement('div', { className: 'position-grid' },
      positions.map(pos => 
        React.createElement('button', {
          key: pos.value,
          className: `position-btn ${position === pos.value ? 'active' : ''}`,
          onClick: () => onPositionChange(pos.value)
        },
          React.createElement('i', { className: pos.icon }),
          React.createElement('span', null, pos.label)
        )
      )
    ),

    React.createElement('div', { className: 'size-control' },
      React.createElement('label', null, 
        t.position.size + ': ', Math.round(size * 100), '%'
      ),
      React.createElement('input', {
        type: 'range',
        min: '0.05',
        max: '0.5',
        step: '0.01',
        value: size,
        onChange: (e) => onSizeChange(parseFloat(e.target.value)),
        className: 'slider'
      })
    )
  );
}
