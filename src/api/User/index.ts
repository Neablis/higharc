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
  .delete(async (req, resp): Promise<void> => {
    const { email } = req.context

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("email = :email", { email })
      .execute()

    resp.send(true)
  })

export default UserRouter