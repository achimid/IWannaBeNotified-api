const jwt = require('jsonwebtoken')
const Joi = require('joi')
const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 255
	},
	isAdmin: Boolean,
	telegramChatId: { type: Number },
	notifications: [{ // Deve refletir o mesmo atributo em sr-mode.js

		template: { type: String },
		email: [{ type: String }],
		sms: [{ type: String }],

		telegram: {
			bot_token: { type: String },
			chat_id: { type: String },
		},

		webhook: [{
			url: { type: String },
			method: { type: String }
		}],

		websocket: { type: Boolean }
	}],
    filter: {
        threshold: Number,
        words: [{
            type: String
        }]
    }
})


UserSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			isAdmin: this.isAdmin,
			name: this.name,
			email: this.email
		}
		, process.env.PRIVATE_KEY)
	return token
}

function validateUserModel(user) {
	const schema = {
		name: Joi.string().min(3).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(3).max(255).required()
	}

	return Joi.validate(user, schema)
}

function validateLoginSchema(user) {
	const schema = {		
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(3).max(255).required()
	}

	return Joi.validate(user, schema)
}

exports.UserModel = mongoose.model('user', UserSchema)
exports.validateUserModel = validateUserModel
exports.validateLoginSchema = validateLoginSchema

/**
 * @typedef Filter
 * @property {integer} _id
 * @property {string} threshold - Limite de similaridade entre a palavra e o conteudo comparado. Quanto mais proximo de 0 mais exato possivel
 * @property {Array.<string>} word - Palavras para serem utilizadas como filtro
 */

 /**
 * @typedef Telegram
 * @property {integer} _id
 * @property {string} bot_token - Token do bot do telegram para notificação
 * @property {string} chat_id - Chat do usuario no grupo, para disparo
 */

 /**
 * @typedef Webhook
 * @property {integer} _id
 * @property {string} url - Url da aplicação WebHook
 * @property {string} method - Verbo HTTP utilizado para notificação
 */

 /**
 * @typedef Notification
 * @property {integer} _id
 * @property {string} template - 
 * @property {[string]} email - 
 * @property {[string]} sms - 
 * @property {Array.<Telegram>} telegram - 
 * @property {Array.<Webhook>} webhook - 
 * @property {boolean} websocket - 
 */

/**
 * @typedef User
 * @property {integer} _id
 * @property {string} name.required - Nome do usuario
 * @property {string} email.required - Email de autenticação do usuario
 * @property {string} password.required - Senha do usuario
 * @property {boolean} isAdmin - Indica se o usuario é um adiministrador
 * @property {string} telegramChatId - Id do Usuario no Telegram
 * @property {Filter.model} filter - Filtro utilizado para busca de palavas similares
 * @property {Array.<Notification>} notifications - Filtro utilizado para busca de palavas similares
 */