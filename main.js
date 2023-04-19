const { app, BrowserWindow } = require("electron")
const path = require('path')
const { autoUpdater } = require("electron-updater")
const log = require("electron-log")

log.transports.file.resolvePath = () => path.join("C:\Users\josed\Documents\Proyectos\pruebas\auto-update-electron", "logs/main.log")

let win;

function createWindow() {

  win = new BrowserWindow({ width: 300, height: 400 })

  win.loadFile(path.join(__dirname, "index.html"))

}


app.on("ready", () => {
  createWindow()
  autoUpdater.checkForUpdatesAndNotify()
})

autoUpdater.on("update-available", () => {
  log.info("update-available")

})
autoUpdater.on("checking-for-update", () => {
  log.info("checking-for-update")

})
autoUpdater.on("download-progress", () => {
  log.info("download-progress")

})
autoUpdater.on("update-downloaded", () => {
  log.info("update-downloaded")

})