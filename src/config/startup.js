const puppeteer = require('puppeteer-extra')  
const stealthPlugin = require('puppeteer-extra-plugin-stealth')
const adblockerPlugin = require('puppeteer-extra-plugin-adblocker')

const databaseInit = require('./database')
const notifyJobInit = require('../cron/notify-job')
const { telegramStartup } = require('../notification/telegram/telegram')

puppeteer.use(stealthPlugin())
puppeteer.use(adblockerPlugin())

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
                // '--proxy-server=http://5.196.255.171:3128'
            ]
        });
    console.info('Browser inicializado')
}

module.exports = () => {
    initBrowser()
    databaseInit()
    notifyJobInit()
    telegramStartup()
}
