
// PWA：实现用户离线（断网）也可访问(在本地开发时，测试不了，因为本地开发离线也可运行代码，只能将代码上线了才能做)
const pwa = false

if (pwa) {
    // 离线访问操作（等准备将代码上线了再做）
    // window.addEventListener('sw.offline', () => { })
} else if ('serviceWorker' in navigator) {// navigator对象包含所有有关浏览器的信息
    // 注销 service worker
    //navigator.serviceWorker：https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/serviceWorker
    const { serviceWorker } = navigator
    if (serviceWorker.getRegistrations) {
        serviceWorker.getRegistrations().then(sws => {
            sws.forEach(sw => {
                sw.unregister()
            })
        })
    }
    serviceWorker.getRegistration().then(sw => {
        if (sw) sw.unregister()
    })

    // 清空所有的 caches
    if (window.caches && window.caches.keys) {
        caches.keys().then(keys => {
            keys.forEach(key => {
                caches.delete(key)
            })
        })
    }
}