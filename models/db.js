var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/caosx");
module.exports = mongoose;