const { UserModel } = require('./user-model')

const addNotification = (_id, item) => UserModel.update({ _id }, { $push: { notifications: item } })

const associateTelegramUser = async (email, tUser) => UserModel.findOne({ email })
    .then(user => {
        if (!user) return false
        
        user.telegramChatId = tUser.id
        return user.save().then(() => true)
    })
module.exports = {
    addNotification,
    associateTelegramUser
}