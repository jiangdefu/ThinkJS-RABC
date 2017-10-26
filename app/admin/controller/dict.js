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
        this.model("dict").getDictByGroupCode(null);
        return this.display();
    };
    /**
     * 加载字典数据
     */

    _class.prototype.loaddictAction = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var result;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return this.model("dict").loadDictTable(this.param("gid") || 0, this.param("offset"), this.param("limit"), "id", this.param("param"));

                        case 2:
                            result = _context.sent;
                            return _context.abrupt('return', this.json(result));

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function loaddictAction() {
            return _ref.apply(this, arguments);
        }

        return loaddictAction;
    }();
    /**
     * 更新状态
     */


    _class.prototype.statusAction = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var rsp, result;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            rsp = {
                                status: -1,
                                msg: think.config("message.fail_msg")
                            };

                            if (!(!think.isEmpty(this.param("id")) && !think.isEmpty(this.param("status")))) {
                                _context2.next = 8;
                                break;
                            }

                            _context2.next = 4;
                            return this.model("dict").updateStatus(this.param("id"), this.param("status"));

                        case 4:
                            result = _context2.sent;

                            if (!think.isEmpty(result)) {
                                rsp.status = 1;
                                rsp.msg = think.config("message.success_msg");
                            }
                            _context2.next = 9;
                            break;

                        case 8:
                            rsp.msg = think.config("message.empty_param");

                        case 9:
                            return _context2.abrupt('return', this.json(rsp));

                        case 10:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function statusAction() {
            return _ref2.apply(this, arguments);
        }

        return statusAction;
    }();
    /**
     * 添加字典
     */


    _class.prototype.addAction = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            return _context3.abrupt('return', this.display());

                        case 1:
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
    /**
     * 编辑字典
     */


    _class.prototype.editAction = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            var result;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            if (think.isEmpty(this.param("id"))) {
                                _context4.next = 5;
                                break;
                            }

                            _context4.next = 3;
                            return this.model("dict").findDict(this.param("id"));

                        case 3:
                            result = _context4.sent;

                            this.assign("dict", result);

                        case 5:
                            return _context4.abrupt('return', this.display());

                        case 6:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function editAction() {
            return _ref4.apply(this, arguments);
        }

        return editAction;
    }();

    _class.prototype.editdictAction = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            var rsp, dict, result;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            rsp = {
                                status: 0,
                                msg: think.config("message.empty_param")
                            };
                            dict = {};


                            if (!think.isEmpty(this.param("code"))) {
                                dict.code = this.param("code");
                            }
                            if (!think.isEmpty(this.param("name"))) {
                                dict.name = this.param("name");
                            }
                            if (!think.isEmpty(this.param("value"))) {
                                dict.value = this.param("value");
                            }
                            if (!think.isEmpty(this.param("status"))) {
                                dict.status = this.param("status");
                            }

                            if (think.isEmpty(this.param("id"))) {
                                _context5.next = 12;
                                break;
                            }

                            dict.id = this.param("id");
                            _context5.next = 10;
                            return this.model("dict").updateDict(dict);

                        case 10:
                            result = _context5.sent;

                            if (result.status == -2) {
                                rsp.status = 0;
                                rsp.msg = think.config("message.data_exist_msg");
                            } else if (result.status == -1) {
                                rsp.status = 0;
                                rsp.msg = think.config("message.fail_msg");
                            } else {
                                rsp.status = result.status;
                                rsp.msg = think.config("message.success_msg");
                            }

                        case 12:
                            return _context5.abrupt('return', this.json(rsp));

                        case 13:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function editdictAction() {
            return _ref5.apply(this, arguments);
        }

        return editdictAction;
    }();
    /**
     * 添加字典值
     */


    _class.prototype.adddictAction = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
            var rsp, dict, result;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            rsp = {
                                status: -1,
                                msg: think.config("message.empty_param")
                            };
                            dict = {
                                status: 1,
                                delstatus: 1
                            };

                            if (!think.isEmpty(this.param("code"))) {
                                dict.code = this.param("code");
                            }
                            if (!think.isEmpty(this.param("gid"))) {
                                dict.gid = this.param("gid");
                            }
                            if (!think.isEmpty(this.param("name"))) {
                                dict.name = this.param("name");
                            }
                            if (!think.isEmpty(this.param("value"))) {
                                dict.value = this.param("value");
                            }
                            _context6.next = 8;
                            return this.model("dict").addDict(dict);

                        case 8:
                            result = _context6.sent;

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
                            return _context6.abrupt('return', this.json(rsp));

                        case 11:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function adddictAction() {
            return _ref6.apply(this, arguments);
        }

        return adddictAction;
    }();
    /**
     * 删除
     */


    _class.prototype.delAction = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
            var rsp, result;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            rsp = {
                                status: 0,
                                msg: think.config("message.empty_param")
                            };

                            if (think.isEmpty(this.param("id"))) {
                                _context7.next = 6;
                                break;
                            }

                            _context7.next = 4;
                            return this.model("dict").delDict(this.param("id"));

                        case 4:
                            result = _context7.sent;

                            if (!think.isEmpty(result)) {
                                rsp.status = 1;
                                rsp.msg = think.config("message.del_success_msg");
                            } else {
                                rsp.msg = think.config("message.del_fail_msg");
                            }

                        case 6:
                            return _context7.abrupt('return', this.json(rsp));

                        case 7:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function delAction() {
            return _ref7.apply(this, arguments);
        }

        return delAction;
    }();
    /**
     * 获取所有图标
     */


    _class.prototype.geticonAction = function () {
        var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _context8.next = 2;
                            return this.model("dict").getDictByGroupCode("sys_dict_group_icon");

                        case 2:
                            return _context8.abrupt('return', _context8.sent);

                        case 3:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        function geticonAction() {
            return _ref8.apply(this, arguments);
        }

        return geticonAction;
    }();

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=dict.js.map