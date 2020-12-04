import { response, Router } from 'express';
const router = Router()
const name = `User`

const UserRouter = Router();

UserRouter.route('/')
    .get(async (req, resp) => {
        console.log({req})
        return resp.send(name)
    })
    .post(async (req, resp) => {
        return resp.send('ok')
    })
    .delete(async (req, resp) => {
        return resp.send('ok')
    })

export default UserRouter;