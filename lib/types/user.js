"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserInput = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _typeGraphql = require("type-graphql");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

let UserInput = (_dec = (0, _typeGraphql.InputType)(), _dec2 = (0, _typeGraphql.Field)({
  nullable: true
}), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeGraphql.Field)({
  nullable: true
}), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeGraphql.Field)({
  nullable: true
}), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeGraphql.Field)({
  nullable: true
}), _dec9 = Reflect.metadata("design:type", Boolean), _dec(_class = (_class2 = (_temp = class UserInput {
  constructor() {
    (0, _initializerDefineProperty2.default)(this, "firstName", _descriptor, this);
    (0, _initializerDefineProperty2.default)(this, "lastName", _descriptor2, this);
    (0, _initializerDefineProperty2.default)(this, "email", _descriptor3, this);
    (0, _initializerDefineProperty2.default)(this, "isAdmin", _descriptor4, this);
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
}), _descriptor4 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "isAdmin", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.UserInput = UserInput;
//# sourceMappingURL=user.js.map