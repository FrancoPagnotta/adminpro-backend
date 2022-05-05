const { request, response } = require('express');
const { v4: uuidv4 } = require('uuid'); // It's useful for create a full path
const path = require('path');
const fs = require('fs');
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

const getFile = (req = request, res = response) => {
	const { collection, image } = req.params;
	const pathImage = path.join(__dirname, `../uploads/${collection}/${image}`); // Path module provides us utilities for work with the full path of files. In this case, with me join method we pass two arguments, __dirname (environment variable that tell us the absolute path of the directory containing the current excecuting file), and the path to the image, and get this C:\angular-advanced\backend\uploads\users\fb1a1286-9a15-40d5-8b61-e4e8f77988b3.jpg
	const defaultImage = path.join(__dirname, '../uploads/no-img.jpg');

	if (fs.existsSync(pathImage)) {
		res.sendFile(pathImage);
	} else {
		res.sendFile(defaultImage);
	}

}	


module.exports = {
	uploadFiles,
	getFile
}