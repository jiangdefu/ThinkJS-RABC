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
    /**
     * 加载页面
     */


    _class.prototype.indexAction = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt('return', this.display());

                        case 1:
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
     * 加载字典组列表
     */


    _class.prototype.loaddictgroupAction = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var data;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return this.model("dictgroup").loadDictGroupTable(this.post("pid") || 0, this.post("offset"), this.post("limit"), "id", this.param("param"));

                        case 2:
                            data = _context2.sent;

                            think.log(data);
                            return _context2.abrupt('return', this.json(data));

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function loaddictgroupAction() {
            return _ref2.apply(this, arguments);
        }

        return loaddictgroupAction;
    }();
    /**
     * 编辑
     */


    _class.prototype.editAction = function () {
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

        function editAction() {
            return _ref3.apply(this, arguments);
        }

        return editAction;
    }();

    _class.prototype.editdictgroupAction = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function editdictgroupAction() {
            return _ref4.apply(this, arguments);
        }

        return editdictgroupAction;
    }();
    /**
     * 添加
     */


    _class.prototype.addAction = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            return _context5.abrupt('return', this.display());

                        case 1:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function addAction() {
            return _ref5.apply(this, arguments);
        }

        return addAction;
    }();

    _class.prototype.adddictgroupAction = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function adddictgroupAction() {
            return _ref6.apply(this, arguments);
        }

        return adddictgroupAction;
    }();
    /**
     * 加载字典组树
     */


    _class.prototype.loadtreeAction = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
            var result;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.next = 2;
                            return this.model("dictgroup").loadDictGroupTree();

                        case 2:
                            result = _context7.sent;
                            return _context7.abrupt('return', this.json(result));

                        case 4:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function loadtreeAction() {
            return _ref7.apply(this, arguments);
        }

        return loadtreeAction;
    }();
    /**
     *设置状态 
     */


    _class.prototype.statusAction = function () {
        var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
            var rsp, result;
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            rsp = {
                                status: -1,
                                msg: think.config("message.fail_msg")
                            };

                            if (!(!think.isEmpty(this.param("id")) && !think.isEmpty(this.param("status")))) {
                                _context8.next = 8;
                                break;
                            }

                            _context8.next = 4;
                            return this.model("dictgroup").updateStatus(this.param("id"), this.param("status"));

                        case 4:
                            result = _context8.sent;

                            if (!think.isEmpty(result)) {
                                rsp.status = 1;
                                rsp.msg = think.config("message.success_msg");
                            }
                            _context8.next = 9;
                            break;

                        case 8:
                            rsp.msg = think.config("message.empty_param");

                        case 9:
                            return _context8.abrupt('return', this.json(rsp));

                        case 10:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        function statusAction() {
            return _ref8.apply(this, arguments);
        }

        return statusAction;
    }();

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=dictgroup.js.map