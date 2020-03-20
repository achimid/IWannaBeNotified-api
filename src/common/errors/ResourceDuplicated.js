class ResourceDuplicated extends Error {
    constructor (...args) {
        super(...args)
        this.knownError = true
        this.name = 'ResourceDuplicated'
        this.errorCode = args[1] || 400
        this.message = args[0] || 'resource duplicated'
        Error.captureStackTrace(this, ResourceDuplicated)
    }
}

module.exports = {
    ResourceDuplicated
}
