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
	notifications: [{ // Deve refletir o mesmo atributo em sr-mode.js

		template: { _id: false, type: String },
		email: [{ _id: false, type: String }],
		sms: [{ _id: false, type: String }],

		telegram: [{
			_id: false,
			bot_token: { type: String },
			chat_id: { type: String },
		}],

		webhook: [{
			_id: false,
			url: { type: String },
			method: { type: String }
		}]

	}]
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