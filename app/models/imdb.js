var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var ImdbSchema = new Schema({
    tipoTitulo: {
        type: String,
        required: [true, 'O tipo deste registro é obrigatório.']
    },
    tituloPrimario: {
        type: String,
        required: [true, 'Título primário é obrigatório.']
    },
    tituloOriginal: {
        type: String,
        required: [true, 'Título original é obrigatório.']
    },
    anoInicio: {
        type: Number,
        required: [
            function() { return this.anoFim != null; },
            'Ano inicial é obrigatório se ano final for especificado.'
        ],
        min: [1850, 'O campo ano inicial deve ser maior que 1850.'],
        max: [2018, 'Anos futuros para ano inicial não são permitidos.']
    },
    anoFim: {
        type: Number,
        validate: {
            validator: function(v) { return v >= this.anoInicio; },
            message: function() { return 'O campo ano de término deve ser igual ou maior ao ano inicial.'; }
        },
        max: [2018, 'Ano de término não pode ser maior que 2018.']
    },
    duracaoMinutos: {
        type: Number,
        required: [true, 'Duração é um campo obrigatório'],
        min: [5, 'Duração mínima de 5 minutos.']
    },
    generos: {
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
