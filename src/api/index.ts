import express, { Router } from "express"
import user from "./User"
import smoothie from "./Smoothie"
import auth from "./Auth"

export default (app: express.Application): void => {
  const mainRouter = Router()
  mainRouter.use("/user", user)
  mainRouter.use("/auth", auth)
  mainRouter.use("/smoothie", smoothie)

  mainRouter.get("/", async (req, resp) => resp.send("Nothing to see. Move along."))

  app.use(mainRouter)
}