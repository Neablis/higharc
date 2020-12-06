"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classValidator = require("class-validator");

var _classTransformer = require("class-transformer");

var _express = require("express");

var _typeorm = require("typeorm");

var _Smoothie = _interopRequireDefault(require("../../entity/Smoothie"));

var _utils = require("../../utils");

var _Ingredient = _interopRequireDefault(require("../Ingredient"));

var _User = _interopRequireDefault(require("../../entity/User"));

var _Ingredient2 = _interopRequireDefault(require("../../entity/Ingredient"));

const SmoothieRouter = (0, _express.Router)();
SmoothieRouter.use('/:smoothieId/ingredients', _Ingredient.default);
SmoothieRouter.use(_utils.isLoggedIn);
SmoothieRouter.route('/').get(async (req, resp) => {
  const {
    userId
  } = req.context;
  let smoothies = await _Smoothie.default.find({
    where: {
      user: userId
    },
    relations: ['ingredients']
  });
  const serializedSmoothies = (0, _classTransformer.classToPlain)(smoothies, {
    excludeExtraneousValues: true
  });
  resp.send(serializedSmoothies);
}).post(async (req, resp, next) => {
  const {
    email
  } = req.context;
  const user = await _User.default.findOne({
    email: email
  });
  if (!user) return next('User doesnt exist');
  let smoothieInput;

  try {
    smoothieInput = (0, _utils.validateSmoothieInput)(req.body);
  } catch (err) {
    return next(err);
  }

  const {
    name,
    ingredients
  } = smoothieInput;
  const smoothie = new _Smoothie.default();
  smoothie.name = name;
  smoothie.user = user;
  const errors = await (0, _classValidator.validate)(smoothie);

  if (errors.length > 0) {
    next('Error creating new Smoothie');
  } else {
    const connection = (0, _typeorm.getConnection)();
    const response = await connection.manager.save(_Smoothie.default, smoothie);
    const ingredientsData = ingredients || [];
    const smoothieIngredients = [];

    for (let x = 0; x < ingredientsData.length; x++) {
      const {
        name,
        quantity,
        unit
      } = ingredientsData[x];
      const ingredient = new _Ingredient2.default();
      ingredient.name = name;
      ingredient.quantity = quantity;
      ingredient.unit = unit;
      ingredient.smoothie = response;
      smoothieIngredients.push(await connection.manager.save(_Ingredient2.default, ingredient));
    }

    smoothie.ingredients = smoothieIngredients;
    const results = (0, _classTransformer.classToPlain)(smoothie, {
      excludeExtraneousValues: true
    });
    resp.send(results);
  }
});
SmoothieRouter.route('/:id').get(async (req, resp, next) => {
  const {
    userId
  } = req.context;
  const {
    id
  } = req.params;
  const smoothie = await _Smoothie.default.findOne({
    where: {
      user: userId,
      id
    },
    relations: ['ingredients']
  });

  if (!smoothie) {
    resp.status(404).send('Could not find smoothie');
    return;
  }

  resp.send((0, _classTransformer.classToPlain)(smoothie, {
    excludeExtraneousValues: true
  }));
}).patch(async (req, resp, next) => {
  const {
    userId
  } = req.context;
  const {
    id
  } = req.params;
  const {
    name
  } = req.body;

  if (!name) {
    next('Must pass new name for smoothie');
    return;
  }

  const smoothie = await _Smoothie.default.findOne({
    where: {
      user: userId,
      id
    },
    relations: ['ingredients']
  });

  if (!smoothie) {
    resp.status(404).send('Could not find smoothie');
    return;
  }

  smoothie.name = name;
  smoothie.save();
  resp.send((0, _classTransformer.classToPlain)(smoothie, {
    excludeExtraneousValues: true
  }));
});
var _default = SmoothieRouter;
exports.default = _default;
//# sourceMappingURL=index.js.map