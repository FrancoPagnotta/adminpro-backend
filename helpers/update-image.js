const fs = require('fs');// with the file system module, we can read the files when we want search something.
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const { use } = require('bcrypt/promises');



const deleteImage = (path) => {

	if (fs.existsSync(path)) {
		fs.unlinkSync(path);
	}
}

const updateImage = async (collection, uid, fileName) => {
	switch (collection) {
		case 'users':
			const user = await User.findById(uid);

			if (!user) {
				console.log('user not found')
				return false;
			} 

			const userImg = `./uploads/users/${user.img}`;
			deleteImage(userImg);

			user.img = fileName;

			await user.save();

			break;

		case 'doctors':
			const doctor = await Doctor.findById(uid);

			if (!doctor) {
				console.log('doctor not found')
				return false;
			} 

			const doctorImg = `./uploads/doctors/${doctor.img}`;
			deleteImage(doctorImg);

			doctor.img = fileName;

			await doctor.save();

			break;

		case 'hospitals':
			const hospital = await Hospital.findById(uid);

			if (!hospital) {
				console.log('hospital not found')
				return false;
			} 

			const hospitalImg = `./uploads/hospitals/${hospital.img}`;
			deleteImage(hospitalImg);

			hospital.img = fileName;

			await hospital.save();

			break;
	
		default:
			break;
	}
}


module.exports = {
	updateImage
}