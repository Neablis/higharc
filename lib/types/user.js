"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignupInput = exports.LoginInput = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _typeGraphql = require("type-graphql");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _temp, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class4, _class5, _descriptor3, _descriptor4, _descriptor5, _temp2;

let LoginInput = (_dec = (0, _typeGraphql.InputType)(), _dec2 = (0, _typeGraphql.Field)({
  nullable: false,
  description: "Users email address"
}), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeGraphql.Field)({
  nullable: false,
  description: "Users password (must be greater than 6 characters)"
}), _dec5 = Reflect.metadata("design:type", String), _dec(_class = (_class2 = (_temp = class LoginInput {
  constructor() {
    (0, _initializerDefineProperty2.default)(this, "email", _descriptor, this);
    (0, _initializerDefineProperty2.default)(this, "password", _descriptor2, this);
  }

}, _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "email", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "password", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.LoginInput = LoginInput;
let SignupInput = (_dec6 = (0, _typeGraphql.InputType)(), _dec7 = (0, _typeGraphql.Field)({
  nullable: true,
  description: "Users first name"
}), _dec8 = Reflect.metadata("design:type", String), _dec9 = (0, _typeGraphql.Field)({
  nullable: true,
  description: "Users last name"
}), _dec10 = Reflect.metadata("design:type", String), _dec11 = (0, _typeGraphql.Field)({
  nullable: true,
  description: "Flag to create an admin user"
}), _dec12 = Reflect.metadata("design:type", Boolean), _dec6(_class4 = (_class5 = (_temp2 = class SignupInput extends LoginInput {
  constructor(...args) {
    super(...args);
    (0, _initializerDefineProperty2.default)(this, "firstName", _descriptor3, this);
    (0, _initializerDefineProperty2.default)(this, "lastName", _descriptor4, this);
    (0, _initializerDefineProperty2.default)(this, "isAdmin", _descriptor5, this);
  }

}, _temp2), (_descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class5.prototype, "firstName", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2.default)(_class5.prototype, "lastName", [_dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2.default)(_class5.prototype, "isAdmin", [_dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class5)) || _class4);
exports.SignupInput = SignupInput;
//# sourceMappingURL=user.js.map