import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  Authorized,
} from 'type-graphql';
import { validate } from "class-validator";

import { Context } from '../types';

import Smoothie from '../entity/Smoothie';
import Ingredient from '../entity/Ingredient';
import { SmoothieInput } from '../types/smoothie';
import User from '../entity/User';

  
@Resolver(Smoothie)
export class SmoothieResolver {
  @Query(() => Smoothie)
  async smoothie(
    @Arg("id", { nullable: false }) id: string,
  ): Promise<Smoothie | undefined> {
    return;
  }

  @Authorized()
  @Mutation(() => Smoothie)
  async addRecipe(
    @Arg("data") smoothieData: SmoothieInput, 
    @Ctx() ctx: Context
  ): Promise<Smoothie> {
    const user = await User.findOne({email: ctx.email});

    if (!user) throw new Error('User doesnt exist')
    

    const smoothie = new Smoothie();

    smoothie.name = smoothieData.name;
    smoothie.user = user;

    const errors = await validate(user);

    if (errors.length > 0) {
      throw new Error('Error creating new user'); 
    } else {
      
      await smoothie.save();

      let ingredientsData = smoothieData.ingredients || []

      for (let x = 0; x < ingredientsData.length; x ++) {
        const ingredientData = ingredientsData[x];
  
        const ingredient = new Ingredient();
        ingredient.name = ingredientData.name;
        ingredient.quantity = ingredientData.quantity;
        ingredient.smoothie = smoothie;

        const errors = await validate(ingredient);

        ingredient.save();
      }

      return smoothie;
    }
  }
}
  