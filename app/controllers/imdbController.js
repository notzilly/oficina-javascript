var express = require('express');
var router = express.Router();
var Imdb = require('../models/imdb');

// this controller uses the url /api + any of the routes listed below
router.get('/filmes/pagina/:pagina_id', function(req, res) { // GET: get all the movies by page

    console.log('GET /filmes/pagina/' + req.params.pagina_id + ' received');

    Imdb.paginate({ tipoTitulo: 'movie' }, { page: req.params.pagina_id, limit: 20 }, function(err, movies) {
        if(err) res.status(500).json({ mensagem: 'Erro ao buscar os filmes da página ' + req.params.pagina_id });
        res.json(movies.docs);
    });

}).get('/filmes/:filme_id', function(req, res) { // GET: get a specific movie by id

    console.log('GET /filmes/' + req.params.filme_id + ' received');

    Imdb.findOne({ _id: req.params.filme_id, tipoTitulo: 'movie' }, function(err, movie) {
        if(err) res.status(500).json({ mensagem: 'Erro ao buscar por filme' });
        res.json(movie);
    });

}).post('/filmes', function(req, res) { // POST: create a new movie

    console.log('POST /filmes received');

    var movie = new Imdb(req.body);
    movie.tipoTitulo = 'movie';
    movie.generos = req.body.generos.split(','); // Expects a string with genres separated by comma

    movie.save(function(err, movie) {
        if(err) res.status(500).json({ mensagem: err });
        res.json(movie);
    });

}).delete('/filmes/:filme_id', function(req, res) { // DELETE: deletes a movie by id

    console.log('DELETE /filmes/' + req.params.filme_id + ' received');

    Imdb.findOneAndDelete({ _id: req.params.filme_id, tipoTitulo: 'movie' }, function(err, movie) {
        if(err) res.status(500).json({ mensagem: 'Erro ao excluir filme' });
        res.json({ mensagem: 'Filme "' + movie.tituloPrimario + '" excluído com sucesso' });
    });

}).put('/filmes/:filme_id', function(req, res) { // PUT: updates a movie by id

    console.log('PUT /filmes/' + req.params.filme_id + ' received');

    Imdb.findOne({ _id: req.params.filme_id, tipoTitulo: 'movie' }, function(err, movie) {
        if(err) res.status(500).json({ mensagem: 'Erro ao editar filme' });

        movie.tituloPrimario = req.body.tituloPrimario;
        movie.tituloOriginal = req.body.tituloOriginal;
        movie.anoInicio = req.body.anoInicio;
        movie.anoFim = req.body.anoFim;
        movie.duracaoMinutos = req.body.duracaoMinutos;
        movie.generos = req.body.generos.split(','); // Expects a string with genres separated by comma

        movie.save(function(err, movie) {
            if(err) res.status(500).json({ mensagem: err });
            res.json({ mensagem: 'Filme "' + movie.tituloPrimario + '" editado com sucesso' });
        });

    });

}).get('/series/pagina/:pagina_id', function(req, res) { // GET: get all the tvseries by page

    console.log('GET /series/pagina/' + req.params.pagina_id + ' received');

    Imdb.paginate({ tipoTitulo: 'tvSeries' }, { page: req.params.pagina_id, limit: 20 }, function(err, tvSeries) {
        if(err) res.status(500).json({ mensagem: 'Erro ao buscar as séries da página ' + req.params.pagina_id });
        res.json(tvSeries.docs);
    });

}).get('/series/:serie_id', function(req, res) { // GET: get a specific tvseries by id

    console.log('GET /series/' + req.params.serie_id + ' received');

    Imdb.findOne({ _id: req.params.serie_id, tipoTitulo: 'tvSeries' }, function(err, tvSeries) {
        if(err) res.status(500).json({ mensagem: 'Erro ao buscar por série' });
        res.json(tvSeries);
    });

}).post('/series', function(req, res) { // POST: create a new tvseries

    console.log('POST /series received');

    var tvSeries = new Imdb(req.body);
    tvSeries.tipoTitulo = 'tvSeries';
    tvSeries.generos = req.body.generos.split(','); // Expects a string with genres separated by comma

    tvSeries.save(function(err, tvSeries) {
        if(err) res.status(500).json({ mensagem: err });
        res.json(tvSeries);
    });

}).delete('/series/:serie_id', function(req, res) { // DELETE: deletes a tvseries by id

    console.log('DELETE /series/' + req.params.serie_id + ' received');

    Imdb.findOneAndDelete({ _id: req.params.serie_id, tipoTitulo: 'tvSeries' }, function(err, tvSeries) {
        if(err) res.status(500).json({ mensagem: 'Erro ao excluir série' });
        res.json({ mensagem: 'Série "' + tvSeries.tituloPrimario + '" excluída com sucesso' });
    });

}).put('/series/:serie_id', function(req, res) { // PUT: updates a tv series by id

    console.log('PUT /series/' + req.params.serie_id + ' received');

    Imdb.findOne({ _id: req.params.serie_id, tipoTitulo: 'tvSeries' }, function(err, tvSeries) {
        if(err) res.status(500).json({ mensagem: 'Erro ao editar série' });

        tvSeries.tituloPrimario = req.body.tituloPrimario;
        tvSeries.tituloOriginal = req.body.tituloOriginal;
        tvSeries.anoInicio = req.body.anoInicio;
        tvSeries.anoFim = req.body.anoFim;
        tvSeries.duracaoMinutos = req.body.duracaoMinutos;
        tvSeries.generos = req.body.generos.split(','); // Expects a string with genres separated by comma

        tvSeries.save(function(err, tvSeries) {
            if(err) res.status(500).json({ mensagem: err });
            res.json({ mensagem: 'Série "' + tvSeries.tituloPrimario + '" editada com sucesso' });
        });

    });

}).get('/curtas/pagina/:pagina_id', function(req, res) { // GET: get all the short movies by page

    console.log('GET /curtas/pagina/' + req.params.pagina_id + ' received');

    Imdb.paginate({ tipoTitulo: 'short' }, { page: req.params.pagina_id, limit: 20 }, function(err, shorts) {
        if(err) res.status(500).json({ mensagem: 'Erro ao buscar os curtas da página ' + req.params.pagina_id });
        res.json(shorts.docs);
    });

}).get('/curtas/:curta_id', function(req, res) { // GET: get a specific short movie by id

    console.log('GET /curtas/' + req.params.curta_id + ' received');

    Imdb.findOne({ _id: req.params.curta_id, tipoTitulo: 'short' }, function(err, short) {
        if(err) res.status(500).json({ mensagem: 'Erro ao buscar por curta' });
        res.json(short);
    });

}).post('/curtas', function(req, res) { // POST: create a new short movie

    console.log('POST /curtas received');

    var short = new Imdb(req.body);
    short.tipoTitulo = 'short';
    short.generos = req.body.generos.split(',');

    short.save(function(err, short) {
        if(err) res.status(500).json({ mensagem: err });
        res.json(short);
    });

}).delete('/curtas/:curta_id', function(req, res) { // DELETE: deletes a short movie by id

    console.log('DELETE /curtas/' + req.params.curta_id + ' received');

    Imdb.findOneAndDelete({ _id: req.params.curta_id, tipoTitulo: 'short' }, function(err, short) {
        if(err) res.status(500).json({ mensagem: 'Erro ao excluir curta' });
        res.json({ mensagem: 'Curta "' + short.tituloPrimario + '" excluído com sucesso' });
    });

}).put('/curtas/:curta_id', function(req, res) { // PUT: updates a short movie by id

    console.log('PUT /curtas/' + req.params.curta_id + ' received');

    Imdb.findOne({ _id: req.params.curta_id, tipoTitulo: 'short' }, function(err, short) {
        if(err) res.status(500).json({ mensagem: 'Erro ao editar curta' });

        short.tituloPrimario = req.body.tituloPrimario;
        short.tituloOriginal = req.body.tituloOriginal;
        short.anoInicio = req.body.anoInicio;
        short.anoFim = req.body.anoFim;
        short.duracaoMinutos = req.body.duracaoMinutos;
        short.generos = req.body.generos.split(',');

        short.save(function(err, short) {
            if(err) res.status(500).json({ mensagem: err });
            res.json({ mensagem: 'Curta "' + short.tituloPrimario + '" editado com sucesso' });
        });

    });

}).get('/normalizar', function(req, res) { // GET: route to normalize genres of all entries
   
    // run this to insert movies from movies.tsv before calling this route
    // mongoimport --db imdb --collection imdb --type tsv --headerline --file imdb.tsv --ignoreBlanks

    console.log('GET /normalizar received');

    Imdb.find().cursor().on('data', function(entry) {
        
        if(entry.generos.length != 0){
            var genres = entry.generos[0].split(',');
            entry.generos = genres;
            entry.save(function(err, updatedMovie) {
                if(err) console.log(err);
            });
        }

    }).on('end', function(){

        res.json({ mensagem: 'Entradas normalizadas' });

    });

});

module.exports = router;
