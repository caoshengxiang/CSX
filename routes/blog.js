var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var user = req.session.username;
    req.session.navIndex = 4;
    res.render('blog/blog', {navIndex: 4, user: user});
    
});



module.exports = router;