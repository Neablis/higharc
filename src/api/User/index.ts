import { Router } from 'express';
const router = Router()
const name = `User`

const UserRouter = Router();

UserRouter.route('/')
    .get(async (req, resp) => {
        return resp.send(name)
    })

export default UserRouter;