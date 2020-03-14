const express = require("express")
const router = express.Router()

const inUser = require('../middleware/user-middleware')
const service = require('./se-service')
const SiteRequestModel = require('../site-request/sr-model')

const executeRequest = (data, res) => {
    service.execute(new SiteRequestModel(data))
        .then(response => res.json(response))
        .catch(error => res.send(error))
}

router.get('/', inUser, async (req, res) => executeRequest(req.query, res))

router.post('/', inUser, async (req, res) => executeRequest(req.body, res))


module.exports = router
