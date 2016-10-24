var express = require('express');
var router = express.Router();
var msg = require('../models/message');
var users = require('../models/users');

router.get('/currentUser', function(req, res, next) {
    
    res.json({user: req.session.username});
});

router.post('/page/message', function(req, res, next) {
    
    var msgnum = Math.floor(req.body.msgNum),//一页数据条数
        index = Math.floor(req.body.index);//当前页号
        
    /*msg.model.count(function(err, count) {
        if(!err){
            var start = (count - index * msgnum + 1) < 0? 1 : (count - index * msgnum + 1),
            end = (count - index * msgnum + 1) + msgnum - 1;
            msg.model.find({'id': {$gte: start, $lte: end}},{type:1,id: 1, subject: 1, message: 1, name: 1, email: 1, time: 1, praise: 1, comments: 1, _id: 1}, function(err, result){
                if(!err){
                    res.json(result);
                }
            });        
        }
    }); */
   /*msg.mdel.find(
       {},
       {type:1,id: 1, subject: 1, message: 1, name: 1, email: 1, time: 1, praise: 1, comments: 1, _id: 1}, 
       {
            {sort: [['_id': -1]]}   
       }
   );*/
  msg.model.find({}).sort({'_id': -1}).skip((index -1) * msgnum).limit(msgnum).exec(function(err, result) {
      if(!err){
          res.json(result);
      }
  });
    
});
router.get('/page/messageCount', function(req, res, next) {
    msg.model.count(function(err, count) {
        if(!err){
            res.json({count: count});
        }
    });
})
module.exports = router;
