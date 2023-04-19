const { app, BrowserWindow } = require("electron")
const path = require('path')
const { autoUpdater } = require("electron-updater")
const log = require("electron-log")

log.transports.file.resolvePath = () => path.join("C:\Users\josed\Documents\Proyectos\pruebas\auto-update-electron", "logs/main.log")

log.log("Application version = " + app.getVersion())

let win;

function createWindow() {

  win = new BrowserWindow({ width: 300, height: 400 })

  win.loadFile(path.join(__dirname, "index.html"))

}




autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
});

app.on("ready", () => {
  createWindow()
  autoUpdater.checkForUpdatesAndNotify()
})