var express = require('express');
var router = express.Router();
var Imdb = require('../models/imdb');

// this controller uses the url /api + any of the routes listed below
router.get('/filmes', function(req, res) { // get all the movies

    Imdb.find({ titleType: 'movie' }, function(err, movies) {
        if(err) res.json({ message: 'Erro ao buscar todos os filmes' });
        res.json({ message: movies });
    });

}).get('/series', function(req, res) { // get all the tvseries

    Imdb.find({ titleType: 'tvSeries' }, function(err, series) {
        if(err) res.json({ message: 'Erro ao buscar todos as séries' });
        res.json({ message: series });
    });

}).get('/curtas', function(req, res) { // get all the short movies

    Imdb.find({ titleType: 'short' }, function(err, shorts) {
        if(err) res.json({ message: 'Erro ao buscar todos os curtas' });
        res.json({ message: shorts });
    });

}).get('/todos/:id', function(req, res) { // get a specific entry by id

    Imdb.findById(req.params.id, function(err, entry) {
        if(err) res.json({ message: 'Erro ao buscar por entrada específica' });
        res.json({ message: entry });
    });

}).get('/normalizar', function(req, res) { // route to normalize genres of all entries
   
    // run this to insert movies from movies.tsv before calling this route
    // mongoimport --db imdb --collection imdb --type tsv --headerline --file imdb.tsv --ignoreBlanks

    Imdb.find().cursor().on('data', function(entry) {
        
        if(entry.genres.length != 0){
            var genres = entry.genres[0].split(',');
            entry.genres = genres;
            entry.save(function(err, updatedMovie) {
                if(err) console.log(err);
            });
        }

    }).on('end', function(){

        res.json({ message: 'Entradas normalizadas' });

    });

});

module.exports = router;
