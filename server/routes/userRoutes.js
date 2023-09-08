import express from "express"
import { handleSignUp, handleSignin } from "../controllers/userController.js"

export const userRouter = express.Router()

userRouter.post("/signin" , handleSignin)
userRouter.post("/signup" , handleSignUp)

