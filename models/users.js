var mongoose = require('./db');

var userSchema = mongoose.Schema({
    username: String,
    password: String
});

exports.model = mongoose.model('users', userSchema);
