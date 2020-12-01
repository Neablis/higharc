import { InputType, Field } from 'type-graphql';
import User from '../entity/User';

@InputType()
export class UserInput implements Partial<User> {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  isAdmin?: boolean;
}