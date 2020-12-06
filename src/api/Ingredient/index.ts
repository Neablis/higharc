import { Router } from "express"
import { isLoggedIn, validateIngredientUpdate } from "../../utils"
import Ingredient from "../../entity/Ingredient"
import { classToPlain } from "class-transformer"
import { IngredientUpdateInput } from "types"

const IngredientRouter = Router()

IngredientRouter.use(isLoggedIn)

IngredientRouter.route("/")
  .get(async (req, resp, next) => {
    const { userId } = req.context;

    const smoothieId = req.smoothieId

    if (!smoothieId) {
      next("Missing smoothie Id")
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
        resp.send([])
      }
    }

    resp.send(classToPlain(ingredients, { excludeExtraneousValues: true }))
  })

IngredientRouter.route("/:id")
  .get(async (req, resp, next) => {
    const { smoothieId } = req
    const { id } = req.params

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
      resp.status(404).send("Could not find Ingredient")
    } else {
      resp.send(classToPlain(ingredient, { excludeExtraneousValues: true }))
    }
  })
  .patch(async (req, resp, next) => {
    const { smoothieId } = req
    const { id } = req.params

    if (!smoothieId) {
      next("Missing smoothie Id")
    }

    if (!id) {
      next("Missing ingredient Id")
    }

    let ingredientUpdate: IngredientUpdateInput
    try {
      ingredientUpdate = validateIngredientUpdate(req.body)
    } catch (err) {
      next(err)
      return
    }

    const ingredient = await Ingredient.findOne({
      where: {
        smoothie: smoothieId,
        id
      }
    })

    if (!ingredient) {
      resp.status(404).send("Could not find ingredient")
    } else {
      ingredient.name = ingredientUpdate.name || ingredient.name
      ingredient.quantity = ingredientUpdate.quantity || ingredient.quantity
      ingredient.unit = ingredientUpdate.unit || ingredient.unit

      ingredient.save()

      resp.send(classToPlain(ingredient, { excludeExtraneousValues: true }))
    }
  })

export default IngredientRouter