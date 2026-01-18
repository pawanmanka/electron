const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./config/db');

const fs = require('fs');
const backupPath = path.join(
  app.getPath('documents'),
  `clinic-backup-${Date.now()}.db`
);

db.backup(backupPath);


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../assets/images/logo.ico'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // ✅ REQUIRED
      contextIsolation: true,  // ✅ REQUIRED
      nodeIntegration: false,   // ✅ REQUIRED
       // 🔑 THESE TWO ARE REQUIRED
      webSecurity: false,
      allowRunningInsecureContent: true
    }
  });
  const filePath = app.isPackaged
  ?   path.join('./dist/index.html')
  : 'http://localhost:5173'
  console.log('LOADING:', filePath,app.isPackaged)
  if (app.isPackaged) {
    win.loadFile(filePath)
  } else {
    win.loadURL(filePath);
    win.webContents.openDevTools();
  }
}
ipcMain.handle('add-patient', (event, data) => {
  const stmt = db.prepare(
    'INSERT INTO patients (name, age, phone) VALUES (?, ?, ?)'
  );
  stmt.run(data.name, data.age, data.phone);
});

ipcMain.handle('get-patients', () => {
  return db.prepare('SELECT * FROM patients').all();
});

app.whenReady().then(createWindow);

const integrity = db.prepare('PRAGMA integrity_check').get();
if (integrity.integrity_check !== 'ok') {
  console.error('Database corrupted!');
}
app.on('before-quit', () => {
  db.close();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
