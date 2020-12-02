import User from 'entity/User';
import { Context } from 'types/context';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const saltRounds = 10;

export const createToken = (user: User): string => {
    var token = jwt.sign({
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.SECRET);

    return token;
}

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, saltRounds);
}

export const isPassword = async (password: string, user?: User): Promise<boolean> => {
    return new Promise((success, error) => {
        if (!user) return error('Missing user');

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) error(err)

            success(isMatch)
        })
    });
}