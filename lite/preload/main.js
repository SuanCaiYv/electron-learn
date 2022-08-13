const {app, BrowserWindow} = require('electron')
const path = require('path')

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // 添加preload脚本的路径
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // 加载主页
    window.loadFile('./index.html')
}

app.whenReady().then(() => {
    createWindow()
})