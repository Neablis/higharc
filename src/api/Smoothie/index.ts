import { classToPlain } from "class-transformer";
import { Router } from "express";

import { Smoothie, Ingredient, User } from "../../entity";
import { isLoggedIn, validateSmoothieInput } from "../../utils";
import ingredient from "../Ingredient";
import { SmoothieInput } from "../../types/smoothie";
import { smoothieService } from "../../services";

const SmoothieRouter = Router()

// Exposing the smoothie Id for any down stream routers
SmoothieRouter.param("smoothieId", (req, res, next, id) => {
  /* eslint-disable */
  req.smoothieId = id

  next()
})

SmoothieRouter.use("/:smoothieId/ingredients", ingredient)

SmoothieRouter.use(isLoggedIn)

SmoothieRouter.route("/")
  .get(async (req, resp): Promise<void> => {
    const { userId } = req.context

    const smoothies = await smoothieService.getAllSmoothies(userId);

    const serializedSmoothies = classToPlain(smoothies, { excludeExtraneousValues: true });

    resp.send(serializedSmoothies);
  })
  .post(async (req, resp, next): Promise<void> => {
    const { email } = req.context;
    const user = await User.findOne({ email: email });

    if (!user) return next("User doesnt exist");

    let smoothieInput: SmoothieInput;

    try {
      smoothieInput = validateSmoothieInput(req.body);
    } catch (err) {
      next(err);

      return;
    }

    const {
      name,
      ingredients
    } = smoothieInput;

    let smoothie: Smoothie;

    try {
      smoothie = await smoothieService.createSmoothie(smoothieInput, user);
    } catch (err) {
      next("Error creating new Smoothie");
      return;
    }

    const ingredientsData = ingredients || []
    const smoothieIngredients: Ingredient[] = []

    for (let x = 0; x < ingredientsData.length; x++) {
      const ingredientInput = ingredientsData[x];

      const ingredient = await smoothieService.createIngredient(ingredientInput, smoothie)

      smoothieIngredients.push(ingredient);
    }

    smoothie.ingredients = smoothieIngredients;

    const results = classToPlain(smoothie, { excludeExtraneousValues: true });

    resp.send(results);
  })

SmoothieRouter.route("/:id")
  .get(async (req, resp): Promise<void> => {
    const { userId } = req.context;
    const { id } = req.params;

    const smoothie = await smoothieService.getSmoothie(userId, id);

    if (!smoothie) {
      resp.status(404).send("Could not find smoothie");
      return;
    }

    resp.send(classToPlain(smoothie, { excludeExtraneousValues: true }));
  })
  .delete(async (req, resp): Promise<void> => {
    const { id } = req.params;
    const { userId } = req.context;

    const results = await smoothieService.deleteSmoothie(userId, id);

    if (results.affected === 0) {
      resp.status(404).send('Could not delete smoothie');
    } else {
      resp.send(true);
    }
  })
  .patch(async (req, resp, next): Promise<void> => {
    const { userId } = req.context;
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      next("Must pass new name for smoothie");
      return;
    }

    try {
      const smoothie = await smoothieService.updateSmoothie(userId, id, name);

      resp.send(classToPlain(smoothie, { excludeExtraneousValues: true }));
    } catch(err) {
      resp.status(404).send('Could not find smoothie');
    }

  })

export default SmoothieRouter;