// packages required
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movies');

// movie controller
var MovieController = require('./app/controllers/movieController');

// configuring app to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setting request port
var port = process.env.PORT || 8080;

// set a route prefix and controller
app.use('/api/movies', MovieController);

// starting server
app.listen(port);
console.log('Server started on port ' + port);
