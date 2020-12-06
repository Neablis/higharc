import { Token } from "types";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

import { User } from "../entity";

const SALT_ROUNDS = 10
const ONE_HOUR = Math.floor(Date.now() / 1000) + (60 * 60)

export const createToken = (user: User): string => {
  const token: Token = {
    exp: ONE_HOUR,
    email: user.email,
    admin: !!user.isAdmin || false,
    userId: user.id
  }

  const tokenStr = jwt.sign(token, process.env.SECRET);

  return tokenStr;
}

export const parseToken = (token: string): Token => {
  const decoded = jwt.verify(token, process.env.SECRET);

  return decoded;
}

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export const isPassword = async (password: string, user?: User): Promise<boolean> => {
  return new Promise((success, error) => {
    if (!user) return error("Missing user");

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) error(err);

      success(isMatch);
    })
  })
}