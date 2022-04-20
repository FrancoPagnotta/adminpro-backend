const { request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res, next) => {

	//Read token
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			ok: false, 
			message: 'Nonexistent token'
		});
	}

	try {

		const { uid } = jwt.verify(token, process.env.JWT_SECRET);
		
		req.uid = uid; // Anadimos la nueva propiedad uid a la req y la inicializamos con el uid obtenido previamente. Los middlewares pueden pasar data a a las funciones siguientes. En las rutas, la funcion siguiente a este middlewere es getUsers en donde podemos obtener la nueva propiedad uid que acabamos de establecerle a la req.
		
	} catch (error) {
		return res.status(401).json({ //En este caso ponemos el return en el catch para que en caso de que haya un error, el flujo no continue hacia el next o sea para que la funcion corte y el next no se ejecute.
			ok: false, 
			message: 'Invalid token'
		});
	}

	next();
}

module.exports = {
	validateJWT
}