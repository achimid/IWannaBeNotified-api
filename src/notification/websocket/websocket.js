const { socket } = require('../../utils/socket-util')

const onConnection = (client) => {
    console.log('Client conectado...')
    client.on('disconnect', () => console.log('Client desconectado...'))
}

socket.on('connection', onConnection)

const clientDownload = (url, account) => socket.emit(account || 'client_download', { url })

const isURL = (str) => {
    const urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    const url = new RegExp(urlRegex, 'i');
    return (str.length < 2083 && url.test(str)) || str.indexOf('magnet:?') == 0;
}

const notifyWebSocket = async (site) => {
    console.log('Notificando Client Download...')
    
    let account
    if (site.userId && site.userId.email) 
        account = site.userId.email

    let url
    if (isURL(site.lastExecution.extractedTarget)) {
        url = site.lastExecution.extractedTarget
    } else {
        site.scriptContent.forEach(ct => { if (isURL(ct)) url = ct })
    }

    if (!url) url = site.lastExecution.extractedTarget

    return clientDownload(url, account)
}

module.exports = {
    socket,
    notifyWebSocket
}