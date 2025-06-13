function Header({ language, onLanguageChange, t }) {
  const handleWebsiteClick = () => {
    window.electronAPI.openExternal('https://seodoctor.vn');
  };

  return React.createElement('div', { className: 'header' },
    React.createElement('div', { className: 'header-content' },
      React.createElement('div', { className: 'title-section' },
        React.createElement('h1', { className: 'app-title' }, t.appTitle),
        React.createElement('div', { className: 'help-section' },
          React.createElement('button', {
            className: 'btn btn-link',
            onClick: handleWebsiteClick,
            title: t.help.website
          },
            React.createElement('i', { className: 'fas fa-globe' }),
            ' ', t.help.website
          )
        )
      ),
      React.createElement('div', { className: 'controls-section' },
        React.createElement('button', {
          className: 'btn btn-secondary btn-sm',
          onClick: () => onLanguageChange(language === 'vi' ? 'en' : 'vi')
        },
          React.createElement('i', { className: 'fas fa-language' }),
          ' ', t.language.switch
        )
      )
    )
  );
}

window.Header = Header;