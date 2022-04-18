const User = require('../models/user');

const getUsers = (req, res) => {
	res.json({
		ok: true,
		users: 'Get users'
	});
}

const createUser = async (req, res) => {
	const { name, email, password } = req.body; //Desestructuracion del objeto body.
	const user = new User(req.body);

	await user.save();

	res.json({
		ok: true,
		user // es lo mismo que user: user, pero como es redundante solo ponemos user, porque el nombre de la propiedad es igual al de la variable
	});
}



module.exports = {
	getUsers,
	createUser
}