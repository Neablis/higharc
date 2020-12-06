import { DeleteResult, getConnection } from "typeorm";
import { validate } from "class-validator";

import { IngredientInput, IngredientUpdateInput, SmoothieInput } from "../types";
import { Ingredient, Smoothie, User } from "../entity";

export class SmoothieService {
  // All smoothie functionality

  async getAllSmoothies(userId: string): Promise<Smoothie[]> {
    const smoothies = await Smoothie.find({
      where: {
        user: userId
      },
      relations: ["ingredients"]
    });

    return smoothies;
  }
  async getSmoothie(userId: string, id: string): Promise<Smoothie | undefined> {
    const smoothie = await Smoothie.findOne({
      where: {
        user: userId,
        id
      },
      relations: ["ingredients"]
    });

    return smoothie;
  }
  async deleteSmoothie(userId: string, id: string): Promise<DeleteResult> {
    return await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Smoothie)
      .where("id = :id", { id })
      .andWhere("user = :userId", { userId })
      .execute();
  }
  async createSmoothie(smoothieInput: SmoothieInput, user: User): Promise<Smoothie> {
    const {
      name
    } = smoothieInput;

    const smoothie = new Smoothie();

    smoothie.name = name;
    smoothie.user = user;

    const errors = await validate(smoothie);

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    } else {
      return await getConnection().manager.save(Smoothie, smoothie);
    }
  }
  async updateSmoothie(userId: string, id: string, name: string): Promise<Smoothie> {
    const smoothie = await Smoothie.findOne({
      where: {
        user: userId,
        id
      },
      relations: ["ingredients"]
    })

    if (!smoothie) {
      throw new Error('Could not find smoothie');
    }

    smoothie.name = name;
    smoothie.save();

    return smoothie;
  }

  // All ingredient functionality
  async createIngredient(ingredientInput: IngredientInput, smoothie: Smoothie): Promise<Ingredient> {
    const {
      name,
      quantity,
      unit
    } = ingredientInput;

    const ingredient = new Ingredient();
    ingredient.name = name;
    ingredient.quantity = quantity;
    ingredient.unit = unit;
    ingredient.smoothie = smoothie;

    const errors = await validate(ingredient);

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    } else {
      return await getConnection().manager.save(Ingredient, ingredient);
    }
  }

  async getAllIngredients(smoothieId: string): Promise<Ingredient[]> {
    return await Ingredient.find({
      where: {
        smoothie: smoothieId
      }
    });
  }

  async getIngredient(smoothieId: string, ingredientId: string): Promise<Ingredient | undefined> {
    const ingredient = await Ingredient.findOne({
      where: {
        smoothie: smoothieId,
        id: ingredientId
      }
    })

    return ingredient;
  }

  async updateIngredient(ingredient: Ingredient, ingredientUpdate: IngredientUpdateInput): Promise<Ingredient> {
    const localIngredient = ingredient;

    localIngredient.name = ingredientUpdate.name || ingredient.name;
    localIngredient.quantity = ingredientUpdate.quantity || ingredient.quantity;
    localIngredient.unit = ingredientUpdate.unit || ingredient.unit;

    const errors = await validate(ingredient);

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    } else {
      return await getConnection().manager.save(Ingredient, ingredient);
    }
  }

  async deleteIngredient(ingredientId: string): Promise<DeleteResult> {
    return await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Ingredient)
      .where("id = :id", { id: ingredientId })
      .execute();
  }
}

export const smoothieService = new SmoothieService();