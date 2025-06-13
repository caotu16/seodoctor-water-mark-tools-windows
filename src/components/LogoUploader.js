function LogoUploader({ onLogoSelected, logoPath, t }) {
  const selectLogo = async () => {
    const path = await window.electronAPI.selectLogo();
    if (path) {
      onLogoSelected(path);
    }
  };

  const removeLogo = () => {
    onLogoSelected('');
  };

  return React.createElement('div', { className: 'section' },
    React.createElement('h3', null, t.logoUpload.title),
    
    React.createElement('button', {
      className: 'btn btn-secondary',
      onClick: selectLogo
    },
      React.createElement('i', { className: 'fas fa-upload' }),
      ' ', t.logoUpload.selectLogo
    ),

    logoPath ? React.createElement('div', { className: 'logo-selected' },
      React.createElement('div', { className: 'logo-info' },
        React.createElement('i', { className: 'fas fa-check-circle' }),
        ` ${t.logoUpload.logoSelected}: ${logoPath.split(/[\\/]/).pop()}`
      ),
      React.createElement('button', {
        className: 'btn btn-danger btn-small',
        onClick: removeLogo
      },
        React.createElement('i', { className: 'fas fa-times' })
      )
    ) : React.createElement('div', { className: 'no-logo' },
      React.createElement('i', { className: 'fas fa-info-circle' }),
      ` ${t.logoUpload.noLogo}`
    )
  );
}
