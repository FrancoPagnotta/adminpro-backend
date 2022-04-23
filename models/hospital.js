const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
	name: {
		type: 'string',
		required: true,
	},
	img: {
		type: 'string'
	},
	user : {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

HospitalSchema.method('toJSON', function() {
	const { __v, ...object } = this.toObject();
	return object;
});

module.exports = model('Hospital', HospitalSchema);