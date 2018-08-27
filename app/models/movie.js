var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    id: Number,
    primaryTitle: String,
    originalTitle: String,
    releaseYear: Number,
    runtimeMinutes: Number,
    genres: [{
        name: String
    }]
});

module.exports = mongoose.model('Movie', MovieSchema);
