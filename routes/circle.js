var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
   var user = req.session.username;
   req.session.navIndex = 3; 
   res.render('circle/circle', {navIndex: 3, user: user});
   
});





module.exports = router;