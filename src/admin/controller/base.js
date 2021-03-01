// +----------------------------------------------------------------------
// | ThinkJS-RABC [ 通用权限管理系统 ]
// +----------------------------------------------------------------------
// | Nanjing Digital Technology Co., Ltd.
// +----------------------------------------------------------------------
// | Copyright (c) 2021 http://www.51-health.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: devlincms <devlincms@163.com>
// +----------------------------------------------------------------------
// | Create: 2021-02-25
// +----------------------------------------------------------------------


'use  strict'

export default class extends think.controller.base {

    init(http) {
            super.init(http);
            this.http = http;
        }
        /**
         * 过滤器
         */
    async __before() {
            this.base_path = this.http.host;
            if (!this.isAjax()) {
                this.url = "/" + this.http.module + "/" + this.http.controller + "/" + this.http.action;
            }
            let login_url = `/${this.http.module}/${this.http.controller}/${this.http.action}`;
            if (!in_array(login_url, think.config("login_pass_add"))) {
                let is_login = await this.isLogin();
                if (is_login) {
                    this.user = await this.session("userinfo");
                    //菜单信息
                    this.menu = await this.loadUserMenu(this.user);
                    this.UserFunction = await this.loadUserFunction(this.user);
                    this.current_menu = await this.getCurrentMenu(this.menu, this.url);
                    this.environment = await getRedisValue("db-env");
                    if(think.isEmpty(this.environment)){
                        this.environment = "mysqlDev";
                        await setRedisValue("db-env",this.environment,3000000);
                    }
                    if(this.http.controller!="log"){
                        //记录日志
                        await this.model("log").recodeLog(this.ip(), login_url, JSON.stringify(this.param()), this.user.username, this.user.id);
                    }

                    if (!this.isAjax()) {
                        this.user.curr_url = this.url;
                        await this.session("userinfo", this.user);
                    }
                    if (this.user.locked) {
                        if (login_url != think.config("lock_add")) {
                            if (this.isAjax()) {
                                return this.fail(-2, "已锁定", { url: "/admin/user/lock" });
                            } else {
                                return this.redirect('/admin/user/lock');
                            }
                        }
                    }
                } else {
                    if (this.isAjax()) {
                        return this.fail(-2, "用户未登录", { url: "/admin/user/login" });
                    } else {
                        return this.redirect('/admin/user/login');
                    }
                }
            }
        }
        /**
         * 判断用户是否登陆
         */
    async isLogin() {
            let user = await this.session("userinfo");
            if (!think.isEmpty(user)) {
                return true;
            } else {
                return false;
            }
        }
        /**
         * 判断是否锁屏
         */
    async isLocked() {
        let user = await this.session("userinfo");
        if (!think.isEmpty(user) && user.locked) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 加载用户菜单
     * @param {*} user 当前登陆用户
     */
    async loadUserMenu(user) {
            if (!think.isEmpty(user)) {
                let menu = null
                if (user.username == think.config("superuser")) {
                    menu = await this.model("menu").loadAllMenu();
                } else {
                    menu = await this.model("menu").loadMenuByUser(user);
                }
                if (!think.isEmpty(menu)) {
                    menu = sortMenu(menu, 0);
                }
                return menu;
            }
        }
        /**
         * 
         * @param {*} user 
         */
    async loadUserFunction(user) {
            if (!think.isEmpty(user)) {
                let userFunction = null
                if (user.username == think.config("superuser")) {
                    userFunction = await this.model("menu").loadAllFunction();
                } else {
                    userFunction = await this.model("menu").loadFunctionByUser(user);
                }
                return userFunction;
            }
        }
        /**
         * 获取当前选中的菜单
         */
    async getCurrentMenu(menu, url) {
        let current_url = {};
        let child = null;
        menu.forEach(function(element) {
            element.children.forEach(function(ele) {
                if (ele.url == url) {
                    child = ele;
                }
            });
        }, this);
        if (!think.isEmpty(child)) {
            current_url.child = child;
            let parent = menu.filter(function(ele) {
                return ele.id == child.pid;
            });
            if (!think.isEmpty(parent) && parent.length > 0) {
                current_url.parent = parent[0];
            }
        } else {
            menu.filter(function(ele) {
                if (!think.isEmpty(ele.url) && ele.url == url) {
                    current_url.parent = ele;
                }
            })
        }
        return current_url;
    }
}