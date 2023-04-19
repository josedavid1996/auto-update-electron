const { app, BrowserWindow } = require("electron")
const path = require('path')
const { autoUpdater } = require("electron-updater")
const log = require("electron-log")

log.transports.file.resolvePath = () => path.join("C:\Users\josed\Documents\Proyectos\pruebas\auto-update-electron", "logs/main.log")

log.log("Application version = " + app.getVersion())

let win;

function createWindow() {

  win = new BrowserWindow({
    width: 1000, height: 800, webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile(path.join(__dirname, "index.html"))

  // win.once('ready-to-show', () => {
  //   autoUpdater.checkForUpdatesAndNotify();
  // });

}

app.on("ready", () => {
  createWindow()
  autoUpdater.checkForUpdatesAndNotify()
})


autoUpdater.on('checking-for-update', () => {
  log.log("checking for update")
})
autoUpdater.on('update-available', (info) => {
  mainWindow.webContents.send('update_available')
  log.log('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  log.log('Update not available.');
  mainWindow.webContents.send('update_available');
})
autoUpdater.on('error', (err) => {
  log.log("Error in auto-updater");
})
autoUpdater.on('download-progress', (progressTrack) => {
  log.log("download-progress")
  log.log(progressTrack)

})
autoUpdater.on('update-downloaded', (info) => {
  log.log('update-downloaded');
});

