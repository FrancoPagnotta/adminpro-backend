const User = require('../models/user');
const { response } = require('express');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
	const users = await User.find({}, '_id name email role'); //Este metodo crea una consulta find que obtiene una lista de todos los usuarios. En este caso no pusimos nada como filtro. por eso el objeto vacio, pero como segundo parametro especificamos que propiedades del User model nos interesan.
	res.status(200).json({
		ok: true,
		users: users  
	});
}

const createUser = async (req, res = response) => {
	const { email, password } = req.body; //Desestructuracion del objeto body.
	try {
		const emailExist = await User.findOne({ email: email });

		if (emailExist) {
			return res.status(400).json({
				ok: false,
				message: 'Email already exists'
			});
		}
		
		const user = new User(req.body);

		//Encrypt password
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);
		
		//Save user
		await user.save();
	
		res.status(200).json({
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

const updateUser = async (req, res) => {
	// Validate token and if user is correct.
	const uid = req.params.id;

	try {
		const databaseUser = await User.findById(uid);

		if (!databaseUser) {
			return res.status(404).json({
				ok: false,
				message: 'User not found'
			});
		}

		//Update
		const newUserData = req.body;
		
		if (databaseUser.email === newUserData.email) {
			delete newUserData.email;
		} else {
			const emailExist = User.findOne({ email: newUserData.email });
			
			if (emailExist) {
				return res.status(400).json({
					ok: false,
					message: 'There is already a user with that email'
				});
			}
		}

		delete newUserData.password;
		delete newUserData.google;	
		
		const updatedUser = await User.findOneAndUpdate(uid, newUserData, { new: true }); // new: true para que siempre me devuelva la data nueva, de lo contrario mongoose me devuelve el usuario como estaba antes de ser actualizado, aunque en la db haya sido actualizado.
		res.status(200).json({
			ok: true,
			user: updatedUser
		});
		
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: 'Unespected error'
		});
	}
}



module.exports = {
	getUsers,
	createUser,
	updateUser
}