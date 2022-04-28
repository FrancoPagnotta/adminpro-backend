const { request, response } = require('express');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
;

const getTodo = async (req = request, res = response) => {
	const search = req.params.search;
	const regex = new RegExp(search, 'i'); // Flag i ignore casing, so we can make the expression carry out a case-insensitive search.

	const [ users, doctors, hospitals ] = await Promise.all([
		await User.find({ name: regex }),
		await Doctor.find({ name: regex }),
		await Hospital.find({ name: regex })
	]);

	res.status(200).json({
		ok: true,
		users,
		doctors,
		hospitals
	});
}


module.exports = {
	getTodo
}