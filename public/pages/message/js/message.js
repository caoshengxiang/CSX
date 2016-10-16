(function(){
    $(function(){
        $.ajax({
        	type:"get",
        	url:"/data/page/messageCount",
        	async:true,
        	dataType: "json",
        	success: function(data){
        	    var len = data.count;

        	    var set = {
        	        msgCount: len,
        	        url: '/data/page/message',
        	        msgel: ".postMessage",
        	        msgNum: 10
        	    };
        	    $('.turnPageBox').showPage(set);

        	},
        	error: function(){
        	    console.log("err");
        	}
        });
    });
})($,jQuery);
