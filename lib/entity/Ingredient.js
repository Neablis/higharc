"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IngredientUnit = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _typeGraphql = require("type-graphql");

var _uuid = require("uuid");

var _classValidator = require("class-validator");

var _typeorm = require("typeorm");

var _Smoothie = _interopRequireDefault(require("./Smoothie"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp;

let IngredientUnit;
exports.IngredientUnit = IngredientUnit;

(function (IngredientUnit) {
  IngredientUnit["CUP"] = "cup";
  IngredientUnit["PINCH"] = "pinch";
  IngredientUnit["GRAM"] = "gram";
  IngredientUnit["OUNCE"] = "ounce";
})(IngredientUnit || (exports.IngredientUnit = IngredientUnit = {}));

(0, _typeGraphql.registerEnumType)(IngredientUnit, {
  name: "IngredientUnits",
  // this one is mandatory
  description: "Possible Units for a ingredient" // this one is optional

});
let Ingredient = (_dec = (0, _typeGraphql.ObjectType)(), _dec2 = (0, _typeorm.Entity)(), _dec3 = (0, _typeGraphql.Field)(() => _typeGraphql.ID, {
  description: 'Unique identifier of the ingredient'
}), _dec4 = (0, _typeorm.PrimaryColumn)(), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)({
  nullable: false
}), _dec7 = (0, _typeGraphql.Field)({
  nullable: false,
  description: 'Name of the ingredient'
}), _dec8 = (0, _classValidator.MinLength)(3, {
  message: 'Name is too short'
}), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.ManyToOne)(() => _Smoothie.default, smoothie => smoothie.ingredients, {
  nullable: false,
  eager: true,
  onDelete: 'CASCADE'
}), _dec11 = Reflect.metadata("design:type", typeof _Smoothie.default === "undefined" ? Object : _Smoothie.default), _dec12 = (0, _typeorm.Column)({
  nullable: false
}), _dec13 = (0, _typeGraphql.Field)({
  nullable: false,
  description: 'How many of the ingredient for recipe'
}), _dec14 = (0, _classValidator.IsInt)(), _dec15 = (0, _classValidator.Min)(0), _dec16 = (0, _classValidator.Max)(100), _dec17 = Reflect.metadata("design:type", Number), _dec18 = (0, _typeorm.Column)({
  type: "enum",
  enum: IngredientUnit,
  nullable: false
}), _dec19 = (0, _typeGraphql.Field)(() => IngredientUnit, {
  nullable: false,
  description: 'Units for the quantity of the ingredient'
}), _dec20 = (0, _classValidator.IsEnum)(IngredientUnit), _dec21 = Reflect.metadata("design:type", typeof IngredientUnit === "undefined" ? Object : IngredientUnit), _dec22 = (0, _typeGraphql.Field)({
  description: 'Date Created'
}), _dec23 = (0, _typeorm.CreateDateColumn)({
  type: 'timestamp'
}), _dec24 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec25 = (0, _typeGraphql.Field)({
  description: 'Date Last Updated'
}), _dec26 = (0, _typeorm.UpdateDateColumn)({
  type: 'timestamp'
}), _dec27 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec28 = (0, _typeorm.BeforeInsert)(), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = (_class2 = (_temp = class Ingredient extends _typeorm.BaseEntity {
  constructor(...args) {
    super(...args);
    (0, _initializerDefineProperty2.default)(this, "id", _descriptor, this);
    (0, _initializerDefineProperty2.default)(this, "name", _descriptor2, this);
    (0, _initializerDefineProperty2.default)(this, "smoothie", _descriptor3, this);
    (0, _initializerDefineProperty2.default)(this, "quantity", _descriptor4, this);
    (0, _initializerDefineProperty2.default)(this, "unit", _descriptor5, this);
    (0, _initializerDefineProperty2.default)(this, "createdAt", _descriptor6, this);
    (0, _initializerDefineProperty2.default)(this, "updatedAt", _descriptor7, this);
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
}), _descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "smoothie", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "quantity", [_dec12, _dec13, _dec14, _dec15, _dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "unit", [_dec18, _dec19, _dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "createdAt", [_dec22, _dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "updatedAt", [_dec25, _dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "addId", [_dec28, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "addId"), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Ingredient;
//# sourceMappingURL=Ingredient.js.map