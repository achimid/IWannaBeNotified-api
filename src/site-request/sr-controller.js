const HttpStatus = require('http-status-codes');
const express = require("express")
const router = express.Router()

const inUser = require('../middleware/user-middleware')
const service = require('./sr-service')
const sendError = require('../utils/error-utils')

router.get('/', inUser, async (req, res) => {    
    service.findByQuery(req.query)
      .then(response => res.status(HttpStatus.OK).send(response))
      .catch(sendError(res))
})


router.post('/', inUser, async (req, res) => {
    service.create(req.body)
        .then(response => res.status(HttpStatus.CREATED).json(response))
        .catch(sendError(res))
})


router.put('/:id', async (req, res) => {    
    service.update(req.params.id, req.body)
        .then(() => res.status(HttpStatus.OK).send())
        .catch(sendError(res))
})


router.post('/execute/:id', async (req, res) => {        
    service.executeById(req.params.id)
      .then(response => res.status(HttpStatus.OK).send(response))
      .catch(sendError(res))
})


module.exports = router