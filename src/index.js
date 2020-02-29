require('dotenv').config()

if (!process.env.PRIVATE_KEY) {
    console.error("FATAL ERROR: PRIVATE_KEY is not defined.")
    process.exit(1)
}

const express = require('express')
const compression = require('compression')
const errorhandler = require('errorhandler')
const monitor = require('express-status-monitor')


const app = express()
const server = require('http').createServer(app)
global.socket = require('socket.io')(server)


const statup = require('./config/startup')


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


// WebSocket registration
// ================
require('./notification/websocket/websocket')
// ================

const usersRoute = require("./user/user-controller")


app.use("/api/users", usersRoute);


statup()
server.listen(process.env.PORT)