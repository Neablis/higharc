import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  Authorized,
  FieldResolver,
  Root,
} from 'type-graphql';
import { Context, LoginInput, SignupInput } from '../types';
import { createToken, isPassword } from '../utils'
import { validate } from "class-validator";

import User from '../entity/User';
import Smoothie from '../entity/Smoothie';

@Resolver(User)
export class UserResolver {
  @Authorized()
  @Query(() => User)
  async user(
    @Ctx() ctx: Context
  ): Promise<User | undefined> { 
    const { email } = ctx;
    return User.findOne({ email }, { relations: ['smoothies']});
  }

  @FieldResolver(() => [Smoothie])
  async smoothies(@Root() user: User): Promise<Smoothie[]> {
    return user.smoothies || []
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

    if (loggedIn && existingUser) {
      return createToken(existingUser)
    } else {
      throw new Error('Incorrect Login')
    }
  }
}
