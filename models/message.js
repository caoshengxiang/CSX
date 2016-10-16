
var mongoose = require('./db');

var Schema = mongoose.Schema;
var msgSchema = Schema({
    id: Number,
    subject: String,
    message: String,
    name: String,
    email: String,
    time: String,
    type: Number,
    praise: Number,
    comments: []
    
});

exports.model = mongoose.model('messages', msgSchema);