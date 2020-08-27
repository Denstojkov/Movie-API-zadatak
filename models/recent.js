 const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const Recent = new Schema({
    Title: String,
    Year: String,
    Genre: String,
    Actors: String,
    Plot: String,
    Poster: String
});
 
 
module.exports = mongoose.model('Recent', Recent);