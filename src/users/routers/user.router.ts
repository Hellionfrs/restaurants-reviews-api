import express from "express";
import { adminAuthorizacion, authenticateHandler } from "../../middlewares/auth.middleware";
import { deleteUserController, getUserController, updateUserController } from "../controllers/user.controller";
const userRouter = express.Router();

userRouter.get("/", authenticateHandler, adminAuthorizacion, getUserController);
userRouter.patch("/:id",authenticateHandler, adminAuthorizacion, updateUserController)
userRouter.delete("/:id", authenticateHandler, adminAuthorizacion, deleteUserController)

export {userRouter}