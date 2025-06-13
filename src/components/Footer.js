function Footer({ t }) {
  const handleWebsiteClick = (url) => {
    window.electronAPI.openExternal(url);
  };

  return React.createElement('div', { className: 'footer' },
    React.createElement('div', { className: 'footer-content' },
      React.createElement('span', { className: 'author-text' }, t.footer.author),
      React.createElement('span', { className: 'separator' }, ' - '),
      React.createElement('a', {
        href: '#',
        onClick: () => handleWebsiteClick('https://seodoctor.vn'),
        className: 'footer-link'
      }, 'www.seodoctor.vn'),
      React.createElement('span', { className: 'separator' }, ' - '),
      React.createElement('a', {
        href: '#',
        onClick: () => handleWebsiteClick('https://nguyencaotu.com'),
        className: 'footer-link'
      }, 'www.nguyencaotu.com')
    )
  );
}

window.Footer = Footer;