const HttpStatus = require('http-status-codes');
const { 
    create,
    update
 } = require('./sr-service')


const createRequest = (req, res) => {
    return create(req.body)
        .then(response => res.json(response))
        .catch(error => res.send(error))
}

const updateRequest = (req, res) => {    
    return update(req.params.id, req.body)
        .then(() => res.status(HttpStatus.CREATED).send())
        .catch(error => res.send(error))
}

module.exports = (prefix) => (app) => {    
    app.post(`${prefix}/v1/notify`, createRequest)
    app.put(`${prefix}/v1/notify/:id`, updateRequest)
}
