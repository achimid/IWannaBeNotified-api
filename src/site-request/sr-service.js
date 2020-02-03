const SiteRequest = require('./sr-model')

const create = (data) => new SiteRequest(data).save()

const update = (id, data) => SiteRequest.findByIdAndUpdate(id, data)

module.exports = {
    create,
    update
}