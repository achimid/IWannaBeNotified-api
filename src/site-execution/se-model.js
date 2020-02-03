const mongoose = require("mongoose")

const schema = mongoose.Schema({
    url: { 
        type: mongoose.SchemaTypes.String, 
        required: true
    },
    scriptTarget: { 
        type: mongoose.SchemaTypes.String, 
        required: true 
    },
    scriptContent: [{ 
        type: mongoose.SchemaTypes.String
    }],
    isSuccess: {
        type: mongoose.SchemaTypes.Boolean
    },
    isNotified: {
        type: mongoose.SchemaTypes.Boolean
    },
    hashTarget: {
        type: mongoose.SchemaTypes.String
    },
    extractedTarget: {
        type: mongoose.SchemaTypes.String
    },
    extractedContent: [{ 
        type: Object         
    }],
    executionTime: { 
        type: mongoose.SchemaTypes.Number
    },
    message: { 
        type: mongoose.SchemaTypes.String
    },
    errorMessage: {
        type: mongoose.SchemaTypes.String
    }
}, { versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const SiteExecution = mongoose.model("site-execution", schema)
module.exports = SiteExecution