// packages required
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/imdb');

// imdb controller
var ImdbController = require('./app/controllers/imdbController');

// configuring app to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setting request port
var port = process.env.PORT || 8080;

// set a route prefix and controller
app.use('/api', ImdbController);

// starting server
app.listen(port);
console.log('Server started on port ' + port);
