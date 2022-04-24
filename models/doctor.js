const { Schema, model } = require('mongoose');



const DoctorSchema = Schema({
	name: {
		type: 'string',
		required: true
	},
	img: {
		type: 'string'
	},
	hospital: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'Hospital'
	},
	user: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

DoctorSchema.method('toJSON', function() {
	const { __v, ...object } = this.toObject();
	return object;
});

module.exports = model('Doctor', DoctorSchema);
