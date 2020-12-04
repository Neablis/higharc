"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IngredientResolver = void 0;

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _typeGraphql = require("type-graphql");

var _classValidator = require("class-validator");

var _types = require("../types");

var _Smoothie = _interopRequireDefault(require("../entity/Smoothie"));

var _Ingredient = _interopRequireDefault(require("../entity/Ingredient"));

var _smoothie = require("../types/smoothie");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _class, _class2;

let IngredientResolver = (_dec = (0, _typeGraphql.Resolver)(_Smoothie.default), _dec2 = (0, _typeGraphql.Authorized)(), _dec3 = (0, _typeGraphql.Query)(() => _Ingredient.default, {
  nullable: true,
  description: "Get the ingredient by ID"
}), _dec4 = function (target, key) {
  return (0, _typeGraphql.Arg)("id", {
    nullable: false
  })(target, key, 0);
}, _dec5 = function (target, key) {
  return (0, _typeGraphql.Ctx)()(target, key, 1);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [String, typeof _types.Context === "undefined" ? Object : _types.Context]), _dec8 = (0, _typeGraphql.Authorized)(), _dec9 = (0, _typeGraphql.Mutation)(() => _Ingredient.default, {
  description: "Update the ingredient by its ID"
}), _dec10 = function (target, key) {
  return (0, _typeGraphql.Arg)("id", {
    nullable: false
  })(target, key, 0);
}, _dec11 = function (target, key) {
  return (0, _typeGraphql.Arg)("updates", {
    nullable: false
  })(target, key, 1);
}, _dec12 = function (target, key) {
  return (0, _typeGraphql.Ctx)()(target, key, 2);
}, _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [String, typeof _smoothie.IngredientUpdateInput === "undefined" ? Object : _smoothie.IngredientUpdateInput, typeof _types.Context === "undefined" ? Object : _types.Context]), _dec15 = (0, _typeGraphql.Authorized)(), _dec16 = (0, _typeGraphql.Mutation)(() => Boolean, {
  description: "Delete the ingredient"
}), _dec17 = function (target, key) {
  return (0, _typeGraphql.Arg)("id", {
    nullable: false
  })(target, key, 0);
}, _dec18 = function (target, key) {
  return (0, _typeGraphql.Ctx)()(target, key, 1);
}, _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", [String, typeof _types.Context === "undefined" ? Object : _types.Context]), _dec(_class = (_class2 = class IngredientResolver {
  async ingredient(id, ctx) {
    return _Ingredient.default.findOne({
      where: {
        id
      }
    });
  }

  async updateIngredient(id, updates, ctx) {
    const ingredient = await _Ingredient.default.findOne({
      where: {
        id
      }
    });
    if (!ingredient) throw new Error('Could not find ingredient');
    ingredient.name = updates.name || ingredient.name;
    ingredient.quantity = updates.quantity || ingredient.quantity;
    ingredient.unit = updates.unit || ingredient.unit;
    const errors = await (0, _classValidator.validate)(ingredient);

    if (errors.length > 0) {
      throw new Error('Error updating ingredient');
    } else {
      await ingredient.save();
    }

    return ingredient;
  }

  async deleteIngredient(id, ctx) {
    await _Ingredient.default.delete({
      id
    });
    return true;
  }

}, ((0, _applyDecoratedDescriptor2.default)(_class2.prototype, "ingredient", [_dec2, _dec3, _dec4, _dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "ingredient"), _class2.prototype), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "updateIngredient", [_dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "updateIngredient"), _class2.prototype), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "deleteIngredient", [_dec15, _dec16, _dec17, _dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteIngredient"), _class2.prototype)), _class2)) || _class);
exports.IngredientResolver = IngredientResolver;
//# sourceMappingURL=ingredient.js.map