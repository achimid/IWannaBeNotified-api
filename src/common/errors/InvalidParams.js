class InvalidParams extends Error {
    constructor (...args) {
        super(...args)
        this.knownError = true
        this.name = 'InvalidParams'
        this.errorCode = 400
        this.message = args[0] || 'invalid params'
        Error.captureStackTrace(this, InvalidParams)
    }
}

module.exports = {
    InvalidParams
}
