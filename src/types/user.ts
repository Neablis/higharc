import { InputType, Field } from 'type-graphql';
import User from '../entity/User';

@InputType()
export class LoginInput {
  @Field({ nullable: false, description: "Users email address" })
  email: string;

  @Field({ nullable: false, description: "Users password (must be greater than 6 characters)" })
  password: string;
}

@InputType()
export class SignupInput extends LoginInput implements Partial<User>  {
  @Field({ nullable: true, description: "Users first name" })
  firstName?: string;

  @Field({ nullable: true, description: "Users last name" })
  lastName?: string;

  @Field({ nullable: true, description: "Flag to create an admin user" })
  isAdmin?: boolean;
}