const fs = require('fs');// with the file system module, we can read the files when we want search something.
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const { use } = require('bcrypt/promises');



const updateImage = async (collection, uid, fileName) => {
	switch (collection) {
		case 'users':
			const user = await User.findById(uid);

			if (!user) {
				console.log('user not found')
				return false;
			} 

			const userImg = `./uploads/users/${user.img}`;

			if (fs.existsSync(userImg)) {
				fs.unlinkSync(userImg);
			}

			user.img = fileName;

			await user.save();

			break;

		case 'doctors':
			const doctor = await Doctor.findById(uid);
			break;

		case 'hospitals':
			const hospital = await Hospital.findById(uid);
			break;
	
		default:
			break;
	}
}


module.exports = {
	updateImage
}