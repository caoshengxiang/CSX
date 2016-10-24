var express = require('express');
var router = express.Router();

var blogs = require('../models/blogs');

var date_format = require('../base/date_format');

router.get('/', function(req, res, next) {
    var user = req.session.username;
    req.session.navIndex = 4;
    
    blogs.model.find({'$or': [{secrecyState: 0}, {secrecyState: null}, {secrecyState: undefined}]}, {_id: 1,title: 1, tags: 1}).sort({'_id': -1}).exec(function(err, result) {
        res.render('blog/blog', {navIndex: 4, user: user, data: result});
    });
});

router.get('/myBlog', function(req, res, next) {
    var user = req.session.username;
    req.session.navIndex = 4;
    if(user){
        blogs.model.find({username: user}, {_id: 1,title: 1, tags: 1}, {sort: {'_id': -1}}, function(err, result) {
            res.render('blog/blog', {navIndex: 4, user: user, data: result});
        });    
    }
    
});

router.get('/blogDetail/:id', function(req, res, next) {
    var id = req.params.id;
    var user = req.session.username;
    
    blogs.model.find({_id: id}, function(err, result){
        if(!err){
            res.render('blog/blogDetail', {navIndex: 4, user: user, data: result});
        }
    })
});




router.get('/writeBlog', function(req, res, next) {
    var user = req.session.username;
    req.session.navIndex = 4;
    if(user){
        res.render('blog/writeBlog', {navIndex: 4, user: user});
    }
    
    
});

router.post('/saveBlog', function(req, res, next) {
    var title_ = req.body.title,
        tags_ = req.body.tags.split(','),
        html_ = req.body.html,
        secrecyState_ = req.body.secrecyState,
        user = req.session.username;
    
    
    if(user){
        blogs.model.create({
            username: user,
            title: title_,
            tags: tags_,
            html: html_,
            secrecyState: secrecyState_,
            time: date_format.getNowDate()
        }, function(err){
            if(!err){
                res.send({o:'ok'});
            }
            
        });
    } else {
        
    }
});

module.exports = router;