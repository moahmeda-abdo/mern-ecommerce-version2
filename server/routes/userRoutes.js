import express from "express"
import { handleSignin } from "../controllers/userController.js"

export const userRouter = express.Router()

userRouter.post("/signin" , handleSignin)

