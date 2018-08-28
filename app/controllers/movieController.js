var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');

// /api/movies
router.get('/', function(req, res) { // get all the movies

    Movie.find(function(err, movies) {
        if(err) res.json({ message: 'Erro ao buscar todos os filmes' });
        res.json({ message: movies });
    });

}).get('/normalize', function(req, res) { // route to normalize genres of movies
   
    // run this to insert movies from movies.tsv before calling this route
    // mongoimport --db movies --collection movies --type tsv --headerline --file movies.tsv --ignoreBlanks

    Movie.find().cursor().on('data', function(movie) {
        
        if(movie.genres.length != 0){
            var genres = movie.genres[0].split(',');
            movie.genres = genres;
            movie.save(function(err, updatedMovie) {
                if(err) console.log(err);
            });
        }

    }).on('end', function(){

        res.json({ message: 'Dados normalizados' });

    });

}).get('/:movie_id', function(req, res) { // get a specific movie by id

    Movie.findById(req.params.movie_id, function(err, movie) {
        if(err) res.json({ message: 'Nenhum filme encontrado com este id' });
        res.json({ message: movie });
    });

});

module.exports = router;
