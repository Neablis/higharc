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
  @Query(() => Smoothie, { nullable: true, description: "Get a smoothie you created by its name" })
  async smoothie(
    @Arg("name", { nullable: false, description: "Name of one of your smoothies you want to find" }) name: string,
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
  @Query(() => [Smoothie], { nullable: true, description: "Get all smoothies you made" })
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
  @Mutation(() => Boolean, { description: "Delete a smoothie you created by its name" })
  async deleteRecipe(
    @Arg("name", { nullable: false, description: "Name of the smoothie you want to delete" }) name: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const user = await User.findOne({email: ctx.email});

    if (!user) throw new Error('User doesnt exist')

    await Smoothie.delete({
      name,
      user
    })

    return true;
  }

  @Authorized()
  @Mutation(() => Smoothie, { description: "Update the name of one of your smoothies" })
  async modifyRecipe(
    @Arg("recipeName", { nullable: false, description: "Name of the recipe you want to update" }) recipeName: string,
    @Arg("name", { nullable: false, description: "New name of the recipe" }) name: string,
    @Ctx() ctx: Context
  ): Promise<Smoothie> {
    const user = await User.findOne({email: ctx.email});

    if (!user) throw new Error('User doesnt exist')

    const smoothie = await Smoothie.findOne({
      name: recipeName,
      user
    }, {
      relations: ['ingredients']
    })

    if (!smoothie) {
      throw new Error('Recipe doesnt exist')
    }

    smoothie.name = name;
    smoothie.save();

    return smoothie;
  }

  @Authorized()
  @Mutation(() => Smoothie, { description: "Create a new smoothie" })
  async addRecipe(
    @Arg("data", {description: "Input data for the new recipe you are creating"}) smoothieData: SmoothieInput, 
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
      const ingredientsData = smoothieData.ingredients || []
      const smoothieIngredients:Ingredient[] = []

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
  