import express from "express"
import {
  handleDeleteForAdmin,
  handleSignUp,
  handleSignin,
  handleUsersForAdmin,
} from "../controllers/userController.js";
import { isAdmin, isAuth } from "../utils/isAuth.js";

export const userRouter = express.Router();

userRouter.delete("/:id", isAuth, isAdmin, handleDeleteForAdmin);

userRouter.post("/signin", handleSignin);

userRouter.post("/signup", handleSignUp);

userRouter.get("/", isAuth, isAdmin, handleUsersForAdmin);
