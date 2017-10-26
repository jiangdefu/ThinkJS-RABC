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

    _class.prototype.indexAction = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var pid;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            pid = this.param("pid") || 0;

                            this.assign("pid", pid);
                            return _context.abrupt('return', this.display());

                        case 3:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function indexAction() {
            return _ref.apply(this, arguments);
        }

        return indexAction;
    }();
    /**
     * 加载数据
     */


    _class.prototype.loadmenuAction = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var data;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return this.model("menu").loadMenuTable(this.post("pid") || 0, this.post("offset"), this.post("limit"), "sort", this.param("param"));

                        case 2:
                            data = _context2.sent;
                            return _context2.abrupt('return', this.json(data));

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function loadmenuAction() {
            return _ref2.apply(this, arguments);
        }

        return loadmenuAction;
    }();
    /**
     * 新增菜单
     */


    _class.prototype.addAction = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            var icon;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return this.model("dict").getDictByGroupCode("sys_dict_group_icon");

                        case 2:
                            icon = _context3.sent;

                            if (!think.isEmpty(icon)) {
                                this.assign("icon", icon);
                            }
                            return _context3.abrupt('return', this.display());

                        case 5:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function addAction() {
            return _ref3.apply(this, arguments);
        }

        return addAction;
    }();

    _class.prototype.addmenuAction = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            var menu, response_data, res;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            menu = {};
                            response_data = {
                                status: 1,
                                msg: think.config("message.success_msg")
                            };

                            if (think.isEmpty(this.param("code"))) {
                                _context4.next = 6;
                                break;
                            }

                            menu.code = this.param("code");
                            _context4.next = 9;
                            break;

                        case 6:
                            response_data.status = 0;
                            response_data.msg = think.config("message.empty_param");
                            return _context4.abrupt('return', this.json(response_data));

                        case 9:
                            if (think.isEmpty(this.param("url"))) {
                                _context4.next = 13;
                                break;
                            }

                            menu.url = this.param("url");
                            _context4.next = 16;
                            break;

                        case 13:
                            response_data.status = 0;
                            response_data.msg = think.config("message.empty_param");
                            return _context4.abrupt('return', this.json(response_data));

                        case 16:
                            if (think.isEmpty(this.param("name"))) {
                                _context4.next = 21;
                                break;
                            }

                            menu.name = this.param("name");
                            menu.briefname = this.param("name");
                            _context4.next = 24;
                            break;

                        case 21:
                            response_data.status = 0;
                            response_data.msg = think.config("message.empty_param");
                            return _context4.abrupt('return', this.json(response_data));

                        case 24:
                            if (think.isEmpty(this.param("ismenu"))) {
                                _context4.next = 28;
                                break;
                            }

                            menu.ismenu = this.param("ismenu");
                            _context4.next = 31;
                            break;

                        case 28:
                            response_data.status = 0;
                            response_data.msg = think.config("message.empty_param");
                            return _context4.abrupt('return', this.json(response_data));

                        case 31:
                            if (think.isEmpty(this.param("sort"))) {
                                _context4.next = 35;
                                break;
                            }

                            menu.sort = this.param("sort");
                            _context4.next = 38;
                            break;

                        case 35:
                            response_data.status = 0;
                            response_data.msg = think.config("message.empty_param");
                            return _context4.abrupt('return', this.json(response_data));

                        case 38:
                            if (think.isEmpty(this.param("icon"))) {
                                _context4.next = 42;
                                break;
                            }

                            menu.icon = this.param("icon");
                            _context4.next = 45;
                            break;

                        case 42:
                            response_data.status = 0;
                            response_data.msg = think.config("message.empty_param");
                            return _context4.abrupt('return', this.json(response_data));

                        case 45:
                            if (think.isEmpty(this.param("pid"))) {
                                _context4.next = 49;
                                break;
                            }

                            menu.pid = this.param("pid");
                            _context4.next = 52;
                            break;

                        case 49:
                            response_data.status = 0;
                            response_data.msg = think.config("message.empty_param");
                            return _context4.abrupt('return', this.json(response_data));

                        case 52:
                            menu.status = 1;
                            menu.create_time = times(new Date(), true);
                            _context4.next = 56;
                            return this.model("menu").addMenu(menu);

                        case 56:
                            res = _context4.sent;

                            if (!think.isEmpty(res)) {
                                if (res.type == 'exist') {
                                    response_data.status = 0;
                                    response_data.msg = think.config("message.data_exist_msg");
                                }
                            } else {
                                response_data.status = 0;
                                response_data.msg = think.config("message.fail_msg");
                            }
                            return _context4.abrupt('return', this.json(response_data));

                        case 59:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function addmenuAction() {
            return _ref4.apply(this, arguments);
        }

        return addmenuAction;
    }();
    /**
     * 编辑
     */


    _class.prototype.editAction = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            var menu, icon;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            if (think.isEmpty(this.param("id"))) {
                                _context5.next = 5;
                                break;
                            }

                            _context5.next = 3;
                            return this.model("menu").findMenuById(this.param("id"));

                        case 3:
                            menu = _context5.sent;

                            this.assign("menu", menu);

                        case 5:
                            _context5.next = 7;
                            return this.model("dict").getDictByGroupCode("sys_dict_group_icon");

                        case 7:
                            icon = _context5.sent;

                            if (!think.isEmpty(icon)) {
                                this.assign("icon", icon);
                            }
                            return _context5.abrupt('return', this.display());

                        case 10:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function editAction() {
            return _ref5.apply(this, arguments);
        }

        return editAction;
    }();
    /**
     * 删除
     */


    _class.prototype.delAction = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
            var response_data, res;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            response_data = {
                                status: 0,
                                msg: think.config("message.empty_param")
                            };

                            if (!think.isEmpty(this.param("id"))) {
                                res = this.model("menu").delMenu(this.param("id"));

                                if (!think.isEmpty(res)) {
                                    response_data.status = 1;
                                    response_data.msg = think.config("message.del_success_msg");
                                } else {
                                    response_data.status = 0;
                                    response_data.msg = think.config("message.del_fail_msg");
                                }
                            }

                            return _context6.abrupt('return', this.json(response_data));

                        case 3:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function delAction() {
            return _ref6.apply(this, arguments);
        }

        return delAction;
    }();
    /**
     * 排序
     */


    _class.prototype.sortAction = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
            var response_data, result;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            response_data = {
                                status: 0,
                                msg: think.config("message.empty_param")
                            };

                            if (think.isEmpty(this.param("menu"))) {
                                _context7.next = 6;
                                break;
                            }

                            _context7.next = 4;
                            return this.model("menu").sortMenu(JSON.parse(this.param("menu")));

                        case 4:
                            result = _context7.sent;

                            if (!think.result) {
                                response_data.status = 1;
                                response_data.msg = think.config("message.success_msg");
                            } else {
                                response_data.msg = think.config("message.fail_msg");
                            }

                        case 6:
                            return _context7.abrupt('return', this.json(response_data));

                        case 7:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function sortAction() {
            return _ref7.apply(this, arguments);
        }

        return sortAction;
    }();

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=menu.js.map