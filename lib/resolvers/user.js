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

var _Smoothie = _interopRequireDefault(require("../entity/Smoothie"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _class, _class2;

let UserResolver = (_dec = (0, _typeGraphql.Resolver)(_User.default), _dec2 = (0, _typeGraphql.Authorized)(), _dec3 = (0, _typeGraphql.Query)(() => _User.default, {
  description: "Get the user for the passed authentication token"
}), _dec4 = function (target, key) {
  return (0, _typeGraphql.Ctx)()(target, key, 0);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _types.Context === "undefined" ? Object : _types.Context]), _dec7 = (0, _typeGraphql.FieldResolver)(() => [_Smoothie.default]), _dec8 = function (target, key) {
  return (0, _typeGraphql.Root)()(target, key, 0);
}, _dec9 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [typeof _User.default === "undefined" ? Object : _User.default]), _dec11 = (0, _typeGraphql.Mutation)(() => String, {
  description: "Create a new user and returns a valid login token"
}), _dec12 = function (target, key) {
  return (0, _typeGraphql.Arg)('data')(target, key, 0);
}, _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [typeof _types.SignupInput === "undefined" ? Object : _types.SignupInput]), _dec15 = (0, _typeGraphql.Query)(() => String, {
  description: "Get a valid auth token if user/password is correct"
}), _dec16 = function (target, key) {
  return (0, _typeGraphql.Arg)('data')(target, key, 0);
}, _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [typeof _types.LoginInput === "undefined" ? Object : _types.LoginInput]), _dec(_class = (_class2 = class UserResolver {
  async user(ctx) {
    const {
      email
    } = ctx;
    return _User.default.findOne({
      email
    }, {
      relations: ['smoothies', 'smoothies.ingredients']
    });
  }

  async smoothies(user) {
    return user.smoothies || [];
  }

  async signup(data) {
    const existingUser = await _User.default.findOne({
      where: {
        email: data.email
      }
    });
    if (existingUser) throw new Error('Email is already taken');
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
      await user.save();
      return (0, _utils.createToken)(user);
    }
  }

  async login(data) {
    const existingUser = await _User.default.findOne({
      where: {
        email: data.email
      }
    });
    let loggedIn = await (0, _utils.isPassword)(data.password, existingUser);

    if (loggedIn && existingUser) {
      return (0, _utils.createToken)(existingUser);
    } else {
      throw new Error('Incorrect Login');
    }
  }

}, ((0, _applyDecoratedDescriptor2.default)(_class2.prototype, "user", [_dec2, _dec3, _dec4, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "user"), _class2.prototype), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "smoothies", [_dec7, _dec8, _dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "smoothies"), _class2.prototype), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "signup", [_dec11, _dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "signup"), _class2.prototype), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "login", [_dec15, _dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "login"), _class2.prototype)), _class2)) || _class);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map