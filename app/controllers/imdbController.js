var express = require('express');
var router = express.Router();
var Imdb = require('../models/imdb');

// this controller uses the url /api + any of the routes listed below
router.get('/filmes', function(req, res) { // GET: get all the movies

    console.log('GET /filmes received');

    Imdb.find({ titleType: 'movie' }, function(err, movies) {
        if(err) res.status(500).json({ message: 'Erro ao buscar todos os filmes' });
        res.json(movies);
    });

}).get('/filmes/:filme_id', function(req, res) { // GET: get a specific movie by id

    console.log('GET /filmes/' + req.params.filme_id + ' received');

    Imdb.findOne({ _id: req.params.filme_id, titleType: 'movie' }, function(err, movie) {
        if(err) res.status(500).json({ message: 'Erro ao buscar por filme' });
        res.json(movie);
    });

}).post('/filmes', function(req, res) { // POST: create a new movie

    console.log('POST /filmes received');

    var movie = new Imdb();
    movie.titleType = 'movie';
    movie.primaryTitle = req.body.tituloPrimario;
    movie.originalTitle = req.body.tituloOriginal;
    movie.startYear = req.body.anoInicio != '' ? req.body.anoInicio : undefined;
    movie.endYear = req.body.anoFim != '' ? req.body.anoFim : undefined;
    movie.runtimeMinutes = req.body.duracaoMinutos != '' ? req.body.duracaoMinutos : undefined;
    movie.genres = req.body.generos != '' ? req.body.generos : undefined;

    res.json(movie);
    // comment the line above and uncomment the ones below when in production
    // movie.save(function(err, movie) {
    //     if(err) res.status(500).json({ message: err });
    //     res.json(movie);
    // });

}).delete('/filmes/:filme_id', function(req, res) { // DELETE: deletes a movie by id

    console.log('DELETE /filmes/' + req.params.filme_id + ' received');

    // change to findOneAndDelete when in production
    Imdb.findOne({ _id: req.params.filme_id, titleType: 'movie' }, function(err, movie) {
        if(err) res.status(500).json({ message: 'Erro ao excluir filme' });
        res.json({ message: 'Filme "' + movie.primaryTitle + '" excluído com sucesso' });
    });

}).put('/filmes/:filme_id', function(req, res) { // PUT: updates a movie by id

    console.log('PUT /filmes/' + req.params.filme_id + ' received');

    Imdb.findOne({ _id: req.params.filme_id, titleType: 'movie' }, function(err, movie) {
        if(err) res.status(500).json({ message: 'Erro ao editar filme' });

        movie.primaryTitle = req.body.tituloPrimario;
        movie.originalTitle = req.body.tituloOriginal;
        movie.startYear = req.body.anoInicio != '' ? req.body.anoInicio : undefined;
        movie.endYear = req.body.anoFim != '' ? req.body.anoFim : undefined;
        movie.runtimeMinutes = req.body.duracaoMinutos != '' ? req.body.duracaoMinutos : undefined;
        movie.genres = req.body.generos != '' ? req.body.generos : undefined;

        res.json({ message: 'Filme "' + movie.primaryTitle + '" editado com sucesso' });
        // comment the line above and uncomment the ones below when in production
        // movie.save(function(err, movie) {
        //     if(err) res.status(500).json({ message: err });
        //     res.json({ message: 'Filme "' + movie.primaryTitle + '" editado com sucesso' });
        // });

    });

}).get('/series', function(req, res) { // GET: get all the tvseries

    console.log('GET /series received');

    Imdb.find({ titleType: 'tvSeries' }, function(err, tvSeries) {
        if(err) res.status(500).json({ message: 'Erro ao buscar todas as séries' });
        res.json(tvSeries);
    });

}).get('/series/:serie_id', function(req, res) { // GET: get a specific tvseries by id

    console.log('GET /series/' + req.params.serie_id + ' received');

    Imdb.findOne({ _id: req.params.serie_id, titleType: 'tvSeries' }, function(err, tvSeries) {
        if(err) res.status(500).json({ message: 'Erro ao buscar por série' });
        res.json(tvSeries);
    });

}).post('/series', function(req, res) { // POST: create a new tvseries

    console.log('POST /series received');

    var tvSeries = new Imdb();
    tvSeries.titleType = 'tvSeries';
    tvSeries.primaryTitle = req.body.tituloPrimario;
    tvSeries.originalTitle = req.body.tituloOriginal;
    tvSeries.startYear = req.body.anoInicio != '' ? req.body.anoInicio : undefined;
    tvSeries.endYear = req.body.anoFim != '' ? req.body.anoFim : undefined;
    tvSeries.runtimeMinutes = req.body.duracaoMinutos != '' ? req.body.duracaoMinutos : undefined;
    tvSeries.genres = req.body.generos != '' ? req.body.generos : undefined;

    res.json(tvSeries);
    // comment the line above and uncomment the ones below when in production
    // tvSeries.save(function(err, tvSeries) {
    //     if(err) res.status(500).json({ message: err });
    //     res.json(tvSeries);
    // });

}).delete('/series/:serie_id', function(req, res) { // DELETE: deletes a tvseries by id

    console.log('DELETE /series/' + req.params.serie_id + ' received');

    // change to findOneAndDelete when in production
    Imdb.findOne({ _id: req.params.serie_id, titleType: 'tvSeries' }, function(err, tvSeries) {
        if(err) res.status(500).json({ message: 'Erro ao excluir série' });
        res.json({ message: 'Série "' + tvSeries.primaryTitle + '" excluída com sucesso' });
    });

}).put('/series/:serie_id', function(req, res) { // PUT: updates a tv series by id

    console.log('PUT /series/' + req.params.serie_id + ' received');

    Imdb.findOne({ _id: req.params.serie_id, titleType: 'tvSeries' }, function(err, tvSeries) {
        if(err) res.status(500).json({ message: 'Erro ao editar série' });

        tvSeries.primaryTitle = req.body.tituloPrimario;
        tvSeries.originalTitle = req.body.tituloOriginal;
        tvSeries.startYear = req.body.anoInicio != '' ? req.body.anoInicio : undefined;
        tvSeries.endYear = req.body.anoFim != '' ? req.body.anoFim : undefined;
        tvSeries.runtimeMinutes = req.body.duracaoMinutos != '' ? req.body.duracaoMinutos : undefined;
        tvSeries.genres = req.body.generos != '' ? req.body.generos : undefined;

        res.json({ message: 'Série "' + tvSeries.primaryTitle + '" editada com sucesso' });
        // comment the line above and uncomment the ones below when in production
        // tvSeries.save(function(err, tvSeries) {
        //     if(err) res.status(500).json({ message: err });
        //     res.json({ message: 'Série "' + tvSeries.primaryTitle + '" editada com sucesso' });
        // });

    });

}).get('/curtas', function(req, res) { // GET: get all the short movies

    console.log('GET /curtas received');

    Imdb.find({ titleType: 'short' }, function(err, shorts) {
        if(err) res.status(500).json({ message: 'Erro ao buscar todos os curtas' });
        res.json(shorts);
    });

}).get('/curtas/:curta_id', function(req, res) { // GET: get a specific short movie by id

    console.log('GET /curtas/' + req.params.curta_id + ' received');

    Imdb.findOne({ _id: req.params.curta_id, titleType: 'short' }, function(err, short) {
        if(err) res.status(500).json({ message: 'Erro ao buscar por curta' });
        res.json(short);
    });

}).get('/normalizar', function(req, res) { // GET: route to normalize genres of all entries
   
    // run this to insert movies from movies.tsv before calling this route
    // mongoimport --db imdb --collection imdb --type tsv --headerline --file imdb.tsv --ignoreBlanks

    console.log('GET /normalizar received');

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
