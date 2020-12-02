import { InputType, Field } from 'type-graphql';
import User from '../entity/User';

@InputType()
export class SignupInput implements Partial<User> {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: true })
  isAdmin?: boolean;
}

@InputType()
export class LoginInput {
  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;
}