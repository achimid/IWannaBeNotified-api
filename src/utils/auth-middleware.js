const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {

    const token = req.headers["x-access-token"] || req.headers["authorization"]
    if (!token) return res.status(401).send("Acesso negado. Nenhum token fornecido")

    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
        req.user = decoded
        next()
    } catch (ex) {
        res.status(400).send("Token Inválido")
    }
}