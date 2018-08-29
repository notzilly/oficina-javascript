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

    Imdb.findOne({ _id: req.params.filme_id, titleType: 'movie' }, function(err, entry) {
        if(err) res.json({ message: 'Erro ao buscar por filme' });
        res.json({ message: entry });
    });

}).post('/filmes', function(req, res) { // create a new movie

    console.log(req.body);

    var movie = new Imdb();
    movie.titleType = 'movie';
    movie.primaryTitle = req.body.tituloPrimario;
    movie.originalTitle = req.body.tituloOriginal;
    movie.startYear = req.body.anoInicio;
    movie.endYear = req.body.anoFim;
    movie.runtimeMinutes = req.body.duracaoMinutos;
    movie.genres = req.body.generos;

    console.log(movie);

    // movie.save(err => {
    //     if(err) return res.status(500).send(err);
    //     return res.status(200).send(movie);
    // });

// }).delete('/filmes/:filme_id', function(req, res) { // deletes a movie

//     Imdb.findOne({ _id: req.params.filme_id, titleType: 'movie' }, function(err, entry) {
//         if(err) res.json({ message: 'Erro ao buscar por entrada específica' });
//         res.json({ message: entry });
//     });

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
