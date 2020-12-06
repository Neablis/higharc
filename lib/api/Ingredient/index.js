"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _utils = require("../../utils");

var _Ingredient = _interopRequireDefault(require("../../entity/Ingredient"));

var _classTransformer = require("class-transformer");

const IngredientRouter = (0, _express.Router)();
IngredientRouter.use(_utils.isLoggedIn);
IngredientRouter.route("/").get(async (req, resp, next) => {
  const {
    userId
  } = req.context;
  const smoothieId = req.smoothieId;

  if (!smoothieId) {
    next("Missing smoothie Id");
  }

  const ingredients = await _Ingredient.default.find({
    where: {
      smoothie: smoothieId
    }
  });

  if (ingredients && ingredients.length > 0) {
    let first = ingredients[0]; // Requesting a smoothie user doesnt own

    if (first.smoothie.user.id !== userId) {
      resp.send([]);
    }
  }

  resp.send((0, _classTransformer.classToPlain)(ingredients, {
    excludeExtraneousValues: true
  }));
});
IngredientRouter.route("/:id").get(async (req, resp, next) => {
  const {
    smoothieId
  } = req;
  const {
    id
  } = req.params;

  if (!smoothieId) {
    next("Missing smoothie Id");
  }

  if (!id) {
    next("Missing ingredient Id");
  }

  const ingredient = await _Ingredient.default.findOne({
    where: {
      smoothie: smoothieId,
      id
    }
  });

  if (!ingredient) {
    resp.status(404).send("Could not find Ingredient");
  } else {
    resp.send((0, _classTransformer.classToPlain)(ingredient, {
      excludeExtraneousValues: true
    }));
  }
}).patch(async (req, resp, next) => {
  const {
    smoothieId
  } = req;
  const {
    id
  } = req.params;

  if (!smoothieId) {
    next("Missing smoothie Id");
  }

  if (!id) {
    next("Missing ingredient Id");
  }

  let ingredientUpdate;

  try {
    ingredientUpdate = (0, _utils.validateIngredientUpdate)(req.body);
  } catch (err) {
    next(err);
    return;
  }

  const ingredient = await _Ingredient.default.findOne({
    where: {
      smoothie: smoothieId,
      id
    }
  });

  if (!ingredient) {
    resp.status(404).send("Could not find ingredient");
  } else {
    ingredient.name = ingredientUpdate.name || ingredient.name;
    ingredient.quantity = ingredientUpdate.quantity || ingredient.quantity;
    ingredient.unit = ingredientUpdate.unit || ingredient.unit;
    ingredient.save();
    resp.send((0, _classTransformer.classToPlain)(ingredient, {
      excludeExtraneousValues: true
    }));
  }
});
var _default = IngredientRouter;
exports.default = _default;
//# sourceMappingURL=index.js.map