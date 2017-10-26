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
     * 通过用户查找所在用户组
     * @param {*} user  //当前登陆用户 
     */
    _class.prototype.getGroupByUser = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function getGroupByUser(_x) {
            return _ref.apply(this, arguments);
        }

        return getGroupByUser;
    }();
    /**
    * 加载用户组Tree表格
    */


    _class.prototype.loadUserGroupTreeTable = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var result, data;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return this.model("group").where({ delstatus: 1, status: 1 }).select();

                        case 2:
                            result = _context2.sent;
                            data = null;

                            if (!think.isEmpty(result)) {}
                            return _context2.abrupt("return", data);

                        case 6:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function loadUserGroupTreeTable() {
            return _ref2.apply(this, arguments);
        }

        return loadUserGroupTreeTable;
    }();

    /**
    * 加载字典组表格
    * @param {*} pid 
    * @param {*} offset 
    * @param {*} limit 
    * @param {*} order 
    * @param {*} param 
    */


    _class.prototype.loadUserGroupTable = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(pid, offset, limit, order, param) {
            var str_obj, data, count;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            str_obj = { delstatus: 1 };

                            if (!think.isEmpty(pid)) {
                                str_obj.pid = pid;
                            }
                            if (!think.isEmpty(param)) {
                                str_obj.name = param;
                            }
                            _context3.next = 5;
                            return this.model("group").where(str_obj).order(order + " desc").limit(offset, limit).select();

                        case 5:
                            data = _context3.sent;
                            _context3.next = 8;
                            return this.model("group").where(str_obj).count();

                        case 8:
                            count = _context3.sent;
                            return _context3.abrupt("return", { total: count, rows: data });

                        case 10:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function loadUserGroupTable(_x2, _x3, _x4, _x5, _x6) {
            return _ref3.apply(this, arguments);
        }

        return loadUserGroupTable;
    }();
    /**
     * 更新用户组
     * @param {*} userGroup 
     */


    _class.prototype.updateuserGroup = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(userGroup) {
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return this.model("group").where({ id: userGroup.id }).update(userGroup);

                        case 2:
                            return _context4.abrupt("return", _context4.sent);

                        case 3:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function updateuserGroup(_x7) {
            return _ref4.apply(this, arguments);
        }

        return updateuserGroup;
    }();
    /**
     * 添加用户组
     * @param {*} userGroup 
     */


    _class.prototype.addUserGroup = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(userGroup) {
            var bret, result;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            bret = {
                                status: 0
                            };
                            _context5.next = 3;
                            return this.model("group").thenAdd(userGroup, { code: userGroup.code, delstatus: 1 });

                        case 3:
                            result = _context5.sent;

                            if (!think.isEmpty(result)) {
                                if (result.type == 'exist') {
                                    bret.status = 2;
                                } else {
                                    bret.status = 1;
                                }
                            }
                            return _context5.abrupt("return", bret);

                        case 6:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function addUserGroup(_x8) {
            return _ref5.apply(this, arguments);
        }

        return addUserGroup;
    }();
    /**
     * 加载用户组树结构
     */


    _class.prototype.loaduserGroupTree = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
            var result, treeList;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return this.model("group").where({ delstatus: 1, status: 1 }).select();

                        case 2:
                            result = _context6.sent;
                            treeList = new Array();

                            treeList.push({ id: 0, pid: -1, name: "用户组", code: "user_group", open: true });
                            result.forEach(function (element) {
                                treeList.push({ id: element.id, pid: 0, name: element.name, code: element.code });
                            }, this);
                            return _context6.abrupt("return", treeList);

                        case 7:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function loaduserGroupTree() {
            return _ref6.apply(this, arguments);
        }

        return loaduserGroupTree;
    }();
    /**
     * 更新状态
     * @param {*} id 
     * @param {*} status 
     */


    _class.prototype.updateStatus = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(id, status) {
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.next = 2;
                            return this.model("group").where({ id: id }).update({ status: status });

                        case 2:
                            return _context7.abrupt("return", _context7.sent);

                        case 3:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function updateStatus(_x9, _x10) {
            return _ref7.apply(this, arguments);
        }

        return updateStatus;
    }();

    /**
    * 删除用户组
    * @param {*} id 
    */


    _class.prototype.delUserGroup = function () {
        var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(id) {
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _context8.next = 2;
                            return this.model("group").where({ id: id }).update({ delstatus: 0 });

                        case 2:
                            return _context8.abrupt("return", _context8.sent);

                        case 3:
                        case "end":
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        function delUserGroup(_x11) {
            return _ref8.apply(this, arguments);
        }

        return delUserGroup;
    }();

    return _class;
}(think.model.base);

exports.default = _class;
//# sourceMappingURL=usergroup.js.map