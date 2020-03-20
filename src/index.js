require('dotenv').config()

const express = require('express')
const compression = require('compression')
const monitor = require('express-status-monitor')
const cors = require('cors')
const errorHandler = require('./middleware/error-handler-middleware')
const swagger = require('./config/swagger')

const app = express()

const server = require('http').createServer(app)
global.socket = require('socket.io')(server)

const routes = require('./config/routes')
const statup = require('./config/startup')
const { account } = require('./middleware/auth-middleware')

app.use(monitor())
app.use(compression())
app.use(express.json())
app.use(account())
app.use(cors())
app.disable('x-powered-by')

swagger.startup(app)

routes(app)
statup()
errorHandler(app)

server.listen(process.env.PORT)