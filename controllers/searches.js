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

const getCollectionData = async (req = request, res = response) => {
	const table = req.params.table;
	const search = req.params.search;
	const regex = new RegExp(search, 'i');

	let data = [];

	switch (table) {
		case 'users':
			data = await User.find({ name: regex });
			break;

		case 'doctors':
			data = await Doctor.find({ name: regex })
								.populate('hospital', 'name')
								.populate('user', 'name')
			break;

		case 'hospitals':
			data = await Hospital.find({ name: regex })
									.populate('user', 'name')
			break;

		default:
			return res.status(400).json({
				ok: false,
				message: 'Invalid table, must be users, doctors or hospitals'
			}); // the break is unnecessary here, dont have sense, because the return cut the flow of the function.
	}

	res.status(200).json({
		ok: true,
		result: data
	});
}


module.exports = {
	getTodo,
	getCollectionData
}