import { Response, Request, NextFunction } from 'express';
import { MiddlewareFn, AuthChecker } from 'type-graphql';
import User from 'entity/User';

import { Context, Token } from '../types';
import { parseToken } from './auth';

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

    let parsedToken = parseToken(token)

    req['email'] = parsedToken?.email;
    req['admin'] = parsedToken?.admin;

  } catch (err) {
    console.error(err);
    err
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
  { root, args, context: { email, admin } },
  roles
) => {  
  if (roles.length === 0) return email !== undefined;

  // and if no user, restrict access
  if (!email) return false;

  if (roles.length > 0 && roles.includes('admin')) {
    if (admin) {
      return true;
    } else {
      return false;
    }
  }

  // no roles matched, restrict access
  return false;
};
  