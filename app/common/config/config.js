'use strict';
/**
 * config
 */

exports.__esModule = true;
exports.default = {
    //key: value
    port: 8360,
    http_: 1, //1:http,2:https
    default_module: "admin", //默认模块
    default_controller: "user",
    default_action: "login",
    route_on: true,
    resource_on: true, //是否开启静态资源解析功能
    resource_reg: /^(static\/|[^\/]+\.(?!js|html)\w+$)/, //判断为静态资源请求的正则
    superuser: "admin",
    superpassword: "E10ADC3949BA59ABBE56E057F20F883E",
    superlogin: true, //true：开启超级用户登陆 false：关闭超级用户登陆
    login_pass_add: ['/admin/user/login'],
    lock_add: "/admin/user/lock"
};
//# sourceMappingURL=config.js.map