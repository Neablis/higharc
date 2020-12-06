import User from "../../entity/User"
import { Router } from "express"
import { isLoggedIn } from "../../utils"
import { getConnection } from "typeorm"
import { classToPlain } from "class-transformer"

const UserRouter = Router()

UserRouter.use(isLoggedIn)

UserRouter.route("/")
  .get(async (req, resp): Promise<void> => {
    const { email } = req.context
    const user = await User.findOne(
      { email }, 
      { relations: ["smoothies", "smoothies.ingredients"] }
    )

    if (!user) {
      resp.status(404).send("Could not find user")
    } else {
      const results = classToPlain(user)

      resp.send(results)
    }
  })
  .delete(async (req, resp) => {
    const { userId } = req.context;

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id: userId })
      .execute()

    resp.send(true)
  })

UserRouter.route("/:userId")
  .delete(async (req, resp): Promise<void> => {
    const { admin } = req.context
    const { userId } = req.params;
    
    if (!admin) {
      resp.status(401).send("Non admins are not allowed to delete users");
      return;
    }

    const results = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id: userId })
      .execute();

    if (results.affected === 0) {
      resp.status(404).send('Could not delete user')
    } else {
      resp.send(true);
    }
  })

export default UserRouter