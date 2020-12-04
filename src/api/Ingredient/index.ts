import { Router } from 'express';
const router = Router()

const name = `Ingredient`
const IngredientRouter = Router();

IngredientRouter.route('/')
    .get(async (req, resp) => resp.send(name))

export default IngredientRouter;