const express = require('express');
const { dbConection } = require('./database/config');
const cors = require('cors');

require('dotenv').config();

//Create express server
const app = express();

//Cors config
app.use(cors()); 

//Body reading and parsing
app.use(express.json());

//db
dbConection();

// Public directory
app.use(express.static('public')); // This middleware serves static files.

//mean_user
//6QBNpCUQW1JZijc1

//Routes
app.use('/api/users', require('./routes/users')); //app.use() es un Middleware, que es una funcion que se puede ejecutar antes o despues del manejo de una ruta. Esta funcion tiene acceso al objeto Request, Response y la funcion next().
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/searches'));
app.use('/api/upload', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
	console.log('server runing on port 3000');
});