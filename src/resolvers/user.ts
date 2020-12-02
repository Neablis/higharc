import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
} from 'type-graphql';
import { Context, LoginInput, SignupInput } from '../types';
import { createToken, isPassword } from '../utils'
import { validate } from "class-validator";
import * as bcrypt from 'bcryptjs';

import User from '../entity/User';

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  user(
    @Ctx() ctx: Context
  ): Promise<User | undefined> { 
        return User.findOne({email: 'mitchell@demarcosoftware.com'})
  }

  @Mutation(() => User)
  async signup(
    @Arg('data') data: SignupInput,
  ): Promise<User | undefined> {
    const existingUser = await User.findOne({ 
      where: {  
        email: data.email
      }
    });

    if (existingUser) return existingUser;

    const user = new User();
    user.email = data.email;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.password = data.password;
    user.isAdmin = data.isAdmin || false;

    const errors = await validate(user);

    if (errors.length > 0) {
      throw new Error('Error creating new user'); 
    } else {
      return user.save();
    }
  }

  @Query(() => String)
  async login(
    @Arg('data') data: LoginInput,
  ): Promise<string | void> {
    const existingUser = await User.findOne({ 
      where: {  
        email: data.email,
      }
    });

    let loggedIn = await isPassword(data.password, existingUser)

    console.log({loggedIn})

    if (loggedIn && existingUser) {
      return createToken(existingUser)
    } else {
      throw new Error('Incorrect Login')
    }
  }
}
