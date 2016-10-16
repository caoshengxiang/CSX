(function(){
    $(function(){
        $.ajax({
            type:"post",
            url:"/message/postMessage",
            async:true,
            dataType: "json",
            success: function(data){
                
                
                
                var str ='',
                    el = $('.postMessage'),
                    len = data.length,
                    msgNum = 1,
                    pageCount = (len/msgNum) < 1 ? 1 : len/msgNum;
                     //  
                var set = {
                    pageCount : pageCount,
                    url: '/message/postMessage',
                    msgel: ".postMessage"
                };
                $('.turnPageBox').showPage(set);
                
                /*for(var i = len -1; i >= 0; i--){
                    if(data[i].type === 1){
                       if(data[i].subject && data[i].message && data[i].name && data[i].email && data[i].time){
                            str += '<div class="row messageItem" data-id="'+data[i]._id+'">'+
                                    '<div class="col-md-12 col-sm-12 subject">主题: <span class="subShow">' + data[i].subject +'</span></div>'+
                                    '<div class="col-md-4 col-sm-12 name">'+data[i].name+'</div>'+
                                    '<div class="col-md-3 col-sm-12 email">'+data[i].email+'</div>'+
                                    '<div class="col-md-3 col-sm-12 time">'+data[i].time+'</div>'+
                                    '<div class="col-md-12 col-sm-12 message">'+data[i].message+'</div>'+
                                    '<div class="col-md-12 col-sm-12 Interaction">' +
                                        '<span class="theFloor">'+ (i+1) +'楼</span>'+
                                        '<a class="praiseBTN"><i class="fa fa-thumbs-o-up fa-lg"></i><span>' +(data[i].praise?data[i].praise:0)+ '</span></a>' +
                                        '<a class="commentsBTN" href="/message/comments/'+ data[i]._id +'"><i class="fa fa-comments-o fa-lg"></i><span>' +data[i].comments.length+ '</span></div></a>' +    
                                '</div>';
                        } 
                    } else if(data[i].type === 2){
                        
                    }
                            
                }
                
                el.append(str).delegate('.praiseBTN', 'click', function(){
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
                            //el.undelegate($me, 'click');
                        },
                        error: function(){
                            console.log("err");
                        }
                    });
                })
                .delegate('.commentsBTN', 'click', function(){
                    var id = $(this).parents('.messageItem').attr('data-id');
                    var $me = $(this);
                    $.get('/data/currentUser', function(data){
                        console.log(data.user);
                        if(!data.user){
                            alert("请先在左上方登录！");
                        }else{
                            
                        }
                    })
                });*/
            },
            error: function(){
                console.log("err");
            }
        });
    });
})($,jQuery);
