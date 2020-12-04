import { IngredientUnit } from '../entity/Ingredient';
import { InputType, Field } from 'type-graphql';

@InputType()
export class SmoothieInput {
  @Field({ description: "Name of your smoothie" })
  name: string;

  @Field(() => [IngredientInput], { nullable: true, description: "All ingredients for this Smoothie" })
  ingredients: [IngredientInput];
}

@InputType()
export class IngredientInput {
  @Field({nullable: false, description: "Name of the new ingredient"})
  name: string;

  @Field({nullable: false, description: "Quantity of the new ingredient"})
  quantity: number;

  @Field({nullable: false, description: "Unit of the ingredients quantity"})
  unit: IngredientUnit;
}

@InputType()
export class IngredientUpdateInput {
  @Field({nullable: true, description: "New name of the ingredient"})
  name: string;

  @Field({nullable: true, description: "New quantity of the ingredient"})
  quantity: number;

  @Field({nullable: true, description: "New unit of the ingredients quantity"})
  unit: IngredientUnit;
}