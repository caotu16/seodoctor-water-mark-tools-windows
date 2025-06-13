module.exports = {
  appId: 'com.seodoctor.imagewatermark',
  productName: 'SEO Doctor Image Water Mark Tool',
  directories: {
    output: 'dist'
  },
  files: [
    'main.js',
    'preload.js',
    'src/**/*',
    'node_modules/**/*',
    'package.json',
    '!node_modules/**/test/**',
    '!node_modules/**/*.md',
    '!**/node_modules/**/{test,__tests__,tests,powered-test,example,examples}/**',
    '!**/node_modules/**/*.d.ts'
  ],
  extraResources: [
    {
      from: 'assets',
      to: 'assets',
      filter: ['**/*']
    }
  ],
  beforeBuild: async (context) => {
    // Rebuild native modules for target platform
    const { execSync } = require('child_process');
    console.log('Rebuilding native modules...');
    try {
      execSync('npm rebuild --runtime=electron --target=30.0.0 --disturl=https://electronjs.org/headers --build-from-source', { stdio: 'inherit' });
    } catch (error) {
      console.warn('Failed to rebuild native modules:', error.message);
    }
  },
  nodeGypRebuild: false,
  buildDependenciesFromSource: true,
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64']
      }
    ],
    icon: 'assets/icon.ico'
  },
  mac: {
    target: 'dmg',
    icon: 'assets/icon.icns'
  },
  linux: {
    target: 'AppImage',
    icon: 'assets/icon.png'
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    installerIcon: 'assets/icon.ico',
    uninstallerIcon: 'assets/icon.ico',
    installerHeaderIcon: 'assets/icon.ico'
  }
};