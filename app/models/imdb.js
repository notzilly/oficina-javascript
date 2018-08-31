var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var ImdbSchema = new Schema({
    titleType: {
        type: String,
        required: [true, 'O tipo deste registro é obrigatório.']
    },
    primaryTitle: {
        type: String,
        required: [true, 'Título primário é obrigatório.']
    },
    originalTitle: {
        type: String,
        required: [true, 'Título original é obrigatório.']
    },
    startYear: {
        type: Number,
        required: [
            function() { return this.endYear != null; },
            'Ano inicial é obrigatório se ano final for especificado.'
        ],
        min: [1850, 'O campo ano inicial deve ser maior que 1850.'],
        max: [2018, 'Anos futuros para ano inicial não são permitidos.']
    },
    endYear: {
        type: Number,
        validate: {
            validator: function(v) { return v >= this.startYear; },
            message: function() { return 'O campo ano de término deve ser igual ou maior ao ano inicial.'; }
        },
        max: [2018, 'Ano de término não pode ser maior que 2018.']
    },
    runtimeMinutes: {
        type: Number,
        required: [true, 'Duração é um campo obrigatório'],
        min: [5, 'Duração mínima de 5 minutos.']
    },
    genres: {
        type: Array,
        required: [true, 'Pelo menos um gênero deve ser especificado.'],
        validate: {
            validator: function(array) { return array.every(v => typeof v === 'string' && v !== ''); },
            message: function() { return 'Os gêneros estão formatados incorretamente.' }
        }
    }
});

ImdbSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Imdb', ImdbSchema, 'imdb');
