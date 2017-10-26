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
     * 记录操作日志
     * @param {*} ip  客户端IP
     * @param {*} url 操作URL
     * @param {*} param 传递参数
     * @param {*} user 当前登陆的用户
     */
    _class.prototype.recodeLog = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ip, url, param, username, userid) {
            var log;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            log = {
                                ip: ip,
                                url: url,
                                param: param,
                                username: username,
                                userid: userid,
                                create_time: Format(new Date(), "yyyy-MM-dd hh:mm:ss")
                            };
                            _context.next = 3;
                            return this.model("log").add(log);

                        case 3:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function recodeLog(_x, _x2, _x3, _x4, _x5) {
            return _ref.apply(this, arguments);
        }

        return recodeLog;
    }();
    /**
     * 加载日志表格
     * @param {*} limit 
     * @param {*} offset 
     * @param {*} ip        客户端IP地址
     * @param {*} address   请求地址
     * @param {*} username  用户名
     * @param {*} startTime 开始时间
     * @param {*} endTime   结束时间
     */


    _class.prototype.loadLogTable = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(limit, offset, ip, address, username, startTime, endTime) {
            var data, str_where, countSql, result;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            data = {
                                total: 0,
                                rows: []
                            };
                            str_where = '1=1 ';

                            if (!think.isEmpty(ip)) {
                                str_where = str_where + " and ip ='" + ip + "'";
                            }
                            if (!think.isEmpty(address)) {
                                str_where = str_where + " and url like '%" + address + "%'";
                            }
                            if (!think.isEmpty(username)) {
                                str_where = str_where + " and username = '" + username + "'";
                            }
                            if (!think.isEmpty(startTime)) {
                                str_where = str_where + " and create_time > =" + startTime + "";
                            }
                            if (!think.isEmpty(endTime)) {
                                str_where = str_where + " and create_time < =" + endTime + "";
                            }
                            _context2.next = 9;
                            return this.model("log").where(str_where).count();

                        case 9:
                            countSql = _context2.sent;

                            if (!(countSql > 0)) {
                                _context2.next = 16;
                                break;
                            }

                            data.total = countSql;
                            _context2.next = 14;
                            return this.model("log").where(str_where).order("create_time desc").limit(offset, limit).select();

                        case 14:
                            result = _context2.sent;

                            data.rows = result;

                        case 16:
                            return _context2.abrupt("return", data);

                        case 17:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function loadLogTable(_x6, _x7, _x8, _x9, _x10, _x11, _x12) {
            return _ref2.apply(this, arguments);
        }

        return loadLogTable;
    }();

    return _class;
}(think.model.base);

exports.default = _class;
//# sourceMappingURL=log.js.map