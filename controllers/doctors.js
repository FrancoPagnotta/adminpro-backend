const { response } = require('express');



const getDoctors = (req, res = response) => {
	res.status(200).json({
		ok: true,
		message: 'Endpoint getDoctors works'
	});
}

const createDoctor = (req, res = response) => {
	res.status(200).json({
		ok: true,
		message: 'Endpoint createDoctor works'
	});
}

const updateDoctor = (req, res = response) => {
	res.status(200).json({
		ok: true,
		message: 'Endpoint updateDoctor works'
	});
}

const deleteDoctor = (req, res = response) => {
	res.status(200).json({
		ok: true,
		message: 'Endpoint deleteDoctor works'
	});
}



module.exports = {
	getDoctors,
	createDoctor,
	updateDoctor,
	deleteDoctor
}