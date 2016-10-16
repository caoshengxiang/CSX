
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
 * @param 当前页数
 * $().showPage(param);  
 * 可以链式使用如：$().showPage(param1, param2).find();
 */


;(function() {
    $.fn.extend({
        /*
         * @param pageCount 总共页数
         * 
         * */
        showPage: function(pageCount){
            var $me = this;
            var Page = function(pageCount) {
                this.page = 1;
                this.pageCount = pageCount;
                
            };
            Page.prototype.createPageHtml = function() {
                
                //this.page = pageIndex ? pageIndex : 1;
                
                var str = '<nav><ul class="pagination pagination-lg">';
                    str += '<li class="disabled"><a>'+ this.page + '/' + this.pageCount +'</a></li>';
                    
                    if(this.page == 1) {
                        str += '<li class="disabled"><a href="javascript:void(0);">&laquo</a></li>'+
                                '<li class="disabled"><a href="javascript:void(0);">&lsaquo;</a></li>';
                    } else {
                        str += '<li><a href="javascript:void(0);">&laquo;</a></li>'+
                                '<li><a href="javascript:void(0);">&lsaquo;</a></li>';
                    }
                    if(this.page !=1){
                        str += '<li><a href="javascript:void(0);">1</a></li>';
                    }
                    if(this.page >= 5) {
                        str += '<li class="disabled"><a href="javascript:void(0);">...</a></li>';
                    }
                    var startP = (this.page - 2) <= 0 ? 1 : (this.page - 2),
                        endP = (this.page + 2) > this.pageCount ? this.pageCount : (this.page + 2);
                    
                    for(var i = startP; i <= endP; i++) {
                        if(i == this.page) {
                            str += '<li  class="active"><a>' + i + '</a></li>';
                        } else {
                            if( i != 1 && i != this.pageCount){
                                str += '<li><a href="javascript:void(0);">'+ i +'</a></li>';
                            }
                        }
                    }
                    if( this.page + 3 < this.pageCount){
                        str += '<li class="disabled"><a href="javascript:void(0);">...</a></li>';
                    }
                    if( this.page != this.pageCount ){
                        str += '<li><a href="javascript:void(0);">'+ this.pageCount +'</a></li>';
                    }
                    if(this.page == this.pageCount) {
                        str += '<li class="disabled"><a href="javascript:void(0);">&rsaquo;</a></li>'+
                                '<li class="disabled"><a href="javascript:void(0);">&raquo;</a></li>';
                    } else {
                        str += '<li><a href="javascript:void(0);">&rsaquo;</a></li>'+
                               '<li><a href="javascript:void(0);">&raquo;</a></li>';
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
                       console.log(text);
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
                       pageSelf.turnTo(index);
                    }
                });
            };
            Page.prototype.init = function() {
                this.check();
                this.turnTo(1);
            };
            
            var pg = new Page(pageCount);
            pg.init();
            return this;        
        }
    })
})($, jQuery);
