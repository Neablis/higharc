  
import { Response, Request, NextFunction } from 'express';

export default (app) => {
  app.get('/', async (req, resp) => resp.send('Nothing to see. Move along.'));

  // Error handler route
  // (need the next param for this to work)
  app.use(
    // eslint-disable-next-line
    async (err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err); // eslint-disable-line
      return res.status(500).json({ message: err.message });
    }
  );
};