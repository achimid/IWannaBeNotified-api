const puppeteer = require('puppeteer-extra')  
const stealthPlugin = require('puppeteer-extra-plugin-stealth')
const adblockerPlugin = require('puppeteer-extra-plugin-adblocker')

const databaseInit = require('./database')
const notifyJobInit = require('../cron/notify-job')
const { telegramStartup } = require('../notification/telegram/telegram')

puppeteer.use(stealthPlugin())
puppeteer.use(adblockerPlugin({ blockTrackers: true }))

const initBrowser = async () => {
    console.info('Inicializando browser......')
    global.browser = await puppeteer.launch(
        {
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-infobars',
                '--ignore-certifcate-errors',
                '--ignore-certifcate-errors-spki-list',
                '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
                // '--proxy-server=http://5.196.255.171:3128'
            ]
        });
    console.info('Browser inicializado')
}

module.exports = () => {
    initBrowser()
        .then(databaseInit)
        .then(notifyJobInit)
        .then(telegramStartup)
}
