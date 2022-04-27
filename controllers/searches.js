const { request, response } = require('express');


const getTodo = async (req = request, res = response) => {
	const search = req.params.search;
	
	await res.status(200).json({
		ok: true,
		search
	});
}


module.exports = {
	getTodo
}