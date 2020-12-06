"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateIngredientUpdate = exports.validateSignupInput = exports.validateLoginInput = exports.validateIngredientInput = exports.validateSmoothieInput = void 0;

var _entity = require("../entity");

/* eslint-disable */
const validateSmoothieInput = params => {
  if (!params.name) {
    throw new Error('Name of smoothie is missing');
  }

  if (params.ingredients) {
    if (!Array.isArray(params.ingredients)) {
      throw new Error('Ingredients must be an array of ingredients');
    }
  }

  return {
    name: params.name,
    ingredients: params.ingredients ? params.ingredients.map(validateIngredientInput) : []
  };
};

exports.validateSmoothieInput = validateSmoothieInput;

const validateIngredientInput = params => {
  if (!params.name || !params.quantity || !params.unit) {
    throw new Error('Ingredients must have a name, quantity and unit');
  }

  const unit = params.unit ? params.unit.toUpperCase() : '';

  if (!_entity.IngredientUnit[unit]) {
    throw new Error('Not recognized unit type');
  }

  return {
    name: params.name,
    quantity: params.quantity,
    unit: _entity.IngredientUnit[unit]
  };
};
/* eslint-disable */


exports.validateIngredientInput = validateIngredientInput;

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
/* eslint-disable */


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
/* eslint-disable */


exports.validateSignupInput = validateSignupInput;

const validateIngredientUpdate = params => {
  if (!params.name && !params.quantity && !params.unit) {
    throw new Error('Must attempt to updated at least 1 field');
  }

  if (params.unit) {
    params.unit = params.unit.toUpperCase();

    if (!_entity.IngredientUnit[params.unit]) {
      throw new Error('Not recognized unit type');
    } else {
      params.unit = _entity.IngredientUnit[params.unit];
    }
  }

  return {
    name: params.name,
    quantity: params.quantity,
    unit: params.unit
  };
};

exports.validateIngredientUpdate = validateIngredientUpdate;
//# sourceMappingURL=validate.js.map