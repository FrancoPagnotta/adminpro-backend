const User = require('../models/user');
const { request, response } = require('express');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/jwt');




const getUsers = async (req = request, res = response) => {
	const pagination = Number(req.query.pagination) || 0;

	const [ users, total ] = await Promise.all([ // Aca hacemos una desestructuracion de un array, por eso usamos const [users, total] y el Promise.all() es una promesa que se resuelve cuando se resuelve el array de promesas que le pasamos. De esta forma mejoramos la performance de nuestra funcion, haciendo que los resultados que se esperan de cada una de las promesas del array, sean entregados al mismo tiempo. Cuando ambas promesas se resuelven, ahi se resuelve la promesa madre y ahi es cuando podemos ver la data. El valor de la primer promeise que se resuelve se almacena en la primera constante de nuestro array y el valor de la segunda promise en la segunda constante y asi sucesivamente.
		await User.find({}, '_id name img email role') //Este metodo crea una consulta find que obtiene una lista de todos los usuarios. En este caso no pusimos nada como filtro. por eso el objeto vacio, pero como segundo parametro especificamos que propiedades del User model nos interesan.
			.skip(pagination)
			.limit(5),
		await User.count()
	]);

	res.status(200).json({
		ok: true,
		uid: req.uid, // Esta data uid de la req viene del middleware validate-jwt
		users,
		total
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
		
		// Generate JWT
		const token = await generateJWT(user.id);
		
		res.status(200).json({
			ok: true,
			user, // es lo mismo que user: user, pero como es redundante solo ponemos user, porque el nombre de la propiedad es igual al de la variable
			token: token
		});
		
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			message: 'Unespected error'
		});
	}
}

const updateUser = async (req, res = response) => {
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
		const { password, google, email, ...newUserData } = req.body;
		
		if (databaseUser.email != email) {

			const emailExist = await User.findOne({ email }); // es lo mismo que email: email
			if (emailExist) {
				return res.status(400).json({
					ok: false,
					message: 'There is already a user with that email'
				});
			} else {
				newUserData.email = email;
			}
		}
		
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

const deleteUser = async (req, res = response) => {
	const uid = req.params.id;
	
	try {
		const databaseUser = await User.findById(uid);

		if (!databaseUser) {
			return res.status(404).json({
				ok: false,
				message: 'User not found'
			});
		} else {
			await User.findByIdAndDelete(uid);
			res.status(200).json({
				ok: true,
				message: 'User deleted'
			});
		}
		
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
	createUser,
	updateUser,
	deleteUser
}