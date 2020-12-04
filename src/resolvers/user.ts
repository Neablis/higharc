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
  @Query(() => User, { description: "Get the user for the passed authentication token" })
  async user(
    @Ctx() ctx: Context
  ): Promise<User | undefined> { 
    const { email } = ctx;
    return User.findOne({ email }, { relations: ['smoothies', 'smoothies.ingredients']});
  }

  @FieldResolver(() => [Smoothie])
  async smoothies(@Root() user: User): Promise<Smoothie[]> {
    return user.smoothies || []
  }

  @Mutation(() => String, { description: "Create a new user and returns a valid login token" })
  async signup(
    @Arg('data', { description: "Data for the user you are trying to create"}) data: SignupInput,
  ): Promise<string | undefined> {
    const existingUser = await User.findOne({ 
      where: {  
        email: data.email
      }
    });

    if (existingUser) throw new Error('Email is already taken')

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
      await user.save();
      return createToken(user)
    }
  }

  @Query(() => String, { description: "Get a valid auth token if user/password is correct" })
  async login(
    @Arg('data', { description: "Email and password of the user you are logging in as"}) data: LoginInput,
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
