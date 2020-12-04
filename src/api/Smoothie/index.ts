import { Router } from 'express';
import ingredient from "../Ingredient"
const router = Router();

const name = `Smoothie`
const SmoothieRouter = Router();

SmoothieRouter.use('/:smoothieId/ingredients', ingredient);

SmoothieRouter.route('/')
    .get(async (req, resp) => {
        console.log({ params: req.params })
        return resp.send(name);
    })

export default SmoothieRouter;