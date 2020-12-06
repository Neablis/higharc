import { Router } from 'express';
import { isLoggedIn } from '../../utils';

const name = `Ingredient`
const IngredientRouter = Router();

IngredientRouter.use(isLoggedIn)

IngredientRouter.route('/')
  .get(async (req, resp) => resp.send(name))

export default IngredientRouter;