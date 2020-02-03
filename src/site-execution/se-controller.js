const { execute } = require('./se-service')


const executeRequest = (req, res) => {
    return execute(req.body)
        .then(response => res.json(response))
        .catch(error => res.send(error))
}

module.exports = (prefix) => (app) => {
    app.post(`${prefix}/v1/execute`, executeRequest)
}
