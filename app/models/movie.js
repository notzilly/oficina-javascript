var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    primaryTitle: String,
    originalTitle: String,
    releaseYear: Number,
    runtimeMinutes: Number,
    genres: [String]
});

module.exports = mongoose.model('Movie', MovieSchema);
