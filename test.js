require('dotenv').config();
const puppeteer = require('puppeteer');
const {uploadImage} = require('./src/utils/imagem-util');

const path = '/home/lourran-zorzi/Documentos/workspace/personal/IWannaBeNotified-api/img.png';

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.animestc.net')

    console.time('time')
    await page.screenshot({path: path, fullPage: true});
    console.timeEnd('time')

    const {link} = await uploadImage(path)

    console.log(link)

    await browser.close()
})()

