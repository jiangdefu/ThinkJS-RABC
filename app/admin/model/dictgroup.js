// +----------------------------------------------------------------------
// | ThinkJS-RABC [ 通用权限管理系统 ] 
// +----------------------------------------------------------------------
// | Nanjing Digital Technology Co., Ltd.
// +----------------------------------------------------------------------
// | Copyright (c) 2017 http://www.51-health.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: Devlin <Devlinheart@qq.com>[ 南京数遥科技有限公司 ]
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
     * 加载字典组Tree表格
     */
    _class.prototype.loadDictGroupTreeTable = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var result, data;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return this.model("setup_group").where({ delstatus: 1, status: 1 }).select();

                        case 2:
                            result = _context.sent;
                            data = null;

                            if (!think.isEmpty(result)) {}
                            return _context.abrupt("return", data);

                        case 6:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function loadDictGroupTreeTable() {
            return _ref.apply(this, arguments);
        }

        return loadDictGroupTreeTable;
    }();

    /**
     * 加载字典组表格
     * @param {*} pid 
     * @param {*} offset 
     * @param {*} limit 
     * @param {*} order 
     * @param {*} param 
     */


    _class.prototype.loadDictGroupTable = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(pid, offset, limit, order, param) {
            var str_obj, data, count;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            str_obj = { delstatus: 1 };

                            if (!think.isEmpty(pid)) {
                                str_obj.pid = pid;
                            }
                            if (!think.isEmpty(param)) {
                                str_obj.name = param;
                            }
                            _context2.next = 5;
                            return this.model("setup_group").where(str_obj).order(order + " desc").limit(offset, limit).select();

                        case 5:
                            data = _context2.sent;
                            _context2.next = 8;
                            return this.model("setup_group").where(str_obj).count();

                        case 8:
                            count = _context2.sent;
                            return _context2.abrupt("return", { total: count, rows: data });

                        case 10:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function loadDictGroupTable(_x, _x2, _x3, _x4, _x5) {
            return _ref2.apply(this, arguments);
        }

        return loadDictGroupTable;
    }();
    /**
     * 更新字典组
     * @param {*} dictGroup 
     */


    _class.prototype.updateDictGroup = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dictGroup) {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return this.model("setup_group").where({ id: dictGroup.id }).update(dictGroup);

                        case 2:
                            return _context3.abrupt("return", _context3.sent);

                        case 3:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function updateDictGroup(_x6) {
            return _ref3.apply(this, arguments);
        }

        return updateDictGroup;
    }();
    /**
     * 添加字典组
     * @param {*} dictGroup 
     */


    _class.prototype.addDictGroup = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(dictGroup) {
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return this.model("setup_group").thenAdd(dictGroup, { code: dictGroup.code, delstatus: 1 });

                        case 2:
                            return _context4.abrupt("return", _context4.sent);

                        case 3:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function addDictGroup(_x7) {
            return _ref4.apply(this, arguments);
        }

        return addDictGroup;
    }();
    /**
     * 加载字典树
     */


    _class.prototype.loadDictGroupTree = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            var result, treeList;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return this.model("setup_group").where({ delstatus: 1, status: 1 }).select();

                        case 2:
                            result = _context5.sent;
                            treeList = new Array();

                            treeList.push({ id: 0, pid: -1, name: "字典组", code: "dict_group", open: true });
                            result.forEach(function (element) {
                                treeList.push({ id: element.id, pid: 0, name: element.name, code: element.code });
                            }, this);
                            return _context5.abrupt("return", treeList);

                        case 7:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function loadDictGroupTree() {
            return _ref5.apply(this, arguments);
        }

        return loadDictGroupTree;
    }();
    /**
     * 更新状态
     * @param {*} id 
     * @param {*} status 
     */


    _class.prototype.updateStatus = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(id, status) {
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return this.model("setup_group").where({ id: id }).update({ status: status });

                        case 2:
                            return _context6.abrupt("return", _context6.sent);

                        case 3:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function updateStatus(_x8, _x9) {
            return _ref6.apply(this, arguments);
        }

        return updateStatus;
    }();

    return _class;
}(think.model.base);

exports.default = _class;
//# sourceMappingURL=dictgroup.js.map