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
    language_code: { 
        type: mongoose.SchemaTypes.String
    },
}, { versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const TelegramUser = mongoose.model("telegram-user", schema)
module.exports = TelegramUser;