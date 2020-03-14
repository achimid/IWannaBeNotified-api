const SiteRequest = require('./sr-model')
const SiteExecutionService = require('../site-execution/se-service')

const validateExistsRequest = (req) => {
    if (!req) {
        throw "Requisição não existente"
    }
    return req
}

const create = (data) => new SiteRequest(data).save()

const update = (id, data) => SiteRequest.findByIdAndUpdate(id, data)

const findByQuery = (params) => SiteRequest.find(params).exec()

const executeById = (id) => SiteRequest.findById(id)
    .then(validateExistsRequest)    
    .then(SiteExecutionService.execute)

    
module.exports = {
    create,
    update,
    findByQuery,
    executeById
}