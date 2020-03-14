const { UserModel } = require('./user-model')

const addNotification = (_id, item) => UserModel.update({ _id }, { $push: { notifications: item } })

module.exports = {
    addNotification
}