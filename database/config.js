const mongoose = require('mongoose');

const dbConection = async () => {
	try {
		await mongoose.connect(process.env.DB_CNN);
	} catch (error) {
		throw new Error('Error in the db init');
	}
}

module.exports = {
	dbConection
}