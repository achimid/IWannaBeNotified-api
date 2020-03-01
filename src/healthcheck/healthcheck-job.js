const schedule = require('../cron/cron')
const fetch = require('node-fetch');

const logPong = (json) => (json.status == 'ping') ? console.info('pong') : json

const logErro = (err) => console.error('Healthcheck Fail', err)

const pingUrl = process.env.API_URL + process.env.API_VERSION + process.env.API_PREFIX

const fetchHealthCheck = fetch(pingUrl)
    .then(res => res.json())
    .then(logPong)
    .catch(logErro)

module.exports = () => schedule(fetchHealthCheck)

