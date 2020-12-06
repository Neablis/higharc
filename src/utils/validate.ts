import { IngredientUnit } from "../entity"
import {
  IngredientInput,
  IngredientUpdateInput,
  LoginInput,
  SignupInput,
  SmoothieInput
} from "../types"

/* eslint-disable */
export const validateSmoothieInput = (params): SmoothieInput => {
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
  }
}

export const validateIngredientInput = (params): IngredientInput => {
  if (!params.name || !params.quantity || !params.unit) {
    throw new Error('Ingredients must have a name, quantity and unit');
  }

  const unit = params.unit ? params.unit.toUpperCase() : '';

  if (!IngredientUnit[unit]) {
    throw new Error('Not recognized unit type');
  }

  return {
    name: params.name,
    quantity: params.quantity,
    unit: IngredientUnit[unit]
  }
}

/* eslint-disable */
export const validateLoginInput = (params): LoginInput => {
  if (!params.email) {
    throw new Error('Email is missing')
  }

  if (!params.password) {
    throw new Error('Password is missing')
  }

  return {
    email: params.email,
    password: params.password
  }
}

/* eslint-disable */
export const validateSignupInput = (params): SignupInput => {
  validateLoginInput(params);

  return {
    firstName: params.firstName,
    lastName: params.lastName,
    isAdmin: params.isAdmin,
    email: params.email,
    password: params.password
  }
}

/* eslint-disable */
export const validateIngredientUpdate = (params): IngredientUpdateInput => {

  if (!params.name && !params.quantity && !params.unit) {
    throw new Error('Must attempt to updated at least 1 field');
  }

  if (params.unit) {
    params.unit = params.unit.toUpperCase();
    if (!IngredientUnit[params.unit]) {
      throw new Error('Not recognized unit type');
    } else {
      params.unit = IngredientUnit[params.unit]
    }
  }

  return {
    name: params.name,
    quantity: params.quantity,
    unit: params.unit
  }
}

