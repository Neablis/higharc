import { NextFunction, Response, Request, Router } from "express";
import user from './User';
import smoothie from './Smoothie';
import ingredient from './Ingredient'

export default (app) => {
    const mainRouter = Router();
    mainRouter.use('/user', user);
    mainRouter.use('/smoothie', smoothie);
    mainRouter.use('/ingredient', ingredient);
    mainRouter.get('/', async (req, resp) => resp.send('Nothing to see. Move along.'));

    // Error handler route
    mainRouter.use(
        // eslint-disable-next-line
        async (err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err); // eslint-disable-line
            return res.status(500).json({ message: err.message });
        }
    );

    app.use(mainRouter)
};