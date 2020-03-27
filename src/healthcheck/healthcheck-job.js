const schedule = require('../utils/cron')
const fetch = require('node-fetch');

const logPong = (json) => (json.status == 'ping') ? console.info('pong') : json

const logErro = (err) => console.error('Healthcheck Fail', err)

const pingUrl = process.env.API_URL + process.env.API_PREFIX + process.env.API_VERSION

const fetchHealthCheck = () => fetch(pingUrl)
    .then(res => res.json())
    .then(logPong)
    .catch(logErro)

const init = () => {
    console.info('Iniciando job de healthcheck...')
    if (process.env.KEEP_UP != 'false') {
        schedule(fetchHealthCheck)
    }
}

module.exports = init

