"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserResolver = void 0;

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _typeGraphql = require("type-graphql");

var _User = _interopRequireDefault(require("../entity/User"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2;

let UserResolver = (_dec = (0, _typeGraphql.Resolver)(_User.default), _dec2 = (0, _typeGraphql.Query)(() => _User.default), _dec3 = function (target, key) {
  return (0, _typeGraphql.Root)()(target, key, 0);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _User.default === "undefined" ? Object : _User.default]), _dec(_class = (_class2 = class UserResolver {
  user(user) {
    return _User.default.findOne({
      email: 'mitchell@demarcosoftware.com'
    });
  }

}, ((0, _applyDecoratedDescriptor2.default)(_class2.prototype, "user", [_dec2, _dec3, _dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "user"), _class2.prototype)), _class2)) || _class);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map