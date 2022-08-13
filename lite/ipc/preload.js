const {contextBridge, pcRenderer, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronApi', {
    // 通过ipcRenderer向某一个channel发送消息
    setTitle: (title) => ipcRenderer.send('set-title', title),
    // 通过ipcRenderer向channel发送异步消息
    openFile: () => ipcRenderer.invoke('openFile'),
    // 在就绪时调用callback，并且callback会被传入两个参数：event, args
    updateCounter: (callback) => ipcRenderer.on('update-counter', callback)
})