const Mongoose = require('mongoose');
let Schema = Mongoose.Schema;

let schema = new Schema({
    fields: {
        directors: [String],
        release_date: String,
        rating: {
            type: Number,
            min: 0,
            max: 10
        },
        genres: [String],
        image_url: {
            type: String,
            match: /.jpg|.png|.gif$/i
        },
        plot: {
            type: String,
            minLength: 0,
            maxLength: 64
        },
        title: {
            type: String,

            required: 'Le champ title est obligatoire'
        },

        rank: {
            type: Number,

            validate: {
                validator: function (value) {
                    return value < 20;


                },
                message: "Le champ n'a pas été complété correctement"
            }
        },
        running_time_secs: Number,
        actors: [String],
        year: Number,
        production: {
            company: String,
            director: String
        },
       
    },
    id: String,
    type: String

});

module.exports = Mongoose.model('Movie', schema)