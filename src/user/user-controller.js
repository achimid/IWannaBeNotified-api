const auth = require("../utils/auth-middleware")
const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router()

const { UserModel, validateUserModel } = require("./user-model")

router.get("/current", auth, async (req, res) => {
    const user = await UserModel.findById(req.user._id).select("-password")
    res.send(user)
})

router.post("/", async (req, res) => {
    
    const { error } = validateUserModel(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await UserModel.findOne({ email: req.body.email })
    if (user) return res.status(400).send("User ja esta cadastrado")

    user = new UserModel({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    })
    user.password = await bcrypt.hash(user.password, 10)
    await user.save()

    const token = user.generateAuthToken()
    res.header("x-auth-token", token).send({
        _id: user._id,
        name: user.name,
        email: user.email
    })
})

module.exports = router