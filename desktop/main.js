const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({ width: 1200, height: 800, webPreferences: { nodeIntegration: false } });
  const dev = process.env.VITE_DEV === 'true';
  if (dev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../web/dist/index.html'));
  }

  // Open SEP-7 links externally
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('web+stellar:')) { shell.openExternal(url); return { action: 'deny' }; }
    return { action: 'allow' };
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
