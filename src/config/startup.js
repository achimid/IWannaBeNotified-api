const databaseInit = require('./database')
const notifyJobInit = require('../cron/notify-job')
const { telegramStartup } = require('../notification/telegram/telegram')
const { socketInit } = require('./socketUtil')
const initBrowser = require('./puppeteerUtil')
const healthCheckJob = require('../healthcheck/healthcheck-job')

const init = () => initBrowser()
    .then(databaseInit)
    .then(notifyJobInit)
    .then(telegramStartup)
    .then(socketInit)
    .then(healthCheckJob)

module.exports = init
