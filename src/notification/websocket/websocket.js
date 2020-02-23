const socket = global.socket

const onConnection = (client) => {
    console.log('Client conectado...')
    client.on('disconnect', () => console.log('Client desconectado...'))
}

socket.on('connection', onConnection)

const clientDownload = (url) => socket.emit('client_download', { url })

const notifyWebSocket = async (site) => {
    console.log('Notificando Client Download...')
    
    return clientDownload(site.extractedTarget)
}

module.exports = {
    socket,
    notifyWebSocket
}