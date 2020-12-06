import User from "../../entity/User"
import { Router } from "express"
import { createToken, isPassword, validateLoginInput, validateSignupInput } from "../../utils"
import { validate } from "class-validator"
import { LoginInput, SignupInput } from "types"
import { getConnection } from "typeorm"
const AuthRouter = Router()

AuthRouter.route("/login")
  .post(async (req, resp, next): Promise<void> => {
    let loginParams:LoginInput

    try {
      loginParams = validateLoginInput(req.body)
    } catch (err) {
      return next(err)
    }

    const {
      email,
      password
    } = loginParams

    const connection = getConnection()

    const existingUser = await connection.getRepository(User)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email=:email", { email })
      .getOne()

    if (!existingUser) next("User doesnt exist")

    let loggedIn = false
    try {
      loggedIn = await isPassword(password, existingUser)
    } catch (err) {
      next(err)
      return
    }

    if (loggedIn && existingUser) {
      resp.send({
        token: createToken(existingUser)
      })
    } else {
      next("Incorrect Login")
    }
  })

AuthRouter.route("/signup")
  .post(async (req, resp, next): Promise<void> => {
    let signupParams: SignupInput

    try {
      signupParams = validateSignupInput(req.body)
    } catch (err) {
      return next(err)
    }

    const {
      email,
      firstName,
      lastName,
      password,
      isAdmin
    } = signupParams;

    const existingUser = await User.findOne({
      where: {
        email
      }
    });

    if (existingUser) {
      // This is a bad idea to do in reality cause it allows easy farming of production password
      resp.status(409).send('Email already exist');
      return
    }

    const user = new User()
    user.email = email
    user.password = password
    user.firstName = firstName
    user.lastName = lastName
    user.isAdmin = isAdmin || false

    const errors = await validate(user)

    if (errors.length > 0) {
      next("Error creating new user")
    } else {
      await user.save()
      resp.send({ token: createToken(user) })
    }
  })

export default AuthRouter