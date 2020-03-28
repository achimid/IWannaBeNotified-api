const databaseInit = require('./database')
const { initJobsExecutions } = require('../notification/notify-job')
const { telegramStartup } = require('../notification/telegram/telegram')
const { socketInit } = require('../utils/socket-util')
const initBrowser = require('../utils/puppeteer-util')
const healthCheckJob = require('../healthcheck/healthcheck-job')


const init = () => initBrowser()
    .then(databaseInit)
    .then(initJobsExecutions)
    .then(telegramStartup)
    .then(socketInit)
    .then(healthCheckJob)

module.exports = init
