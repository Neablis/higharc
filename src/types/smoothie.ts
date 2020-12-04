import { IngredientUnit } from '../entity/Ingredient';
import { InputType, Field } from 'type-graphql';

@InputType()
export class SmoothieInput {
  @Field()
  name: string;

  @Field(() => [IngredientInput], { nullable: false })
  ingredients: [IngredientInput];
}

@InputType()
export class IngredientInput {
  @Field({nullable: false})
  name: string;

  @Field({nullable: false})
  quantity: number;

  @Field({nullable: false})
  unit: IngredientUnit;
}