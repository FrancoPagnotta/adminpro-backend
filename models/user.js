const { Schema, model } = require('mongoose');

const userSchema = Schema({
	name: {
		type: 'string',
		required: true,
	},
	email: {
		type: 'string',
		required: true,
		unique: true
	},
	password: {
		type: 'string',
		required: true,
	},
	img: {
		type: 'string'
	},
	role: {
		type: 'string',
		required: true,
		default: 'USER_ROLE'
	},
	google: {
		type: Boolean,
		default: false
	}
});

module.exports = model('user', userSchema);