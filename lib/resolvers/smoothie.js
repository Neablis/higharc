"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmoothieResolver = void 0;

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _typeGraphql = require("type-graphql");

var _classValidator = require("class-validator");

var _types = require("../types");

var _Smoothie = _interopRequireDefault(require("../entity/Smoothie"));

var _Ingredient = _interopRequireDefault(require("../entity/Ingredient"));

var _smoothie = require("../types/smoothie");

var _User = _interopRequireDefault(require("../entity/User"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2;

let SmoothieResolver = (_dec = (0, _typeGraphql.Resolver)(_Smoothie.default), _dec2 = (0, _typeGraphql.Query)(() => _Smoothie.default), _dec3 = function (target, key) {
  return (0, _typeGraphql.Arg)("id", {
    nullable: false
  })(target, key, 0);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [String]), _dec6 = (0, _typeGraphql.Authorized)(), _dec7 = (0, _typeGraphql.Mutation)(() => _Smoothie.default), _dec8 = function (target, key) {
  return (0, _typeGraphql.Arg)("data")(target, key, 0);
}, _dec9 = function (target, key) {
  return (0, _typeGraphql.Ctx)()(target, key, 1);
}, _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [typeof _smoothie.SmoothieInput === "undefined" ? Object : _smoothie.SmoothieInput, typeof _types.Context === "undefined" ? Object : _types.Context]), _dec(_class = (_class2 = class SmoothieResolver {
  async smoothie(id) {
    return;
  }

  async addRecipe(smoothieData, ctx) {
    const user = await _User.default.findOne({
      email: ctx.email
    });
    if (!user) throw new Error('User doesnt exist');
    const smoothie = new _Smoothie.default();
    smoothie.name = smoothieData.name;
    smoothie.user = user;
    const errors = await (0, _classValidator.validate)(user);

    if (errors.length > 0) {
      throw new Error('Error creating new user');
    } else {
      await smoothie.save();
      let ingredientsData = smoothieData.ingredients || [];

      for (let x = 0; x < ingredientsData.length; x++) {
        const ingredientData = ingredientsData[x];
        const ingredient = new _Ingredient.default();
        ingredient.name = ingredientData.name;
        ingredient.quantity = ingredientData.quantity;
        ingredient.smoothie = smoothie;
        const errors = await (0, _classValidator.validate)(ingredient);
        ingredient.save();
      }

      return smoothie;
    }
  }

}, ((0, _applyDecoratedDescriptor2.default)(_class2.prototype, "smoothie", [_dec2, _dec3, _dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "smoothie"), _class2.prototype), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "addRecipe", [_dec6, _dec7, _dec8, _dec9, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "addRecipe"), _class2.prototype)), _class2)) || _class);
exports.SmoothieResolver = SmoothieResolver;
//# sourceMappingURL=smoothie.js.map