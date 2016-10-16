;(function() {
    $.get('/data/currentUser', function(data) {
        if(data.user){
            $('#name').val(data.user).attr('readonly', 'true');
        }
    });
    $('.sendMessage').bind('click', function(e){
        e.preventDefault();
        var name = $('#name').val(),
            email = $('#email').val(),
            subject = $('#subject').val(),
            message = $('#message').val();
        var names = ['奈何桥上忽悠鬼', '予我心安', '北城以念', '情场老司机', '正在更新...', '浅&醉', 
                        '坟地操女鬼', '夜御百女枪不倒', '善解人衣♂', '心尖上的刺青', '顾我安稳', '戎马书生', 
                        '一人独身闯天涯', '好听的手游名字大全霸气', '墨。', '彼年豆蔻ら', '命里缺你', 
                        '固执到世界都毁灭', '听风暖', '敢爱敢恨敢放弃', '他是命却似梦', '爺们狠有范er', 
                        '情到浓时腿自开', '北栀', '羽衣蹁跹', '该用户名无法显示', '巷尾拾忆づ', '奔跑的蚂蚁', 
                        '塒尚ぐ謀侽孓', '崾赱の亽涐絕卟留', '不高不帅怪我咯', '从头酷到脚', '第一眼沦陷', '南风知我意', 
                        '几许轻唱', '非洲小白脸', '感情废物', '迷人的混蛋', '凉城温酒', '听闻余生', '一身傲娇味儿', 
                        '撑起自己的一片天', '梦里清欢长', '情感通缉犯', '乍见之欢', '不讨喜', '許伱①ぜ海誓山盟', 
                        '浅唱低吟', '醉卧美人膝', '心软却想酷', '执扇问佳人', '一声兄弟大过天']
        
        if(!message){
            var strHtml = '<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content alertContent">请先输入要发送的消息内容！</div></div></div>';
                    
            $('.formAlert').empty().append(strHtml);
        } else {
            if(!name){
                var randomNum = Math.random() * names.length | 0;
                $('#name').val(names[randomNum] + ' （匿名用户）');
                if(!subject){
                    $('#subject').val('匿名信息');
                }
            } else {
                if(!subject){
                    $('#subject').val('无');
                }
            }
            if(!email){
                $('#email').val('********@***');
                $('.sendForm').submit();
            } else {
                var emailFilter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if(!emailFilter.test(email)){
                    //$('#email').attr({required: 'required', oninput:'setCustomValidity("邮件格式不正确")', oninvalid: 'this.setCustomValidity("emial values do not match.")'});
                    var strHtml = '<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content alertContent">邮件格式不正确</div></div></div>';
                    
                    $('.formAlert').empty().append(strHtml);
                } else {
                    $('.formAlert').empty();
                    $('.sendForm').submit();
                }
                
            }
            
            //console.log($('#name').val() +" "+ $('#email').val() +" "+ $('#subject').val() +" "+$('#message').val());
        }
    });
  
})($, jQuery);
