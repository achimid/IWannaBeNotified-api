const healthcheck = require('../healthcheck/healthcheck-controller')
const siteRequest = require('../site-request/sr-controller')
const siteExecution = require('../site-execution/se-controller')

const prefix = process.env.API_PREFIX + process.env.API_VERSION

module.exports = (app) => {
    console.info('Registrando rotas...')

    app.use(`${prefix}`, healthcheck)
    app.use(`${prefix}/notify`, siteRequest)
    app.use(`${prefix}/execute`, siteExecution)

}