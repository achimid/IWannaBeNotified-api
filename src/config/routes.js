const healthcheck = require('../healthcheck/healthcheck-controller')

const prefix = process.env.API_VERSION + process.env.API_PREFIX

module.exports = (app) => {
    
    app.use(`${prefix}`, healthcheck)


}