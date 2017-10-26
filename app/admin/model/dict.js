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
    * 加载字典组表格
    * @param {*} pid 
    * @param {*} offset 
    * @param {*} limit 
    * @param {*} order 
    * @param {*} param 
    */
    _class.prototype.loadDictTable = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(gid, offset, limit, order, param) {
            var str_obj, data, count;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            str_obj = { delstatus: 1 };

                            if (!think.isEmpty(gid) && gid != 0) {
                                str_obj.gid = gid;
                            }
                            if (!think.isEmpty(param)) {
                                str_obj.name = param;
                            }
                            _context.next = 5;
                            return this.model("setup").where(str_obj).order(order + " desc").limit(offset, limit).select();

                        case 5:
                            data = _context.sent;
                            _context.next = 8;
                            return this.model("setup").where(str_obj).count();

                        case 8:
                            count = _context.sent;
                            return _context.abrupt("return", { total: count, rows: data });

                        case 10:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function loadDictTable(_x, _x2, _x3, _x4, _x5) {
            return _ref.apply(this, arguments);
        }

        return loadDictTable;
    }();
    /**
     * 更新状态
     * @param {*} id 
     * @param {*} status 
     */


    _class.prototype.updateStatus = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id, status) {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return this.model("setup").where({ id: id }).update({ status: status });

                        case 2:
                            return _context2.abrupt("return", _context2.sent);

                        case 3:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function updateStatus(_x6, _x7) {
            return _ref2.apply(this, arguments);
        }

        return updateStatus;
    }();
    /**
     * 添加字典
     * @param {*} dict 
     */


    _class.prototype.addDict = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dict) {
            var bret, result;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            bret = {
                                status: 0
                            };
                            _context3.next = 3;
                            return this.model("setup").thenAdd(dict, { code: dict.code, delstatus: 1 });

                        case 3:
                            result = _context3.sent;

                            if (!think.isEmpty(result)) {
                                if (result.type == 'exist') {
                                    bret.status = 2;
                                } else {
                                    bret.status = 1;
                                }
                            }
                            return _context3.abrupt("return", bret);

                        case 6:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function addDict(_x8) {
            return _ref3.apply(this, arguments);
        }

        return addDict;
    }();
    /**
     * 删除字典
     * @param {*} id 
     */


    _class.prototype.delDict = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id) {
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return this.model("setup").where({ id: id }).update({ delstatus: 0 });

                        case 2:
                            return _context4.abrupt("return", _context4.sent);

                        case 3:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function delDict(_x9) {
            return _ref4.apply(this, arguments);
        }

        return delDict;
    }();
    /**
     * 查找字典
     * @param {*} id 字典主键
     */


    _class.prototype.findDict = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(id) {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return this.model("setup").where({ id: id }).find();

                        case 2:
                            return _context5.abrupt("return", _context5.sent);

                        case 3:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function findDict(_x10) {
            return _ref5.apply(this, arguments);
        }

        return findDict;
    }();
    /**
     * 更新字典
     * @param {*} dict 
     */


    _class.prototype.updateDict = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(dict) {
            var result, bret, upBret;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return this.model("setup").where({ code: dict.code, delstatus: 1 }).find();

                        case 2:
                            result = _context6.sent;
                            bret = { status: 1 };

                            if (!think.isEmpty(result)) {
                                _context6.next = 8;
                                break;
                            }

                            bret.status = -2;
                            _context6.next = 12;
                            break;

                        case 8:
                            _context6.next = 10;
                            return this.model("setup").where({ id: dict.id }).update(dict);

                        case 10:
                            upBret = _context6.sent;

                            if (think.isEmpty(upBret)) {
                                bret.status = -1;
                            }

                        case 12:
                            return _context6.abrupt("return", bret);

                        case 13:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function updateDict(_x11) {
            return _ref6.apply(this, arguments);
        }

        return updateDict;
    }();
    /**
     * 根据组编号获取字典值
     * @param {*} groupCode 
     */


    _class.prototype.getDictByGroupCode = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(groupCode) {
            var sql;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            sql = "select * from " + this.tablePrefix + "setup where gid=( select id from " + this.tablePrefix + "setup_group where code='" + groupCode + "') and status = 1 and delStatus=1";
                            _context7.next = 3;
                            return this.model("setup").query(sql);

                        case 3:
                            return _context7.abrupt("return", _context7.sent);

                        case 4:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function getDictByGroupCode(_x12) {
            return _ref7.apply(this, arguments);
        }

        return getDictByGroupCode;
    }();

    return _class;
}(think.model.base);

exports.default = _class;
//# sourceMappingURL=dict.js.map