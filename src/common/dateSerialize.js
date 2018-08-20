let dateSerialize = (nowDate, type) => {
    var nowDate = new Date(nowDate);
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1;
    month = month * 1 < 10 ? "0" + month : month;
    var day = nowDate.getDate();
    day = day * 1 < 10 ? "0" + day : day;
    if (type == "month") {
        var thismonth = year + "-" + month;
        return thismonth;
    } else if (type == "day") {
        var todayStr = year + "-" + month + "-" + day;
        return todayStr;
    }
};
let todayStr = dateSerialize(new Date(), "day"); // 初始化默认开始查询日期
let yesterdayStr = dateSerialize(new Date() - 24 * 60 * 60 * 1000, "day"); // 初始化默认结束查询日期
let eightdayStr = dateSerialize(new Date() - 7 * (24 * 60 * 60 * 1000), "day"); // 8天前
let thisMonthStr = dateSerialize(new Date(), "month"); // 初始化默认开始查询日期
let lastMonthStr = dateSerialize(new Date() - 30 * (24 * 60 * 60 * 1000), "month"); // 初始化默认开始查询日期

let today_ = new Date();
let yesterday_ = new Date(new Date() - 24 * 60 * 60 * 1000);
let eightday_ = new Date(new Date() - 7 * (24 * 60 * 60 * 1000));
let thisMonth_ = new Date(thisMonthStr);
let lastMonth_ = new Date(lastMonthStr);
/*
*获取今日的起始和结束时间
*返回值："起始时间,结束时间"
*/
function ToDayStr() {
    var returnStr = "";
    var date = new Date();      //当前时间
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    returnStr = year + "/" + month + "/" + day + " 00:00:00,";       //起始时间
    returnStr += year + "/" + month + "/" + day + " 23:59:59";      //结束时间
    return returnStr;
}

/*
*获取昨日的起始和结束时间
*返回值："起始时间,结束时间"
*/
function YesterDayStr() {
    var date = GetDate(1, 1);       //当前时间前一天
    var returnStr = "";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    returnStr = year + "/" + month + "/" + day + " 00:00:00,";       //起始时间
    returnStr += year + "/" + month + "/" + day + " 23:59:59";      //结束时间
    return returnStr;
}
/*
*获取当前日期前N天或后N日期(N = day)
*type:1：前；2：后
*/
function GetDate(day, type) {
    var zdate = new Date();
    var edate;
    if (type === 1) {
        edate = new Date(zdate.getTime() - (day * 24 * 60 * 60 * 1000));
    } else {
        edate = new Date(zdate.getTime() + (day * 24 * 60 * 60 * 1000));
    }
    return edate;
}
/*
*获取传入的日期前N天或后N日期(N = day)
*type:1：前；2：后
*date：传入的日期
*/
function GetDate2(day, type, date) {
    var zdate;
    if (date === null || date === undefined) {
        zdate = new Date();
    } else {
        zdate = date;
    }
    var edate;
    if (type === 1) {
        edate = new Date(zdate.getTime() - (day * 24 * 60 * 60 * 1000));
    } else {
        edate = new Date(zdate.getTime() + (day * 24 * 60 * 60 * 1000));
    }
    return edate;
}
/*
*获取本周的起始和结束时间
*返回值："起始时间,结束时间"
*/
function ThisWeekStr() {
    var returnStr = "";
    var date = new Date();      //当前时间
    var week = date.getDay();   //获取今天星期几
    var monday = GetDate2(week - 1, 1, date);      //获取星期一
    var sunday = GetDate2(7 - week, 2, date);   //获取星期天
    //起始时间的年月日
    var year1 = monday.getFullYear();
    var month1 = monday.getMonth() + 1;
    var day1 = monday.getDate();
    //结束时间的年月日
    var year2 = sunday.getFullYear();
    var month2 = sunday.getMonth() + 1;
    var day2 = sunday.getDate();
    //处理起始时间小于10的追加"0"在前面
    month1 = month1 < 10 ? "0" + month1 : month1;
    day1 = day1 < 10 ? "0" + day1 : day1;
    //处理结束时间小于10的追加"0"在前面
    month2 = month2 < 10 ? "0" + month2 : month2;
    day2 = day2 < 10 ? "0" + day2 : day2;

    returnStr = year1 + "-" + month1 + "-" + day1 + " 00:00:00,";       //起始时间
    returnStr += year2 + "-" + month2 + "-" + day2 + " 23:59:59";      //结束时间
    return returnStr;
}
/*
*获取上周的起始和结束时间
*返回值："起始时间,结束时间"
*/
function LastWeekStr() {
    var returnStr = "";
    var date = new Date();      //当前时间
    var week = date.getDay();   //获取今天星期几
    var monday = GetDate2(week + 6, 1, date);      //获取上周星期一
    var sunday = GetDate2(week, 1, date);          //获取上周星期天
    //起始时间的年月日
    var year1 = monday.getFullYear();
    var month1 = monday.getMonth() + 1;
    var day1 = monday.getDate();
    //结束时间的年月日
    var year2 = sunday.getFullYear();
    var month2 = sunday.getMonth() + 1;
    var day2 = sunday.getDate();
    //处理起始时间小于10的追加"0"在前面
    month1 = month1 < 10 ? "0" + month1 : month1;
    day1 = day1 < 10 ? "0" + day1 : day1;
    //处理结束时间小于10的追加"0"在前面
    month2 = month2 < 10 ? "0" + month2 : month2;
    day2 = day2 < 10 ? "0" + day2 : day2;

    returnStr = year1 + "-" + month1 + "-" + day1 + " 00:00:00,";       //起始时间
    returnStr += year2 + "-" + month2 + "-" + day2 + " 23:59:59";      //结束时间
    return returnStr;
}
export {
    dateSerialize,
    todayStr,
    yesterdayStr,
    eightdayStr,
    thisMonthStr,
    lastMonthStr,
    today_,
    yesterday_,
    eightday_,
    thisMonth_,
    lastMonth_,
    ThisWeekStr,
    LastWeekStr
}