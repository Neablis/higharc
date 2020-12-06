import { IngredientUnit } from "../entity";
import { LoginInput, SignupInput, SmoothieInput } from "../types"

export const validateSmoothieInput = (params: any): SmoothieInput => {
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

      if (!IngredientUnit[ingredient.unit]) {
        throw new Error('Not recognized unit type');
      }

      ingredient.unit = IngredientUnit[ingredient.unit];
    }
  }

  return {
    name: params.name,
    ingredients: params.ingredients
  }
}

export const validateLoginInput = (params: any): LoginInput => {
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

export const validateSignupInput = (params: any): SignupInput => {
  validateLoginInput(params);

  return {
    firstName: params.firstName,
    lastName: params.lastName,
    isAdmin: params.isAdmin,
    email: params.email,
    password: params.password
  }
}