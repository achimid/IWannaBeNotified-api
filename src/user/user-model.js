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
	isAdmin: Boolean
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