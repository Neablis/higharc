import { Response, Request, NextFunction } from 'express';
import { MiddlewareFn, AuthChecker } from 'type-graphql';
import User from 'entity/User';

import { Context } from '../types';

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const bearerHeader = req.headers?.authorization;

      if (!bearerHeader) return next();
      const [, token] = bearerHeader?.split(' ') || [];
      if (!token) next();

      const user = await User.findOne({ email: 'mitchell@demarcosoftware.com' });
      req['user'] = user;
    } catch (err) {
      console.error(err);
    }
    next();
  };


export const ErrorInterceptor: MiddlewareFn<any> = async (_, next) => {
    try {
      return await next();
    } catch (err) {
      console.error(err);
      // rethrow the error
      throw err;
    }
  };
  
  // create auth checker function
  export const authChecker: AuthChecker<Context> = (
    { root, args, context: { user } },
    roles
  ) => {
    // if `@Authorized()`, check only is user exist
    if (roles.length === 0) return user !== undefined;
  
    // and if no user, restrict access
    if (!user) return false;
  
    // no roles matched, restrict access
    return false;
  };
  