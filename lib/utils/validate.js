"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateSignupInput = exports.validateLoginInput = exports.validateSmoothieInput = void 0;

var _entity = require("../entity");

const validateSmoothieInput = params => {
  if (!params.name) {
    throw new Error('Name of smoothie is missing');
  }

  if (params.ingredients) {
    if (!Array.isArray(params.ingredients)) {
      throw new Error('Ingredients must be an array of ingredients');
    }

    for (let x = 0; x < params.ingredients.length; x++) {
      let ingredient = params.ingredients[x];

      if (!ingredient.name || !ingredient.quantity || !ingredient.unit) {
        throw new Error('Ingredients must have a name, quantity and unit');
      }

      if (!_entity.IngredientUnit[ingredient.unit]) {
        throw new Error('Not recognized unit type');
      }

      ingredient.unit = _entity.IngredientUnit[ingredient.unit];
    }
  }

  return {
    name: params.name,
    ingredients: params.ingredients
  };
};

exports.validateSmoothieInput = validateSmoothieInput;

const validateLoginInput = params => {
  if (!params.email) {
    throw new Error('Email is missing');
  }

  if (!params.password) {
    throw new Error('Password is missing');
  }

  return {
    email: params.email,
    password: params.password
  };
};

exports.validateLoginInput = validateLoginInput;

const validateSignupInput = params => {
  validateLoginInput(params);
  return {
    firstName: params.firstName,
    lastName: params.lastName,
    isAdmin: params.isAdmin,
    email: params.email,
    password: params.password
  };
};

exports.validateSignupInput = validateSignupInput;
//# sourceMappingURL=validate.js.map