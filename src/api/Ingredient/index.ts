import { Router } from 'express';
const router = Router()

const name = `Ingredient`
const UserRouter = Router();

UserRouter.route('/')
    .get(async (req, resp) => resp.send(name))

export default UserRouter;