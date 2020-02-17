const databaseInit = require('./database')
const notifyJobInit = require('../cron/notify-job')
const { telegramStartup } = require('../notification/telegram/telegram')
const { socketInit } = require('./socketUtil')
const initBrowser = require('./puppeteerUtil')


module.exports = () => {
    initBrowser()
        .then(databaseInit)
        .then(notifyJobInit)
        .then(telegramStartup)
        .then(socketInit)
}
