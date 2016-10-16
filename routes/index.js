var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '自由人', siteName: 'Freeboy'});
  req.session.navIndex = 1;
});

module.exports = router;
