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
     * 加载表格
     */


    _class.prototype.loadusergroupAction = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var result;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return this.model("usergroup").loadUserGroupTable(this.param("pid"), this.param("offset"), this.param("limit"), "id", this.param("param"));

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

        function loadusergroupAction() {
            return _ref.apply(this, arguments);
        }

        return loadusergroupAction;
    }();
    /**
     * 加载用户组树节点
     */


    _class.prototype.loadtreeAction = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var result;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return this.model("usergroup").loaduserGroupTree();

                        case 2:
                            result = _context2.sent;
                            return _context2.abrupt('return', this.json(result));

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function loadtreeAction() {
            return _ref2.apply(this, arguments);
        }

        return loadtreeAction;
    }();
    /**
     * 新增用户组
     */


    _class.prototype.addAction = function addAction() {
        return this.display();
    };

    _class.prototype.addusergroupAction = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            var rsp, userGroup, result;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            rsp = {
                                status: -1,
                                msg: think.config("message.empty_param")
                            };
                            userGroup = {
                                status: 1,
                                delstatus: 1
                            };

                            if (!think.isEmpty(this.param("code"))) {
                                userGroup.code = this.param("code");
                            }
                            if (!think.isEmpty(this.param("status")) && this.param("status") == 'on') {
                                userGroup.status = 1;
                            } else {
                                userGroup.status = 0;
                            }
                            userGroup.pid = this.param("pid") || 0;
                            if (!think.isEmpty(this.param("name"))) {
                                userGroup.name = this.param("name");
                                userGroup.briefname = this.param("name");
                            }
                            _context3.next = 8;
                            return this.model("usergroup").addUserGroup(userGroup);

                        case 8:
                            result = _context3.sent;

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
                            return _context3.abrupt('return', this.json(rsp));

                        case 11:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function addusergroupAction() {
            return _ref3.apply(this, arguments);
        }

        return addusergroupAction;
    }();
    /**
     * 删除
     */


    _class.prototype.delAction = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            var rsp, result;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            rsp = {
                                status: 0,
                                msg: think.config("message.empty_param")
                            };

                            if (think.isEmpty(this.param("id"))) {
                                _context4.next = 6;
                                break;
                            }

                            _context4.next = 4;
                            return this.model("usergroup").delUserGroup(this.param("id"));

                        case 4:
                            result = _context4.sent;

                            if (!think.isEmpty(result)) {
                                rsp.status = 1;
                                rsp.msg = think.config("message.del_success_msg");
                            } else {
                                rsp.msg = think.config("message.del_fail_msg");
                            }

                        case 6:
                            return _context4.abrupt('return', this.json(rsp));

                        case 7:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function delAction() {
            return _ref4.apply(this, arguments);
        }

        return delAction;
    }();

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=usergroup.js.map