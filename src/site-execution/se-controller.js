const { execute } = require('./se-service')
const SiteRequestModel = require('../site-request/sr-model')

const executeRequest = (data, res) => {
    return execute(new SiteRequestModel(data))
        .then(response => res.json(response))
        .catch(error => res.send(error))
}

const executeRequestGET = (req, res) => executeRequest(req.query, res)

const executeRequestPOST = (req, res) => executeRequest(req.body, res)

module.exports = (prefix) => (app) => {
    app.get(`${prefix}/v1/execute`, executeRequestGET)
    app.post(`${prefix}/v1/execute`, executeRequestPOST)
}
