const mongoose = require("mongoose")

const schema = mongoose.Schema({
    id: { 
        type: mongoose.SchemaTypes.Number, 
        required: true,
        unique: true
    },
    first_name: { 
        type: mongoose.SchemaTypes.String, 
        required: true
    },
    last_name: { 
        type: mongoose.SchemaTypes.String
    },
    username: { 
        type: mongoose.SchemaTypes.String
    },
    is_bot: { 
        type: mongoose.SchemaTypes.Boolean
    }
}, { versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const TelegramChat = mongoose.model("telegram-chat", schema)
module.exports = TelegramChat