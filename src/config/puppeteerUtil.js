const puppeteer = require('puppeteer-extra')  
const stealthPlugin = require('puppeteer-extra-plugin-stealth')
const adblockerPlugin = require('puppeteer-extra-plugin-adblocker')

puppeteer.use(stealthPlugin())
puppeteer.use(adblockerPlugin({ blockTrackers: true }))

const dfUserAg = process.env.DEFAULT_USER_AGENT

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
                dfUserAg != '' ? `--user-agent="${dfUserAg}"`: '',
                // '--proxy-server=https://116.196.85.150:3128'
            ]
        });
    console.info('Browser inicializado')
}

module.exports = initBrowser