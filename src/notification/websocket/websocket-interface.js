const socket = global.socket

const onConnection = (client) => {
    console.log('Client conectado...')    
    

    
    socket.emit('client_download', {
        url : 'magnet:?xt=urn:btih:S2TOSWKHO3LBC5LZHU57DKXGN7SRZ4HY&tr=http://nyaa.tracker.wf:7777/announce&tr=udp://tracker.coppersurfer.tk:6969/announce&tr=udp://tracker.internetwarriors.net:1337/announce&tr=udp://tracker.leechersparadise.org:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://open.stealth.si:80/announce&tr=udp://p4p.arenabg.com:1337/announce&tr=udp://mgtracker.org:6969/announce&tr=udp://tracker.tiny-vps.com:6969/announce&tr=udp://peerfect.org:6969/announce&tr=http://share.camoe.cn:8080/announce&tr=http://t.nyaatracker.com:80/announce&tr=https://open.kickasstracker.com:443/announce'
    })
    
    
    client.on('disconnect', () => console.log('Client desconectado...'))
}

socket.on('connection', onConnection)

const emitEvent = (event) => {

}

module.exports = {
    
}