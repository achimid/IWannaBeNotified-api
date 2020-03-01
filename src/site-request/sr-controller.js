const HttpStatus = require('http-status-codes');
const express = require("express")
const router = express.Router()

const service = require('./sr-service')

const sendError = error => {
    console.log('Ocorreu um erro inesperado', error)
    return res.send(error)
}

router.get('/', async (req, res) => {    
    service.findByQuery(req.query)
      .then(response => res.status(HttpStatus.OK).send(response))
      .catch(sendError)
})


router.post('/', async (req, res) => {
    service.create(req.body)
        .then(response => res.status(HttpStatus.CREATED).json(response))
        .catch(sendError)
})


router.put('/:id', async (req, res) => {    
    service.update(req.params.id, req.body)
        .then(() => res.status(HttpStatus.OK).send())
        .catch(sendError)
})

module.exports = router