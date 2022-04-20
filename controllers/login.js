const { response } = require('express'); // Response para tener las ayudas en el editor al momento de trabajar con el parametro res en las funciones 
const User = require('../models/user');
const bcrypt = require('bcrypt');





const login = async (req, res = response) => { //async cuando tenemos que hacer peticiones.
	
	const { email, password } = req.body;

	try {
		// Verify email
		const databaseUser = await User.findOne({ email }); // es lo mismo que email: email
		if (!databaseUser) {
			return res.status(404).json({
				ok: false,
				message: 'Invalid email'
			});
		}
		// Verify password
		const validPassword = bcrypt.compareSync(password, databaseUser.password);
		if (!validPassword) {
			return res.status(404).json({
				ok: false,
				message: 'Invalid password'
			});
		}
		// Generate JWT

		res.status(200).json({
			ok: false,
			user: databaseUser
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: 'Unespected error'
		});
	}
}




module.exports = { // En estos casos exportamos como objeto por si en un futuro decidimos agregar mas controladores.
	login
}