const status = require('http-status')
const logger = require('../config/logger')
const { ResourceNotFound } = require('../errors')

const notFoundErrorHandler = (request, response, next) => {
    next(new ResourceNotFound())
}

const errorHandler = (error, request, response, next) => {

    if (response.headersSent) {
        // logger.error(request.context, 'Headers sent')
        return next(error)
    }

    return formatError(response, error)

}

const formatError = (response, error) => {

    if (error.knownError) {
        return handleKnownError(response, error)
    }

    return response.status(error.errorCode || status.INTERNAL_SERVER_ERROR).json({ message: 'Unexepected error' })
}

const logErrors = (error, request, response, next) => {
    if (error.knownError) logger.debug(request.context, 'Stack:', error.stack)

    if (error.stack) logger.error(request.context, 'Stack:', error.stack)

    next(error)
}

const handleKnownError = (response, error) => {
    return response.status(error.errorCode || status.BAD_REQUEST).json({ message: error.message })
}

const registerErrorHandler = (app) => {

    app.get('*', notFoundErrorHandler)
    app.post('*', notFoundErrorHandler)
    app.put('*', notFoundErrorHandler)
    app.delete('*', notFoundErrorHandler)

    app.use(logErrors)
    app.use(errorHandler)

}

module.exports = registerErrorHandler
