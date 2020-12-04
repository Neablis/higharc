import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  Authorized,
  FieldResolver,
  Root,
} from 'type-graphql';
import { validate } from "class-validator";

import { Context } from '../types';

import Smoothie from '../entity/Smoothie';
import Ingredient from '../entity/Ingredient';
import { SmoothieInput } from '../types/smoothie';
import User from '../entity/User';
import { getConnection } from 'typeorm';

  
@Resolver(Smoothie)
export class SmoothieResolver {
  @Authorized()
  @Query(() => Smoothie, { nullable: true })
  async smoothie(
    @Arg("name", { nullable: false }) name: string,
    @Ctx() ctx: Context
  ): Promise<Smoothie | undefined> {
    return Smoothie.findOne({
      where: {
        user: ctx.userId,
        name
      },
      relations: ['ingredients']
    });
  }

  @Authorized()
  @Query(() => [Smoothie], { nullable: true })
  async smoothies(
    @Ctx() ctx: Context
  ): Promise<Smoothie[] | undefined> {
    return Smoothie.find({
      where: {
        user: ctx.userId
      },
      relations: ['ingredients']
    });
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteRecipe(
    @Arg("name", { nullable: false }) name: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const user = await User.findOne({email: ctx.email});

    if (!user) throw new Error('User doesnt exist')

    await Smoothie.delete({
      name,
      user
    })

    return true;
  };

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
      const connection = getConnection();
      const response = await connection.manager.save(Smoothie, smoothie)
      let ingredientsData = smoothieData.ingredients || []
      let smoothieIngredients:Ingredient[] = []

      for (let x = 0; x < ingredientsData.length; x ++) {
        const ingredientData = ingredientsData[x];
  
        const ingredient = new Ingredient();
        ingredient.name = ingredientData.name;
        ingredient.quantity = ingredientData.quantity;
        ingredient.unit = ingredientData.unit
        ingredient.smoothie = response;
  
        smoothieIngredients.push(await connection.manager.save(Ingredient, ingredient))
      }

      smoothie.ingredients = smoothieIngredients;

      return smoothie;
    }
  }

  @FieldResolver(() => [Ingredient], {nullable: true})
  async ingredients(@Root() smoothie: Smoothie): Promise<Ingredient[]> {
    return smoothie.ingredients || []
  }
}
  