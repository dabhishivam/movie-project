const { Schema, model } = require("mongoose");
const common = {
    type: String,
    require: true,
    trim: true
}
const movieSchema = new Schema({
    movie_name: String,
    movie_price: {
        ...common,
        type: Number,
    },
    movie_description: common,
    thumbnail: String,
    movie_image: {
        type: []
    }
})
const Movie = model('movie', movieSchema)
module.exports = Movie