const { ipcRenderer, contextBridge } = require('electron');


const api = {
  updateAvailable: () => ipcRenderer.on('update_available', () => {
    ipcRenderer.removeAllListeners('update_available');
    console.log("hay actializacion")
  })
}


contextBridge.exposeInMainWorld('api', api)
