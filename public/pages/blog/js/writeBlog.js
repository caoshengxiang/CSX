(function(){
    //标签
    $("#blogTag").tabControl({maxTabCount:5,tabW:80});
    
    //编辑器
    var bars = [[
            'fullscreen','source','|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 
            'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 
            'link', 'unlink', '|', 
            'emotion', 'insertframe', 'insertcode', '', 'pagebreak', 'template', 'background', '|',
            'horizontal', 'date', 'time', 'spechars','|',
            'preview', 'searchreplace', 'help'
        ]];
    var ue = UE.getEditor('editor', {
        toolbars: bars
    });
    
    
    $('#btnBlog').click(function(){
        
        var title = $('#blogTitle').val();
        
        
        var v = $("#blogTag").getTabVals();
        
        var content = ue.getContent();
        
        var secrecyState = document.querySelector("#secrecyState").checked?1:0;
        
        
        if(!title){
            alert('请输入标题！');
        } else if(v.length <= 0) {
            alert('添加标签');
        } else if(!content) {
            alert('文章内容不能为空！');   
        } else{
            var dt = {
                title: title,
                tags: v.join(','),
                html: content,
                secrecyState: secrecyState
            };
            $.ajax({
            	type:"post",
            	url:"/blog/saveBlog",
            	async:true,
            	data: dt,
            	dataType: 'json',
            	success: function(data){
            	    alert('发布成功');
            	    console.log(data);
            	    window.location.reload();
            	},
            	error: function(){
            	    console.log("save blog err");
            	}
            });
        }
        
    });
    
    
    $('.MyBlog').click(function() {
       $.get('/data/currentUser', function(data){
          if(data.user){
              window.location.href = '/blog/myBlog';
          } else {
              alert('请登录！！！');
          }
       });
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
