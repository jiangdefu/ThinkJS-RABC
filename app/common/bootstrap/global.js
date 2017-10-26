"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 * 
 * global.fn1 = function(){
 *     
 * }
 */

/**
 * in_array
 * @param stringToSearch
 * @param arrayToSearch
 * @returns {boolean}
 */
/* global in_array */
global.in_array = function (stringToSearch, arrayToSearch) {
    for (var s = 0; s < arrayToSearch.length; s++) {
        var thisEntry = arrayToSearch[s].toString();
        if (thisEntry == stringToSearch) {
            return true;
        }
    }
    return false;
};

/**
 * ip转数字
 * @param ip
 * @returns {number}
 * @private
 */
/* global _ip2int(ip)*/
global._ip2int = function (ip) {
    var num = 0;
    ip = ip.split(".");
    num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
    num = num >>> 0;
    return num;
};
/**
 * 数字转ip
 * @param num
 * @returns {string|*}
 * @private
 */
/*global _int2ip(num: number) */
global._int2iP = function (num) {
    var str;
    var tt = new Array();
    tt[0] = num >>> 24 >>> 0;
    tt[1] = num << 8 >>> 24 >>> 0;
    tt[2] = num << 16 >>> 24;
    tt[3] = num << 24 >>> 24;
    str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
    return str;
};

/**
 * 密码加密
 * @param password 加密的密码
 * @param md5encoded true-密码不加密，默认加密
 * @returns {*}
 */
/*global encryptPassword */
global.encryptPassword = function (password, md5encoded) {
    md5encoded = md5encoded || false;
    password = md5encoded ? password : think.md5(password);
    return think.md5(think.md5('THINKJS-RABC') + password + think.md5('DEVLIN'));
};
/**
 * @param date 要转化的时间
 * @param fmt 时间格式
 * @returns {*}
 */
global.Format = function (date, fmt) {
    var date = new Date(date);
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }return fmt;
};
/**
 * @param date 菜单对象
 * @param pid 父节点
 * @returns {*}
 */
global.sortMenu = function (menu, pid) {
    var m = menu.filter(function (ele) {
        return ele.pid == pid;
    });
    m.sort(function (a, b) {
        return a.sort - b.sort;
    });
    if (!think.isEmpty(m) && m.length > 0) {
        var _loop = function _loop(i) {
            var children = menu.filter(function (ele) {
                return ele.pid == m[i].id;
            });
            children.sort(function (a, b) {
                return a.sort - b.sort;
            });
            m[i].children = children;
        };

        for (var i = 0; i < m.length; i++) {
            _loop(i);
        }
    }
    return m;
};

/**
 * global times
 * 时间格式化
 * @param d
 * @returns {string}
 */
global.times = function (d, sec) {
    var time;
    var date = new Date(d);
    var y = date.getFullYear();
    var M = date.getMonth() + 1;
    M = M < 10 ? "0" + M : M;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    var h = date.getHours();
    h = h < 10 ? "0" + h : h;
    var m = date.getMinutes();
    m = m < 10 ? "0" + m : m;
    var s = date.getSeconds();
    s = s < 10 ? "0" + s : s;
    if (sec) {
        time = y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
    } else {
        time = y + "-" + M + "-" + d + " " + h + ":" + m;
    }

    return time;
};
/**
 * 时间格式化函数
 */
global.date_format = function (d, fmt) {
    var o = {
        "M+": d.getMonth() + 1, //月份 
        "d+": d.getDate(), //日 
        "h+": d.getHours(), //小时 
        "m+": d.getMinutes(), //分 
        "s+": d.getSeconds(), //秒 
        "q+": Math.floor((d.getMonth() + 3) / 3), //季度 
        "S": d.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }return fmt;
};

/**
 * 发送http请求
 * @param {*} method 发送方法
 * @param {*} data   发送数据
 * @param {*} url    请求地址
 * @param {*} option 请求头信息
 */
global.queryURL = function (method, data, url, option) {
    var request = require("superagent"); //加载模块
    var time_query = times(Date.now(), true);
    console.time("[" + time_query + "] [Request Time] 接口请求时长");
    var promise = new _promise2.default(function (resolve, reject) {
        if (method == "post") {
            option = think.extend({ 'Content-Type': 'application/x-www-form-urlencoded' }, option);
            request.post(url).set(option).send(data).timeout(10000).end(function (err, res) {
                if (!think.isEmpty(err)) {
                    think.log("请求接口失败 method:[" + method + "],option:[" + (0, _stringify2.default)(option) + "],data:[" + (0, _stringify2.default)(data) + "],url:[" + url + "],失败原因:" + err, think.env);
                    resolve(null);
                    think.reject(err);
                } else {
                    think.log("请求接口成功 method:[" + method + "],option:[" + (0, _stringify2.default)(option) + "],data:[" + (0, _stringify2.default)(data) + "],url:[" + url + "],接受数据:" + (0, _stringify2.default)(res.body), think.env);
                    resolve(res.body);
                }
            });
        } else {
            option = think.extend({}, option);
            request.get(url).set(option).query(data).timeout(10000).end(function (err, res) {
                if (!think.isEmpty(err)) {
                    think.log("请求接口失败 method:[" + method + "],option:[" + (0, _stringify2.default)(option) + "],data:[" + (0, _stringify2.default)(data) + "],url:[" + url + "],失败原因:" + err, think.env);
                    resolve(null);
                    think.reject(err);
                } else {
                    think.log("请求接口成功 method:[" + method + "],option:[" + (0, _stringify2.default)(option) + "],data:[" + (0, _stringify2.default)(data) + "],url:[" + url + "],接受数据:" + (0, _stringify2.default)(res.body), think.env);
                    resolve(res.body);
                }
            });
        }
    });
    console.timeEnd("[" + time_query + "] [Request Time] 接口请求时长");
    return promise;
};

/**
 * md5 加密算法
 * @param {*} str 待加密的字符串
 */
global.md5 = function (str) {
    var crypto = require('crypto');
    str = new Buffer(str.toString('binary'));
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};
/**
 * sha1 加密算法
 * @param {*} str 待加密的字符串
 */
global.sha1 = function (str) {
    str = new Buffer(str.toString('binary'));
    var md5sum = crypto.createHash('sha1');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};
//# sourceMappingURL=global.js.map