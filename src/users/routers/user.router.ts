import express from "express";
import { adminAuthorizacion, authenticateHandler } from "../../middlewares/auth.middleware";
import { getUserController, updateUserController } from "../controllers/user.controller";
const userRouter = express.Router();

userRouter.get("/", authenticateHandler, getUserController);
userRouter.patch("/:id",authenticateHandler, adminAuthorizacion, updateUserController)
export {userRouter}