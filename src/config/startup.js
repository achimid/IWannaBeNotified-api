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
                `--user-agent="${process.env.DEFAULT_USER_AGENT}"`,
                // '--proxy-server=https://116.196.85.150:3128'
            ]
        });
    console.info('Browser inicializado')
}

console.log(process.env.DEFAULT_USER_AGENT)

module.exports = () => {
    initBrowser()
        .then(databaseInit)
        .then(notifyJobInit)
        .then(telegramStartup)
}
