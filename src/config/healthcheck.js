const schedule = require('../cron/cron')
const fetch = require('node-fetch');

const pingRequest = (req, res) => {
    console.info('ping')
    res.json({status: 'ok'})
}

const fetchHealthCheck = () => {
    fetch(process.env.API_URL + process.env.API_PREFIX)
        .then(res => res.json())
        .then(json => {
            if (json.status == 'ok') console.info('pong')
        })
        .catch(() => console.error('Fail pong'))
}


module.exports = (prefix) => (app) => {    
    app.get(`${prefix}`, pingRequest)
    schedule(fetchHealthCheck)
}
