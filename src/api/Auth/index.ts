import { Router } from "express"
import { createToken, isPassword, validateLoginInput, validateSignupInput } from "../../utils"
import { LoginInput, SignupInput } from "types"
import { userService } from "services"

const AuthRouter = Router()

AuthRouter.route("/login")
  .post(async (req, resp, next): Promise<void> => {
    let loginParams:LoginInput;

    try {
      loginParams = validateLoginInput(req.body);
    } catch (err) {
      return next(err);
    }

    const {
      email,
      password
    } = loginParams;

    const existingUser = await userService.getUserWithPassword(email);

    if (!existingUser) next("User doesnt exist");

    let loggedIn = false;

    try {
      loggedIn = await isPassword(password, existingUser);
    } catch (err) {
      next(err);
      return;
    }

    if (loggedIn && existingUser) {
      resp.send({
        token: createToken(existingUser)
      })
    } else {
      next("Incorrect Login");
    }
  })

AuthRouter.route("/signup")
  .post(async (req, resp, next): Promise<void> => {
    let signupParams: SignupInput;

    try {
      signupParams = validateSignupInput(req.body);
    } catch (err) {
      return next(err);
    }

    const existingUser = await userService.getUser(signupParams.email);

    if (existingUser) {
      // This is a bad idea to do in reality cause it allows easy farming of production password
      resp.status(409).send('Email already exist');
      return;
    }

    try {
      const user = await userService.createUser(signupParams);

      resp.send({ token: createToken(user) });
    } catch (err) {
      next("Error creating new user");
    }
  })

export default AuthRouter