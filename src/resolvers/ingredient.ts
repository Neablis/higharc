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
  import { IngredientUpdateInput } from '../types/smoothie';
  
    
  @Resolver(Smoothie)
  export class IngredientResolver {
    @Authorized()
    @Query(() => Ingredient, { nullable: true, description: "Get the ingredient by ID" })
    async ingredient(
      @Arg("id", { nullable: false, description: "ID of the ingredient you want to get" }) id: string,
      @Ctx() ctx: Context
    ): Promise<Ingredient | undefined> {
      return Ingredient.findOne({
        where: {
            id
        }
      });
    }
  
    @Authorized()
    @Mutation(() => Ingredient, { description: "Update the ingredient by its ID" })
    async updateIngredient(
      @Arg("id", { nullable: false, description: "ID of the ingredient you want to update" }) id: string,
      @Arg("updates",{ nullable: false, description: "Updates to the ingredient" }) updates: IngredientUpdateInput,
      @Ctx() ctx: Context
    ): Promise<Ingredient> {
  
        const ingredient = await Ingredient.findOne({
            where: {
                id
            }
        });

        if (!ingredient) throw new Error('Could not find ingredient')
  
        ingredient.name = updates.name || ingredient.name;
        ingredient.quantity = updates.quantity || ingredient.quantity;
        ingredient.unit = updates.unit || ingredient.unit;

        const errors = await validate(ingredient);

        if (errors.length > 0) {
          throw new Error('Error updating ingredient'); 
        } else {
            await ingredient.save();
        }

        return ingredient;
    }

    @Authorized()
    @Mutation(() => Boolean, { description: "Delete the ingredient" })
    async deleteIngredient(
      @Arg("id", { nullable: false, description: "ID of the ingredient you want to delete" }) id: string,
      @Ctx() ctx: Context
    ): Promise<boolean> {
  
        await Ingredient.delete({
            id
        });

        return true;
    }
  }
    