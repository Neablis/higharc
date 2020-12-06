import { classToPlain } from "class-transformer";
import { Router } from "express";

import { isLoggedIn } from "../../utils";
import { userService } from "../../services";

const UserRouter = Router();

UserRouter.use(isLoggedIn);

UserRouter.route("/")
  .get(async (req, resp): Promise<void> => {
    const { email } = req.context;
    const user = await userService.getUser(email);

    if (!user) {
      resp.status(404).send("Could not find user");
    } else {
      const results = classToPlain(user);

      resp.send(results);
    }
  })
  .delete(async (req, resp) => {
    const { userId } = req.context;

    const results = await userService.deleteUser(userId);

    if (results.affected === 0) {
      resp.status(404).send('Could not delete user');
    } else {
      resp.send(true);
    }
  })

UserRouter.route("/:userId")
  .delete(async (req, resp): Promise<void> => {
    const { admin } = req.context;
    const { userId } = req.params;
    
    if (!admin) {
      resp.status(401).send("Non admins are not allowed to delete users");
      return;
    }

    const results = await userService.deleteUser(userId);

    if (results.affected === 0) {
      resp.status(404).send('Could not delete user');
    } else {
      resp.send(true);
    }
  })

export default UserRouter;