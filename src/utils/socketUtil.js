const socket = global.socket
const connectionsId = []

const CHANELS = {
    CLIENT_DOWNLOAD: 'CLIENT_DOWNLOAD'
}

const socketInit = () => {
    console.info('Iniciando sockets...')
    
    socket.on('connection', (client) => {
        console.log('Client conectado...', client.id)
        connectionsId.push(client.id)
        client.on('disconnect', () => console.log('Client desconectado...'))
    })
}


module.exports = {
    CHANELS,
    socket,
    connectionsId,
    socketInit
}