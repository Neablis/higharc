import { Router } from "express";
import { classToPlain } from "class-transformer";

import { isLoggedIn, validateIngredientInput, validateIngredientUpdate } from "../../utils";
import { IngredientInput, IngredientUpdateInput } from "../../types";
import { smoothieService } from "../../services";

const IngredientRouter = Router();

IngredientRouter.use(isLoggedIn);

IngredientRouter.route("/")
  .get(async (req, resp, next) => {
    const { userId } = req.context;

    const smoothieId = req.smoothieId;

    if (!smoothieId) {
      next("Missing smoothie Id");
      return;
    }

    const ingredients = await smoothieService.getAllIngredients(smoothieId);

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
      return;
    }

    const smoothie = await smoothieService.getSmoothie(userId, smoothieId);

    if (!smoothie) {
      next("Invalid smoothieId");
      return;
    }

    try {
      const ingredient = await smoothieService.createIngredient(ingredientInput, smoothie);

      resp.send(classToPlain(ingredient, { excludeExtraneousValues: true }));
    } catch (err) {
      next(err);
    }
  })

IngredientRouter.route("/:id")
  .get(async (req, resp, next) => {
    const { smoothieId } = req;
    const { userId } = req.context;

    const { id } = req.params;

    if (!smoothieId) {
      next("Missing smoothie Id");
      return;
    }

    if (!id) {
      next("Missing ingredient Id");
      return;
    }

    const ingredient = await smoothieService.getIngredient(smoothieId, id);

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
      return;
    }

    if (!id) {
      next("Missing ingredient Id");
      return;
    }

    let ingredientUpdate: IngredientUpdateInput;

    try {
      ingredientUpdate = validateIngredientUpdate(req.body);
    } catch (err) {
      next(err)
      return
    }

    const ingredient = await smoothieService.getIngredient(smoothieId, id);

    if (!ingredient) {
      resp.status(404).send("Could not find ingredient")
    } else {
      // Requesting a smoothie user doesnt own
      if (ingredient.smoothie.user.id !== userId) {
        resp.status(404).send("Could not find Ingredient");
        return;
      }

      const updatedIngredient = await smoothieService.updateIngredient(ingredient, ingredientUpdate);

      resp.send(classToPlain(updatedIngredient, { excludeExtraneousValues: true }))
    }
  })
  .delete(async (req, resp, next) => {
    const { smoothieId } = req;
    const { id } = req.params;
    const { userId } = req.context;

    if (!smoothieId) {
      next("Missing smoothie Id");
      return;
    }

    if (!id) {
      next("Missing ingredient Id");
      return;
    }

    const ingredient = await smoothieService.getIngredient(smoothieId, id);
    
    if (!ingredient) {
      resp.status(404).send("Could not find ingredient")
    } else {
      // Requesting a smoothie user doesnt own
      if (ingredient.smoothie.user.id !== userId) {
        resp.status(404).send("Could not find Ingredient");
        return;
      }

      const results = await smoothieService.deleteIngredient(id);

      if (results.affected === 0) {
        resp.status(404).send('Could not delete ingredient')
      } else {
        resp.send(true);
      }
    }
  })

export default IngredientRouter