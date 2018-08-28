var express = require('express');
var router = express.Router();
var Imdb = require('../models/imdb');

// this controller uses the url /api + any of the routes listed below
router.get('/filmes', function(req, res) { // get all the movies

    Imdb.find({ titleType: 'movie' }, function(err, movies) {
        if(err) res.json({ message: 'Erro ao buscar todos os filmes' });
        res.json({ message: movies });
    });

}).get('/filmes/:filme_id', function(req, res) { // get a specific movie by id

    Imdb.findById(req.params.filme_id, function(err, movie) {
        if(err) res.json({ message: 'Nenhum filme encontrado com este id' });
        res.json({ message: movie });
    });

}).get('/normalize', function(req, res) { // route to normalize genres of all entries
   
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
