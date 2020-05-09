const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.animestelecine.top/link/MTY1ODcvaGlnaC8x')

    console.time('time')
    const ret = await page.evaluate(`
        new Promise((res) => {
            setTimeout(() => { 
                const link = document.querySelector('.final').href
                res(link) 
            }, 10000)
        })
    `)
    console.timeEnd('time')

    console.log(ret)
    await browser.close()
})()

