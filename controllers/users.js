const User = require('../models/user');
const { response } = require('express');
const { validationResult } = require('express-validator');

const getUsers = async (req, res) => {

	const users = await User.find({}, '_id name email role'); //Este metodo crea una consulta find que obtiene una lista de todos los usuarios. En este caso no pusimos nada como filtro. por eso el objeto vacio, pero como segundo parametro especificamos que propiedades del User model nos interesan.
	res.json({
		ok: true,
		users: users  
	});
}

const createUser = async (req, res = response) => {
	const { name, email, password } = req.body; //Desestructuracion del objeto body.
	const errors = validationResult(req);
	
	try {
		const emailExist = await User.findOne({ email: email });

		if (!errors.isEmpty()) {
			return res.status(400).json({
				ok: false,
				errors: errors.array()
			});
		}

		if (emailExist) {
			return res.status(400).json({
				ok: false,
				message: 'Email already exists'
			});
		}
		
		const user = new User(req.body);
		await user.save();
	
		res.json({
			ok: true,
			user // es lo mismo que user: user, pero como es redundante solo ponemos user, porque el nombre de la propiedad es igual al de la variable
		});
		
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			message: 'Unespected error'
		});
	}
}



module.exports = {
	getUsers,
	createUser
}