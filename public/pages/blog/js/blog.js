(function() {
    $('.MyBlog').click(function() {
       $.get('/data/currentUser', function(data){
          if(data.user){
              window.location.href = '/blog/myBlog';
          } else {
              alert('请登录！！！');
          }
       });
       /*$.ajax({
       	type:"get",
       	url:"/data/currentUser",
       	async:true,
       	success: function(data) {
       	    if(data.user){
       	        window.location.href = '/blog/myBlog';
       	    }else{
       	        alert('请登录！！！');
       	    }
       	    
       	},
       	err: function() {
       	    console.log("error");
       	}
       });*/
    });
    
    $('.writeBlog').click(function() {
       $.get('/data/currentUser', function(data){
          if(data.user){
              window.location.href = '/blog/writeBlog';
          }else{
              alert('请登录！！！');
          }
       });
    });
})($, jQuery);
