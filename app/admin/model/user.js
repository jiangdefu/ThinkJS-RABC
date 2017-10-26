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
     * @param {*} username 
     * @param {*} password 
     */
    _class.prototype.findUser = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(username, password) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt("return", this.model("user").where({ username: username, password: password, delstatus: 1 }).find());

                        case 1:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function findUser(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return findUser;
    }();

    /**
    * 加载字典组表格
    * @param {*} gid 
    * @param {*} offset 
    * @param {*} limit 
    * @param {*} order 
    * @param {*} param 
    */


    _class.prototype.loadUserTable = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(gid, offset, limit, order, param) {
            var str_obj, data, count;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            str_obj = { delstatus: 1 };

                            if (!think.isEmpty(gid) && gid != 0) {
                                str_obj.gid = gid;
                            }
                            if (!think.isEmpty(param)) {
                                str_obj.name = param;
                            }
                            _context2.next = 5;
                            return this.model("user").where(str_obj).order(order + " desc").limit(offset, limit).select();

                        case 5:
                            data = _context2.sent;
                            _context2.next = 8;
                            return this.model("user").where(str_obj).count();

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

        function loadUserTable(_x3, _x4, _x5, _x6, _x7) {
            return _ref2.apply(this, arguments);
        }

        return loadUserTable;
    }();

    return _class;
}(think.model.base);

exports.default = _class;
//# sourceMappingURL=user.js.map