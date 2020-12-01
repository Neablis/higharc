import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  FieldResolver,
  Root,
} from 'type-graphql';
import { UserInput, Context } from '../types';

import User from '../entity/User';
import { IsNull, Not } from 'typeorm';
import { generateFilterType } from 'type-graphql-filter';

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  user(@Root() user: User): Promise<User | undefined> { 
        return User.findOne({email: 'mitchell@demarcosoftware.com'})
  }
}
