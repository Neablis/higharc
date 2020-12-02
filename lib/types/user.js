"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginInput = exports.SignupInput = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _typeGraphql = require("type-graphql");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp, _dec12, _dec13, _dec14, _dec15, _dec16, _class4, _class5, _descriptor6, _descriptor7, _temp2;

let SignupInput = (_dec = (0, _typeGraphql.InputType)(), _dec2 = (0, _typeGraphql.Field)({
  nullable: true
}), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeGraphql.Field)({
  nullable: true
}), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeGraphql.Field)({
  nullable: false
}), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeGraphql.Field)({
  nullable: false
}), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeGraphql.Field)({
  nullable: true
}), _dec11 = Reflect.metadata("design:type", Boolean), _dec(_class = (_class2 = (_temp = class SignupInput {
  constructor() {
    (0, _initializerDefineProperty2.default)(this, "firstName", _descriptor, this);
    (0, _initializerDefineProperty2.default)(this, "lastName", _descriptor2, this);
    (0, _initializerDefineProperty2.default)(this, "email", _descriptor3, this);
    (0, _initializerDefineProperty2.default)(this, "password", _descriptor4, this);
    (0, _initializerDefineProperty2.default)(this, "isAdmin", _descriptor5, this);
  }

}, _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "firstName", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "lastName", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "email", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "password", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "isAdmin", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.SignupInput = SignupInput;
let LoginInput = (_dec12 = (0, _typeGraphql.InputType)(), _dec13 = (0, _typeGraphql.Field)({
  nullable: false
}), _dec14 = Reflect.metadata("design:type", String), _dec15 = (0, _typeGraphql.Field)({
  nullable: false
}), _dec16 = Reflect.metadata("design:type", String), _dec12(_class4 = (_class5 = (_temp2 = class LoginInput {
  constructor() {
    (0, _initializerDefineProperty2.default)(this, "email", _descriptor6, this);
    (0, _initializerDefineProperty2.default)(this, "password", _descriptor7, this);
  }

}, _temp2), (_descriptor6 = (0, _applyDecoratedDescriptor2.default)(_class5.prototype, "email", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = (0, _applyDecoratedDescriptor2.default)(_class5.prototype, "password", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class5)) || _class4);
exports.LoginInput = LoginInput;
//# sourceMappingURL=user.js.map