import { Router } from 'express';
const router = Router()

const name = `Auth`
const AuthRouter = Router();

AuthRouter.route('/')
    .get(async (req, resp) => resp.send(name))

export default AuthRouter;