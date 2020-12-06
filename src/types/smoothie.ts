import { IngredientUnit } from '../entity/Ingredient';

export interface SmoothieInput {
  name: string;
  ingredients: [IngredientInput];
}

export interface IngredientInput {
  name: string;
  quantity: number;
  unit: IngredientUnit;
}

export interface IngredientUpdateInput {
  name: string;
  quantity: number;
  unit: IngredientUnit;
}