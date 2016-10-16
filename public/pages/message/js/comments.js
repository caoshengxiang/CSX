(function(){
    $('.commentBtn').click(function() {
       var msg = $('.commentMessage').val();
       var msg_id = $('.messageItem').attr("data-id");
       if(msg){
             $.post("/message/comments/send/"+msg_id, {massage: msg}, function(data){
                //console.log(data);
                if(data.state){
                    $('.commentMessage').val("");
                    var com = data.addComment;
                    var StrList = '<div comment-id="'+com.id+'" class="list_li S_line1 clearfix">'+
                             '<div class="col-md-12"><span class="commentFormUser">'+ com.username +': </span><span class="userCommentMsg">'+ com.commentmsg +'</span></div>'+
                             '<div class="col-md-12 time_praise">'+
                                 '<span class="commentTime">'+ com.time + '</span>'+
                                 '<span class="clickCommentPraise"><i class="fa fa-thumbs-o-up"></i><span class="commentPraiseNum">'+com.praise+'</span></span>'+
                             '</div></div>';
                             
                    $('.list_ul').html(StrList + $('.list_ul').html());
                    $('.clickCommentPraise').unbind('click');
                    $('.clickCommentPraise').bind('click' ,function(){
                     
                        var comment_id = $(this).parents('.list_li').attr('comment-id');
                        var msg_id = $('.messageItem').attr('data-id');
                        var $me = $(this);
                        $.ajax({
                            type:"get",
                            url:"/message/comments/praise/"+comment_id,
                            async:true,
                            data: {
                                comment_id: comment_id,
                                msg_id: msg_id
                            },
                            success: function(data){
                                $me.find("span").html(data.commentPraiseNum);
                                $me.css({"color": "red"});
                                $me.undelegate('.clickCommentPraise', 'click');
                                $(this).unbind('click');
                            },
                            error: function(){
                                console.log("err");
                            }
                        });
                     
                     
                    });
                    $('.commentsNum').text(data.commentNum);
                    
                } else {
                    alert("评论失败！！！");
                }
                
             });
       }else{
           alert("先输入评论内容");
       }
    });
    
    $('.praiseBTN').bind('click', function() {
                    var id = $(this).parents('.messageItem').attr('data-id');
                    var $me = $(this);
                    $.ajax({
                        type:"get",
                        url:"/message/praise",
                        async:true,
                        data: {
                            _id: id,
                            praise: true
                        },
                        success: function(data){
                            $me.find("span").html(data.praise);
                            $me.css({"color": "red"});
                            $me.unbind('click');
                        },
                        error: function(){
                            console.log("err");
                        }
                    });
    });
    $('.clickCommentPraise').bind('click', function() {
                    var comment_id = $(this).parents('.list_li').attr('comment-id');
                    var msg_id = $('.messageItem').attr('data-id');
                    var $me = $(this);
                    $.ajax({
                        type:"get",
                        url:"/message/comments/praise/"+comment_id,
                        async:true,
                        data: {
                            comment_id: comment_id,
                            msg_id: msg_id
                        },
                        success: function(data){
                            $me.find("span").html(data.commentPraiseNum);
                            $me.css({"color": "red"});
                            $me.unbind('click');
                        },
                        error: function(){
                            console.log("err");
                        }
                    });
    });
    
    
    
                    
})($, jQuery)
