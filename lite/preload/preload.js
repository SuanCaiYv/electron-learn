const {contextBridge} = require('electron')

// 通过桥接器对渲染器进程暴露API，因为预加载会先于渲染器运行，所以会安全一些。
// 在渲染器js里，可以调用预加载js暴露的方法。
contextBridge.exposeInMainWorld('versions', {
    node_version: () => process.versions.node,
    chrome_version: () => process.versions.chrome,
    electron_version: () => process.versions.electron,
})