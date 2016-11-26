exports.getDateDiff = function( dateTimeStamp ){
    var minute = 1000 * 60
    var hour = minute * 60
    var day = hour * 24
    var month = day * 30
    var now = new Date().getTime()
    var diffValue = now - dateTimeStamp
    if(diffValue < 0){ 
        // 非法操作
        return "数据出错"
    }
    var monthC = diffValue / month
    if( monthC >= 1 ){
        // 一个月前
        result = 1
    }else{
        // 一个月内
        result = 0
    }
    return result
}

exports.getDateDiff2 = function( dateTimeStamp ){
    var minute = 1000 * 60
    var hour = minute * 60
    var day = hour * 24
    var halfamonth = day * 15
    var month = day * 30
    var year = day * 365
    var now = new Date().getTime()
    var diffValue = now - dateTimeStamp
    if(diffValue < 0){
        // 非法操作
        return "数据出错"
    }
    var yearC = diffValue / year
    var monthC = diffValue / month
    var weekC = diffValue / (7 * day)
    var dayC = diffValue / day
    var hourC = diffValue / hour
    var minC = diffValue / minute
    if(yearC >= 1){
        result = parseInt(yearC) + "年以前"
    }else if(monthC >= 1){
        result = parseInt(monthC) + "个月前"
    }else if(weekC >= 1){
        result = parseInt(weekC) + "星期前"
    }else if(dayC >= 1){
        result = parseInt(dayC) + "天前"
    }else if(hourC >= 1){
        result = parseInt(hourC) + "小时前"
    }else if(minC >= 5){
        result = parseInt(minC) + "分钟前"
    }else{
        result = "刚刚发表"
    }
    return result
}