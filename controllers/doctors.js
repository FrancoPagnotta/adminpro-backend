const { response } = require('express');
const Doctor = require('../models/doctor');



const getDoctors = (req, res = response) => {
	res.status(200).json({
		ok: true,
		message: 'Endpoint getDoctors works'
	});
}

const createDoctor = async (req, res = response) => {
	const uid = req.uid;
	const doctor = new Doctor({ user: uid, ...req.body });
	
	try {
		await doctor.save();

		res.status(200).json({
			ok: true,
			doctor // The same as doctor: doctor
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: 'Unespected error'
		});
	}
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