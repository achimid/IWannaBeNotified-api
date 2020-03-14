const mongoose = require("mongoose")

const schema = mongoose.Schema({
    url: { 
        type: String,
        required: true
    },
    name: { 
        type: String
    },
    scriptTarget: {
        type: String,
        default: process.env.DEFAULT_JS_TARGET_SCRIPT
    },
    scriptContent: [{
        type: String
    }],
    filter: {
        threshold: Number,
        words: [{
            type: String
        }]
    },
    options: {
        hitTime: {type: Number, default: process.env.OPTIONS_DEFAULT_HIT_TIME},
        onlyChanged: {type: Boolean, default: process.env.OPTIONS_DEFAULT_ONLY_CHANGED},
        onlyUnique: {type: Boolean, default: process.env.OPTIONS_DEFAULT_ONLY_UNIQUE},
        useJquery: {type: Boolean, default: process.env.OPTIONS_DEFAULT_USE_JQUERY},
        waitTime: {type: Number, default: process.env.OPTIONS_DEFAULT_WAIT_TIME},
        isDependency: {type: Boolean, default: process.env.OPTIONS_DEFAULT_IS_DEPENDENCY},
    },
    notification: [{
        type: Object
    }],
    lastExecution: {
        message: { 
            type: String
        },
        scriptContent: { 
            type: String
        },
        isSuccess: {
            type: Boolean
        },    
        hashTarget: {
            type: String
        },
        hashChanged: {
            type: Boolean
        },
        extractedTarget: {
            type: String
        },
        extractedContent: [{ 
            type: Object
        }],
        errorMessage: {
            type: String
        },
        createdAt: {
            type: Date
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    },
    then: {
        siteRequestId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'site-request'
        }
    }
        
}, { versionKey: false, timestamps: true})


// schema.query.byQuery = function byQuery(params) {
//     return this.where(Object.assign(params, {
//         url: { $regex: params.url || '', $options: 'i' },
//         name: { $regex: params.name  || '', $options: 'i' }
//     }))
// }


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
        "wait_time": 5000,
        "isDependency": false
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