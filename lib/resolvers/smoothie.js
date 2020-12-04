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

var _typeorm = require("typeorm");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _class, _class2;

let SmoothieResolver = (_dec = (0, _typeGraphql.Resolver)(_Smoothie.default), _dec2 = (0, _typeGraphql.Authorized)(), _dec3 = (0, _typeGraphql.Query)(() => _Smoothie.default, {
  nullable: true,
  description: "Get a smoothie you created by its name"
}), _dec4 = function (target, key) {
  return (0, _typeGraphql.Arg)("name", {
    nullable: false,
    description: "Name of one of your smoothies you want to find"
  })(target, key, 0);
}, _dec5 = function (target, key) {
  return (0, _typeGraphql.Ctx)()(target, key, 1);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [String, typeof _types.Context === "undefined" ? Object : _types.Context]), _dec8 = (0, _typeGraphql.Authorized)(), _dec9 = (0, _typeGraphql.Query)(() => [_Smoothie.default], {
  nullable: true,
  description: "Get all smoothies you made"
}), _dec10 = function (target, key) {
  return (0, _typeGraphql.Ctx)()(target, key, 0);
}, _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [typeof _types.Context === "undefined" ? Object : _types.Context]), _dec13 = (0, _typeGraphql.Authorized)(), _dec14 = (0, _typeGraphql.Mutation)(() => Boolean, {
  description: "Delete a smoothie you created by its name"
}), _dec15 = function (target, key) {
  return (0, _typeGraphql.Arg)("name", {
    nullable: false,
    description: "Name of the smoothie you want to delete"
  })(target, key, 0);
}, _dec16 = function (target, key) {
  return (0, _typeGraphql.Ctx)()(target, key, 1);
}, _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [String, typeof _types.Context === "undefined" ? Object : _types.Context]), _dec19 = (0, _typeGraphql.Authorized)(), _dec20 = (0, _typeGraphql.Mutation)(() => _Smoothie.default, {
  description: "Update the name of one of your smoothies"
}), _dec21 = function (target, key) {
  return (0, _typeGraphql.Arg)("recipeName", {
    nullable: false,
    description: "Name of the recipe you want to update"
  })(target, key, 0);
}, _dec22 = function (target, key) {
  return (0, _typeGraphql.Arg)("name", {
    nullable: false,
    description: "New name of the recipe"
  })(target, key, 1);
}, _dec23 = function (target, key) {
  return (0, _typeGraphql.Ctx)()(target, key, 2);
}, _dec24 = Reflect.metadata("design:type", Function), _dec25 = Reflect.metadata("design:paramtypes", [String, String, typeof _types.Context === "undefined" ? Object : _types.Context]), _dec26 = (0, _typeGraphql.Authorized)(), _dec27 = (0, _typeGraphql.Mutation)(() => _Smoothie.default, {
  description: "Create a new smoothie"
}), _dec28 = function (target, key) {
  return (0, _typeGraphql.Arg)("data", {
    description: "Input data for the new recipe you are creating"
  })(target, key, 0);
}, _dec29 = function (target, key) {
  return (0, _typeGraphql.Ctx)()(target, key, 1);
}, _dec30 = Reflect.metadata("design:type", Function), _dec31 = Reflect.metadata("design:paramtypes", [typeof _smoothie.SmoothieInput === "undefined" ? Object : _smoothie.SmoothieInput, typeof _types.Context === "undefined" ? Object : _types.Context]), _dec32 = (0, _typeGraphql.FieldResolver)(() => [_Ingredient.default], {
  nullable: true
}), _dec33 = function (target, key) {
  return (0, _typeGraphql.Root)()(target, key, 0);
}, _dec34 = Reflect.metadata("design:type", Function), _dec35 = Reflect.metadata("design:paramtypes", [typeof _Smoothie.default === "undefined" ? Object : _Smoothie.default]), _dec(_class = (_class2 = class SmoothieResolver {
  async smoothie(name, ctx) {
    return _Smoothie.default.findOne({
      where: {
        user: ctx.userId,
        name
      },
      relations: ['ingredients']
    });
  }

  async smoothies(ctx) {
    return _Smoothie.default.find({
      where: {
        user: ctx.userId
      },
      relations: ['ingredients']
    });
  }

  async deleteRecipe(name, ctx) {
    const user = await _User.default.findOne({
      email: ctx.email
    });
    if (!user) throw new Error('User doesnt exist');
    await _Smoothie.default.delete({
      name,
      user
    });
    return true;
  }

  async modifyRecipe(recipeName, name, ctx) {
    const user = await _User.default.findOne({
      email: ctx.email
    });
    if (!user) throw new Error('User doesnt exist');
    const smoothie = await _Smoothie.default.findOne({
      name: recipeName,
      user
    }, {
      relations: ['ingredients']
    });

    if (!smoothie) {
      throw new Error('Recipe doesnt exist');
    }

    smoothie.name = name;
    smoothie.save();
    return smoothie;
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
      const connection = (0, _typeorm.getConnection)();
      const response = await connection.manager.save(_Smoothie.default, smoothie);
      const ingredientsData = smoothieData.ingredients || [];
      const smoothieIngredients = [];

      for (let x = 0; x < ingredientsData.length; x++) {
        const ingredientData = ingredientsData[x];
        const ingredient = new _Ingredient.default();
        ingredient.name = ingredientData.name;
        ingredient.quantity = ingredientData.quantity;
        ingredient.unit = ingredientData.unit;
        ingredient.smoothie = response;
        smoothieIngredients.push(await connection.manager.save(_Ingredient.default, ingredient));
      }

      smoothie.ingredients = smoothieIngredients;
      return smoothie;
    }
  }

  async ingredients(smoothie) {
    return smoothie.ingredients || [];
  }

}, ((0, _applyDecoratedDescriptor2.default)(_class2.prototype, "smoothie", [_dec2, _dec3, _dec4, _dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "smoothie"), _class2.prototype), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "smoothies", [_dec8, _dec9, _dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "smoothies"), _class2.prototype), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "deleteRecipe", [_dec13, _dec14, _dec15, _dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteRecipe"), _class2.prototype), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "modifyRecipe", [_dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "modifyRecipe"), _class2.prototype), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "addRecipe", [_dec26, _dec27, _dec28, _dec29, _dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "addRecipe"), _class2.prototype), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "ingredients", [_dec32, _dec33, _dec34, _dec35], Object.getOwnPropertyDescriptor(_class2.prototype, "ingredients"), _class2.prototype)), _class2)) || _class);
exports.SmoothieResolver = SmoothieResolver;
//# sourceMappingURL=smoothie.js.map