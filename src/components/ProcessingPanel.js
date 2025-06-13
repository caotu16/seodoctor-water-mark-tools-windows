function ProcessingPanel({ onProcess, isProcessing, progress, results, canProcess, t }) {
  const successCount = results.filter(r => r.success).length;
  const errorCount = results.filter(r => !r.success).length;

  return React.createElement('div', { className: 'section' },
    React.createElement('h3', null, t.processing.title),
    
    React.createElement('button', {
      className: `btn btn-primary btn-large ${!canProcess || isProcessing ? 'disabled' : ''}`,
      onClick: onProcess,
      disabled: !canProcess || isProcessing
    },
      isProcessing 
        ? React.createElement(React.Fragment, null,
            React.createElement('i', { className: 'fas fa-spinner fa-spin' }),
            ' ', t.processing.processing
          )
        : React.createElement(React.Fragment, null,
            React.createElement('i', { className: 'fas fa-play' }),
            ' ', t.processing.start
          )
    ),

    isProcessing && progress.total > 0 && React.createElement('div', { className: 'progress-section' },
      React.createElement('div', { className: 'progress-bar' },
        React.createElement('div', {
          className: 'progress-fill',
          style: { width: `${(progress.current / progress.total) * 100}%` }
        })
      ),
      React.createElement('div', { className: 'progress-text' },
        `${t.processing.currentFile}: ${progress.filename} (${progress.current}/${progress.total})`
      )
    ),

    results.length > 0 && React.createElement('div', { className: 'results-section' },
      React.createElement('h4', null, t.processing.completed),
      
      React.createElement('div', { className: 'results-summary' },
        successCount > 0 && React.createElement('div', { className: 'success-count' },
          React.createElement('i', { className: 'fas fa-check-circle' }),
          ` ${successCount} successful`
        ),
        errorCount > 0 && React.createElement('div', { className: 'error-count' },
          React.createElement('i', { className: 'fas fa-exclamation-circle' }),
          ` ${errorCount} failed`
        )
      ),

      React.createElement('div', { className: 'results-list' },
        results.map((result, index) => 
          React.createElement('div', {
            key: index,
            className: `result-item ${result.success ? 'success' : 'error'}`
          },
            React.createElement('div', { className: 'result-info' },
              React.createElement('i', {
                className: result.success ? 'fas fa-check' : 'fas fa-times'
              }),
              React.createElement('span', null, 
                result.success 
                  ? `${result.filename} - Saved successfully`
                  : `${result.originalPath.split(/[\\/]/).pop()} - ${result.error}`
              )
            )
          )
        )
      )
    )
  );
}
