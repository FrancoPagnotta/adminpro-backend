const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitals = (req, res = response) => {
	res.status(200).json({
		ok: true,
		message: 'Endpoint getHospitals requestworks'
	});
}

const createHospital = async (req, res = response) => {
	const uid = req.uid;
	const hospital = new Hospital({ user: uid, ...req.body });

	try {
		await hospital.save();

		res.status(200).json({
			ok: true,
			hospital
		});
	} catch (error) {
		res.status(500).json({
			ok: true,
			message: 'Unespected error'
		});
	}
}

const updateHospital = (req, res = response) => {
	res.status(200).json({
		ok: true,
		message: 'Endpoint updateHospital works'
	})
}

const deleteHospital = (req, res = response) => {
	res.status(200).json({
		ok: true,
		message: 'Endpoint deleteHospital works'
	})
}






module.exports = {
	getHospitals,
	createHospital,
	updateHospital,
	deleteHospital
}