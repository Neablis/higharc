"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _typeGraphql = require("type-graphql");

var _uuid = require("uuid");

var _Smoothie = _interopRequireDefault(require("./Smoothie"));

var _classValidator = require("class-validator");

var _typeorm = require("typeorm");

var _utils = require("../utils");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp;

let User = (_dec = (0, _typeGraphql.ObjectType)(), _dec2 = (0, _typeorm.Entity)(), _dec3 = (0, _typeGraphql.Field)(() => _typeGraphql.ID), _dec4 = (0, _typeorm.PrimaryColumn)(), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeGraphql.Field)({
  nullable: true
}), _dec7 = (0, _typeorm.Column)({
  nullable: true
}), _dec8 = Reflect.metadata("design:type", String), _dec9 = (0, _typeGraphql.Field)({
  nullable: true
}), _dec10 = (0, _typeorm.Column)({
  nullable: true
}), _dec11 = Reflect.metadata("design:type", String), _dec12 = (0, _typeorm.Column)({
  nullable: false
}), _dec13 = (0, _typeGraphql.Field)({
  nullable: false
}), _dec14 = (0, _typeorm.Index)({
  unique: true
}), _dec15 = (0, _classValidator.IsEmail)(), _dec16 = Reflect.metadata("design:type", String), _dec17 = (0, _typeorm.Column)({
  nullable: false
}), _dec18 = (0, _classValidator.MinLength)(6, {
  message: 'Password is too short'
}), _dec19 = Reflect.metadata("design:type", String), _dec20 = (0, _typeorm.OneToMany)(() => _Smoothie.default, smoothie => smoothie.user), _dec21 = Reflect.metadata("design:type", Array), _dec22 = (0, _typeGraphql.Field)(), _dec23 = (0, _typeorm.CreateDateColumn)({
  type: 'timestamp'
}), _dec24 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec25 = (0, _typeGraphql.Field)(), _dec26 = (0, _typeorm.UpdateDateColumn)({
  type: 'timestamp'
}), _dec27 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec28 = (0, _typeGraphql.Field)(), _dec29 = (0, _typeorm.Column)({
  default: false
}), _dec30 = Reflect.metadata("design:type", Boolean), _dec31 = (0, _typeorm.BeforeInsert)(), _dec32 = Reflect.metadata("design:type", Function), _dec33 = Reflect.metadata("design:paramtypes", []), _dec34 = (0, _typeorm.BeforeInsert)(), _dec35 = Reflect.metadata("design:type", Function), _dec36 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = (_class2 = (_temp = class User extends _typeorm.BaseEntity {
  constructor(...args) {
    super(...args);
    (0, _initializerDefineProperty2.default)(this, "id", _descriptor, this);
    (0, _initializerDefineProperty2.default)(this, "firstName", _descriptor2, this);
    (0, _initializerDefineProperty2.default)(this, "lastName", _descriptor3, this);
    (0, _initializerDefineProperty2.default)(this, "email", _descriptor4, this);
    (0, _initializerDefineProperty2.default)(this, "password", _descriptor5, this);
    (0, _initializerDefineProperty2.default)(this, "smoothies", _descriptor6, this);
    (0, _initializerDefineProperty2.default)(this, "createdAt", _descriptor7, this);
    (0, _initializerDefineProperty2.default)(this, "updatedAt", _descriptor8, this);
    (0, _initializerDefineProperty2.default)(this, "isAdmin", _descriptor9, this);
  }

  addId() {
    this.id = (0, _uuid.v4)();
  }

  async hashPassword() {
    this.password = await (0, _utils.hashPassword)(this.password);
  }

}, _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "id", [_dec3, _dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "firstName", [_dec6, _dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "lastName", [_dec9, _dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "email", [_dec12, _dec13, _dec14, _dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "password", [_dec17, _dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "smoothies", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "createdAt", [_dec22, _dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "updatedAt", [_dec25, _dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "isAdmin", [_dec28, _dec29, _dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "addId", [_dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "addId"), _class2.prototype), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "hashPassword", [_dec34, _dec35, _dec36], Object.getOwnPropertyDescriptor(_class2.prototype, "hashPassword"), _class2.prototype)), _class2)) || _class) || _class);
exports.default = User;
//# sourceMappingURL=User.js.map