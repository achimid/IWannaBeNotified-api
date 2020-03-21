const HttpStatus = require('http-status-codes');
const express = require("express")
const router = express.Router()

const { auth } = require("../middleware/auth-middleware")
const secutiry = require("../utils/secutiry-util")
const service = require('./user-service')
const inUser = require('../middleware/user-middleware')


const { UserModel, validateUserModel, validateLoginSchema } = require("./user-model")

const sendError = error => {
    console.log('Ocorreu um erro inesperado', error)
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
}


router.get("/current", auth, async (req, res) => {
    service.findById(req.user._id)
        .then((user) => res.json(user))
        .catch(sendError)
})


router.post('/login', async (req, res) => {
        
    const { error } = validateLoginSchema(req.body)
    if (error) return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message)

    const user = await UserModel.findOne({ email: req.body.email})
    if (!user) return res.status(HttpStatus.FORBIDDEN).send({error: "Credencial inválida"})

    const isValidPassword = await secutiry.compare(req.body.password, user.password)
    if (!isValidPassword) return res.status(HttpStatus.FORBIDDEN).send({error: "Credencial inválida"})

    const token = user.generateAuthToken()
    res.json({token})
})


router.post("/", async (req, res) => {

    const { error } = validateUserModel(req.body)
    if (error) return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message)

    let user = await UserModel.findOne({ email: req.body.email })
    if (user) return res.status(HttpStatus.CONFLICT).send({error: "User ja cadastrado"})

    user = new UserModel(req.body)
    user.password = await secutiry.hash(user.password)
    await user.save()

    const token = user.generateAuthToken()
    res.json({token})
})


router.post('/:id/notifications', inUser, async (req, res) => {        
    service.addNotification(req.params.id, req.body)
      .then(() => res.status(HttpStatus.OK).send())
      .catch(sendError(res))
})


module.exports = router