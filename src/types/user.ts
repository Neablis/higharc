import { User } from "../entity"

export class LoginInput {
  email: string;
  password: string;
}

export class SignupInput extends LoginInput implements Partial<User>  {
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
}