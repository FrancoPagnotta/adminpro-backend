const express = require('express');
const { dbConection } = require('./database/config');
const cors = require('cors');

require('dotenv').config();

//Create express server
const app = express();

// Cors config
app.use(cors());

//db
dbConection();

//mean_user
//6QBNpCUQW1JZijc1

//Routes
app.get('/', (req, res) => {
	res.json({
		ok: true,
		message: 'Hello'
	});
});

app.listen(process.env.PORT, () => {
	console.log('server runing on port 3000');
});