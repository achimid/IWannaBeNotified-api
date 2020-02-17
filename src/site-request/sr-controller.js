const HttpStatus = require('http-status-codes');
const { 
    create,
    update,
    findByQuery
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

const getRequest = (req, res) => {    
  return findByQuery(req.query)
      .then(response => res.status(HttpStatus.OK).send(response))
      .catch(error => res.send(error))
}

module.exports = (prefix) => (app) => {    
    app.post(`${prefix}/v1/notify`, createRequest)
    app.put(`${prefix}/v1/notify/:id`, updateRequest)
    app.get(`${prefix}/v1/notify`, getRequest)
}
