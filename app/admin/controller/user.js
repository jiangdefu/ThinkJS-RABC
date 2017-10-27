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

'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
    (0, _inherits3.default)(_class, _Base);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
    }

    _class.prototype.init = function init(http) {
        this.http = http;
    };

    _class.prototype.indexAction = function indexAction() {
        return this.display();
    };
    /**
     * 用户登陆
     */


    _class.prototype.loginAction = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var user, _user;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!this.isAjax()) {
                                _context.next = 34;
                                break;
                            }

                            if (!think.isEmpty(this.post("username"))) {
                                _context.next = 3;
                                break;
                            }

                            return _context.abrupt('return', this.fail(think.config("msg.login_username_empty")));

                        case 3:
                            if (!think.isEmpty(this.post("password"))) {
                                _context.next = 5;
                                break;
                            }

                            return _context.abrupt('return', this.fail(think.config("msg.login_password_empty")));

                        case 5:
                            if (!think.config("superlogin")) {
                                _context.next = 22;
                                break;
                            }

                            if (!(this.post("username") == think.config("superuser") && think.md5(this.post("password")).toUpperCase() == think.config("superpassword").toUpperCase())) {
                                _context.next = 19;
                                break;
                            }

                            _context.next = 9;
                            return this.model("user").findUser(this.post("username"), think.md5(this.post("password")).toUpperCase());

                        case 9:
                            user = _context.sent;

                            if (think.isEmpty(user)) {
                                _context.next = 16;
                                break;
                            }

                            _context.next = 13;
                            return this.session("userinfo", user);

                        case 13:
                            return _context.abrupt('return', this.success({ url: "/admin/main/index" }, '登陆成功'));

                        case 16:
                            return _context.abrupt('return', this.fail(-1, think.config("msg.login_user_not_exist")));

                        case 17:
                            _context.next = 20;
                            break;

                        case 19:
                            return _context.abrupt('return', this.fail(-1, think.config("msg.login_password_incorrect")));

                        case 20:
                            _context.next = 32;
                            break;

                        case 22:
                            _context.next = 24;
                            return this.model("user").findUser(this.post("username"), think.md5(this.post("password")).toUpperCase());

                        case 24:
                            _user = _context.sent;

                            if (think.isEmpty(_user)) {
                                _context.next = 31;
                                break;
                            }

                            _context.next = 28;
                            return this.session("userinfo", _user);

                        case 28:
                            return _context.abrupt('return', this.success({ url: "/admin/main/index" }, '登陆成功'));

                        case 31:
                            return _context.abrupt('return', this.fail(-1, think.config("msg.login_user_not_exist")));

                        case 32:
                            _context.next = 35;
                            break;

                        case 34:
                            return _context.abrupt('return', this.display());

                        case 35:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function loginAction() {
            return _ref.apply(this, arguments);
        }

        return loginAction;
    }();
    /**
     * 锁屏
     */


    _class.prototype.lockAction = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var user, url;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return this.session("userinfo");

                        case 2:
                            user = _context2.sent;

                            if (!this.isAjax()) {
                                _context2.next = 21;
                                break;
                            }

                            if (think.isEmpty(user)) {
                                _context2.next = 18;
                                break;
                            }

                            if (!user.locked) {
                                _context2.next = 16;
                                break;
                            }

                            if (!(user.password.toUpperCase() == think.md5(this.param("password")).toUpperCase())) {
                                _context2.next = 15;
                                break;
                            }

                            user.locked = false;
                            _context2.next = 10;
                            return this.session("userinfo", user);

                        case 10:
                            url = "/admin/main/index";

                            if (!think.isEmpty(user.curr_url) && user.curr_url != think.config("lock_add") && !in_array(user.curr_url, think.config("login_pass_add"))) {
                                url = user.curr_url;
                            }
                            return _context2.abrupt('return', this.success({ url: url }, "登陆成功"));

                        case 15:
                            return _context2.abrupt('return', this.fail(-1, "登陆失败"));

                        case 16:
                            _context2.next = 19;
                            break;

                        case 18:
                            return _context2.abrupt('return', this.redirect("/admin/user/login"));

                        case 19:
                            _context2.next = 30;
                            break;

                        case 21:
                            if (think.isEmpty(user)) {
                                _context2.next = 29;
                                break;
                            }

                            user.locked = true;
                            _context2.next = 25;
                            return this.session("userinfo", user);

                        case 25:
                            this.assign("userinfo", user);
                            return _context2.abrupt('return', this.display());

                        case 29:
                            return _context2.abrupt('return', this.redirect("/admin/user/login"));

                        case 30:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function lockAction() {
            return _ref2.apply(this, arguments);
        }

        return lockAction;
    }();
    /**
     * 退出登陆
     */


    _class.prototype.logoutAction = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return this.session("userinfo", null);

                        case 2:
                            return _context3.abrupt('return', this.redirect("/admin/user/login"));

                        case 3:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function logoutAction() {
            return _ref3.apply(this, arguments);
        }

        return logoutAction;
    }();
    /**
     * 个人信息
     */


    _class.prototype.profileAction = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            return _context4.abrupt('return', this.display());

                        case 1:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function profileAction() {
            return _ref4.apply(this, arguments);
        }

        return profileAction;
    }();
    /**
     * 加载表格用户
     */


    _class.prototype.loaduserAction = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            var result;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return this.model("user").loadUserTable(this.param("gid") || 0, this.param("offset"), this.param("limit"), "id", this.param("param"));

                        case 2:
                            result = _context5.sent;
                            return _context5.abrupt('return', this.json(result));

                        case 4:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function loaduserAction() {
            return _ref5.apply(this, arguments);
        }

        return loaduserAction;
    }();

    /**
     * 新增用户
     */


    _class.prototype.addAction = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            return _context6.abrupt('return', this.display());

                        case 1:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function addAction() {
            return _ref6.apply(this, arguments);
        }

        return addAction;
    }();
    /**
     * 编辑用户
     */


    _class.prototype.editAction = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
            var user;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            if (think.isEmpty(this.param("id"))) {
                                _context7.next = 9;
                                break;
                            }

                            _context7.next = 3;
                            return this.model("user").findUserById(this.param("id"));

                        case 3:
                            user = _context7.sent;

                            if (think.isEmpty(user)) {
                                _context7.next = 7;
                                break;
                            }

                            this.assign("user", user);
                            return _context7.abrupt('return', this.display());

                        case 7:
                            _context7.next = 10;
                            break;

                        case 9:
                            return _context7.abrupt('return', this.fail(think.config("message.empty_param")));

                        case 10:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function editAction() {
            return _ref7.apply(this, arguments);
        }

        return editAction;
    }();
    /**
     * 添加用户
     */


    _class.prototype.adduserAction = function () {
        var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
            var rsp, param, result;
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            if (think.isEmpty(this.param())) {
                                _context8.next = 10;
                                break;
                            }

                            rsp = {
                                status: -1,
                                msg: think.config("message.empty_param")
                            };
                            param = {
                                code: this.param("code"),
                                username: this.param("name"),
                                phone: this.param("phone"),
                                email: this.param("email"),
                                sex: this.param("sex"),
                                gid: this.param("gid"),
                                status: this.param("status"),
                                create_time: times(new Date(), true),
                                password: think.md5("123456").toUpperCase(),
                                delstatus: 1
                            };
                            _context8.next = 5;
                            return this.model("user").addUser(param);

                        case 5:
                            result = _context8.sent;

                            if (!think.isEmpty(result)) {
                                if (result.status == 1) {
                                    rsp.status = result.status;
                                    rsp.msg = think.config("message.success_msg");
                                } else if (result.status == 2) {
                                    rsp.status = 0;
                                    rsp.msg = think.config("message.data_exist_msg");
                                } else {
                                    rsp.status = 0;
                                    rsp.msg = think.config("message.fail_msg");
                                }
                            }
                            return _context8.abrupt('return', this.json(rsp));

                        case 10:
                            return _context8.abrupt('return', this.json({
                                status: -1,
                                msg: think.config("message.empty_param")
                            }));

                        case 11:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        function adduserAction() {
            return _ref8.apply(this, arguments);
        }

        return adduserAction;
    }();
    /**
     * 编辑用户保存
     */


    _class.prototype.edituserAction = function () {
        var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, this);
        }));

        function edituserAction() {
            return _ref9.apply(this, arguments);
        }

        return edituserAction;
    }();

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=user.js.map