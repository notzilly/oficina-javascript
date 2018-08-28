var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImdbSchema = new Schema({
    titleType: String,
    primaryTitle: String,
    originalTitle: String,
    startYear: Number,
    endYear: Number,
    runtimeMinutes: Number,
    genres: [String]
});

module.exports = mongoose.model('Imdb', ImdbSchema, 'imdb');
