const SiteRequest = require('./sr-model')

const create = (data) => new SiteRequest(data).save()

const update = (id, data) => SiteRequest.findByIdAndUpdate(id, data)

const findByQuery = (params) => {
  return SiteRequest.find().byQuery(params)
}

module.exports = {
    create,
    update,
    findByQuery
}