const { request, response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');

const uploadFiles = (req = request, res = response) => {
	const { collection, uid } = req.params;
	const validCollections = ['users', 'doctors', 'hospitals'];
	let file;

	if (!validCollections.includes(collection)) {
		return res.status(400).json({
			ok: false,
			message: 'Invalid collection'
		});
	}

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({
			ok: false,
			message: 'No files were provided'
		});
	}

	file = req.files.image;

	const nameCut = file.name.split('.'); // Split method divides a String into an ordered list of substrings, puts these substrings into an array, and returns the array. In this case, the division is done by searching for the pattern ".", the dot.
	const extensionFile = nameCut[nameCut.length - 1];
	const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

	if (!validExtensions.includes(extensionFile)) {
		return res.status(400).json({
			ok: true,
			message: 'Invalid extension file'
		});
	}

	const fileName = `${uuidv4()}.${extensionFile}`; // uuid help us to create a uuid for each image.
	const path = `./uploads/${collection}/${fileName}`;
	
	file.mv(path, (err) => {
		if (err) {
			console.log(err);
			return res.status(500).json({
				ok: false,
				message: 'Error moving the file'
			});
		}

		updateImage(collection, uid, fileName);

		res.status(200).json({
			ok: true,
			message: 'File uploaded',
			file: fileName
		});
	});
}


module.exports = {
	uploadFiles
}