const { socket } = require('../../utils/socket-util')

const onConnection = (client) => {
    console.log('Client conectado...')
    client.on('disconnect', () => console.log('Client desconectado...'))
}

socket.on('connection', onConnection)

const clientDownload = (url, account) => socket.emit(account || 'client_download', { url })

const notifyWebSocket = async (site) => {
    console.log('Notificando Client Download...')
    
    let account
    if (site.userId && site.userId.email) 
        account = site.userId.email

    return clientDownload(site.extractedTarget, account)
}

module.exports = {
    socket,
    notifyWebSocket
}