require('dotenv').config()

const express = require('express')
const compression = require('compression')
const errorhandler = require('errorhandler')
const monitor = require('express-status-monitor')

const app = express()

const server = require('http').createServer(app)
global.socket = require('socket.io')(server)

const routes = require('./config/routes')
const statup = require('./config/startup')
const { account } = require('./middleware/auth-middleware')

app.use(monitor())
app.use(compression())
app.use(express.json())
app.use(errorhandler())
app.use(account())

routes(app)
statup()

server.listen(process.env.PORT)