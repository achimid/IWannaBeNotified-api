const SiteRequest = require('./sr-model')

const create = (data) => new SiteRequest(data).save()

const update = (id, data) => SiteRequest.findByIdAndUpdate(id, data)

const findByQuery = (params) => SiteRequest.find()

module.exports = {
    create,
    update,
    findByQuery
}