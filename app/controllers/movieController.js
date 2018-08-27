var express = require('express');
var router = express.Router();

// all the movies
router.get('/', function(req, res) {
    res.json({ message: 'all the movies' });
});

module.exports = router;