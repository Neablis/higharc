import { DeleteResult, getConnection } from "typeorm";
import { SignupInput } from "types";
import { validate } from "class-validator"

import { User } from "../entity"

export class UserService {
  async createUser(signupParams: SignupInput): Promise<User> {
    const {
      email,
      firstName,
      lastName,
      password,
      isAdmin
    } = signupParams;

    const user = new User();
    user.email = email;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    user.isAdmin = isAdmin || false;

    const errors = await validate(user)

    if (errors.length > 0) {
      throw new Error('Error creating user');
    } else {
      await user.save();
      return user;
    }
  }
  async deleteUser(userId: string): Promise<DeleteResult> {
    return await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id: userId })
      .execute();
  }
  async getUser(email: string): Promise<User | undefined> {
    return await User.findOne(
      { email }, 
      { relations: ["smoothies", "smoothies.ingredients"] }
    )
  }
  async getUserWithPassword(email: string): Promise<User | undefined> {
    return await getConnection().getRepository(User)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email=:email", { email })
      .getOne()
  }
}

export const userService = new UserService();