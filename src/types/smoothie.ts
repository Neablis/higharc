import { IngredientUnit } from '../entity/Ingredient';

export class SmoothieInput {
  name: string;

  ingredients: [IngredientInput];
}

export class IngredientInput {
  name: string;
  quantity: number;
  unit: IngredientUnit;
}

export class IngredientUpdateInput {
  name: string;
  quantity: number;
  unit: IngredientUnit;
}