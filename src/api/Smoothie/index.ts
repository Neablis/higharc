import { validate } from "class-validator"
import { classToPlain } from "class-transformer"

import { Router } from "express"
import { getConnection } from "typeorm"

import Smoothie from "../../entity/Smoothie"
import { isLoggedIn, validateSmoothieInput } from "../../utils"
import ingredient from "../Ingredient"
import User from "../../entity/User"
import Ingredient from "../../entity/Ingredient"
import { SmoothieInput } from "types/smoothie"

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
    const smoothies = await Smoothie.find({
      where: {
        user: userId
      },
      relations: ["ingredients"]
    })

    const serializedSmoothies = classToPlain(smoothies, { excludeExtraneousValues: true })

    resp.send(serializedSmoothies)
  })
  .post(async (req, resp, next): Promise<void> => {
    const { email } = req.context
    const user = await User.findOne({ email: email })

    if (!user) return next("User doesnt exist")

    let smoothieInput: SmoothieInput

    try {
      smoothieInput = validateSmoothieInput(req.body)
    } catch (err) {
      next(err)

      return
    }

    const {
      name,
      ingredients
    } = smoothieInput

    const smoothie = new Smoothie()

    smoothie.name = name
    smoothie.user = user

    const errors = await validate(smoothie)

    if (errors.length > 0) {
      next("Error creating new Smoothie")
    } else {
      const connection = getConnection()
      const response = await connection.manager.save(Smoothie, smoothie)
      const ingredientsData = ingredients || []
      const smoothieIngredients: Ingredient[] = []

      for (let x = 0; x < ingredientsData.length; x++) {
        const {
          name,
          quantity,
          unit
        } = ingredientsData[x]

        const ingredient = new Ingredient()
        ingredient.name = name
        ingredient.quantity = quantity
        ingredient.unit = unit
        ingredient.smoothie = response

        smoothieIngredients.push(await connection.manager.save(Ingredient, ingredient))
      }

      smoothie.ingredients = smoothieIngredients

      const results = classToPlain(smoothie, { excludeExtraneousValues: true })

      resp.send(results)
    }
  })

SmoothieRouter.route("/:id")
  .get(async (req, resp): Promise<void> => {
    const { userId } = req.context
    const { id } = req.params

    const smoothie = await Smoothie.findOne({
      where: {
        user: userId,
        id
      },
      relations: ["ingredients"]
    })

    if (!smoothie) {
      resp.status(404).send("Could not find smoothie")
      return
    }

    resp.send(classToPlain(smoothie, { excludeExtraneousValues: true }))
  })
  .delete(async (req, resp): Promise<void> => {
    const { id } = req.params
    const { userId } = req.context

    const results = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Smoothie)
      .where("id = :id", { id })
      .andWhere("user = :userId", { userId })
      .execute();

    if (results.affected === 0) {
      resp.status(404).send('Could not delete smoothie')
    } else {
      resp.send(true);
    }
  })
  .patch(async (req, resp, next): Promise<void> => {
    const { userId } = req.context
    const { id } = req.params
    const { name } = req.body

    if (!name) {
      next("Must pass new name for smoothie")
      return
    }

    const smoothie = await Smoothie.findOne({
      where: {
        user: userId,
        id
      },
      relations: ["ingredients"]
    })

    if (!smoothie) {
      resp.status(404).send("Could not find smoothie")
      return
    }

    smoothie.name = name
    smoothie.save()

    resp.send(classToPlain(smoothie, { excludeExtraneousValues: true }))
  })

export default SmoothieRouter