const {app, BrowserWindow, ipcMain, dialog, Menu} = require('electron')
const path = require('path')

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    const menu = Menu.buildFromTemplate([
        {
            label: '计数器',
            submenu: [
                {
                    click: () => mainWindow.webContents.send('update-counter', 1),
                    label: '加一',
                },
                {
                    click: () => mainWindow.webContents.send('update-counter', -1),
                    label: '减一',
                }
            ]
        }
    ])
    Menu.setApplicationMenu(menu)

    // 主进程监听某一channel
    ipcMain.on('set-title', (event, args) => {
        // 获取被渲染网页
        const webContents = event.sender
        // 获取被渲染网页所在的窗口
        const window = BrowserWindow.fromWebContents(webContents)
        window.setTitle(args)
    })

    mainWindow.loadFile('./index.html')
}

async function handleFileOpen() {
    // 打开文件的操作通过Node.jsAPI完成
    const {canceled, filePaths} = await dialog.showOpenDialog()
    if (canceled) {
        return ""
    } else {
        return filePaths[0]
    }
}

app.whenReady().then(() => {
    // 双向通信选择异步，且异步处理器添加需要先于窗口创建
    ipcMain.handle('openFile', handleFileOpen)
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})