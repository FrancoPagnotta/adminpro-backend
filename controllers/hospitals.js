const { response } = require('express');

const getHospitals = (req, res = response) => {
	res.status(200).json({
		ok: true,
		message: 'Endpoint getHospitals requestworks'
	});
}

const createHospital = (req, res = response) => {
	res.status(200).json({
		ok: true,
		message: 'Endpoint createHospital works'
	})
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