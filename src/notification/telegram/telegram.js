const TelegramBot = require('node-telegram-bot-api')
const TelegramChatModel = require('./telegram-chat-model')

// const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true})

const telegramStartup = () => {    
    
    // bot.onText(/\/notify_all_start/, (msg) => {
    //     new TelegramChatModel(msg.chat).save()
    //         .then(() => console.log('Telegram-Chat cadastrado com sucesso'))
    //         .catch(() => console.info('Telegram-Chat já existe'))
    // })

    // bot.onText(/\/notify_all_stop/, (msg) => {
    //     TelegramChatModel.deleteOne({id: msg.chat.id})
    //         .then(() => console.log('Telegram-Chat removido com sucesso'))
    //         .catch(() => console.log('Erro ao remover Telegram-Chat'))
    // })

    // bot.onText(/\/(help|start)/, ({chat}) => {
    //     const comands = `
    //            /notify_all_start - Receber notificações sobre todos os lançamentos
    //         \n /notify_all_stop  - Parar de receber notificações sobre todos os lançamentos
    //     `.trim()
    //     bot.sendMessage(chat.id, comands)        
    // })
    
}

const notify = (chat, message) => {
    // bot.sendMessage(chat.id, message, {parse_mode: "HTML", disable_web_page_preview: true})
}


const notifyAll = (message) => TelegramChatModel.find().lean()
    .then(chats => chats.map(chat => notify(chat, message)))

module.exports = {
    telegramStartup,
    notify,
    notifyAll
}