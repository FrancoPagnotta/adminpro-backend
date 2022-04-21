const { Schema, model } = require('mongoose');

const UserSchema = Schema({
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

UserSchema.method('toJSON', function() {
	const { __v, _id, password, ...object } = this.toObject();
	object.uid = _id;
	
	return object;
});

module.exports = model('User', UserSchema);