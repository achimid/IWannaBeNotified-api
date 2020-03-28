const cron = require('node-cron');

const schedule = (callback, time) => new Promise((resolve, reject) => {
    const job = cron.schedule(time || process.env.CRON_TIME_DEFAULT , () => {
        console.log('Iniciando execução do Job')
        try {
            callback()
        } catch (error) {
            console.error('Erro ao executar o Job', error)
            reject(error)
        }
        console.log('Finalizando execução do Job')
    })

    return resolve(job)
})

module.exports = schedule