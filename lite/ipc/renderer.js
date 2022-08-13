const titleBtn = document.getElementById('title-btn')
const titleInput = document.getElementById('title')
titleBtn.addEventListener('click', () => {
    console.log('aaa')
    const title = titleInput.value
    console.log(title)
    // 被桥接器暴露的API会绑定到window上，此时可以通过window进行调用
    // 此时会向preload定义的channel发送消息，然后会被主进程监听捕获
    window.electronApi.setTitle(title)
})

const fileBtn = document.getElementById('select-file')
const fileInput = document.getElementById('file-path')
fileBtn.addEventListener('click', async () => {
    const filePath = await window.electronApi.openFile()
    fileInput.innerText = filePath
})

const counter = document.getElementById('counter-value')
// 添加回调函数
window.electronApi.updateCounter((event, args) => {
    counter.innerText = Number(counter.innerText) + Number(args)
})