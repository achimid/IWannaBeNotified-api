class GatewayError extends Error {
    constructor (...args) {
        super(...args)
        this.knownError = true
        this.name = 'GatewayError'
        this.errorCode = 502
        this.message = args[0] || 'Bad Gateway'
        Error.captureStackTrace(this, GatewayError)
    }
}

module.exports = {
    GatewayError
}
