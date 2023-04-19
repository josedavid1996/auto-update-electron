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


app.on("ready", () => {
  createWindow()
  autoUpdater.checkForUpdatesAndNotify()
})

autoUpdater.on("checking-for-update", () => {
  log.info("checking-for-update")

})
autoUpdater.on("update-available", () => {
  log.info("update-available")

})
autoUpdater.on("update-not-available", () => {
  log.info("update-not-available")

})
autoUpdater.on("error", () => {
  log.info("Error in auto-updater")

})
autoUpdater.on("download-progress", (progressTrack) => {
  log.info("\n\ndownload-progress")
  log.info(progressTrack)

})
autoUpdater.on("update-downloaded", () => {
  log.info("update-downloaded")

})