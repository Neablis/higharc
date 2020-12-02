"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserResolver = void 0;

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _typeGraphql = require("type-graphql");

var _types = require("../types");

var _utils = require("../utils");

var _classValidator = require("class-validator");

var _User = _interopRequireDefault(require("../entity/User"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2;

let UserResolver = (_dec = (0, _typeGraphql.Resolver)(_User.default), _dec2 = (0, _typeGraphql.Query)(() => _User.default), _dec3 = function (target, key) {
  return (0, _typeGraphql.Ctx)()(target, key, 0);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _types.Context === "undefined" ? Object : _types.Context]), _dec6 = (0, _typeGraphql.Mutation)(() => _User.default), _dec7 = function (target, key) {
  return (0, _typeGraphql.Arg)('data')(target, key, 0);
}, _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [typeof _types.SignupInput === "undefined" ? Object : _types.SignupInput]), _dec10 = (0, _typeGraphql.Query)(() => String), _dec11 = function (target, key) {
  return (0, _typeGraphql.Arg)('data')(target, key, 0);
}, _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", [typeof _types.LoginInput === "undefined" ? Object : _types.LoginInput]), _dec(_class = (_class2 = class UserResolver {
  user(ctx) {
    return _User.default.findOne({
      email: 'mitchell@demarcosoftware.com'
    });
  }

  async signup(data) {
    const existingUser = await _User.default.findOne({
      where: {
        email: data.email
      }
    });
    if (existingUser) return existingUser;
    const user = new _User.default();
    user.email = data.email;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.password = data.password;
    user.isAdmin = data.isAdmin || false;
    const errors = await (0, _classValidator.validate)(user);

    if (errors.length > 0) {
      throw new Error('Error creating new user');
    } else {
      return user.save();
    }
  }

  async login(data) {
    const existingUser = await _User.default.findOne({
      where: {
        email: data.email
      }
    });
    let loggedIn = await (0, _utils.isPassword)(data.password, existingUser);
    console.log({
      loggedIn
    });

    if (loggedIn && existingUser) {
      return (0, _utils.createToken)(existingUser);
    } else {
      throw new Error('Incorrect Login');
    }
  }

}, ((0, _applyDecoratedDescriptor2.default)(_class2.prototype, "user", [_dec2, _dec3, _dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "user"), _class2.prototype), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "signup", [_dec6, _dec7, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "signup"), _class2.prototype), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "login", [_dec10, _dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "login"), _class2.prototype)), _class2)) || _class);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map