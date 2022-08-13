const info = document.getElementById('info')
// 在渲染器进程访问预加载暴露出的API
info.innerText = `Node.JS: (v${versions.node_version()}), Chrome: (${versions.chrome_version()}), Electron: (v${versions.electron_version()})`