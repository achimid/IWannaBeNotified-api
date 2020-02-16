require('dotenv').config()

const express = require('express')
const compression = require('compression')
const errorhandler = require('errorhandler')
const monitor = require('express-status-monitor')
const statup = require('./config/startup')

const app = express()
const server = require('http').createServer(app)
const socket = require('socket.io')(server)

// socket.on('connection', (client) => { 
//     console.log('Evento Connection')

//     setTimeout(function (){
//         console.log('evento emitido')
//         socket.emit('client_download', {
//             url : 'magnet:?xt=urn:btih:S2TOSWKHO3LBC5LZHU57DKXGN7SRZ4HY&tr=http://nyaa.tracker.wf:7777/announce&tr=udp://tracker.coppersurfer.tk:6969/announce&tr=udp://tracker.internetwarriors.net:1337/announce&tr=udp://tracker.leechersparadise.org:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://open.stealth.si:80/announce&tr=udp://p4p.arenabg.com:1337/announce&tr=udp://mgtracker.org:6969/announce&tr=udp://tracker.tiny-vps.com:6969/announce&tr=udp://peerfect.org:6969/announce&tr=http://share.camoe.cn:8080/announce&tr=http://t.nyaatracker.com:80/announce&tr=https://open.kickasstracker.com:443/announce'
//         })
//     }, 1000)
    
//     client.on('disconnect', () => console.log('disconecteddddd'))
// })



app.use(monitor())
app.use(compression())
app.use(express.json())
app.use(errorhandler())


// Endpoin registration
// ================
const prefix = process.env.API_PREFIX
require('./site-request/sr-controller')(prefix)(app)
require('./site-execution/se-controller')(prefix)(app)
require('./config/healthcheck')(prefix)(app)
// ================

statup()
server.listen(process.env.PORT)