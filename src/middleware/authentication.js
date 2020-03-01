const jwt = require("jsonwebtoken")

const account = () => (req, res, next) => {

    const token = req.headers["x-access-token"] || req.headers["authorization"]
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
            req.user = decoded
            req.authenticated = true
        } catch (ex) {}                
    }

    next()    
}

const auth = (req, res, next) => {

    const token = req.headers["x-access-token"] || req.headers["authorization"]
    if (!token) return res.status(401).send("Acesso negado. Nenhum token fornecido")
    
    if (!req.authenticated) {
        try {
            const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
            req.user = decoded
            next()
        } catch (ex) {
            res.status(400).send("Token Inválido")
        }
    } else {
        next()
    }
}

module.exports = {
    account,
    auth
}