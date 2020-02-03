const mongoose = require("mongoose")

const schema = mongoose.Schema({
    url: { 
        type: mongoose.SchemaTypes.String,
        required: true
    },
    name: { 
        type: mongoose.SchemaTypes.String
    },
    scriptTarget: {
        type: mongoose.SchemaTypes.String
    },
    scriptContent: [{
        type: mongoose.SchemaTypes.String
    }],
    options: {
        hitTime: {type: mongoose.SchemaTypes.Number, default: process.env.OPTIONS_DEFAULT_HIT_TIME},
        onlyChanged: {type: mongoose.SchemaTypes.Boolean, default: process.env.OPTIONS_DEFAULT_ONLY_CHANGED},
        onlyUnique: {type: mongoose.SchemaTypes.Boolean, default: process.env.OPTIONS_DEFAULT_ONLY_UNIQUE},
        useJquery: {type: mongoose.SchemaTypes.Boolean, default: process.env.OPTIONS_DEFAULT_USE_JQUERY},
        waitTime: {type: mongoose.SchemaTypes.Number, default: process.env.OPTIONS_DEFAULT_WAIT_TIME},
    },
    notification: [{
        type: Object
    }],
    lastExecution: {
        message: { 
            type: mongoose.SchemaTypes.String
        },
        scriptContent: { 
            type: mongoose.SchemaTypes.String
        },
        isSuccess: {
            type: mongoose.SchemaTypes.Boolean
        },    
        hashTarget: {
            type: mongoose.SchemaTypes.String
        },
        hashChanged: {
            type: mongoose.SchemaTypes.Boolean
        },
        extractedTarget: {
            type: mongoose.SchemaTypes.String
        },
        extractedContent: [{ 
            type: Object
        }],
        errorMessage: {
            type: mongoose.SchemaTypes.String
        }
    }
        
}, { versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const SiteRequest = mongoose.model("site-request", schema)
module.exports = SiteRequest



/*
{
	
	"url": "https://www.animestc.com/",
	"name": "AnimesTeleCine",
	"scriptTarget": "$('.dados-down-epi > .titulo-down-epi').first().html()",
	"scriptContent": [
		"$('.dados-down-epi > .titulo-down-epi').first().text().trim()",
		"$('.dados-down-epi > .titulo-down-epi').first().text().trim()",
		"$('.dados-down-epi > .titulo-down-epi').first().text().trim()"
	],
	"options": {
		"hit_time": 5,
		"only_changed": true,
		"use_jquery": true,
		"wait_time": 5000
	},
	"notification": [
		{
			"telegram": {
				"bot_token:": "1038340863:AAFmixa_WtcjlEbcGNAPvD-ArUBA7Kr-xUE",
				"chat_id": [123456789]
			},
			"template": "<a href=\"{url}">AnimesTeleCine<\/a> {0} "
		},
		{
			"email": ["achimid@hotmail.com"],
			"template": "<a href=\"https:\/\/www.animestc.com\">AnimesTeleCine<\/a>"
		},
		{
			"webhook": [{
				"url": "www.google.com.br",
				"method": "POST"
			}]
		},
		{
			"sms": ["(16) 99792-6438"],
			"template": "Nova atualização"
		}
	]
	
}
*/