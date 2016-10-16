var express = require('express');
var router = express.Router();

var users = require('../models/users');
var crypto = require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/login', function(req, res, next) {
   res.render('users/login', {title: "登录", tips: "点击返回按钮可以返回"}); 
});

router.post('/loginTest', function(req, res, next) {
   var md5 = crypto.createHash('md5');
   
   
   var username = req.body.username,
       password = md5.update(req.body.password).digest('base64');
       
   users.model.find({username: username}, function(err, result){
       if(err){
           console.log("err err err err err");
       } else {
           if(result.length > 0){
              if(result[0].password === password){
                  req.session.username = username;
                  var navIndex = req.session.navIndex;
                   if(navIndex === 2){
                      res.redirect('/message');
                   } else if(navIndex === 3) {
                       res.redirect('/circle');
                   } else if(navIndex === 4) {
                       res.redirect('/blog');
                   } else{
                       res.redirect('/')
                   }
                  console.log(username + "登录成功");
              }else {
                  res.render('users/login', {title: "登录", tips: "密码错误！！！"}); 
              }
           }else if(result.length == 0){
               res.render('users/login', {title: "登录", tips: "用户名不存在！"}); 
           }
       }
   });
});

router.get('/logout', function(req, res, next) {
   req.session.username = null;
   var navIndex = req.session.navIndex;
   if(navIndex === 2){
      res.redirect('/message');
   } else if(navIndex === 3) {
       res.redirect('/circle');
   } else if(navIndex === 4) {
       res.redirect('/blog');
   } else{
     res.redirect('/')
   }
});

router.get('/register', function(req, res, next) {
    res.render('users/register', {title: "注冊", tips: "点击返回按钮可以返回"}); 
});

router.post('/registerTest', function(req, res, next) {
    var md5 = crypto.createHash('md5');
    
    var username = req.body.username,
        password = md5.update(req.body.password).digest('base64');
    users.model.find({username: username}, function(err, result) {
       if(!err){
           if(result.length > 0){
               console.log("用户名存在");
               res.render('users/register', {title: "注冊", tips: "用户名存在！！！"}); 
           } else {
               console.log('注册中');
                users.model.create({username: username, password: password}, function(err){
                    if(err){
                        console.log(err);
                    } else {
                        res.redirect('/users/login');
                    }
                });           
           }
       }
    });
    
});

router.get('/loginOrRegister_back', function(req, res, next) {
      var navIndex = req.session.navIndex;
       if(navIndex === 2){
          res.redirect('/message');
       } else if(navIndex === 3) {
           res.redirect('/circle');
       } else if(navIndex === 4) {
           res.redirect('/blog');
       } else{
          res.redirect('/')
       }
       
});


module.exports = router;
