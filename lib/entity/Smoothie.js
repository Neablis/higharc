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

var _classTransformer = require("class-transformer");

var _typeorm = require("typeorm");

var _Ingredient = _interopRequireDefault(require("./Ingredient"));

var _User = _interopRequireDefault(require("./User"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

let Smoothie = (_dec = (0, _typeGraphql.ObjectType)(), _dec2 = (0, _typeorm.Entity)(), _dec3 = (0, _typeGraphql.Field)(() => _typeGraphql.ID, {
  description: 'Unique identifier of the recipe'
}), _dec4 = (0, _typeorm.PrimaryColumn)(), _dec5 = (0, _classTransformer.Expose)(), _dec6 = Reflect.metadata("design:type", String), _dec7 = (0, _typeorm.Column)({
  nullable: false
}), _dec8 = (0, _typeGraphql.Field)({
  nullable: false,
  description: "Name of the recipe (must be longer than 3 characters)"
}), _dec9 = (0, _classValidator.MinLength)(3, {
  message: 'Name is too short'
}), _dec10 = (0, _typeorm.Index)({
  unique: true
}), _dec11 = (0, _classTransformer.Expose)(), _dec12 = Reflect.metadata("design:type", String), _dec13 = (0, _typeorm.OneToMany)(() => _Ingredient.default, ingredient => ingredient.smoothie), _dec14 = (0, _classTransformer.Expose)(), _dec15 = Reflect.metadata("design:type", Array), _dec16 = (0, _typeorm.ManyToOne)(() => _User.default, user => user.smoothies, {
  nullable: true,
  eager: true,
  cascade: ['insert'],
  onDelete: 'CASCADE'
}), _dec17 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec18 = (0, _typeGraphql.Field)({
  description: 'Date Created'
}), _dec19 = (0, _typeorm.CreateDateColumn)({
  type: 'timestamp'
}), _dec20 = (0, _classTransformer.Expose)(), _dec21 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec22 = (0, _typeGraphql.Field)({
  description: 'Date Last Updated'
}), _dec23 = (0, _typeorm.UpdateDateColumn)({
  type: 'timestamp'
}), _dec24 = (0, _classTransformer.Expose)(), _dec25 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec26 = (0, _typeorm.BeforeInsert)(), _dec27 = Reflect.metadata("design:type", Function), _dec28 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = (_class2 = (_temp = class Smoothie extends _typeorm.BaseEntity {
  constructor(...args) {
    super(...args);
    (0, _initializerDefineProperty2.default)(this, "id", _descriptor, this);
    (0, _initializerDefineProperty2.default)(this, "name", _descriptor2, this);
    (0, _initializerDefineProperty2.default)(this, "ingredients", _descriptor3, this);
    (0, _initializerDefineProperty2.default)(this, "user", _descriptor4, this);
    (0, _initializerDefineProperty2.default)(this, "createdAt", _descriptor5, this);
    (0, _initializerDefineProperty2.default)(this, "updatedAt", _descriptor6, this);
  }

  addId() {
    this.id = (0, _uuid.v4)();
  }

}, _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "id", [_dec3, _dec4, _dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "name", [_dec7, _dec8, _dec9, _dec10, _dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "ingredients", [_dec13, _dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "user", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "createdAt", [_dec18, _dec19, _dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "updatedAt", [_dec22, _dec23, _dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "addId", [_dec26, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "addId"), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Smoothie;
//# sourceMappingURL=Smoothie.js.map