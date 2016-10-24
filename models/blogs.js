var mongoose = require('./db');

var blogSchema = mongoose.Schema({
   username: String,
   title: String,
   tags: Array,
   html: String,
   secrecyState: Number,
   time: String
});

exports.model = mongoose.model('blogs', blogSchema);
