class InvalidCaptchaValidation extends Error {
    constructor (...args) {
        super(...args)
        this.knownError = true
        this.name = 'InvalidCaptchaValidation'
        this.errorCode = args[1] || 404
        this.message = args[0] || 'invalid params'
        Error.captureStackTrace(this, InvalidCaptchaValidation)
    }
}

module.exports = {
    InvalidCaptchaValidation: InvalidCaptchaValidation
}
