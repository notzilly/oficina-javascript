// packages required
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configuring app to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setting request port
var port = process.env.PORT || 8080;

// route definition
var router = express.Router();

// test route
router.get('/', function(req, res) {
    res.json({ message: 'henlo' });
});

// set a route prefix
app.use('/api', router);

// starting server
app.listen(port);
console.log('Server started on port ' + port);
