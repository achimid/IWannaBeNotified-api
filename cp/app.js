
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const cors = require('cors')
const swagger = require('./swagger')
const connectToDb = require('./bd')
const middlewares = require('./middlewares')
const security = require('./common/security')
const config = require('./config')
const session = require('express-session')

const { HealthResource } = require('./health/health.resource')
const { AuthResource } = require('./auth/auth.resource')
const { UserResource } = require('./user/user.resource')
const { SellerResource } = require('./seller/seller.resource')
const { CepResource } = require('./cep/cep.resource')

const app = express()

connectToDb()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cookieParser())
app.disable('x-powered-by')

app.use(compression())
app.use(cors())

swagger.startup(app)

global.memoryStore = new session.MemoryStore()
app.use(session(config.session()))

const keycloak = security.keycloakInit(global.memoryStore)
app.use(keycloak.middleware())

app.get('/', (req, res) => {
    res.json({ status: 'Server is running!' })
})

const prefix = '/api'
app.use(prefix, HealthResource)
app.use(prefix, AuthResource)
app.use(prefix, UserResource)
app.use(prefix, SellerResource)
app.use(prefix, CepResource)

middlewares.errorHandler(app)

module.exports = app
