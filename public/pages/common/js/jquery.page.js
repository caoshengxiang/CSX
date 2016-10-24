
/**
 * page turning Plugin
 * Copyright (c) 2016
 * @web site www.caoshengxiang.top
 * @author 曹胜祥
 * @version 1.1.0
 * @date 2016.10.14
 * 
 * 说明：
 * juery版本: jquery-3.0.0
 * bootstrap: 分页样式使用了bootstrap分页组件
 * 
 * 使用
 * @param obj {Object} 
 * $().showPage(obj);  $()页条显示的父标签
 * 可以链式使用$().showPage(obj).find();
 */


;(function() {
    $.fn.extend({
        /*
         * @param {object} 
         * option = {
         *     msgCount 消息总数
         *     url:  消息源地址
         *     msgel:  消息展示的父标签
         *     msgNum:    每页信息数
         * }
         * 
         * */
        showPage: function(option){
            var $me = this;
            var op = option;
            op.pageCount = Math.ceil(op.msgCount/op.msgNum);
            
            var Page = function() {
                this.page = 1;
                this.pageCount = op.pageCount;
                this.AjaxURL = op.url;
                
            };
            Page.prototype.createPageHtml = function() {
                
                //this.page = pageIndex ? pageIndex : 1;
                
                var str = '<nav><ul class="pagination pagination-lg">';
                    str += '<li class="disabled"><a>'+ this.page + '/' + this.pageCount +'</a></li>';
                    
                    if(this.page == 1) {
                        str += '<li class="disabled"><a>&laquo</a></li>'+
                                '<li class="disabled"><a>&lsaquo;</a></li>';
                    } else {
                        str += '<li><a href="#">&laquo;</a></li>'+
                                '<li><a href="#">&lsaquo;</a></li>';
                    }
                    if(this.page !=1){
                        str += '<li><a href="#">1</a></li>';
                    }
                    if(this.page >= 5) {
                        str += '<li class="disabled"><a href="javascript:void(0)">...</a></li>';
                    }
                    var startP = (this.page - 2) <= 0 ? 1 : (this.page - 2),
                        endP = (this.page + 2) > this.pageCount ? this.pageCount : (this.page + 2);
                    
                    for(var i = startP; i <= endP; i++) {
                        if(i == this.page) {
                            str += '<li  class="active"><a>' + i + '</a></li>';
                        } else {
                            if( i != 1 && i != this.pageCount){
                                str += '<li><a href="#">'+ i +'</a></li>';
                            }
                        }
                    }
                    if( this.page + 3 < this.pageCount){
                        str += '<li class="disabled"><a href="javascript:void(0)">...</a></li>';
                    }
                    if( this.page != this.pageCount ){
                        str += '<li><a href="#">'+ this.pageCount +'</a></li>';
                    }
                    if(this.page == this.pageCount) {
                        str += '<li class="disabled"><a>&rsaquo;</a></li>'+
                                '<li class="disabled"><a>&raquo;</a></li>';
                    } else {
                        str += '<li><a href="#">&rsaquo;</a></li>'+
                               '<li><a href="#">&raquo;</a></li>';
                    }
                    str += '</ul></nav>'
                return str;
            };
            Page.prototype.check = function() {
                if (isNaN(parseInt(this.page))) this.page = 1;
                if (isNaN(parseInt(this.pageCount))) this.pageCount = 1;
                if (this.page < 1) this.page = 1;
                if (this.pageCount < 1) this.pageCount = 1;
                if (this.page > this.pageCount) this.page = this.pageCount;
                this.page = parseInt(this.page);
                this.pageCount = parseInt(this.pageCount);
            };
            Page.prototype.getPage = function(index) {
                this.page = index;
            };
            Page.prototype.turnTo = function(index) {
                this.getPage(index);
                $me.html(this.createPageHtml());
                this.eventListener();
            };
            Page.prototype.eventListener = function() {
                var pageSelf = this;
                $('nav .pagination li').click(function(e) {
                    if(!$(this).hasClass('disabled') && !$(this).hasClass('active')){
                       var text = $(this).find('a').text();
                       var index = pageSelf.page;
                       if(text === '«'){
                           index = 1;
                       }else if(text === '‹'){
                           index = pageSelf.page -1;
                       }else if(text === '›'){
                           index = pageSelf.page + 1;
                       }else if(text === '»'){
                           index = pageSelf.pageCount;
                       }else {
                           var pageIndex = Math.floor(text);
                           index = pageIndex;
                       }
                       
                       $.ajax({
                            type:"post",
                            url: pageSelf.AjaxURL,
                            async:true,
                            data: {
                                index: index,
                                msgNum: op.msgNum
                            },
                            success: function(data) {
                                pageSelf.turnTo(index);
                                pageSelf.showMessagePage(data);
                                console.log(data.length);
                            },
                            error: function(){
                                console.log("err");
                            }
                        });              
                    }
                });
            };
            Page.prototype.showMessagePage = function(data) {
                var el = $(op.msgel),
                    str ='',
                    len = op.msgNum;
                    if(this.page == this.pageCount){
                        len = op.msgCount - (op.pageCount-1) * op.msgNum;
                    }
                    for(var i = 0; i < len; i++){
                        if(data[i].type === 1){
                           if(data[i].subject && data[i].message && data[i].name && data[i].email && data[i].time){
                                str += '<div class="row messageItem" data-id="'+data[i]._id+'">'+
                                        '<div class="col-md-12 col-sm-12 subject">主题: <span class="subShow">' + data[i].subject +'</span></div>'+
                                        '<div class="col-md-4 col-sm-12 name">'+data[i].name+'</div>'+
                                        '<div class="col-md-3 col-sm-12 email">'+data[i].email+'</div>'+
                                        '<div class="col-md-3 col-sm-12 time">'+data[i].time+'</div>'+
                                        '<div class="col-md-12 col-sm-12 message">'+data[i].message+'</div>'+
                                        '<div class="col-md-12 col-sm-12 Interaction">' +
                                            '<span class="theFloor">'+ data[i].id +'楼</span>'+
                                            '<a class="praiseBTN"><i class="fa fa-thumbs-o-up fa-lg"></i><span>' +(data[i].praise?data[i].praise:0)+ '</span></a>' +
                                            '<a class="commentsBTN" href="/message/comments/'+ data[i]._id +'"><i class="fa fa-comments-o fa-lg"></i><span>' +data[i].comments.length+ '</span></div></a>' +    
                                    '</div>';
                            } 
                        } else if(data[i].type === 2){
                            
                        }       
                    }
                    el.html(str);
                    
                    $('.praiseBTN').bind( 'click', function(){
                        var id = $(this).parents('.messageItem').attr('data-id');
                        var $meBtn = $(this);
                        $.ajax({
                            type:"get",
                            url:"/message/praise",
                            async:true,
                            data: {
                                _id: id,
                                praise: true
                            },
                            success: function(data){
                                $meBtn.find("span").html(data.praise);
                                $meBtn.css({"color": "red"});
                                $meBtn.unbind('click');
                            },
                            error: function(){
                                console.log("err");
                            }
                        });
                    });
                    $('.commentsBTN').bind('click', function(){
                        var id = $(this).parents('.messageItem').attr('data-id');
                        var $meBtn = $(this);
                        $.get('/data/currentUser', function(data){
                            if(!data.user){
                                alert("请先在左上方登录！");
                            }else{
                                
                            }
                        })
                    });
              
            };
            Page.prototype.init = function() {
                var pageSelf = this;
                
                this.check();
                $.ajax({
                    type:"post",
                    url: pageSelf.AjaxURL,
                    async:true,
                    data: {
                        index: 1,
                        msgNum: op.msgNum
                    },
                    success: function(data) {
                        pageSelf.turnTo(1);
                        pageSelf.showMessagePage(data);
                       
                    },
                    error: function(){
                        console.log("err");
                    }
                }); 
                
            };
            
            
            
            
            var pg = new Page(op.pageCount);
            pg.init();
            return this;        
        }
    })
})($, jQuery);
