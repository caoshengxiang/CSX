var express = require('express');
var router = express.Router();

var data_format = require('../base/date_format');//时间处理
var msg = require('../models/message');

router.get('/', function(req, res, next) {//渲染消息
    req.session.navIndex = 2;
    res.render('message/message', {user: req.session.username, navIndex: 2});
});
router.post('/send', function(req, res, next) {//发消息
   var name = req.body.name,
       email = req.body.email,
       subject = req.body.subject,
       message = req.param("message"),
       time = data_format.getNowDate();
   
   /*msg.model.aggregate([
       {
           
       }
   ])*/
   msg.model.count( function(err, count) {
       var doc = {
                  id: count + 1,
                  type: 1,//@parem 1:首页发送消息  2：message页留言
                  name: name,
                  email: email, 
                  subject:subject,
                  message: message,
                  time: time,
                  praise: 0
                 };
       
       msg.model.create(doc, function(err, doc) {
           if(err){
               console.log(err);
           } else {
               res.redirect('/message')
           }
       });    
   });
   
   
   
});
/*router.post('/postmessage', function(req, res, next) {//所有消息
    msg.model.find({},{type:1, subject: 1, message: 1, name: 1, email: 1, time: 1, praise: 1, comments: 1, _id: 1}, function(err, result){
        if(!err){
            res.json(result);
        }
    });
});*/
router.get('/praise', function(req, res, next){//点赞
    var dataId = req.query._id,
        praise = req.query.praise,
        praiseNum = 0;
    msg.model.find({_id: dataId}, {praise: 1}, function(err, result) {
        praiseNum = result[0].praise + 1;
        
        res.send({praise: praiseNum});
        
        msg.model.update(
            {_id: dataId},
            {$set: {praise: praiseNum}}, 
            {
                upsert: false,
                multi: true
            },function(err) {
                if(err) {
                    console.log(err);
                } else {
                  console.log("update ok!");  
                }
            }
        );
    });
    //替代上面的方法
    /*getNewID(doc._id);
    function getNewID(n){
        msg.model.findByIdAndUpdate(
            {_id: n},
            {$inc:{'id':1}},
            function(err, f_doc) {
                console.log(f_doc);
            }
        );
    };*/
    
});
router.get('/comments/:msgid', function(req, res, next) {//评论
    var user = req.session.username;
    var msgid = req.params.msgid;
    var data = {};
    if(user){
        msg.model.find({_id: msgid}, function(err, result){
            
            data = {
                user: user?user:null,
                theMsg: result[0],
                navIndex: 2
            }
            
            res.render('message/comments', data);
        });    
    }
});
router.post('/comments/send/:msgid', function(req, res, next) {//用户评论
    var user = req.session.username;
    var commentmsg = req.body.massage;
    var msgid = req.params.msgid;
    var praiseNum = null;
    
    if(user){
        
        msg.model.find({_id: msgid}, {comments: 1}, function(err, result){
            
            commentNum = result[0].comments.length + 1;
            var theComment = {
                        "id": commentNum,
                        "username": user?user:null,
                        "commentmsg": commentmsg,
                        "time": data_format.getNowDate(),
                        "praise": 0
                    }    
            
            msg.model.update({_id: msgid}, {$push: {comments: theComment}}, {
                        upsert: false,
                        multi: true
                    }, function(err) {
                        if(err){
                            console.log(err);
                        }else {
                            res.send({state: true, addComment: theComment, commentNum: commentNum});
                        }
                    })
        });
        
    
        
    }
    
});
router.get('/comments/praise/:id', function(req, res, next){
    var comment_id = Math.floor(req.query.comment_id);
    var msg_id = req.query.msg_id;
   
    msg.model.find({_id: msg_id}, function(err, result) {
       if(!err){
           var commentPraiseNum = result[0].comments[comment_id - 1].praise +1;
           res.send({commentPraiseNum: commentPraiseNum});
       }
        msg.model.update({_id: msg_id, 'comments.id': comment_id}, {$set: {"comments.$.praise": commentPraiseNum}},{
                    upsert: false,
                    multi: true
                }, function(err) {
                    if(err){
                        console.log(err);
                    }
        });    
    });
    
    
   
   //console.log(typeof comment_id +comment_id+ " " + msg_id);
});

/*评论*/




module.exports = router;
