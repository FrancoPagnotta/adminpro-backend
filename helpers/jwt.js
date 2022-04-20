const jwt = require('jsonwebtoken');


const generateJWT = (uid) => {

	return new Promise((resolve, reject) => {

		const payload = {
			uid // lo mismo que uid: uid. En el payload puedo grabar lo que sea menos info sensible.
		}
	
		jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: '12h'
		}, (error, token) => {
			if (error) {
				console.log(error);
				reject('JWT cannot be generated', error);
			} else {
				resolve(token);
			}
		}); // Este metodo crea el jwt
	});
}

module.exports = {
	generateJWT
};