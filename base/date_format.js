
   function getNowDate(){
        var date = new Date();
        var year = date.getFullYear(),
        month = (date.getMonth()+1)>=10?(date.getMonth()+1):'0'+(date.getMonth()+1),
        day = date.getDate()>=10?date.getDate():'0'+date.getDate(),
        hour = date.getHours()>=10?date.getHours():'0'+date.getHours(),
        minutes = date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes(),
        seconds = date.getSeconds()>=10?date.getSeconds():'0'+date.getSeconds();
        return year+ '/' +month + '/' + day +' '+ hour +":"+ minutes;
    };
    

module.exports = {
    getNowDate: getNowDate
}
