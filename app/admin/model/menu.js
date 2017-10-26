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
/**
 * model
 */

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

var _class = function (_think$model$base) {
    (0, _inherits3.default)(_class, _think$model$base);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _think$model$base.apply(this, arguments));
    }

    /**
     * 通过用户名称和密码查找登陆用户
     */
    _class.prototype.loadAllMenu = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt("return", this.model("menu").where({ delstatus: 1, ismenu: 0 }).select());

                        case 1:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function loadAllMenu() {
            return _ref.apply(this, arguments);
        }

        return loadAllMenu;
    }();
    /**
     * 根据用户获取当前菜单
     * @param {*} user  当前登陆用户
     */


    _class.prototype.loadMenuByUser = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(user) {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if (!think.isEmpty(user)) {}

                        case 1:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function loadMenuByUser(_x) {
            return _ref2.apply(this, arguments);
        }

        return loadMenuByUser;
    }();
    /**
     * 根据URL获取当前菜单
     * @param {*} user  当前登陆用户
     */


    _class.prototype.loadMenuByUrl = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(url) {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            return _context3.abrupt("return", this.model("menu").where({ url: url, delstatus: 1, ismenu: 1 }).find());

                        case 1:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function loadMenuByUrl(_x2) {
            return _ref3.apply(this, arguments);
        }

        return loadMenuByUrl;
    }();
    /**
     * 加载表格菜单
     * @param {*} pid 
     * @param {*} offset 
     * @param {*} limit 
     * @param {*} order 
     * @param {*} param 
     */


    _class.prototype.loadMenuTable = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(pid, offset, limit, order, param) {
            var data, str_where, countSql, result;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            data = { total: 0, rows: [] };
                            str_where = "1=1";

                            if (!think.isEmpty(pid)) {
                                str_where += " and pid = " + pid + " ";
                            }
                            if (!think.isEmpty(param)) {
                                str_where += " and ( name like '%" + param + "%' or url like '%" + param + "%')";
                            }
                            _context4.next = 6;
                            return this.model("menu").where(str_where).count();

                        case 6:
                            countSql = _context4.sent;

                            if (!(countSql > 0)) {
                                _context4.next = 13;
                                break;
                            }

                            data.total = countSql;
                            _context4.next = 11;
                            return this.model("menu").where(str_where).order("sort asc").limit(offset, limit).select();

                        case 11:
                            result = _context4.sent;

                            data.rows = result;

                        case 13:
                            return _context4.abrupt("return", data);

                        case 14:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function loadMenuTable(_x3, _x4, _x5, _x6, _x7) {
            return _ref4.apply(this, arguments);
        }

        return loadMenuTable;
    }();
    /**
     * 新增菜单
     * @param {*} menu 
     */


    _class.prototype.addMenu = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(menu) {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            return _context5.abrupt("return", this.model("menu").thenAdd(menu, { code: menu.code }));

                        case 1:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function addMenu(_x8) {
            return _ref5.apply(this, arguments);
        }

        return addMenu;
    }();
    /**
     * 根据ID 查询菜单
     * @param {*} id 
     */


    _class.prototype.findMenuById = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(id) {
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return this.model("menu").where({ id: id }).find();

                        case 2:
                            return _context6.abrupt("return", _context6.sent);

                        case 3:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function findMenuById(_x9) {
            return _ref6.apply(this, arguments);
        }

        return findMenuById;
    }();
    /**
     * 删除菜单
     * @param {*} id 
     */


    _class.prototype.delMenu = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(id) {
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.next = 2;
                            return this.model("menu").where({ id: id }).delete();

                        case 2:
                            return _context7.abrupt("return", _context7.sent);

                        case 3:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function delMenu(_x10) {
            return _ref7.apply(this, arguments);
        }

        return delMenu;
    }();
    /**
     * 更新排序
     * @param {*} data 
     */


    _class.prototype.sortMenu = function () {
        var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(data) {
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            return _context8.abrupt("return", this.model("menu").updateMany(data));

                        case 1:
                        case "end":
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        function sortMenu(_x11) {
            return _ref8.apply(this, arguments);
        }

        return sortMenu;
    }();

    return _class;
}(think.model.base);

exports.default = _class;
//# sourceMappingURL=menu.js.map