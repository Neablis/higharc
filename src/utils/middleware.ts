import { Response, Request, NextFunction } from "express"

import { Context, Token } from "../types"
import { parseToken } from "./auth"

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bearerHeader = req.headers?.authorization

    if (!bearerHeader) return next();

    const [, token] = bearerHeader?.split(" ") || [];

    if (!token) next();

    const parsedToken: Token = parseToken(token);

    const context: Context = {
      email: parsedToken.email,
      admin: parsedToken.admin,
      userId: parsedToken.userId
    }

    /* eslint-disable */
    req.context = context;

  } catch (err) {
    console.error(err);
    return next(err);
  }

  next();
}

export const logging = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.info(`${(new Date()).toTimeString()} ${req.method} ${req.originalUrl}`);
  next();
}

export const errorHandler = (
  err: Error,
  res: Response,
): void => {
  console.log({ err });
  res.status(500).send({ error: err });
}

export const isLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.context) {
    res.status(401);
    res.send("User not logged in");
  } else {
    next();
  }
}

export const missingRoute = (
  req: Request,
  res: Response,
): void => {
  res.status(404).send({
    error: "Not found"
  })
}
