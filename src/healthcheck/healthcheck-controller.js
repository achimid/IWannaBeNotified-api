
const express = require("express")
const router = express.Router()

router.get('/', async (req, res) => {
    console.info('ping')
    res.json({status: 'ping'})
})

module.exports = router
