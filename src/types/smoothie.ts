import Ingredient from 'entity/Ingredient';
import Smoothie from 'entity/Smoothie';
import { InputType, Field } from 'type-graphql';

@InputType()
export class SmoothieInput {
  @Field()
  name: string;

  @Field(() => [IngredientInput], { nullable: false })
  ingredients: [IngredientInput];
}

@InputType()
export class IngredientInput implements Partial<Ingredient> {
  @Field()
  name: string;

  @Field()
  quantity: number;
}