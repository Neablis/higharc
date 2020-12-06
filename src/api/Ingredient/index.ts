import { Router } from "express"
import { getConnection } from "typeorm"
import { classToPlain } from "class-transformer"

import { isLoggedIn, validateIngredientInput, validateIngredientUpdate } from "../../utils"
import Ingredient from "../../entity/Ingredient"
import { IngredientInput, IngredientUpdateInput } from "../../types"
import Smoothie from "../../entity/Smoothie"

const IngredientRouter = Router()

IngredientRouter.use(isLoggedIn)

IngredientRouter.route("/")
  .get(async (req, resp, next) => {
    const { userId } = req.context;

    const smoothieId = req.smoothieId;

    if (!smoothieId) {
      next("Missing smoothie Id");
    }

    const ingredients = await Ingredient.find({
      where: {
        smoothie: smoothieId
      }
    })

    if (ingredients && ingredients.length > 0) {
      const first = ingredients[0];

      // Requesting a smoothie user doesnt own
      if (first.smoothie.user.id !== userId) {
        resp.send([]);
      }
    }

    resp.send(classToPlain(ingredients, { excludeExtraneousValues: true }));
  })
  .post(async (req, resp, next) => {
    const { userId } = req.context;
    
    let ingredientInput: IngredientInput;

    try {
      ingredientInput = validateIngredientInput(req.body);
    } catch (err) {
      next(err);
      return;
    }

    const smoothieId = req.smoothieId;

    if (!smoothieId) {
      next("Missing smoothie Id");
    }

    const smoothie = await Smoothie.findOne({
      where: {
        user: userId,
        id: smoothieId
      },
      relations: ["ingredients"]
    })

    if (!smoothie) {
      next("Invalid smoothieId");
      return;
    }

    const ingredient = new Ingredient();
    ingredient.name = ingredientInput.name;
    ingredient.quantity = ingredientInput.quantity;
    ingredient.unit = ingredientInput.unit;
    ingredient.smoothie = smoothie; 
    
    ingredient.save();

    resp.send(classToPlain(ingredient, { excludeExtraneousValues: true }));
  })

IngredientRouter.route("/:id")
  .get(async (req, resp, next) => {
    const { smoothieId } = req;
    const { userId } = req.context;

    const { id } = req.params;

    if (!smoothieId) {
      next("Missing smoothie Id")
    }

    if (!id) {
      next("Missing ingredient Id")
    }

    const ingredient = await Ingredient.findOne({
      where: {
        smoothie: smoothieId,
        id
      }
    })

    if (!ingredient) {
      resp.status(404).send("Could not find Ingredient");
    } else {
      // Requesting a smoothie user doesnt own
      if (ingredient.smoothie.user.id !== userId) {
        resp.status(404).send("Could not find Ingredient");
        return;
      }

      resp.send(classToPlain(ingredient, { excludeExtraneousValues: true }))
    }
  })
  .patch(async (req, resp, next) => {
    const { smoothieId } = req;
    const { id } = req.params;
    const { userId } = req.context;

    if (!smoothieId) {
      next("Missing smoothie Id");
    }

    if (!id) {
      next("Missing ingredient Id");
    }

    let ingredientUpdate: IngredientUpdateInput;
    try {
      ingredientUpdate = validateIngredientUpdate(req.body);
    } catch (err) {
      next(err)
      return
    }

    const ingredient = await Ingredient.findOne({
      where: {
        smoothie: smoothieId,
        id
      }
    });

    if (!ingredient) {
      resp.status(404).send("Could not find ingredient")
    } else {
      // Requesting a smoothie user doesnt own
      if (ingredient.smoothie.user.id !== userId) {
        resp.status(404).send("Could not find Ingredient");
        return;
      }

      ingredient.name = ingredientUpdate.name || ingredient.name
      ingredient.quantity = ingredientUpdate.quantity || ingredient.quantity
      ingredient.unit = ingredientUpdate.unit || ingredient.unit

      ingredient.save()

      resp.send(classToPlain(ingredient, { excludeExtraneousValues: true }))
    }
  })
  .delete(async (req, resp) => {
    const { smoothieId } = req;
    const { id } = req.params;
    const { userId } = req.context;

    const ingredient = await Ingredient.findOne({
      where: {
        smoothie: smoothieId,
        id
      }
    });

    if (!ingredient) {
      resp.status(404).send("Could not find ingredient")
    } else {
      // Requesting a smoothie user doesnt own
      if (ingredient.smoothie.user.id !== userId) {
        resp.status(404).send("Could not find Ingredient");
        return;
      }

      const results = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Ingredient)
        .where("id = :id", { id })
        .execute();

      if (results.affected === 0) {
        resp.status(404).send('Could not delete ingredient')
      } else {
        resp.send(true);
      }
    }
  })

export default IngredientRouter