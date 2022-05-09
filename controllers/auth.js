const { response } = require('express'); // Response para tener las ayudas en el editor al momento de trabajar con el parametro res en las funciones 
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/jwt');
const { verify } = require('../helpers/google-verify');





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
		const token = await generateJWT(databaseUser.id);

		res.status(200).json({
			ok: false,
			user: databaseUser,
			token
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: 'Unespected error'
		});
	}
}

const googleSignIn = async (req = request, res = response) => {
	const googleToken = req.body.token;

	try {
		const { name, email, picture } = await verify(googleToken);

		const databaseUser = await User.findOne({ email });
		
		let user;

		if (!databaseUser) {
			user = new User({
				name,
				email,
				password: 'sdsdsds',
				img: picture,
				google: true
			}); 
		} else {
			user = databaseUser;
			databaseUser.google = true;
		}

		await user.save();

		const token = await generateJWT(user.id);

		res.status(200).json({
			ok: true,
			token
		});
	} catch (error) {
		res.status(401).json({
			ok: false,
			message: 'Invalid token'
		});
	}
}




module.exports = { // En estos casos exportamos como objeto por si en un futuro decidimos agregar mas controladores.
	login,
	googleSignIn
}