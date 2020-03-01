const cron = require('node-cron');

const schedule = (callback, time) => new Promise((resolve, reject) => {
    cron.schedule(time || process.env.CRON_TIME_DEFAULT , () => {
        console.log('Iniciando execução do Job')
        try {
            resolve(callback())
        } catch (error) {
            console.error('Erro ao executar o Job', error)
            reject(error)
        }
        console.log('Finalizando execução do Job')
    })    
})

module.exports = schedule