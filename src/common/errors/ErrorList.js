class ErrorList extends Error {
    constructor (...args) {
        super(...args)
        this.knownError = true
        this.name = 'ErrorList'
        this.errorCode = 400
        this.message = args[0] || 'Errors'
        this.errors = args[1] || []
    }
}

module.exports = {
    ErrorList: ErrorList
}
