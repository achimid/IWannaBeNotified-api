const mongoose = require("mongoose")

const schema = mongoose.Schema({
    id: { 
        type: Number, 
        required: true,
        unique: true
    },
    first_name: { 
        type: String, 
        required: true
    },
    last_name: { 
        type: String
    },
    username: { 
        type: String
    },
    is_bot: { 
        type: Boolean
    }
}, { versionKey: false, timestamps: true })

const TelegramChat = mongoose.model("telegram-chat", schema)
module.exports = TelegramChat