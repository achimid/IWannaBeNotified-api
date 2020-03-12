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
    language_code: { 
        type: String
    },
}, { versionKey: false, timestamps: true })

const TelegramUser = mongoose.model("telegram-user", schema)
module.exports = TelegramUser;