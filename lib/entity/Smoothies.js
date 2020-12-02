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

var _classValidator = require("class-validator");

var _typeorm = require("typeorm");

var _Ingredient = _interopRequireDefault(require("./Ingredient"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

let Smoothies = (_dec = (0, _typeGraphql.ObjectType)(), _dec2 = (0, _typeorm.Entity)(), _dec3 = (0, _typeGraphql.Field)(() => _typeGraphql.ID), _dec4 = (0, _typeorm.PrimaryColumn)(), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)({
  nullable: false
}), _dec7 = (0, _typeGraphql.Field)({
  nullable: false
}), _dec8 = (0, _classValidator.MinLength)(3, {
  message: 'Name is too short'
}), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.OneToMany)(() => _Ingredient.default, ingredient => ingredient.user), _dec11 = Reflect.metadata("design:type", Array), _dec12 = (0, _typeGraphql.Field)(), _dec13 = (0, _typeorm.CreateDateColumn)({
  type: 'timestamp'
}), _dec14 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec15 = (0, _typeGraphql.Field)(), _dec16 = (0, _typeorm.UpdateDateColumn)({
  type: 'timestamp'
}), _dec17 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec18 = (0, _typeorm.BeforeInsert)(), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = (_class2 = (_temp = class Smoothies extends _typeorm.BaseEntity {
  constructor(...args) {
    super(...args);
    (0, _initializerDefineProperty2.default)(this, "id", _descriptor, this);
    (0, _initializerDefineProperty2.default)(this, "name", _descriptor2, this);
    (0, _initializerDefineProperty2.default)(this, "ingredient", _descriptor3, this);
    (0, _initializerDefineProperty2.default)(this, "createdAt", _descriptor4, this);
    (0, _initializerDefineProperty2.default)(this, "updatedAt", _descriptor5, this);
  }

  addId() {
    this.id = (0, _uuid.v4)();
  }

}, _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "id", [_dec3, _dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "name", [_dec6, _dec7, _dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "ingredient", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "createdAt", [_dec12, _dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "updatedAt", [_dec15, _dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "addId", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "addId"), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Smoothies;
//# sourceMappingURL=Smoothies.js.map