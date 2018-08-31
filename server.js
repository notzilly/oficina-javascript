// packages required
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

// database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/imdb');

// imdb controller
var ImdbController = require('./app/controllers/imdbController');

// configuring app to use body-parser and cors
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// setting request port
var port = process.env.PORT || 8080;

// set a route prefix and controller
app.use('/api', ImdbController);

// starting server
app.listen(port);
console.log('Server started on port ' + port);
