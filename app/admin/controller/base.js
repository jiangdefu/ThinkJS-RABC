"use strict";
// +----------------------------------------------------------------------
// | ThinkJS-RABC [ 通用权限管理系统 ]
// +----------------------------------------------------------------------
// | Nanjing Digital Technology Co., Ltd.
// +----------------------------------------------------------------------
// | Copyright (c) 2017 http://www.51-health.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: Devlin <Devlinheart@qq.com>
// +----------------------------------------------------------------------
// | Create: 2017-06-20
// +----------------------------------------------------------------------


'use  strict';

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$controller$bas) {
    (0, _inherits3.default)(_class, _think$controller$bas);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
    }

    _class.prototype.init = function init(http) {
        _think$controller$bas.prototype.init.call(this, http);
        this.http = http;
    };
    /**
     * 过滤器
     */


    _class.prototype.__before = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var login_url, is_login, user;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            this.base_path = this.http.host;
                            if (!this.isAjax()) {
                                this.url = "/" + this.http.module + "/" + this.http.controller + "/" + this.http.action;
                            }
                            login_url = "/" + this.http.module + "/" + this.http.controller + "/" + this.http.action;

                            if (in_array(login_url, think.config("login_pass_add"))) {
                                _context.next = 37;
                                break;
                            }

                            _context.next = 6;
                            return this.isLogin();

                        case 6:
                            is_login = _context.sent;

                            if (!is_login) {
                                _context.next = 32;
                                break;
                            }

                            _context.next = 10;
                            return this.session("userinfo");

                        case 10:
                            user = _context.sent;
                            _context.next = 13;
                            return this.loadUserMenu(user);

                        case 13:
                            this.menu = _context.sent;
                            _context.next = 16;
                            return this.getCurrentMenu(this.menu, this.url);

                        case 16:
                            this.current_menu = _context.sent;
                            _context.next = 19;
                            return this.model("log").recodeLog(this.ip(), this.url, this.param(), user.username, user.id);

                        case 19:
                            if (this.isAjax()) {
                                _context.next = 23;
                                break;
                            }

                            user.curr_url = this.url;
                            _context.next = 23;
                            return this.session("userinfo", user);

                        case 23:
                            if (!user.locked) {
                                _context.next = 30;
                                break;
                            }

                            if (!(login_url != think.config("lock_add"))) {
                                _context.next = 30;
                                break;
                            }

                            if (!this.isAjax()) {
                                _context.next = 29;
                                break;
                            }

                            return _context.abrupt("return", this.fail(-2, "已锁定", { url: "/admin/user/lock" }));

                        case 29:
                            return _context.abrupt("return", this.redirect('/admin/user/lock'));

                        case 30:
                            _context.next = 37;
                            break;

                        case 32:
                            if (!this.isAjax()) {
                                _context.next = 36;
                                break;
                            }

                            return _context.abrupt("return", this.fail(-2, "用户未登录", { url: "/admin/user/login" }));

                        case 36:
                            return _context.abrupt("return", this.redirect('/admin/user/login'));

                        case 37:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function __before() {
            return _ref.apply(this, arguments);
        }

        return __before;
    }();
    /**
     * 判断用户是否登陆
     */


    _class.prototype.isLogin = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var user;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return this.session("userinfo");

                        case 2:
                            user = _context2.sent;

                            if (think.isEmpty(user)) {
                                _context2.next = 7;
                                break;
                            }

                            return _context2.abrupt("return", true);

                        case 7:
                            return _context2.abrupt("return", false);

                        case 8:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function isLogin() {
            return _ref2.apply(this, arguments);
        }

        return isLogin;
    }();
    /**
     * 判断是否锁屏
     */


    _class.prototype.isLocked = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            var user;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return this.session("userinfo");

                        case 2:
                            user = _context3.sent;

                            if (!(!think.isEmpty(user) && user.locked)) {
                                _context3.next = 7;
                                break;
                            }

                            return _context3.abrupt("return", true);

                        case 7:
                            return _context3.abrupt("return", false);

                        case 8:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function isLocked() {
            return _ref3.apply(this, arguments);
        }

        return isLocked;
    }();

    /**
     * 加载用户菜单
     * @param {*} user 当前登陆用户
     */


    _class.prototype.loadUserMenu = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(user) {
            var menu;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            if (think.isEmpty(user)) {
                                _context4.next = 13;
                                break;
                            }

                            menu = null;

                            if (!(user.username == think.config("superuser"))) {
                                _context4.next = 8;
                                break;
                            }

                            _context4.next = 5;
                            return this.model("menu").loadAllMenu();

                        case 5:
                            menu = _context4.sent;
                            _context4.next = 11;
                            break;

                        case 8:
                            _context4.next = 10;
                            return this.model("menu").loadMenuByUser(user);

                        case 10:
                            menu = _context4.sent;

                        case 11:
                            if (!think.isEmpty(menu)) {
                                menu = sortMenu(menu, 0);
                            }
                            return _context4.abrupt("return", menu);

                        case 13:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function loadUserMenu(_x) {
            return _ref4.apply(this, arguments);
        }

        return loadUserMenu;
    }();
    /**
     * 获取当前选中的菜单
     */


    _class.prototype.getCurrentMenu = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(menu, url) {
            var current_url, child, parent;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            current_url = {};
                            child = null;

                            menu.forEach(function (element) {
                                element.children.forEach(function (ele) {
                                    if (ele.url == url) {
                                        child = ele;
                                    }
                                });
                            }, this);
                            if (!think.isEmpty(child)) {
                                current_url.child = child;
                                parent = menu.filter(function (ele) {
                                    return ele.id == child.pid;
                                });

                                if (!think.isEmpty(parent) && parent.length > 0) {
                                    current_url.parent = parent[0];
                                }
                            } else {
                                menu.filter(function (ele) {
                                    if (!think.isEmpty(ele.url) && ele.url == url) {
                                        current_url.parent = ele;
                                    }
                                });
                            }
                            return _context5.abrupt("return", current_url);

                        case 5:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function getCurrentMenu(_x2, _x3) {
            return _ref5.apply(this, arguments);
        }

        return getCurrentMenu;
    }();

    return _class;
}(think.controller.base);

exports.default = _class;
//# sourceMappingURL=base.js.map